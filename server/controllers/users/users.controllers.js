var mongoose = require('mongoose');
//var User     = mongoose.model('User');
var User = require('./users.model.js'); // Import User Model
var bcrypt = require('bcrypt-nodejs'); 
var jwt    = require('jsonwebtoken');
const fsm = require('fuzzy-string-matching');
//var User = require('../models/user'); // Import User Model

//--------------------------------------Registresion Controller---------------------------------------------------------------------//

module.exports.register = function(req, res) {
	console.log('Register user');
        console.log(fsm(req.body.interest , 'sports', true));
        // Check if request is valid and not empty or null
        if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '' || req.body.email === null || req.body.email === '' || req.body.name === null || req.body.name === '' || req.body.interest === null || req.body.interest === '') {
            res.json({ success: false, message: 'Ensure username, email, and password were provided!' });
        } else if (fsm(req.body.interest , 'Sports', true) == 1 || fsm(req.body.interest , 'Science', true) == 1 || fsm(req.body.interest , 'Entertainment', true) == 1) {
        	var user = new User(); // Create new User object
            user.username = req.body.username; // Save username from request to User object
            user.password = req.body.password; // Save password from request to User object
            user.email = req.body.email; // Save email from request to User object
            user.name = req.body.name; // Save name from request to User object
            user.interest = req.body.interest;
            // Save new user to database
            user.save(function(err) {
                if (err) {
                    if (err.code == 11000) {
                                if (err.errmsg[59] == "u") {
                                res.json({ success: false, message: 'That username is already taken!' }); // Display error if username already taken
                            } else if (err.errmsg[59] == "e"){
                                res.json({ success: false, message: 'That e-mail is already taken!' }); // Display error if e-mail already taken
                            }                          
                        } else {
                        if (err.errors.name) {
                           // console.log(err);
                            res.json({ success: false, message: err.errors.name.message }); // Display error in validation (name)
                        } else if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message }); // Display error in validation (email)
                        } else if (err.errors.username) {
                            res.json({ success: false, message: err.errors.username.message }); // Display error in validation (username)
                        } else if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message }); // Display error in validation (password)
                        } else if (err.errors.interest) {
                            res.json({ success: false, message: err.errors.interest.message }); // Display error in validation (password)
                        } else {
                            res.json({ success: false, message: err }); // Display any other errors with validation
                        }
                    }
                }
                   else {
                    res.json({ success: true, message: 'Account registered! Please login...' }); // Send success message back to controller/request
                }
            
            });
        } else {
            res.json({ success: false, message: 'Select your interest!' });
        }
    };

//--------------------------------------Login Controller---------------------------------------------------------------------//

    module.exports.login = function(req, res) {
        var loginUser = (req.body.username).toLowerCase(); // Ensure username is checked in lowercase against database
        User.findOne({ username: loginUser }).select('email username password name interest').exec(function(err, user) {
            if (err) {
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                // Check if user is found in the database (based on username)           
                if (!user) {
                    res.json({ success: false, message: 'User does not exist!' }); // Username not found in database
                } else if (user) {
                    // Check if user does exist, then compare password provided by user
                    if (!req.body.password) {
                        res.json({ success: false, message: 'No password provided!' }); // Password was not provided
                    } else {
                        var validPassword = user.comparePassword(req.body.password); // Check if password matches password provided by user 
                        if (!validPassword) {
                            res.json({ success: false, message: 'Worng password Please try again!' }); // Password does not match password in database
                        } else {
                            var token = jwt.sign({ username: user.username, name: user.name, interest: user.interest }, 's3cr3t', { expiresIn: '24h' }); // Logged in: Give user token
                            res.json({ success: true, message: 'User authenticated!', token: token }); // Return token in JSON object to controller
                        }
                    }
                }
            }
        });
    };

//-------------------------------------------User Authentication Controller-------------------------------------------------------------//

module.exports.authenticate = function(req, res, next){
	var headerExists = req.header.authorization;
		if(headerExists){
			var token = req.header.authorization.split(' ')[1];
			jwt.verify(token, 's3cr3t', function(err, decoder){
				if(err){
					res.status(401).json('Unauthorized');
				} else{
					req.user = decoder.username;
					next();
					
				}
			});
		} else{
			res.status(403).json('No token provied');
		}
};    






