import { connection, queryPromise } from './sql.js'

// insert history
function insertHistory(req, res) {
  const param = {
    uid: req.session.uid,
    time: req.body.time,
    item: req.body.item,//[{name, money}]
    money: req.body.money,
    tag: req.body.tag,
    getter: req.session.uid,
    comment: req.body.comment,
    payer: null
  }
  let sql = `SELECT focusWallet from user WHERE uid = ${param.uid}`
  queryPromise(sql).then(result => {
    param.wid = result[0].focusWallet;
    sql = `INSERT INTO history (wid, time, item, money, tag, comment) 
    VALUES (${param.wid}, "${param.time}", "${param.item}", ${param.money}, "${param.tag}", "${param.comment}")`
    return queryPromise(sql);
  }).then(none => {
    sql = `SELECT MAX(hid) AS hid FROM history`
    return queryPromise(sql);
  }).then(result => {
    param.hid = result[0].hid;
    sql = `SELECT uid from userWallet where wid=(SELECT focusWallet as wallet FROM user WHERE uid=${param.uid}) ORDER BY uid`
    return queryPromise(sql);
  }).then(result => {
    param.alluser = result; 
    param.promises = new Array(result.length);
    for(let i=0; i<result.length; i++) {//parallel
      if(param.uid == result[i].uid) {
        const ratio = 1-1/(result.length*1.0);
        sql = `INSERT INTO userHistory (hid, uid, ratio) VALUES (${param.hid}, ${result[i].uid}, ${ratio})`
        param.promises[i] = queryPromise(sql);
      }
      else {
        const ratio = 1/(result.length*1.0);
        sql = `INSERT INTO userHistory (hid, uid, ratio) VALUES (${param.hid}, ${result[i].uid}, ${ratio})`
        param.promises[i] = queryPromise(sql);
      }
    }
    return Promise.all(param.promises);
  }).then(none => {
    res.send("History is added !");
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
}
// get all item & money if unchecked
function getHistoryUnchecked(req, res) {
  const param = {
    uid: req.session.uid
  }
  let sql = `SELECT focusWallet FROM user WHERE uid=${param.uid}`
  queryPromise(sql).then(result => {
    param.wid = result[0].focusWallet;
    sql = `SELECT hid, item, money FROM history WHERE (wid=${param.wid} AND checked=0) ORDER BY hid`
    return queryPromise(sql);
  }).then(result => {
    const ret = {
      date: param.date,
      data: result
    }
    res.send(JSON.stringify(ret));
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}
// get all item & money from the given date
function getHistoryDate(req, res) {
  const param = {
    uid: req.session.uid,
    date: req.body.date
  }
  let sql = `SELECT focusWallet FROM user WHERE uid=${param.uid}`
  queryPromise(sql).then(result => {
    param.wid = result[0].focusWallet;
    sql = `SELECT hid, item, money FROM history WHERE (wid=${param.wid} AND time="${param.date}")`
    return queryPromise(sql);
  }).then(result => {
    const ret = {
      date: param.date,
      data: result
    }
    res.send(JSON.stringify(ret));
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}
// get total money of each member from the given hostory
function splitMoney(req, res) {
  const param = {
    uid: req.session.uid,
    hid: req.body.hid
  }
  const ret = { date: param.date }
  let sql = `SELECT focusWallet FROM user WHERE uid=${param.uid}`
  queryPromise(sql).then(result => {
    param.wid = result[0].focusWallet;
    sql = `SELECT sub3.uid, sub3.nickname, sub.totalmoney FROM ((SELECT uid, nickname FROM userWallet WHERE wid=${param.wid}) AS sub3) INNER JOIN ((SELECT userHistory.uid, SUM(userHistory.ratio*sub2.money) AS totalmoney from userHistory INNER JOIN ((SELECT hid, money from history WHERE wid=${param.wid} AND hid IN (${param.hid.toString()})) AS sub2) ON userHistory.hid=sub2.hid GROUP BY userHistory.uid) AS sub) ON sub3.uid=sub.uid ORDER BY sub3.uid`
    return queryPromise(sql);
  }).then(result => {
    ret.data = result;
    res.send(JSON.stringify(ret));
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}
// get total money of each member from the given date
function splitMoneyDate(req, res) {
  const param = {
    uid: req.session.uid,
    date: req.body.date
  }
  const ret = { date: param.date }
  let sql = `SELECT focusWallet FROM user WHERE uid=${param.uid}`
  queryPromise(sql).then(result => {
    param.wid = result[0].focusWallet;
    sql = `SELECT sub3.uid, sub3.nickname, sub.totalmoney FROM ((SELECT uid, nickname FROM userWallet WHERE wid=${param.wid}) AS sub3) INNER JOIN ((SELECT userHistory.uid, SUM(userHistory.ratio*sub2.money) AS totalmoney from userHistory INNER JOIN ((SELECT hid, money from history WHERE (wid=${param.wid} AND time="${param.date}")) AS sub2) ON userHistory.hid=sub2.hid GROUP BY userHistory.uid) AS sub) ON sub3.uid=sub.uid ORDER BY sub3.uid `
    return queryPromise(sql);
  }).then(result => {
    ret.data = result;
    res.send(JSON.stringify(ret));
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}
//confirm split
function confirmSplit(req, res) {
  const param = {
    uid: req.session.uid,
    hid: req.body.hid
  }
  let sql = `SELECT focusWallet FROM user WHERE uid=${param.uid}`
  queryPromise(sql).then(result => {
    param.wid = result[0].focusWallet;
    sql = `SELECT userHistory.uid, SUM(userHistory.ratio*sub2.money) AS totalmoney from userHistory INNER JOIN ((SELECT hid, money from history WHERE wid=${param.wid} AND hid IN (${param.hid.toString()})) AS sub2) ON userHistory.hid=sub2.hid GROUP BY uid ORDER BY uid`
    return queryPromise(sql);
  }).then(result => {
    param.promises = new Array(result.length+1);
    for(let i=1; i<result.length; i++) {
      const uid = result[i].uid, totalmoney = result[i].totalmoney*-1
      sql = `UPDATE userWallet SET balance=(SELECT balance FROM (SELECT * FROM userWallet) AS sub WHERE uid=${uid} AND WID=${param.wid} LIMIT 1)+${totalmoney} WHERE uid=${uid} AND wid=${param.wid}`
      param.promises[i] = queryPromise(sql);
    }
    sql = `UPDATE history SET checked=1 WHERE hid IN (${param.hid.toString()})`
    param.promises[result.length] = queryPromise(sql);
    return Promise.all(param.promises);
  }).then(none => {
    res.send("Success")
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}

export { insertHistory, getHistoryUnchecked, getHistoryDate, splitMoney, splitMoneyDate, confirmSplit };