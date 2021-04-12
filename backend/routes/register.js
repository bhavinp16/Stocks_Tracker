const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let new_user = await User.findOne({ email: req.body.email });
    if (new_user) return res.status(400).send('user_already_exists');


    new_user = await User.findOne({ number: req.body.number });
    if (new_user) return res.status(400).send('user_already_exists');
    try {
        new_user = new User({
            Name: req.body.Name,
            number: req.body.number,
            email: req.body.email,
            address: req.body.address,
            password: req.body.password,
            password2: req.body.password2
        })
        console.log("added");
        const salt = await bcrypt.genSalt(10);
        new_user.password = await bcrypt.hash(new_user.password, salt);

        const validPassword = await bcrypt.compare(new_user.password2, new_user.password);
        if (!validPassword) return res.status(400).send('please enter same password.');

        const salt_new = await bcrypt.genSalt(10);
        new_user.password2 = await bcrypt.hash(new_user.password2, salt_new);

        await new_user.save();
        console.log("user added successfully");
        new_user
        res.redirect('/');
    }
    catch {
        res.redirect('/register');
    }

})

module.exports = router;