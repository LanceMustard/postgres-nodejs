let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let pg = require('pg')

const PORT = 3000

let pool = new pg.Pool({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: 'lithium',
  database: 'sandpit',
  max: 10  
})

pool.connect((err, db, done) => {
  if (err) {
    console.log('DB Connection Error', err)
  } else {
    db.query('SELECT * From public.users', (err, table) => {
      if (err) {
        console.log('Query Error', err)
      } else {
        console.log(table)
      }
    })
  }
})

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(morgan('dev'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-COntrol-Allow-Headers', 'Origin, X-Requested-With, Context-Type, Accept')
  next()
})


app.listen(PORT, () => console.log('Listening on port ' + PORT))