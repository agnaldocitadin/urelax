import ip from 'public-ip'
import WebSocket from 'ws'
import Logger from '../../../../core/Logger'
import { DelayedAction } from '../../../../core/server-utils'
import { Clear } from '../../models'
import { BrokerAccount } from '../../models/broker.account.model'
import { ClearMessages } from './clear.messages'

const IDLE = 28000
const ARRAY_BUFFER = "arraybuffer"
const RECONNECTION_TIMEOUT = 5000

/**
 *
 * @export
 * @class ClearConnection
 */
export class ClearConnection {

    account: BrokerAccount
    keepAlive: boolean
    authenticated: boolean
    destroyed: boolean
    keepAliveTimer: DelayedAction
    autoConnectTimer: DelayedAction
    onAuthenticationListeners: Array<Function>
    onMessageListeners: Array<Function>
    onCloseListeners: Array<Function>
    webSocket: WebSocket
    connectingPromise: Promise<void>
    IPAddress: string

    private constructor(account: BrokerAccount, keepAlive: boolean) {
        Logger.debug("New ClearConnection created. [%s/CPF:%s]", account._id, (<Clear>account.extraData).cpf)
        this.onAuthenticationListeners = []
        this.onMessageListeners = []
        this.onCloseListeners = []
        this.account = account
        this.authenticated = false
        this.keepAlive = keepAlive
        this.keepAliveTimer = new DelayedAction()
        this.autoConnectTimer = new DelayedAction()
    }

    /**
     *
     *
     * @static
     * @param {BrokerAccount} account
     * @param {boolean} [keepAlive]
     * @returns
     * @memberof ClearConnection
     */
    static build(account: BrokerAccount, keepAlive?: boolean) {
        return new ClearConnection(account, keepAlive)
    }

    /**
     *
     *
     * @returns
     * @memberof ClearConnection
     */
    ready() {
        if (this.destroyed) {
            return Promise.reject("Connection destroyed.")
        }

        if (this.authenticated) {
            return Promise.resolve()
        }

        if (this.connectingPromise) {
            return this.connectingPromise
        }
        
        return this.connectingPromise = new Promise((accept, reject) => {
            this.connect(accept, reject)
        })
    }

    /**
     *
     *
     * @private
     * @param {Function} accept
     * @param {Function} reject
     * @memberof ClearConnection
     */
    private connect(accept: Function, reject: Function) {
        this.webSocket = new WebSocket(process.env.CLEAR_WSS_URL)
        this.webSocket.binaryType = ARRAY_BUFFER
        this.onOpen()
        this.onMessage(accept)
        this.onError(accept, reject)
        this.onClose()
    }

    /**
     *
     *
     * @memberof ClearConnection
     */
    disconnect() {
        this.authenticated = false
        this.webSocket.terminate()
        if (!this.keepAlive) {
            this.keepAliveTimer.clear()
            this.autoConnectTimer.clear()
        }
    }

    /**
     *
     *
     * @param {ArrayBuffer} data
     * @memberof ClearConnection
     */
    send(data: ArrayBuffer) {
        this.keepAliveFn()
        this.webSocket.send(data)
    }

    /**
     *
     *
     * @param {Function} fn
     * @memberof ClearConnection
     */
    attachAuthenticationListener(fn: Function) {
        this.onAuthenticationListeners.push(fn)
    }

    /**
     * Attach callbacks to receive connection's data.
     *
     * @param {*} fn
     * @memberof ClearConnection
     */
    attachMessageListener(fn: Function) {
        this.onMessageListeners.push(fn)
    }

    /**
     *
     *
     * @param {*} fn
     * @memberof ClearConnection
     */
    attachCloseListener(fn: Function) {
        this.onCloseListeners.push(fn)
    }

    /**
     *
     *
     * @param {Function} fn
     * @memberof ClearConnection
     */
    detachAuthenticationListener(fn: Function) {
        this.detach(fn, this.onAuthenticationListeners)
    }
    

    /**
     * Detach callbacks to stop receiving connection's data.
     *
     * @param {*} fn
     * @memberof ClearConnection
     */
    detachMessageListener(fn: Function) {
        this.detach(fn, this.onMessageListeners)
    }

    /**
     * Detach callbacks to stop receiving connection's closing events.
     *
     * @param {*} fn
     * @memberof ClearConnection
     */
    detachCloseListener(fn: Function) {
        this.detach(fn, this.onCloseListeners)
    }

