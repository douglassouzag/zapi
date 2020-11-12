const express = require('express')
const routes = express.Router()

const CheckConn = require('./middleware/CheckConn')
const CheckPage = require('./middleware/CheckPage')
const BrowserController = require('./controllers/BrowserController')
const ChatController = require('./controllers/ChatController')
const AuthController = require('./controllers/AuthController')

routes.get('/qrcode',CheckConn,CheckPage.isAuthPage,AuthController.getQRCODE)

routes.get('/close',CheckConn,CheckPage.isConnected,BrowserController.close)
routes.get('/screenshot',CheckConn,CheckPage.isConnected,BrowserController.screenshot)
routes.get('/status',CheckConn,CheckPage.isConnected,BrowserController.status)

routes.get('/messages',CheckConn,CheckPage.isConnected,ChatController.getMessages)
routes.post('/messages',CheckConn,CheckPage.isConnected,ChatController.sendMessage)


// routes.post('/auth',AuthController.auth)
// routes.get('/auth',AuthController.getQRCODE)


// routes.put('/users',VerificarToken,UserController.update)
// routes.delete('/users',VerificarToken,UserController.delete)
// //Areas
// routes.get('/areas',VerificarToken,AreaController.index)
// routes.get('/bigareas', AreaController.getBigAreas)
// routes.post('/areas',VerificarToken,AreaController.create)
// routes.delete('/areas/:id',VerificarToken,AreaController.delete)
// //images
// routes.get('/images',VerificarToken,ImageController.index)
// routes.get('/images-processed',VerificarToken,ImageController.indexProcessed)
// routes.post('/images',VerificarToken,ImageController.create)
// routes.post('/download',VerificarToken,ImageController.download)
// routes.post('/process',VerificarToken,ImageController.process)
// routes.post('/thumbnail',VerificarToken,ImageController.thumbnail)
// //Autenticacao
// routes.post('/authenticate',UserController.authenticate) //Rota desprotegida para autenticação

module.exports = routes