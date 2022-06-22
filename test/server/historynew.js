import { connection, queryPromise } from './sql.js';
import { checkLogin, checkParam } from './fastfail.js';

// insert history without split (POST)
function addHistory(req, res) {
  const param = {
    uid: req.session.uid,
    name: req.body.name,
    remark: req.body.remark,
    items: req.body.items,//[{name, money}]
    date: req.body.date
  }
  if(! (checkLogin(res, req.session) && checkParam(res, param.name, param.remark, param.items, param.date)))
    return;
  let sql = `SELECT focusWallet from user WHERE uid = ${param.uid}`;
  param.totalmoney = 0;
  param.items.forEach((e) => {param.totalmoney += parseInt(e.money)});
  queryPromise(sql).then(result => {
    param.wid = result[0].focusWallet;
    sql = `INSERT INTO historynew (wid, name, remark, totalmoney, date) VALUES ("${param.wid}", "${param.name}", "${param.remark}", "${param.totalmoney}", "${param.date}")`;
    return queryPromise(sql);
  }).then(none => {
    sql = `SELECT MAX(hid) as hid from historynew`
    return queryPromise(sql);
  }).then(result => {
    param.hid = result[0].hid;
    sql = 'INSERT INTO item (hid, name, money) VALUES ';
    param.items.forEach((e) => {
      sql += `("${param.hid}", "${e.name}", "${e.money}"), `;
    });
    sql = sql.substring(0, sql.length - 2);
    return queryPromise(sql);
  }).then(none => {
    res.send('History is added !');
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
}
// get all unsplitted history
function getHistoryUnsplitted(req, res) {
  const param = {
    uid: req.session.uid
  }
  if(! checkLogin(res, req.session))
    return;
  let ret;
  let sql = `SELECT hid, name, remark, totalmoney, date FROM historynew WHERE wid = (SELECT focusWallet from user WHERE uid = ${param.uid}) AND splitmethod = 0`;
  queryPromise(sql).then(result => {
    ret = result;
    param.promises = [];
    result.forEach((e) => {
      sql = `SELECT name, money FROM item WHERE hid = ${e.hid}`
      param.promises.push(queryPromise(sql).then(result2 => {
        e.item = result2;
      }));
    });
    return Promise.all(param.promises);
  }).then(none => {
    res.send(ret);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
}
// get all history from the given date
function getHistoryDate(req, res) {
  const param = {
    uid: req.session.uid,
    date: req.query.date
  }
  if(! (checkLogin(res, req.session) && checkParam(res, param.date)))
    return;
  let ret;
  let sql = `SELECT hid, name, remark, totalmoney FROM historynew WHERE wid = (SELECT focusWallet from user WHERE uid = ${param.uid}) AND date = "${param.date}"`;
  queryPromise(sql).then(result => {
    ret = result;
    param.promises = [];
    result.forEach((e) => {
      sql = `SELECT name, money FROM item WHERE hid = ${e.hid}`
      param.promises.push(queryPromise(sql).then(result2 => {
        e.item = result2;
      }));
    });
    return Promise.all(param.promises);
  }).then(none => {
    res.send(ret);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
}

export { addHistory, getHistoryUnsplitted, getHistoryDate };