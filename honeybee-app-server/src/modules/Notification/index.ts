import { Express } from 'express'
import admin from 'firebase-admin'
import Logger from '../../core/Logger'
import { ModuleEntry } from '../Module'
import firebaseCredentials from './honeybee-app-firebase-adminsdk-9mcrd-c508a87661.json'

const init = async (app: Express) => {
    admin.initializeApp({
        credential: admin.credential.cert(<any>firebaseCredentials),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    })
    Logger.info("Firebase configuration loaded successfully. [file://%s]", process.env.FIREBASE_CREDENTIAL_FILE)
}

const entry: ModuleEntry = {
    init
}

export default entry