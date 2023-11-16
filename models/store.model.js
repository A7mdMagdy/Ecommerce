const mongoose = require("mongoose");
const validator = require("validator");

const storeSchema = new mongoose.Schema({
  storeID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // categories: {
  //   required: true,
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category",
  // },
  image: {
    type: Object,
    default: {
      url: "",
      id: null,
    },
  },
});
const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
