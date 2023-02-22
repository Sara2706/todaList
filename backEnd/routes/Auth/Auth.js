const router = require('express').Router();
const User = require('../../model/User/User');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const checkEmail = await User.findOne({ email: req.body.email })
    if (!checkEmail) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        try {
            const saveNewUser = await newUser.save();
            res.status(200).json(saveNewUser)
        } catch (err) {
            console.log(err)

        }
    } else {
        res.status(404).json('Email already register')
    }
})

router.post('/login', async (req, res) => {
    const checkEmail = await User.findOne({ email: req.body.email })
    if (checkEmail) {
        const password = req.body.password;
        if (bcrypt.compareSync(password, checkEmail.password)) {
            const accessToken = JWT.sign({
                userId: checkEmail._id,
            }, process.env.SECRET_KEY)
            res.status(200).json(accessToken)

        } else {
            res.status(404).json('Password not match')
        }
    } else {
        res.status(404).json('Email not exist')
    }
})

module.exports = router;