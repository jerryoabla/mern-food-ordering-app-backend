import mongoose from "mongoose";

// 5:52:46 the reason we this separate because this will create a separate schema for the menu item but it will be embedded in the restaurantSchema 
// this means that we will get ID generated for each of the menu item which will be helpful whenever we are doing the check out flow later on as we will 
// be able to pass around the IDs of the menu items that is in a user's basket and we'll be able to easily fetch the menu item data based on that ID
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true}
});

const restaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User"}, 
  restaurantName: { type: String, required: true},
  city: { type: String, required: true},
  country: { type: String, required: true},
  deliveryPrice: { type: Number, required: true},
  estimatedDeliveryTime: { type: Number, required: true},
  cuisines: [{type: String, required: true}], // 5:51:12 cuisines is an array of string
  menuItems: [menuItemSchema], // 5:51:19 an array of menuItemSchema we havent created this yet
  imageUrl: {type: String, required: true}, //5:51:41 is going to be the URL we get back from cloudinary whenever we upload image for  the restaurant in the request
  lastUpdated: {type: Date, required: true }, // 5:52:01 this helps with analytics and metrics, extra field to that you can search on to get the most recent restaurant
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;