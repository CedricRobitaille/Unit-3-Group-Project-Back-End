const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const morgan = require("morgan");

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

app.use(morgan("dev"));
app.use(express.json());

//interact with transaction data (owned stocks)
const transactionsCtrl = require('./controllers/transactions');
app.get('/transactions', transactionsCtrl.index);
app.post('/transactions', transactionsCtrl.create);
app.get('/transactions/:transactionId', transactionsCtrl.show);
app.put('/transactions/:transactionId', transactionsCtrl.update);
app.delete('/transactions/:transactionId', transactionsCtrl.deleteTransaction);

//interact with targets data (watchlist)
const targetsCtrl = require('./controllers/targets');
app.get('/targets', targetsCtrl.index);
app.post('/targets', targetsCtrl.create);
app.get('/targets/:targetId', targetsCtrl.show);
app.put('/targets/:targetId', targetsCtrl.update);
app.delete('/targets/:targetId', targetsCtrl.deleteTarget);

//interact with user data
const usersCtrl = require('./controllers/users');
app.get('/users', usersCtrl.index);
app.post('/users', usersCtrl.create);
app.get('/users/:userId', usersCtrl.show);
app.put('/users/:userId', usersCtrl.update);
app.delete('/users/:userId', usersCtrl.deleteUser);


//pull dailies data
const dailiesCtrl = require('./controllers/dailies');
app.get('/dailies/:ticker', dailiesCtrl.index);

//pull patents data
const patentsCtrl = require('./controllers/patents');
app.get('/patents/:ticker', patentsCtrl.index);

//pull patents data
const visasCtrl = require('./controllers/visas');
app.get('/visas/:ticker', visasCtrl.index);

//pull patents data
const lobbiesCtrl = require('./controllers/lobbies');
app.get('/lobbies/:ticker', lobbiesCtrl.index);


app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});