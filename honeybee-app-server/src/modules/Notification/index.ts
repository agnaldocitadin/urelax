import { Express } from 'express'
import admin from 'firebase-admin'
import { Logger } from '../../core/Logger'

const init = (app: Express) => {
    let firebaseCredentials = `./src/modules/Notification/${process.env.FIREBASE_CREDENTIAL_FILE}`
    let configuration = {
        credential: admin.credential.cert(firebaseCredentials),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    }
    admin.initializeApp(configuration)
    Logger.info("Firebase configuration loaded successfully. [file:%s]", process.env.FIREBASE_CREDENTIAL_FILE)
}

export default {
    init
}