import { differenceInMilliseconds } from 'date-fns'
import { setInterval } from "timers"
import { ClearConnection } from "./clear.connection"

const TIMEOUT = 10000
const TIMER = 1000

/**
 *
 *
 * @export
 * @class ClearRequest
 */
export class ClearRequest {

    conn: ClearConnection
    response: Function
    untrackedMessageFn: Function
    stack: Map<string, { accept: Function, error: Function, time: number }>
    timer: NodeJS.Timeout

    private constructor(connection: ClearConnection, untrackedMessageFn: Function) {
        this.conn = connection
        this.untrackedMessageFn = untrackedMessageFn
        this.response = (message: any, identifier: string) => this.receive(message, identifier)
        this.conn.attachMessageListener(this.response)
        this.stack = new Map()
        this.performTimeout()
    }

    /**
     *
     *
     * @static
     * @param {ClearConnection} connection
     * @param {Function} untrackedMessageFn
     * @returns {ClearRequest}
     * @memberof ClearRequest
     */
    static build(connection: ClearConnection, untrackedMessageFn?: Function): ClearRequest {
        return new ClearRequest(connection, untrackedMessageFn)
    }
  
    /**
     *
     *
     * @param {Function} clearMessageFn
     * @param {*} payload
     * @returns {Promise<void>}
     * @memberof ClearRequest
     */
    send(clearMessageFn: Function, payload: any): Promise<PromiseResponse> {
        return new Promise((resolve, reject) => {
            this.conn.ready()
            .then(() => {
                const buffer = clearMessageFn(payload)
                this.stack.set(payload.RequestID, { accept: resolve, error: reject, time: Date.now() })
                this.conn.send(buffer)
            })
            .catch((e) => reject(e))
        })
    }

    /**
     *
     *
     * @private
     * @param {*} message
     * @param {string} identifier
     * @memberof ClearRequest
     */
    private async receive(message: any, identifier: string) {
        const { RequestID } = message

        // If the request has a RequestID, proccess its response.
        if (RequestID && this.stack.has(RequestID)) {
            const promise = this.stack.get(RequestID)
            promise.accept({ message, identifier })
            this.stack.delete(RequestID)
        }

        // If it's a untracked message
        else if (this.untrackedMessageFn) {
            await this.untrackedMessageFn({ message, identifier } as PromiseResponse)
        }
    }

    /**
     *
     *
     * @memberof ClearRequest
     */
    shuttdown(): void {
        this.stack.clear()
        this.conn.detachMessageListener(this.response)
        clearInterval(this.timer)
    }

    /**
     *
     *
     * @private
     * @memberof ClearRequest
     */
    private performTimeout() {
        this.timer = setInterval(() => {
            this.stack.forEach((call, key) => {
                if (differenceInMilliseconds(Date.now(), call.time) > TIMEOUT) {
                    call.error(`Request ${key} timeout.`)
                }
            })
        }, TIMER)
    }

}

export type PromiseResponse = {
    message: any
    identifier: string
}