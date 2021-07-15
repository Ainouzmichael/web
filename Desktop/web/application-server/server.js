const express = require("express");
const path = require('path'); //a node native module
const { Restaurant, Menu, Item } = require('./models/index');

const app = express();
app.use(express.json());
const port = 3000;

//Q: What does express.static help us do?
//Q: What do you think path.join helps us do?
app.use(express.static(path.join(__dirname, 'public')))

app.get('/flipcoin', async(req, res) => {
    const randomNum = Math.floor(Math.random() * 2)
    if (randomNum == 0) {
        res.send("heads")
    } else {
        res.send('tails')
    }
})
app.get('/restaurants', async(req, res) => {
    const allRestaurant = await Restaurant.findAll()
    res.json(allRestaurant)
})

//app.get('/restaurant/:id', async(req, res) => {
//  let restaurants = await Restaurant.findByPk(req.params.id)
//  res.json({ restaurants })
// })

app.get('/restaurants/:id', async(req, res) => {
    let restaurants = await Restaurant.findByPk(req.params.id, { include: Menu });
    res.json({ restaurants })
})

app.post('/restaurants', async(req, res) => {
    let newRest = await Restaurant.create(req.body);
    res.send('Created!')
})

app.delete('/restaurants/:id', async(req, res) => {
    await Restaurant.destroy({
        where: { id: req.params.id }
    })
    res.send("Deleted!!")
})

app.put("/restaurants/:id", async(req, res) => {
    let updated = await Restaurant.update(req.body, {
        where: { id: req.params.id } // Update a musician where the id matches, based on req.body
    })
    res.send("Updated!!")
})

//Q: What will our server be doing?
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});