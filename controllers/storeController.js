const Store = require("../models/store.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const { deleteOne, updateOne, getOne, getAll , createOne } = require("./handlerFactory");
const getAllStores = getAll(Store);
const getStore = getOne(Store);
const deleteStore = deleteOne(Store);
const updateStore = updateOne(Store);
const createStore = createOne(Store);

module.exports = {
  getAllStores,
  getStore,
  deleteStore,
  updateStore,
  createStore
};
