

// check if logined, true if login
function checkLogin(res, session) {
  if(session.uid != null)
    return true;
  res.status(401).send("session expired, please relogin");
  return false;
}

// check if all every elements are defined, true if defined
function checkParam(res, ...args) {
  let alldefined = true;
  args.forEach(e => {
    if(e == null)
      alldefined = false;
  });
  if(alldefined)
    return true;
  res.status(400).send("incorrect request arguements");
  return false;
}

export { checkLogin, checkParam };