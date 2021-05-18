// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs = require('express-handlebars')
// const restaurantList = require('./restaurant.json') // 引入restaurant.json

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const restaurantlist = require('./models/Restaurant')

// setting static files
app.use(express.static('public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  restaurantlist.find()
  .lean()
  .then(restaurant=>res.render('index',{restaurant}))
  .catch(error => console.error(error))
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  if (restaurants.length === 0) {
    res.render('alert')
  } else { res.render('index', { restaurant: restaurants }) }

})


app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log(req.params)
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurant: restaurant })
})




// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
