const express = require('express')
const routes = express.Router()

const CheckConn = require('./middleware/CheckConn')
const CheckPage = require('./middleware/CheckPage')
const BrowserController = require('./controllers/BrowserController')
const ChatController = require('./controllers/ChatController')
const AuthController = require('./controllers/AuthController')

routes.get('/qrcode',CheckConn,CheckPage.isAuthPage,AuthController.getQRCODE)

routes.get('/close',CheckConn,BrowserController.close)
routes.get('/kill',CheckConn,BrowserController.kill)
routes.get('/start',BrowserController.start)
routes.get('/screenshot',CheckConn,BrowserController.screenshot)
routes.get('/status',CheckConn,CheckPage.isConnected,BrowserController.status)

routes.get('/messages',CheckConn,CheckPage.isConnected,ChatController.getMessages)
routes.post('/messages',CheckConn,CheckPage.isConnected,ChatController.sendMessage)
routes.get('/watch',CheckConn,CheckPage.isConnected,ChatController.watchForNewMessages)
routes.get('/stop',CheckConn,CheckPage.isConnected,ChatController.stopWatchingForNewMessages)

module.exports = routes