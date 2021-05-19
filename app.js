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
const bodyParser = require('body-parser')

// require body-parser


// setting static files
app.use(express.static('public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
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

app.get('/news', (req, res) => {
  return res.render('news')
})

app.post('/restaurant', (req, res) => {
  const restaurant = req.body       // 從 req.body 拿出表單裡的 name 資料
  console.log(restaurant)
  return restaurantlist.create({ 
    name:restaurant.name,
    name_en:restaurant.name_en,
    category: restaurant.category,
    image:restaurant.image,
    location:restaurant.location,
    phone:restaurant.phone,
    google_map:restaurant.google_map,
    rating:restaurant.rating,
    description:restaurant.description,
})     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  console.log (id)
  return restaurantlist.findById(id) //從資料庫找出資料
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
  
  // const restaurant = restaurantlist.results.find(restaurant => restaurant._id.toString() === req.params.restaurant_id)
  // res.render('show', { restaurant: restaurant })
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






// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
