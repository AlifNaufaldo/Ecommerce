const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended : true }));
app.use(session({
  secret: 'rahasia kita',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite:true
   }
}))
app.use(require('./routes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})