const express = require('express');
const urlencoded = require('body-parser').urlencoded;
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');
const app = express();

app.use(urlencoded({
    extended: true
}));
app.use(cookieSession({
    keys: ['sdfheufh9824an 9qweuY&4t837N_2421QINOI5486!@!#!//#endregion']
}))

app.get('/', (req, res) => {
    res.send(`
        <form method="POST">
            <input name="email" type="email" placeholder="email" />
            <input name="password" type="password" placeholder="password" />
            <input name="confirmPassword" type="password" placeholder="confirmPassword" />
            <button>Submit</button>
        </form>
    `);
});

app.post("/", async (req, res) => {
    const {
        email,
        password,
        confirmPassword
    } = req.body;

    const existingUser = await usersRepo.getOneBy({
        email
    });

    if (existingUser) {
        return res.send('Email in use');
    }

    if (password !== confirmPassword) {
        return res.send('Passwords must match');
    }

    // Create a user in our repo to represent this person
    const user = await usersRepo.create({
        email,
        password
    });

    // Store the id of that user inside of the users cookie
    req.session.userId = user.id; // Added by cookie session
    res.send('Done!')
})

app.listen('5000', () => console.log('Server started'));