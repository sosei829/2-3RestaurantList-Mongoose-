const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RestaurantSchema = new Schema({
  id: {
    type:  Number, // 資料型別是字串
    // required: true // 這是個必填欄位
  },
  name: {
    type: String, // 資料型別是字串
    
  },
  name_en:{
    type: String, // 資料型別是字串
    
  },
  category:{
      type: String, // 資料型別是字串
  },
  image:{
    type: String, // 資料型別是字串
  },
  location:{
    type: String, // 資料型別是字串
  },
  phone:{
    type: String,
  },
  google_map:{
    type: String,
  },
  rating:{
    type:  Number,
  },
  description:{
    type: String,
  },
  
})
module.exports = mongoose.model('Restaurant',RestaurantSchema)


