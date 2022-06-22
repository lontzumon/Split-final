import mysql from 'mysql'

const config = {
  'mysql': {
    'database': 'wp2022_group8',
    'host': 'localhost',
    'password': 'G2FxUI4XqP1TwkerEkHvzmpUIPWrOrkoBFqyNINMlbE=',
    'user': 'wp2022_group8'
  }
}
const connection = mysql.createConnection(config.mysql)
connection.connect(err => {
  if(err) throw err
  console.log("MYSQL Connected")
})
const queryPromise = sql => {
  return new Promise((res, rej) => {
    connection.query(sql, (err, rows) => {
      if(err) rej(err);
      else res(rows)
    })
  })
}

export { connection, queryPromise };