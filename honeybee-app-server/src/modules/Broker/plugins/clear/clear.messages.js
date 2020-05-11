import protobufjs from 'protobufjs'
import { ErrorCodes } from '../../../../core/error.codes'
import { ts } from '../../../../core/i18n'
import Logger from '../../../../core/Logger'
import { OrderStatus } from '../../../Order/models/order.model'

const builder = protobufjs.loadSync("./src/modules/Broker/plugins/clear/Contract.proto")
const GUIID = "5edc1089-b9e5-4125-8548-b6ad6741c414"

export const ClearEnums = {

    ExchangeOrderType: {
        LIMIT: 50,
        STOP: 51,
        MARKET: 49,

        convert: (type) => {
            let option = ClearEnums.ExchangeOrderType[type]
            if (option) return option
            Logger.throw(ErrorCodes.EXCHANGEORDERTYPE_INVALID, ts("exchangeordertype_invalid", { type }))
        }
    },

    ExchangeOrderSide: {
        BUY: 1,
        SELL: 2,

        convert: (orderSide) => {
            let option = ClearEnums.ExchangeOrderSide[orderSide]
            if (option) return option
            Logger.throw(ErrorCodes.EXCHANGEORDERSIDE_INVALID, ts("exchangeorderside_invalid", { orderSide }))
        }
    },

    ClearOrderStatus: {
        NEW: { code: 48, status: OrderStatus.NEW },
        OPEN: { code: 49, status: OrderStatus.OPEN },
        FILLED: { code: 50, status: OrderStatus.FILLED },
        PARTIAL_FILLED: { code: 51, status: OrderStatus.PARTIAL_FILLED },
        REJECTED: { code: 53, status: OrderStatus.REJECTED },

        convert: (status) => {
            let option = Object.keys(ClearEnums.ClearOrderStatus).find(k => ClearEnums.ClearOrderStatus[k].code === status)
            if (!option) Logger.throw(ErrorCodes.ORDERSTATUS_INVALID, ts("orderstatus_invalid", { status }))
            return option
        }
    },

    Module: {
        DAYTRADE: 3,
        SWINGTRADE: 101,

        convert: (platform) => {
            let option = ClearEnums.Module[platform]
            if (option) return option
            Logger.throw(ErrorCodes.MODULE_INVALID, ts("module_invalid", { platform }))
        }
    },
}

export const generateID = (identifier) => {
    const id = identifier.replace(/[^A-Z.]+/g, "")
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth().toString()
    const day = date.getDay().toString()
    const seconds = date.getSeconds().toString()
    const miliseconds = date.getMilliseconds().toString()
    return `${id}.${GUIID}.${year}${month.padStart(2, "0")}${day.padStart(2, "0")}${seconds.padStart(2, "0")}${miliseconds.padStart(3, "0")}`
}

export const ClearMessages = {

    // Requests
    ENVELOP: "Contract.Messaging.Envelop",
    AUTHENTICATION_REQUEST: "Contract.Messaging.Security.Request.AuthenticationRequest",
    NEW_ORDER_REQUEST: "Contract.Messaging.Trade.Request.NewOrderRequest",
    SIGN_QUOTE_REQUEST: "Contract.Messaging.MarketData.Request.SignQuoteRequest",
    PONG_REQUEST: "Contract.Messaging.Security.Request.PongRequest",
    WARRANTIES_REPORT_REQUEST: "Contract.Messaging.BackOffice.Request.WarrantiesReportRequest",
    
    // Responses
    AUTHENTICATION_RESPONSE: "Contract.Messaging.Security.Response.AuthenticationResponse",
    IMMEDIATE_ORDER_RESPONSE: "Contract.Messaging.Trade.Response.ImmediateOrderResponse",
    QUOTE_INFO: "Entities.MarketData.QuoteInfo",
    ORDER_BASE: "Entities.Abstraction.OrderBase",


    pack: (buffer, type) => {
        return lookupMessage(ClearMessages.ENVELOP, {
            Identifier: type.replace("Contract.", ""),
            Content: buffer
        })
    },

    unpack: (buffer) => {
        const lookup = builder.lookupType(ClearMessages.ENVELOP)
        return lookup.decode(new Uint8Array(buffer))
    },

    toEnum: (value) => {
        return Enums[value]
    },

    extractMessage: (envelop) => {
        const lookupMess = builder.lookupType(`Contract.${envelop.Identifier}`)
        return lookupMess.decode(envelop.Content)
    },

    isEnvelopFrom: (unpacked, type) => {
        return unpacked.Identifier === type.replace("Contract.", "")
    },

    // Messages
    AuthenticationRequest: (payload) => {
        return buildMessage(ClearMessages.AUTHENTICATION_REQUEST, payload)
    },

    NewOrderRequest: (payload) => {
        return buildMessage(ClearMessages.NEW_ORDER_REQUEST, payload)
    },

    SignQuoteRequest: (payload) => {
        return buildMessage(ClearMessages.SIGN_QUOTE_REQUEST, payload)
    },

    WarrantiesReportRequest: (payload) => {
        return buildMessage(ClearMessages.WARRANTIES_REPORT_REQUEST, payload)
    },

    PongRequest: () => {
        return buildMessage(ClearMessages.PONG_REQUEST)
    }
}

const lookupMessage = (type, payload) => {
    const lookup = builder.lookupType(type)
    const message = lookup.create(payload)
    return lookup.encode(message).finish()
}

const buildMessage = (type, payload = {}) => {
    payload.RequestID = generateID(type.replace("Contract.", ""))
    const buffer = lookupMessage(type, payload)
    return ClearMessages.pack(buffer, type)
}

