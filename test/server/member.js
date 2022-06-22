import { connection, queryPromise } from './sql.js';
import { checkLogin, checkParam } from './fastfail.js';

// set nickname
function setNickname(req, res) {
  let uid = req.session.uid, wid;
  let nick  = req.query.nickname;
  if(! (checkLogin(res, req.session) && checkParam(res, nick)))
    return;
  let sql = `SELECT focusWallet FROM user WHERE uid=${uid}`;
  connection.query(sql, (err, results) => {
    if(err) throw err
    wid = results[0].focusWallet
    sql = `UPDATE userWallet SET nickname='${nick}' WHERE uid=${uid} AND wid=${wid}`
    connection.query(sql, err => {
      if(err) throw err
      res.send("Nickname is updated!")
    })
  })
}
// get nickname
function getNickname(req, res) {
  let uid = req.session.uid;
  if(! checkLogin(res, req.session))
    return;
  let sql = `SELECT nickname FROM userWallet where uid = ${uid} AND wid = (SELECT focusWallet FROM user WHERE uid=${uid})`
  queryPromise(sql).then(result => {
    res.send(result[0].nickname);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
}
// get all member from wallet
function getMember(req, res) {
  let uid = req.session.uid;
  if(! checkLogin(res, req.session))
    return;
  let sql = `SELECT username FROM user WHERE uid IN (SELECT uid FROM userWallet WHERE wid = (SELECT focusWallet from user WHERE uid = ${uid}))`
  connection.query(sql, (err, results) => {
    if(err) throw err
    res.send(results)
  });
}
// get all member's nickname from wallet
function getMemberNickname(req, res) {
  let uid = req.session.uid;
  if(! checkLogin(res, req.session))
    return;
  let sql = `SELECT nickname FROM userWallet WHERE wid = (SELECT focusWallet from user WHERE uid = ${uid})`
  queryPromise(sql).then(result => {
    let ret = result.map(e => e.nickname);
    res.send(ret);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
}

export { setNickname, getNickname, getMember, getMemberNickname };