const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User")
const bcrypt = require("bcryptjs");

router.get('/init', async( req, res) => {
    const user = await User.findById(req.userId);

    res.send({user}); 
});

router.put('/register', async( req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user) {
        return res.status(401).send ({
            message: 'User with this email already exist'
        });
    }
    
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    });

    await newUser.save();

    return res.sendStatus(statuscode = 200);
});

router.post('/login', async( req, res) => {
    const user = await User.findOne({username: req.body.username});

    if(!user) {
        return res.status(401).send ({ 
            message: 'User with this username does not exist'
        });
    }

    const passwordIsEqual = await bcrypt.compare(req.body.password, user.password);
    if (!passwordIsEqual){
        return res.status(401).send({
            message: 'Wrong password'
        });
    }

    const token = jwt.sign({userId: user._id}, 'app');
    
    res.send({
        user,
        token
    });
});

router.post("/change-name", async( req, res) => {
    const user = await User.findById(req.body.userId);
    
    user.name = req.body.name;
    await user.save();
    return res.sendStatus(200);
});

router.post("/change-username", async( req, res) => {
    const user = await User.findById(req.body.userId);
    
    user.username = req.body.username;
    await user.save();
    return res.sendStatus(200);
});

router.post("/change-email", async( req, res) => {
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) {
        return res.status(401).send ({
            message: 'This email already token'
        });
    }
    
    const user = await User.findById(req.body.userId);

    user.email = req.body.email;
    await user.save();
    return res.sendStatus(200);
});

router.post("/change-password", async( req, res) => {
    const user = await User.findById(req.body.userId);

    const passwordMatches = await bcrypt.compare(req.body.currentPassword, user.password);
    if(!passwordMatches) {
        return res.status(401).send ({
            message: 'Password is incorrect'
        });
    }

    user.password = req.body.password;
    await user.save();
    return res.sendStatus(200);
});

router.delete('/delete', async(req, res) => {
    db.collection('name').findOneAndDelete({name: req.body.name}, 
    (err, result) => {
      if (err) return res.send(500, err)
      console.log('got deleted');
      res.redirect('/');
    })
  })

module.exports = router;