const createError = require("http-errors");
const mongoose = require("mongoose");

const Artwork = require("../models/artwork");

module.exports = {
    getAllArtwork: async (req, res, next) => {
        try {
            const results = await Artwork.find({});
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },

    createNewArtwork: async (req, res, next) => {
        try {
            const product = new Artwork(req.body);
            const result = await product.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error.name === "ValidationError") {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },

    findArtworkById: async (req, res, next) => {
        const id = req.params.id;
        try {
            const product = await Artwork.findById(id);
            if (!product) {
                throw createError(404, "Artwork does not exist.");
            }
            res.send(product);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Artwork id"));
                return;
            }
            next(error);
        }
    },

    updateArtwork: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };

            const result = await Artwork.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, "Artwork does not exist");
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid Artwork Id"));
            }

            next(error);
        }
    },

    deleteArtwork: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await Artwork.findByIdAndDelete(id);
            if (!result) {
                throw createError(404, "Artwork does not exist.");
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Artwork id"));
                return;
            }
            next(error);
        }
    },
};