    /**
     * Destroy the connection.
     *
     * @memberof ClearConnection
     */
    destroy() {
        this.disconnect()
        this.onMessageListeners = []
        this.onCloseListeners = []
        this.onAuthenticationListeners = []
        this.destroyed = true
    }

    /**
     *
     *
     * @returns {Promise<string>}
     * @memberof ClearConnection
     */
    async getIPAddress(): Promise<string> {
        if (!this.IPAddress) this.IPAddress = await ip.v4()
        return this.IPAddress
    }

    /**
     *
     *
     * @private
     * @param {Function} fn
     * @param {Array<Function>} [arrayFn=[]]
     * @memberof ClearConnection
     */
    private detach(fn: Function, arrayFn: Array<Function> = []) {
        const fnIndex = arrayFn.indexOf(fn)
        arrayFn.splice(fnIndex, 1)   
    }

    /**
     *
     *
     * @private
     * @memberof ClearConnection
     */
    private onOpen() {
        this.webSocket.on("open", async () => {
            Logger.debug("Websocket address [%s] connected.", process.env.CLEAR_WSS_URL)
            const authentication = await this.auth()
            this.send(authentication)
        })
    }

    /**
     *
     *
     * @private
     * @param {Function} acceptConnection
     * @memberof ClearConnection
     */
    private onMessage (acceptConnection: Function) {
        this.webSocket.on("message", (message) => {
            const unpacked = ClearMessages.unpack(message)
            
            if (this.isAuthenticating(unpacked)) {
                this.authenticated = true
                this.connectingPromise = null
                this.onAuthenticationListeners.forEach(fn => fn())
                acceptConnection()
            }
            else {
                this.keepAliveFn()
                this.notifyMessageListeners(unpacked)
            }
        })
    }

    /**
     *
     *
     * @private
     * @memberof ClearConnection
     */
    private onClose() {
        this.webSocket.on("close", () => {
            Logger.debug("Websocket closed. [%s]", process.env.CLEAR_WSS_URL)
            this.authenticated = false
            this.connectingPromise = null
            this.onCloseListeners.forEach(fn => fn())
        })
    }
    
    /**
     * Quando dá erro, chama o onError e depois o onClose.
     * 
     *
     * @private
     * @param {Function} rejectConnection
     * @memberof ClearConnection
     */
    private onError(acceptConnection: Function, rejectConnection: Function) {
        this.webSocket.on("error", (e) => {
            Logger.error(e)
            if (this.keepAlive && !this.destroyed) {
                this.autoConnectTimer.run(() => this.connect(acceptConnection, rejectConnection), RECONNECTION_TIMEOUT)
            }
            else {
                rejectConnection(e)
            }
        })
    }
    
    /**
     *
     *
     * @private
     * @param {*} unpacked
     * @memberof ClearConnection
     */
    private notifyMessageListeners(unpacked: any) {
        const unpackedMessage = ClearMessages.extractMessage(unpacked)
        Logger.trace(unpackedMessage, "Message received (CLEAR)")
        this.onMessageListeners.forEach(fn => fn(unpackedMessage, unpacked.Identifier))
    }
    
    /**
     *
     *
     * @private
     * @param {*} unpacked
     * @returns
     * @memberof ClearConnection
     */
    private isAuthenticating(unpacked: any) {
        if (ClearMessages.isEnvelopFrom(unpacked, ClearMessages.AUTHENTICATION_RESPONSE)) {
            
            const auth: any = ClearMessages.extractMessage(unpacked)
            if (auth.Result === 1) {
                Logger.debug(auth, "User authenticated successfully!")
                return true
            }
    
            this.disconnect()
            Logger.debug(auth, "User denied.")
        }
        return false
    }
    
    /**
     *
     *
     * @private
     * @returns
     * @memberof ClearConnection
     */
    private async auth() {
        const { token, platformUID, sessionId } = (<Clear>this.account.extraData)
        return ClearMessages.AuthenticationRequest({
            Token: token,
            PlatformUID: platformUID,
            RemoteAddress: await this.getIPAddress(),
            SessionId: sessionId
        })
    }
    
    /**
     *
     *
     * @private
     * @memberof ClearConnection
     */
    private keepAliveFn() {
        if (!this.keepAlive) return
        this.keepAliveTimer.run(() => {
            this.ready().then(() => {
                Logger.debug("Keeping connection alive [CLEAR@%s]", this.account._id)
                const buffer = ClearMessages.PongRequest()
                this.send(buffer)
            })
        }, IDLE)
    }

}