const express = require('express');
const urlencoded = require('body-parser').urlencoded;
const app = express();

app.use(urlencoded({ extended: true}));

app.get('/', (req, res)=>{
    res.send(`
        <form method="POST">
            <input name="hello" />
            <button>Submit</button>
        </form>
    `);
});

app.post("/", (req, res)=>{
    console.log(req.body);
    res.send('Done!')
})

app.listen('5000', ()=> console.log('Server started'));