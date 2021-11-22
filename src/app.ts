const express = require( "express" )
const app = express()
const bp = require('body-parser')
const controller = require('./controller')
const port = 8080

app.listen(port, () => {
  console.log('Server running on port ' + port)
})

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }))

// ROUTES
app.get('/', controller.home)
app.post('/api/account', controller.createAccount)
app.get('/api/account/:acctId', controller.viewBalance)
app.put('/api/transfer/:acctIdFrom/:acctIdTo/:amount', controller.transferMoney)
app.get('/api/transfer/:acctId', controller.viewTransfers)

module.exports = app
