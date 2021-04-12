const { User} = require('../models/user');
const { Number, validate} = require('../models/validation');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const router =  express.Router();


router.post('/', async (req, res) => {
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('User doesnt exist');


        const password = await bcrypt.compare(req.body.password, user.password);
        if(!password) return res.status(400).send('Invalid password');

        
        res.json(user);
        // await Order.find({Number: user.number},
        //         function (err, orders) {
        //                 if (err) {
        //                     console.log(err);
        //                 } else {
        //                     res.render("index", { details: orders, user_details: user })
        //                 }
        //             })
        
})

module.exports = router;