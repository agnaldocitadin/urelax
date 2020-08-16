import dotenv from 'dotenv-flow'
import admin from 'firebase-admin'
import { MessageTypes } from 'honeybee-api'
import Logger from '../src/core/Logger'

beforeAll(async () => {
    dotenv.config()
    // await connectDB()
    let acc = require('../src/modules/Notification/push/urelax-5abcb-firebase-adminsdk-oezxo-f31915072b.json')
    let app = admin.initializeApp({
        credential: admin.credential.cert(acc),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    })
    Logger.info("URL", process.env.FIREBASE_DATABASE_URL)
})

it("teste", async () => {
    jest.setTimeout(50000)

    // let token = "fPllQznjycw:APA91bFcsXgsc4_rzPqYmjK7Oqn94fN00oIgC2GPesRYYd09MQRxC9NeLUtda0gz8DrmkbNpEH-W9_DhVQfGAq-xvBZyVv3-LRHarY16WMJ8d_aR41J9x5pDG-wyNNXWNvpH1A3xxa2d"
    // let token = "eV4iZKNqqKo:APA91bGK0-_XcnzaBDX72pt-7Ke2IVHouGydwsNJAUrIhTFxplGk4uv7Iwn_PP8FnNj3s3m1GBfM25oE2SvEPTOxb493Xtgge1KlV0HKtPeN8M1rtk3PClud3OwZoE16Thc9wBMq-l8s"
    // let token = "e-voJwC_I-w:APA91bFFGbD8sYGn6ohFY88rkx7CEyxUo8NDPJ7v6BeEqz7gi2rTToCFQlndgChrzhZzpPPk0xV_U2L6pLIDzPP9Id9VG_MrXSl4U7N9ebUGFE-lhBu5bUlBl0BXMuk1piSg565CqTxz"
    
    // emulator
    // let token = "f2S2VRRzb-g:APA91bFB_D42Z7UGQSC0v5Lbla3mKy0ot0JnQSC0whJi2C9x1RqqFwBR-q_roqLqw3AOAO1O19eBZkNFRxUutlI4hmz64OOnv8I0iDilY_p2VUM6Q-WGQ1omS7bGFBpgENK_0LxsuFAk"
    let token = "f0YIqi42fj0:APA91bGpjWJb-qsCs5Ib2TSoA_VLl2Orp-EhN4lbGdjro_3OQRu9VImIfrAuhC7V8TNR_JQ8fMt9ODH6xHtT6EWzrtcaX6qONvPv8-tQ8MLqgKlPZTIcFE21mMIK83ljhkKEWV1FOpj4"

    // devioce
    // let token = "fdpOIUoPh2c:APA91bEIVT6v81wJQvumU7QJyrdWXK0ADwo3kdCapmVnxeNWFmNyMlj5v76mkGY5cuYhP7Ugpyp5lPMAvijp-T7XzLXMwCX8X8y9vBFi7QfOCpoRVSiJHlllRIEmu0TP4LuK1woesVnZ"
    
    await admin.messaging().sendToDevice(token, {
            data: {
                messageType: MessageTypes.STOCK_TRACKER_ORDER
            },
            notification: {
                title: "Compra de ações",
                body: "500 ações em Azul Linhas Aéreas (AZUL4) no valor total de R$ 25.514,22.",
                color: "#1099f5",
                icon: "icon_notification",
                clickAction: ""
            },
    
        }, 
        // { priority: 'high', timeToLive: 60 * 60 * 24 }
    ).catch(e => Logger.error(e))

    // await admin.messaging().send({
    //     token: "e9nWJQMHaKg:APA91bEwygCaYVz5V3SjbPZZo0vBfaeUpMwd5TkrVQOmaOUejR0U48sNwK0eQNYlJm1LBfI1VM6KASFTolb8AeuRczGZDJkwG-Da9LgIan8bllGuZPziy1cer0MqvX4zKyP7uhueMHy3",
    //     // data: {
    //     //     messageType: MessageTypes.STOCK_TRACKER_STATUS,
    //     //     stockTrackerId: "acb123",
    //     //     stockTrackerStatus: StockTrackerStatus.DESTROYED
    //     // } as NotificationMessage,
    //     notification: {
    //         // icon: "icon_notification",
    //         title: "Minha notificacao",
    //         body: "Ai sim hiem campeão!!",
    //         imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Godot_icon.svg"
    //     }
    // }).catch(e => Logger.error(e))

    Logger.info("Enviou!")

    // let clear = await ClearAccountModel.findById("5d6a8bb3f492762208a5acf7").exec()
    // let conn = ClearConnection.build(clear, true)
    // conn.attachAuthenticationListener(() => Logger.debug("Connected!"))
    // conn.ready().then(() => {

    //     Logger.info("----------------------------------------------")
    //     Logger.info("Connection ready!")
    //     Logger.info("----------------------------------------------")

    // }).catch(e => Logger.error("ERRO>>>", e))


    // let bee = await BeeModel.findById("5df17adaf0131238f47b795c").populate("userAccount").exec()
    // // console.log("=====0000", bee)
    // let order: Order = await OrderModel.findOne({ orderBrokerId: "ABC" }).exec()
    // // console.log(order)
    // order.executions = []
    // order.status = OrderStatus.NEW
    // order.message = ""
    // order.progress = 0
    // await order.save()

    // let exec1 = {
    //     orderCode: "ABC",
    //     status: OrderStatus.REJECTED,
    //     quantity: 1,
    //     price: 51,
    //     progress: 2,
    //     message: "Message 1"
    // }
    // StockService.addOrderExecution(exec1)
    // ActivityService.beeOrderExecution(exec1, bee)

    // let exec2 = {
    //     orderCode: "ABC",
    //     status: OrderStatus.PARTIAL_FILLED,
    //     quantity: 1,
    //     price: 52,
    //     progress: 0,
    //     message: "Message 2"
    // }
    // StockService.addOrderExecution(exec2)
    // ActivityService.beeOrderExecution(exec2, bee)

    // let exec3 = {
    //     orderCode: "ABC",
    //     status: OrderStatus.PARTIAL_FILLED,
    //     quantity: 1,
    //     price: -52,
    //     progress: 1,
    //     message: "Message 3"
    // }
    // StockService.addOrderExecution(exec3)
    // ActivityService.beeOrderExecution(exec3, bee)

    // let exec4 = {
    //     orderCode: "ABC",
    //     status: OrderStatus.FILLED,
    //     quantity: 1,
    //     price: 53,
    //     progress: 100,
    //     message: "Message 4"
    // }
    // StockService.addOrderExecution(exec4)
    // ActivityService.beeOrderExecution(exec4, bee)

})