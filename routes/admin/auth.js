const express = require('express');
const usersRepo = require('../../repositories/users');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(`
        <form method="POST">
            <input name="email" type="email" placeholder="email" />
            <input name="password" type="password" placeholder="password" />
            <input name="confirmPassword" type="password" placeholder="confirmPassword" />
            <button>Sign Up</button>
        </form>
    `);
});

router.post("/signup", async (req, res) => {
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
    res.send('Done!');
});

router.get('/signout', (req, res) => {
    req.session = null; // wow this is the way!
    res.send('You are logged out');
});

router.get('/signin', (req, res) => {
    res.send(`
        <form method="POST">
            <input name="email" type="email" placeholder="email" />
            <input name="password" type="password" placeholder="password" />
            <button>Sign In</button>
        </form>
    `);
});

router.post('/signin', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await usersRepo.getOneBy({
        email
    });

    if (!user) return res.send('Email not found');

    const validPassword = await usersRepo.comparePasswords(user.password, password);

    if (!validPassword) return res.send('Password is not valid');

    req.session.userId = user.id; // Added by cookie session

    res.send('You are signed in');
});

module.exports = router;