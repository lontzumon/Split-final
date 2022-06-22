import { connection, queryPromise } from './sql.js'
import { checkLogin, checkParam } from './fastfail.js';

//user signup 
function signupUser(req, res) {
  const param = {
    mail: req.query.mail,
    name: req.query.mail,
    password: req.query.password
  }
  if(! checkParam(res, param.mail, param.password))
    return;
  let sql  = `INSERT INTO user (username, password, mail) VALUES ("${param.name}", "${param.password}", "${param.mail}")`
  connection.query(sql, err => {
    if(err)
      res.status(500).send(err)
    else
      res.send("Success!")
  })
}
//user signup + login
function signupLogin(req, res) {
  const param = {
    mail: req.query.mail,
    name: req.query.name,
    password: req.query.password
  }
  if(! checkParam(res, param.mail, param.password))
    return;
  let sql = `INSERT INTO user (username, password, mail) VALUES ("${param.name}", "${param.password}", "${param.mail}")`;
  queryPromise(sql).then(none => {
    sql = `SELECT uid FROM user WHERE mail = "${param.mail}"`;
    return queryPromise(sql);
  }).then(result => {
    req.session.uid = result[0].uid;
    res.send("Success!");
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
}
//user login
function loginUser(req, res) {
  const mail = req.query.mail
  const pswd = req.query.password
  if(req.session.uid != null) {
      res.send("Already logged in");
      return;
  }
  if(! checkParam(res, mail, pswd))
    return;
  let sql = `SELECT uid, password FROM user WHERE mail = "${mail}"`;
  queryPromise(sql).then(result => {
    if(result.length == 0)
      res.send("No such user mail");
    else if(result[0].password == pswd) {
      req.session.uid = result[0].uid;
      res.send("Success!");
    }
    else
      res.send("password is wrong");
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
}
//logout user
function logoutUser(req, res) {
  req.session.uid = undefined;
  res.send("Success!");
}
//get username
function getUsername(req, res) {
  const uid = req.session.uid
  if(! checkLogin(res, req.session))
    return;
  let sql = `SELECT username FROM user WHERE uid = "${uid}"`;
  connection.query(sql, (err, results) => {
    if(err) throw err
    res.send(results[0].username)
  })
}
//checkPast
function checkPast(req, res) {
  const mail = req.query.mail
  if(! (checkLogin(res, req.session) && checkParam(res, mail)))
    return;
  let sql = `SELECT uid FROM user WHERE mail = "${mail}"`;
  queryPromise(sql).then(result => {
    if(result[0] != null)
      res.send(true);
    else
      res.send(false);
    console.log("Check Successfully!")
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}

export { signupUser, signupLogin, loginUser, logoutUser, getUsername, checkPast };