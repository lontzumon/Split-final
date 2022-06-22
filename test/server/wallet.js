import crypto from 'crypto';
import { connection, queryPromise } from './sql.js';
import { checkLogin, checkParam } from './fastfail.js';
import { createCardset } from './card.js';
import { emitNotification } from './notification.js';


//insert user wallet
function addWallet(req, res) {
  const param = {
    uid: req.session.uid,
    wname: req.query.wallet
  };
  if(! (checkLogin(res, req.session) && checkParam(res, param.wname)))
    return;
  let sql = `SELECT MAX(wid) as wid FROM wallet`
  queryPromise(sql).then(result => {
    param.wid = result[0].wid + 1;
    param.code = crypto.createHash("sha256").update(param.wname + "//" + param.wid, "utf8").digest("hex").substring(1,8);
    sql = `INSERT INTO wallet (wname, code) VALUES ("${param.wname}", "${param.code}")`
    return queryPromise(sql);
  }).then(none => {
    sql = `INSERT INTO userWallet (uid, wid, nickname)
      VALUES(${param.uid}, ${param.wid}, (SELECT username FROM user WHERE uid=${param.uid}))`
    return queryPromise(sql);
  }).then(none => {
    return createCardset(param.uid, param.wid);
  }).then(none => {
    res.send("Success");
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}
//delete user wallet (unimplemented)
function removeWallet(req, res) {
  res.status(501).send("cannot delete wallet");
}
// join wallet
function joinWallet(req, res) {
  const param = {
    code: req.query.idcode,
    uid: req.session.uid,
    errcode: 0
  };
  if(! (checkLogin(res, req.session) && checkParam(res, param.code)))
    return;
  // should use the wallet code 
  let sql = `SELECT wid FROM wallet WHERE code = "${param.code}"`;
  queryPromise(sql).then(result => {
    if(result.length > 0) {
      param.wid = result[0].wid;
      return;
    }
    else {
      param.errcode = 1;
      throw new Error("code not found");
    }
  }).then(none => {
    sql = `INSERT INTO userWallet (uid, wid, nickname) VALUES (${param.uid}, ${param.wid}, (SELECT username FROM user WHERE uid = ${param.uid}))`;
    return queryPromise(sql);
  }).then(none => {
    return createCardset(param.uid, param.wid);
  }).then(none => {
    console.log(`userWallet created`);
    res.send(`userWallet created`);
  }).catch(err => {
    if(param.errcode == 1) {
      req.status(200).send("code not found");
    }
    else {
      console.log(err);
      res.status(500).send(err);
    }
  });
}
// leave wallet (unimplemented)
function leaveWallet(req, res) {
  res.status(501).send("cannot leave wallet");
}
// get wallet name
function getWalletName(req, res) {
  const uid = req.session.uid;
  if(! checkLogin(res, req.session))
    return;
  let sql = `SELECT wname FROM wallet WHERE wid = (SELECT focusWallet FROM user WHERE uid = "${uid}")`;
  connection.query(sql, (err, results) => {
    if(err) throw err
    res.send(results[0].wname)
  })
}
// get wallet invite code
function getWalletCode(req, res) {
  const uid = req.session.uid;
  if(! checkLogin(res, req.session))
    return;
  let sql = `SELECT code FROM wallet WHERE wid = (SELECT focusWallet FROM user WHERE uid = "${uid}")`;
  connection.query(sql, (err, results) => {
    if(err) throw err
    res.send(results[0].code)
  })
}
//show all wallet, switch focuswallet into null
function getAllWallet(req, res) {
  const uid = req.session.uid
  let sql = `UPDATE user SET focusWallet = NULL WHERE uid=${uid}`;
  if(! checkLogin(res, req.session))
    return;
  queryPromise(sql).then(none => {
    sql = `SELECT wid, wname FROM wallet WHERE wid IN (SELECT wid FROM userWallet WHERE uid = ${uid})`
    return queryPromise(sql);
  }).then(result => {
    res.send(result);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}
//switch wallet
function switchWallet(req, res) {
  const param = {
    uid: req.session.uid,
    wid: req.query.wallet
  }
  if(! (checkLogin(res, req.session) && checkParam(res, param.wid)))
    return;
  let sql = `UPDATE user SET focusWallet=${param.wid} WHERE uid=${param.uid}`
  queryPromise(sql).then(none => {
    emitNotification(param.uid, param.wid);
    res.send("Success");
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}


export { addWallet, removeWallet, joinWallet, leaveWallet, getWalletName, getWalletCode, getAllWallet, switchWallet};