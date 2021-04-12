const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    address: {
        type: String,  
        unique: true,               
        minlength: 3,
        maxlength: 50,
        required: true
    },
    password: {
        type: String,             
        minlength: 3,
        maxlength: 1024,
        required: true
    },
    password2: {
        type: String,             
        minlength: 3,
        maxlength: 1024,
        required: true
    },
    number: {
        type: String, 
        unique: true,            
        minlength: 10,
        maxlength: 10,
        required: true
    },
    
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        Name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(50).required().email(),
        address: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(255).required(),
        password2: Joi.string().min(3).max(255).required(),
        number: Joi.string().min(10).max(10).required(),
        
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;