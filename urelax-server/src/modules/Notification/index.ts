import { Express } from 'express'
import admin from 'firebase-admin'
import Logger from '../../core/Logger'
import { ModuleEntry } from '../Module'
import firebaseCredentials from './push/urelax-5abcb-firebase-adminsdk-oezxo-f31915072b.json'

const init = async (app: Express) => {
    admin.initializeApp({
        credential: admin.credential.cert(<any>firebaseCredentials),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    })
    Logger.info("Firebase configuration {")
    Logger.info('\t"client_email":', firebaseCredentials.client_email)
    Logger.info('\t"client_id":', firebaseCredentials.client_id)
    Logger.info('\t"auth_uri":', firebaseCredentials.auth_uri)
    Logger.info('\t"token_uri":', firebaseCredentials.token_uri)
    Logger.info('\t"auth_provider_x509_cert_url":', firebaseCredentials.auth_provider_x509_cert_url)
    Logger.info('\t"client_x509_cert_url":', firebaseCredentials.client_x509_cert_url)
    Logger.info("} loaded.")
}

const entry: ModuleEntry = {
    init
}

export default entry