#!/usr/bin/env node
import express from 'express'
import expressWs from 'express-ws'
import sessions from 'express-session'
import cookieParser from 'cookie-parser'
import file from 'session-file-store'
import bodyParser from 'body-parser'
//sql
import { connection, queryPromise } from './sql.js'
// routers
import { signupUser, signupLogin, loginUser, logoutUser, getUsername, checkPast } from './user.js';
import { addWallet, removeWallet, joinWallet, leaveWallet, getWalletName, getWalletCode, getAllWallet, switchWallet } from './wallet.js'
import { setNickname, getNickname, getMember, getMemberNickname } from './member.js'
import { addHistory, getHistoryUnsplitted, getHistoryDate } from './historynew.js'
import { splitMoney, addZero } from './splitmoney.js';
import { addNotificationFromRequest, getNotification, wsNotification } from './notification.js'
import { setCard, getCard, getCardPicture, getUnlockStatus } from './card.js';
// directory
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __rootname = dirname(dirname(fileURLToPath(import.meta.url)))
// construct a web server instance
const app  = express()
expressWs(app);
const port = 5554
// set the cookie parser
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// session
var FileStore = file(sessions)
app.use(sessions({
  secret: 'beibei',
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 30 },
  store: new FileStore({
    path: "./sessions",
    reapInterval: 180,//s
  }),
  resave: true,
}))
// start the server
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})
// handle other urls
app.use(express.static(`${__rootname}/client`))
/***********user************/
// user signup
app.get('/signupUser', signupUser)
// user signup + login
app.get('/signupLogin', signupLogin)
// user login
app.get('/loginUser', loginUser)
// user logout
app.get('/logoutUser', logoutUser)
// show username
app.get('/showUsername', getUsername)
// check repeat registration
app.get('/checkPast', checkPast)
/***********wallet************/
// insert user wallet with code added
app.get('/insertWallet', addWallet)
// delete user wallet (unimplemented)
app.get('/deleteWallet', removeWallet)
// join wallet
app.get('/joinWallet', joinWallet)
// leave wallet (unimplemented)
app.get('/leaveWallet', leaveWallet)
// show wallet name
app.get('/showWalletName', getWalletName)
// show wallet invite code
app.get('/showWalletCode', getWalletCode)
// show all wallet, switch focuswallet into null
app.get('/showAllWallet', getAllWallet)
// switch wallet
app.get('/switchWallet', switchWallet)
/***********member************/
// set nickname
app.get('/setNickname', setNickname)
// get nickname
app.get('/getNickname', getNickname)
// get all member from wallet (deprecated)
app.get('/getMember', getMember)
// get all member's nickname from wallet
app.get('/getMemberNickname', getMemberNickname)
/***********history************/
// insert history without split
app.post('/insertHistory', addHistory)
// get all unsplitted history
app.get('/getHistoryUnsplitted', getHistoryUnsplitted)
// get all history from the given date
app.get('/getHistoryDate', getHistoryDate)
/***********splitmoney************/
// split money with method given(POST)
app.post('/splitMoney', splitMoney)
// add remains onto specific user
app.post('/addZero', addZero)
/***********notification************/
// add Notification
app.get('/addNotification', addNotificationFromRequest)
// get Notification
app.get('/getNotification', getNotification)
// establish ws notification channel
app.ws('/wsNotification', wsNotification)
/***********card************/
// set card
app.get('/setCard', setCard)
// get card
app.get('/getCard', getCard)
// get card picture
app.get('/getCardPicture', getCardPicture)
// get each card unlocked status
app.get('/getUnlocked', getUnlockStatus)