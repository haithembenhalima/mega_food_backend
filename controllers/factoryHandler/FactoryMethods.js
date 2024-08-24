const asyncHandler = require("express-async-handler");
const ApiSuccess = require("../../utils/ApiSuccess");
const ApiError = require("../../utils/ApiError");
const { where } = require("sequelize");
const { ApiFeatures } = require("../../utils/ApiFeatures");

// @desc Read all data from the tables with the features
exports.ReadAll = (model) =>
  asyncHandler(async (req, res, next) => {
    const { page } = req.query;
    const limit = 2;
    const features = ApiFeatures(req.query, limit, next);
    const objects = await model.findAll(features);
    res
      .status(200)
      .json(
        new ApiSuccess("success", "Object getting with success", objects, page)
      );
  });

// @desc Read data from table where condition
exports.ReadOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const object = await model.findOne({ where: { id } });
    if (!object) {
      return next(new ApiError("Object Not Found", 400));
    }
    res
      .status(200)
      .json(new ApiSuccess("success", "Object finded with success", object));
  });

// @desc Create a new object
exports.createOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const data = req.body;
    // verify that object does not already exist
    const objectExists = await model.findOne({ where: { name: data.name } });
    if (objectExists) {
      return next(new ApiError("Object already exists", 409));
    }
    // create a new object
    const newObject = await model.create(data);
    res
      .status(201)
      .json(
        new ApiSuccess("success", "Object created with success", newObject)
      );
  });

// @desc update an object
exports.updateOne = (model) =>
  asyncHandler(async function (req, res, next) {
    const id = req.params.id;
    const data = req.body;
    const objectResult = await model.update(data, {
      where: { id },
      individualHooks: true,
    });
    if (objectResult == 0) {
      return next(new ApiError("Object not found", 404));
    }
    const updatedObject = await model.findOne({ where: { id } });
    res
      .status(200)
      .json(
        new ApiSuccess("success", "Object updated with success", updatedObject)
      );
  });

// @desc delete an object
exports.deteleOne = (model) =>
  asyncHandler(async function (req, res, next) {
    const id = req.params.id;
    const deletedResult = await model.destroy({ where: { id } });
    if (deletedResult == 0) {
      return next(new ApiError("Object not found", 404));
    }
    res
      .status(200)
      .json(new ApiSuccess("success", "Object deleted with success"));
  });
