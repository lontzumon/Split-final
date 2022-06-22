import { connection, queryPromise } from './sql.js';
import { checkLogin, checkParam } from './fastfail.js';

// split money with method given(POST)
function splitMoney(req, res) {
  const param = {
    uid: req.session.uid,
    hid: req.body.hid,
    inputmethod: req.body.method,//1=even, 2=ratio, 3=fixed, 4=additional
    payer: req.body.payer,//[{uid, value}], value=paid
    splitter: req.body.splitter,//[{uid, value}], 1:empty, 2:thousand, 34:value
    errcode: 0
  }
  if(! (checkLogin(res, req.session) && checkParam(res, param.hid, param.inputmethod, param.payer, param.splitter)))
    return;
  if(!(param.inputmethod >= 1 && param.inputmethod <= 4)) {
    res.status(400).send("invalid split method");
    return;
  }
  param.method = (param.inputmethod >= 3) ? 13+parseInt(param.inputmethod) : parseInt(param.inputmethod);
  let sql = `SELECT totalmoney FROM historynew WHERE hid = ${param.hid}`;
  queryPromise(sql).then(result => {
    param.totalmoney = result[0].totalmoney;
    if((param.method & 16) == 16)
      param.splitter.forEach((e) => {e.fixed = e.value});
    if((param.method & 2) == 2)
      param.splitter.forEach((e) => {e.ratio = e.value});
    calcUserTotal(param);
    sql = 'INSERT INTO historysplitter (hid, uid, ratioval, fixedval, total) VALUES ';
    param.splitter.forEach((e) => {
      sql += `(${param.hid}, ${e.uid}, ${e.ratio}, ${e.fixed}, ${e.total}),  `
    });
    sql = sql.substring(0, sql.length - 2);
    return queryPromise(sql);
  }).then(none => {
    sql = 'INSERT INTO historypayer (hid, uid, payed) VALUES ';
    param.payer.forEach((e) => {
      sql += `(${param.hid}, ${e.uid}, ${e.value}),  `
    });
    sql = sql.substring(0, sql.length - 2);
    return queryPromise(sql);
  }).then(none => {
    sql = 'UPDATE historynew SET splitmethod = ${param.method}, zero = ${param.zero}';
    return queryPromise(sql);
  }).then(none => {
    res.send("money splitted!");
  }).catch(err => {
    if(param.errcode == 2) {
      res.status(500).send("negative remaining money");
    }
    else {
      console.log(err);
      res.status(500).send(err);
    }
  });
}
// add zero onto specific user
function addZero(req, res) {
  const param = {
    uid: req.query.uid,
    hid: req.query.hid,
    errcode: 0
  }
  if(! (checkLogin(res, req.session) && checkParam(res, param.uid, param.hid)))
    return;
  let sql = `SELECT zero, wid FROM historynew WHERE hid = ${param.hid}`;
  queryPromise(sql).then(result => {
    param.zero = result[0].zero;
    param.wid = result[0].wid;
    sql = `SELECT zero, total FROM historysplitter WHERE uid = ${param.uid} AND hid = ${param.hid}`
    return queryPromise(sql);
  }).then(result => {
    if(result[0].zero != 0) {
      param.errcode = 1;
      throw new Error("zero already added");
    }
    sql = 'UPDATE historysplitter SET zero = ${param.zero}, total = ${result[0].total} + ${param.zero} WHERE uid = ${param.uid} AND hid = ${param.hid}';
    return queryPromise(sql);
  }).then(none => {
    res.send("zero added!");
  }).catch(err => {
    if(param.errcode == 1) {
      res.status(200).send("zero has already been added");
    }
    else {
      console.log(err);
      res.status(500).send(err);
    }
  })
}
//subfunction of splitMoney
function calcUserTotal(param) {
  let minused = param.totalmoney;
  if(param.method & 16 == 16) {
    param.splitter.forEach((e) => {
      e.total = e.fixed;
      minused -= e.total;
    });
  }
  if(param.method & 1 == 1) {
    let even = parseInt(minused/param.splitter.length);
    param.splitter.forEach((e) => {
      e.total += even;
    });
    param.zero = minused - even*param.splitter.length;
  }
  else if(param.method & 2 == 2) {
    param.zero = param.totalmoney;
    param.splitter.forEach((e) => {
      e.total += parseInt(minused*e.ratio/1000);
      param.zero -= e.total;
    });
  }
  if(param.zero < 0) {
    param.errcode = 2;
    throw new Error("negative remaining money");
  }
}

export { splitMoney, addZero };