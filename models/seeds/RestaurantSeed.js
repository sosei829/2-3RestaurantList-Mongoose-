const mongoose = require('mongoose')
const Restaurant = require('../Restaurant')
const restaurantList = require('../../restaurant.json')
mongoose.connect('mongodb://localhost/Restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  for (let i=0;i<8;i++){
    // console.log( restaurantList.results[0])
    Restaurant.create({ 
      // id: restaurantList.results[i].id, 
      name:restaurantList.results[i].name,
      name_en:restaurantList.results[i].name_en,
      category: restaurantList.results[i].category,
      image:restaurantList.results[i].image,
      location:restaurantList.results[i].location,
      phone:restaurantList.results[i].phone,
      google_map:restaurantList.results[i].google_map,
      rating:restaurantList.results[i].rating,
      description:restaurantList.results[i].description,
  })
    console.log('mongodb connected!')
  } 
  
})