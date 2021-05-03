const express = require('express');
const urlencoded = require('body-parser').urlencoded;
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const app = express();

app.use(urlencoded({
    extended: true
}));
app.use(cookieSession({
    keys: ['sdfheufh9824an 9qweuY&4t837N_2421QINOI5486!@!#!//#endregion']
}))
app.use(express.static('public'))
app.use(authRouter);

app.listen('5000', () => console.log('Server started'));