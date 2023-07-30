const mongoose = require('mongoose');
const jwtoken = require('jsonwebtoken');
require('dotenv').config();
var schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

});

// generating token

schema.methods.generateAuthToken = async function(req, res) {
    try {
        console.log(this._id);
        const token = jwtoken.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
        this.tokens = this.tokens.concat({ token: token })
            // console.log(token);
        await this.save();
        return token;
    } catch (error) {
        res.send(error);
        console.log(error);
    }



}



const Userdb = mongoose.model('Userdb', schema);

module.exports = Userdb;