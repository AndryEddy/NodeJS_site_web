const nodemailer = require("nodemailer");
require('dotenv').config();

exports.generate_digit = () => {
    const max_digit = process.env.max_digit;
    const first_digit = Math.floor(Math.random() * max_digit);
    const second_digit = Math.floor(Math.random() * max_digit);
    const third_digit = Math.floor(Math.random() * max_digit);
    const fourth_digit = Math.floor(Math.random() * max_digit);
    return `${first_digit}${second_digit}${third_digit}${fourth_digit}`

};