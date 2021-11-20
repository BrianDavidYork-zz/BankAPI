const express = require( "express" )
const app = express()
const bp = require('body-parser');
const controller = require('./controller');
const port = 8080

app.listen(port, () => {
  console.log('Server running on port ' + String(port))
});

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }))

// ROUTES
app.post('/api/account', controller.createAccount)
app.put('/api/transfer/:acctIdFrom/:acctIdTo', controller.transferMoney)
app.get('/api/transfer:acctId', controller.viewTransfers)
app.get('/api/account', controller.viewBalance)

module.exports = app
