const express = require("express");
const router = express.Router();
const homeController = require("../routes/home");
const uploadController = require("./../tools/images_upload");
module.exports = (app) => {
    router.get("/", homeController.getHome);
    router.post("/api/multiple-upload/:model/:id", uploadController.uploadImages, uploadController.resizeImages, uploadController.getResult, (req, res) => {

        });
    return app.use("/", router);
};
