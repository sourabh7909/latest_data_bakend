const { query } = require("express")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const Auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (token) {
        try {
            const decode = jwt.verify(token,process.env.KEY )
            if (decode) {
                next()
            } else {
                res.status(200).json({ msg: "token not recognised" })
            }

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    } else {
        res.status(400).json({ msg: "please Login" })
    }

}

module.exports = { Auth }