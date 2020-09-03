import { Express } from 'express'
import Activity from './Activity'
import Broker from './Broker'
import Database from './Database'
import Financial from './Financial'
import Identity from './Identity'
import { ModuleExport } from './Module'
import Notification from './Notification'
import Order from './Order'
import Security from './Security'
import auth from './Security/auth'
import Stock from './Stock'

export default {
    prepare: async (app: Express) => auth.applySecurity(app),
    modules: {
        Security, 
        Activity, 
        Broker, 
        Financial, 
        Identity, 
        Notification, 
        Order, 
        Stock, 
        Database
    }
} as ModuleExport