const express = require('express')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const passport = require('passport')
const crypto = require('crypto')
const configPassport = require('./auth')
const connectDB = require('./models/db')
const User = require('./models/user')
const Token = require('./models/token')
const sendEmail = require('./email')
require('dotenv').config()

// Connect to Database
connectDB()

configPassport(passport)

const app = express()
const PORT = process.env.PORT || 5000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


/** Register User */
app.post('/signup', async (req, res) => {
    const found = await User.findOne({email: req.body.email})
    if(found) {
        res.statusMessage = "User with this email already exists."
        res.status(403).end();
    } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = await new User({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }).save();
        res.statusMessage = "User is successfully created."
        res.status(200).send(user);
    }
})


/** Login User */
app.post('/login', passport.authenticate('local'), async (req, res) => { 
    const result = await Token.deleteMany({userId: req.user._id})
    res.status(200).send(req.user); 
})


/** Send Reset Link to the Email */
app.post('/forgot', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).send("User with this email does not exist")

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/reset/${user._id}/${token.token}`;
        await sendEmail(link, req.body.email);

        res.send("Password reset link sent to your Email Account");

    } catch(e) {
        res.send("An error occured");
        console.log(e)
    }
})


/** Accept the reset password */
app.post('/reset/:userId/:token', async (req, res) => {
    try {

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("Invalid link or Link already expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or Link already expired");

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        user.password = hashedPassword;
        await user.save();
        await token.delete();

        res.send("Password Reset Sucessfully.");

    } catch(e) {
        res.send("An error occured");
        console.log(e)
    }
})


/** Logout */
app.post('/logout', (req, res) => {
    req.logOut()
    res.status(200).end()
})


/** Check whether Authenticated */
app.get('/auth', (req, res) => {
    // req.logOut()
    if(req.isAuthenticated()) {
        res.json({auth: true})
    } else {
        res.json({auth: false})
    }
})


app.listen(PORT, (error) => {
    if(error) throw error
    console.log(`Server is listening on Port:${PORT}`)
})