import EventEmitter from 'events';
import { connection, queryPromise } from './sql.js';
import { checkLogin, checkParam } from './fastfail.js';

//event emitter for push notification
class NotificationEmitter extends EventEmitter {}
const notificationEmitter = new NotificationEmitter();
//map user to ws(not exported)
const user_ws_map = new Map();

//add Notification from request
function addNotificationFromRequest(req, res) {
  const param = {
    uid: req.session.uid,
    time: req.query.time
  };
  if(! (checkLogin(res, req.session) && checkParam(res, param.time)))
    return;
  let sql = `SELECT username, focusWallet FROM user WHERE uid = ${param.uid}`
  queryPromise(sql).then(result => {
    param.wid = result[0].focusWallet;
    param.message = `${result[0].username}新增了一筆項目`
    sql = `INSERT INTO notification (wid, message, time) VALUES (${param.wid}, "${param.message}", "${param.time}")`
    return queryPromise(sql)
  }).then(none => {
    return wsPushNotification(param.uid);
  }).then(none => {
    res.send("notification inserted successfully");
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}
//get Notification
function getNotification(req, res) {
  const param = {
    uid: req.session.uid
  };
  if(! checkLogin(res, req.session))
    return;
  let sql = `SELECT message FROM notification WHERE wid = (SELECT focusWallet FROM user WHERE uid = ${param.uid}) ORDER BY nid DESC`;
  queryPromise(sql).then(result => {
    res.send(result);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}

//establish ws notification channel
function wsNotification(ws, req) {
  const uid = req.session.uid;
  //for pushing
  if(user_ws_map.has(uid)) {
    ws.send("only one device can get ws per user, old one closed");
    user_ws_map.get(uid).close();
  }
  user_ws_map.set(uid, ws);
  ws.on('close', function() {
    const uid = req.session.uid;
    if(uid != null) {//might session expire
      user_ws_map.delete(uid);
    }
  });
}
//wrapped function for emitting notification signal
function emitNotification(uid, wid) {
  if(user_ws_map.has(uid)) {//if connected to ws
    notificationEmitter.emit('push', user_ws_map.get(uid), uid, wid);
  }
}
//notify pull notification for all user in the same wallet(not exported)
function wsPushNotification(uid) {
  let sql = `SELECT uid, wid FROM userWallet WHERE wid = (SELECT focusWallet from user WHERE uid = ${uid})`;
  return queryPromise(sql).then(result => {
      result.foreach(e => {
        if(user_ws_map.has(e.uid)) {
          emitNotification(e.uid, e.wid);
        }
      })
  });//not catching error
}
notificationEmitter.on('push', wsPullNotification);
//get notification via ws only if focus wallet, triggered when push or login
function wsPullNotification(ws, uid, wid) {
  let message = null;
  let errcode = 0;
  let sql = `SELECT focusWallet from user WHERE uid = ${uid}`;
  queryPromise(sql).then(result => {
    if(result[0].focusWallet != wid) {
      errcode = 1;
      throw new Error();
    }
    sql = `SELECT latestnid FROM userWallet WHERE uid = ${uid} AND wid = ${wid}`;
    return queryPromise(sql);
  }).then(result => {
    if(result[0].latestnid == null) {//get all
      sql = `SELECT message FROM notification WHERE wid = ${wid}`;
      return queryPromise(sql);
    }
    else {
      sql = `SELECT message FROM notification WHERE wid = ${wid} AND nid > ${result}`;
      return queryPromise(sql);
    }
  }).then(result => {
    message = result;
    sql = `UPDATE userWallet SET latestnid = (SELECT MAX(nid) FROM notification WHERE wid = ${wid}) WHERE uid = ${uid} AND wid = ${wid}`;
    return queryPromise(sql);
  }).then(none => {
    if(message.length > 0) {
      ws.send(JSON.stringify(message));
    }
  }).catch(err => {
    if(errcode != 1) {
      throw err;
    }
  });//rethrow error
}


export { addNotificationFromRequest, getNotification, wsNotification, emitNotification };