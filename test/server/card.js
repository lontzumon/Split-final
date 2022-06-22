import { connection, queryPromise } from './sql.js';
import { checkLogin, checkParam } from './fastfail.js';

const normalCardCount = 27;
const specialCardCount = 27;

//create cardset(in addwallet and joinwallet) returns promise
function createCardset(uid, wid) {
  let sql = `SELECT cardset FROM userWallet WHERE uid=${uid} AND wid=${wid}`;
  queryPromise(sql).then(result => {
    const cardset = result[0].cardset;
    sql = 'INSERT INTO card (cid, cardset) VALUES '
    for(let i=1; i<=normalCardCount; i++) {
      sql += `(${i}, ${cardset}), `;
    }
    for(let i=10001; i<=10000+specialCardCount; i++) {
      sql += `(${i}, ${cardset}), `;
    }
    sql = sql.substring(0, sql.length - 2);
    return queryPromise(sql);
  }).catch(err => {
    console.log(err);
    throw err;
  });
  return Promise.resolve();
}
//set card
function setCard(req, res) {
  const param = {
    uid: req.session.uid,
    cid: req.query.cardid,
    special: req.query.special,
    unlocked: req.query.unlocked,
    star: req.query.star,
    picture: req.query.picture,
    description: req.query.description,
    talk: req.query.talk,
  }
  if(! (checkLogin(res, req.session) && checkParam(res, param.cid, param.special)))
    return;
  param.cid = parseInt(param.cid);
  param.special = parseInt(param.special);
  param.cid = param.special ? (param.cid + 10000) : param.cid;
  let updatelist = ['unlocked', 'star', 'picture', 'description', 'talk'];
  let updated = '';
  function chooseupdate(key) {
    if(param[key] !== undefined) {
      updated += `"${key}" = "${param[key]}", `
    }
  }
  updatelist.forEach(chooseupdate);
  updated = updated.substring(0, updated.length - 2);
  let sql = `UPDATE card SET ${updated} WHERE cardset IN (SELECT cardset FROM userWallet WHERE uid = "${param.uid}" AND wid = (SELECT focusWallet FROM user WHERE uid = "${param.uid}")) AND cid = "${param.cid}"`
  queryPromise(sql).then(none => {
      res.send('Success');
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}
//get card
function getCard(req, res) {
  const param = {
    uid: req.session.uid,
    cid: req.query.cardid,
    special: req.query.special
  }
  if(! (checkLogin(res, req.session) && checkParam(res, param.cid, param.special)))
    return;
  param.cid = parseInt(param.cid);
  param.special = parseInt(param.special);
  param.cid = param.special ? (param.cid + 10000) : param.cid;
  let sql = `SELECT unlocked, star, description, talk FROM card WHERE cardset IN (SELECT cardset FROM userWallet WHERE uid = "${param.uid}" AND wid = (SELECT focusWallet FROM user WHERE uid = "${param.uid}")) AND cid = "${param.cid}"`
  queryPromise(sql).then(result => {
      res.send(result[0]);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}
//get card picture
function getCardPicture(req, res) {
  const param = {
    uid: req.session.uid,
    cid: parseInt(req.query.cardid),
    special: parseInt(req.query.special)
  }
  param.cid = param.special ? (param.cid + 10000) : param.cid;
  let sql = `SELECT picture FROM card WHERE cardset IN (SELECT cardset FROM userWallet WHERE uid = "${param.uid}" AND wid = (SELECT focusWallet FROM user WHERE uid = "${param.uid}")) AND cid = "${param.cid}"`
  queryPromise(sql).then(result => {
    res.send(result[0].picture);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}
//get each card unlocked status 
function getUnlockStatus(req, res) {
  const param = {
    uid: req.session.uid,
    normal: new Array(normalCardCount),
    special: new Array(specialCardCount)
  }
  let sql = `SELECT cid, unlocked FROM card WHERE cardset IN (SELECT cardset FROM userWallet WHERE uid = "${param.uid}" AND wid = (SELECT focusWallet FROM user WHERE uid = "${param.uid}"))`;
  queryPromise(sql).then(result => {
    result.forEach(e => {
      if(e.cid >= 10000) {
        param.special[e.cid-10001] = e.unlocked;
      }
      else {
        param.normal[e.cid-1] = e.unlocked;
      }
    });
  }).then(none => {
    res.send({
      normal: param.normal,
      special: param.special
    });
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}

export { createCardset, setCard, getCard, getCardPicture, getUnlockStatus };