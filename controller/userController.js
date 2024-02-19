const createError = require('http-errors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

const createToken = require('../config/jwt.js')
module.exports = {

    userSignUp: async (req, res, next) => {
        try {
            const { email, password, nickname } = req.body;

            // Check if the email already exists
            const checkEmail = await User.findOne({ email });
            if (checkEmail) {
                return res.status(409).send("Email already exists");
            }

            // Hash the password
            const passCrypt = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                email,
                password: passCrypt,
                nickname,
                role: "user",
                numOfFollower: 0,
                avatar: "",
                status: true
            });

            // Save the user to the database
            const result = await newUser.save();

            res.status(201).send("Signup successful");
        } catch (error) {
            console.error(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },

    userLogin: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // Check if the email already exists
            const checkEmail = await User.findOne({ email });

            if (checkEmail) {
                const checkPass = bcrypt.compareSync(password, checkEmail.password);
                if (checkPass) {
                    // Encode user data (excluding password) into a token
                    const token = createToken({ checkEmail, password: "" });
                    res.send(token);
                } else {
                    res.status(401).send("Incorrect password");
                }
            } else {
                res.status(404).send("Email not found");
            }
        } catch (error) {
            console.error(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },


    getAllUsers: async (req, res, next) => {
        try {
            const results = await User.find({});
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },

    createNewUser: async (req, res, next) => {
        try {
            const user = new User(req.body);
            const result = await user.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },

    findUserById: async (req, res, next) => {
        const id = req.params.id;
        try {
            const user = await User.findById(id);
            if (!user) {
                throw createError(404, 'User does not exist.');
            }
            res.send(user);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid User id'));
                return;
            }
            next(error);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };

            const result = await User.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, 'User does not exist');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid User Id'));
            }

            next(error);
        }
    },

    deleteUser: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await User.findByIdAndDelete(id);
            if (!result) {
                throw createError(404, 'User does not exist.');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid User id'));
                return;
            }
            next(error);
        }
    }
};