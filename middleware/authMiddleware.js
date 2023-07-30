const Userdb = require('../model/model');
const jwtoken = require("jsonwebtoken");


require('dotenv').config();



const protect = async(req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyUser = jwtoken.verify(token, process.env.JWT_SECRET);


        req.user = await Userdb.findById(verifyUser._id).select("-password");

        next();
    } catch (error) {
        res.status(401).send(error);
    }
}



module.exports = { protect };