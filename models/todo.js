const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RestaurantSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
    // name: String,
    // name_en: String,
    // category: String,
    // image: "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg",
    // location: String,
    // phone: String,
    // google_map: "https://goo.gl/maps/BJdmLuVdDbw",
    // rating: String,
    // description: String,
  }
})
module.exports = mongoose.model('Restaurant',RestaurantSchema)