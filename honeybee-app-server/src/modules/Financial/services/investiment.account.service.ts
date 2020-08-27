// import { mongoose } from "@typegoose/typegoose"
// import { ProfitType, TransactionType } from "honeybee-api"
// import { toObjectId } from "../../../core/server-utils"
// import { InvestimentAccountModel } from "../models"

// /**
//  *
//  *
//  * @param {mongoose.Types.ObjectId} brokerAccount
//  */
// export const createInvestimentAccount = (brokerAccount: mongoose.Types.ObjectId) => {

// }

// /**
//  *
//  *
//  * @param {mongoose.Types.ObjectId} brokerAccount
//  * @param {mongoose.Types.ObjectId} investiment
//  */
// export const addInvestiment = (brokerAccount: mongoose.Types.ObjectId, investiment: mongoose.Types.ObjectId, refId: mongoose.Types.ObjectId) => {
//     return InvestimentAccountModel.updateOne(
//         { ...toObjectId("brokerAccount", brokerAccount) },
//         { "$push": {
//             applications: {
//                 amount: 0,
//                 investiment,
//                 refId
//             }
//         }}
//     ).exec()
// }

// /**
//  *
//  *
//  * @param {mongoose.Types.ObjectId} brokerAccount
//  * @param {mongoose.Types.ObjectId} investiment
//  */
// export const removeInvestiment = (brokerAccount: mongoose.Types.ObjectId, investiment: mongoose.Types.ObjectId) => {

// }

// export const addTransaction2 = async (brokerAccount: mongoose.Types.ObjectId, transaction: { 
//     investiment: mongoose.Types.ObjectId
//     type: TransactionType
//     dateTime: Date
//     value: number
// }) => {
//     // TODO testa se tem o investimento, se não tiver, adiciona.
//     // const account = await InvestimentAccountModel.findOne({ ...toObjectId("brokerAccount", brokerAccount) })
//     // InvestimentAccountTransactionModel.create({
//     //     investimentAccount: account._id,
//     //     ...transaction
//     // })
// }

// export const addProfit2 = async (brokerAccount: mongoose.Types.ObjectId, profit: { 
//     investiment: mongoose.Types.ObjectId
//     type: ProfitType
//     dateTime: Date
//     value: number
// }) => {
//     // TODO testa se tem o investimento, se não tiver, adiciona.
//     // const account = await InvestimentAccountModel.findOne({ ...toObjectId("brokerAccount", brokerAccount) })
//     // InvestimentAccountProfitModel.create({
//     //     investimentAccount: account._id,
//     //     ...profit
//     // })
// }