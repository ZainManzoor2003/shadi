const UserSchema = require('../models/userSchema')
const MessageSchema = require('../models/messageSchema')
const ContactSchema = require('../models/contactSchema')
const LikeSchema = require('../models/likeSchema')
const jwt = require('jsonwebtoken');

const connection = (req, res) => {
    res.send('Hello')
}

const isLoggedIn = (req, res, next) => {

    const token = req.cookies.authToken; // Assuming you're storing the token in a cookie

    if (!token) {
        return res.status(401).send({ isAuthenticated: false });
    }

    try {
        const decoded = jwt.verify(token, 'app'); // Replace 'app' with your secret
        res.send({ isAuthenticated: true, userId: decoded.id });
    } catch (error) {
        res.status(401).send({ isAuthenticated: false });
    }
}
const login = async (req, res) => {
    let { email, password } = req.body

    try {
        const user = await UserSchema.findOne({ email: email })
        if (user) {
            if (user.password == password) {
                const tokenData = {
                    email: user.email,
                    id: user._id
                }
                const token = jwt.sign(tokenData, 'app', {
                    expiresIn: '1d'
                });
                res.cookie('authToken', token, {
                    httpOnly: true, // Helps prevent XSS attacks
                    secure: true, // Ensures the cookie is only sent over HTTPS (use false for development)
                    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
                });
                res.send({ mes: 'Login Successfully', user })
            }
            else {
                res.send({ mes: 'Wrong Password' })

            }
        }
        else {
            res.send({ mes: 'Account Not Exists' });
        }
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {
        const user = await UserSchema.findOne({ email: req.body.email })
        if (user) {
            res.send({ mes: 'User Already Registered ' })
        }
        else {
            const user = await UserSchema(req.body).save()
            if (user) {
                res.send({ mes: 'Registered Successfully' });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserSchema.find({ _id: { $ne: req.params.id } });
        if (users) {
            res.send(users)
        }
        else {
            res.send({ mes: 'No User Found' });
        }
    } catch (error) {
        console.log(error);
    }
}
const getCurrentUser = async (req, res) => {
    try {
        const user = await UserSchema.find({ _id: req.params.id });
        if (user) {
            res.send(user)
        }
        else {
            res.send({ mes: 'No User Found' });
        }
    } catch (error) {
        console.log(error);
    }
}
const getUserDetails = async (req, res) => {
    try {
        const user = await UserSchema.findOne({ _id: req.params.id })
        if (user) {
            res.send(user)
        }
        else {
            res.send({ mes: 'No User Found' });
        }
    } catch (error) {
        console.log(error);
    }
}
const getMessages = async (req, res) => {
    try {
        const messages = await MessageSchema.find()
        if (messages) {
            res.send(messages)
        }
        else {
            res.send({ mes: 'No Message Found' });
        }
    } catch (error) {
        console.log(error);
    }
}
const getContacts = async (req, res) => {
    try {
        const messages = await ContactSchema.find({ sender: req.params.id })
        if (messages) {
            res.send(messages)
        }
        else {
            res.send({ mes: 'No Contact Found' });
        }
    } catch (error) {
        console.log(error);
    }
}

const sendMessage = async (req, res) => {
    try {
        const message = new MessageSchema({
            sender: req.body.sender, reciever: req.body.reciever,
            message: req.body.message, type: req.body.type
        });
        message.save();
        addToContact(req.body.sender, req.body.reciever, req.body.name, req.body.image, req.body.sender)
        res.send({ mes: 'Success' });
    }
    catch (err) {
        console.log(err);
    }
}
const addToContact = async (sender, reciever, name, image, id) => {
    try {
        const User = await UserSchema.findOne({ _id: id })
        const user1 = await ContactSchema.findOne({ sender: sender, reciever: reciever })
        if (!user1) {
            const user = await ContactSchema({ sender, reciever, name, image }).save()
        }
        const user2 = await ContactSchema.findOne({ sender: reciever, reciever: sender })
        if (!user2) {
            const user = await ContactSchema({ sender: reciever, reciever: sender, name: User.name, image: User.image }).save()
        }
    } catch (error) {
        console.log(error);
    }
}

const newNotification = async (req, res) => {
    // console.log(req.params);
    try {
        const user = await ContactSchema.findOneAndUpdate({ sender: req.params.id, reciever: req.params.tempRecieverId },
            { newNotification: 'true' })
        if (user) {
            res.send({ mes: 'Success' })
        }
    } catch (err) {
        console.log(err);
    }
}
const changeNotification = async (req, res) => {
    try {
        const user = await ContactSchema.findOneAndUpdate({ sender: req.params.id, reciever: req.params.reciever },
            { newNotification: 'false' })
        if (user) {
            res.send({ mes: 'Success' })
        }
    } catch (err) {
        console.log(err);
    }
}

const likeUser = async (req, res) => {
    try {
        const user1 = await UserSchema.findOne({ _id: req.params.id })

        if (user1.likesByThisUser.includes(req.body._id)) {
            return res.send({ mes: 'User already liked' });
        }
        else {
            user1.likesByThisUser.push(req.body._id)
            await user1.save()
            const user2 = await UserSchema.findOne({ _id: req.body._id })
            user2.liked.push(req.params.id)
            await user2.save()
            res.send({ mes: 'Liked Successfully' })
        }
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    connection, isLoggedIn, login, register, getAllUsers,
    getUserDetails, getMessages, sendMessage, getContacts, newNotification, changeNotification, likeUser, getCurrentUser
}