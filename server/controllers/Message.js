const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const mongoose = require("mongoose");
const protected = require('../middleware/Protected');

router.put("/create", protected, async( req, res) => {
    const message = Message({
        name: req.body.name,
        forumId: req.body.forumId,
        username: req.body.name
    });

    await message.save();
    res.send(message);
});

router.get("/", async( req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.query.forumId)) {
        return res.sendStatus(404);
    }

    const mess = await Message.find({forumId: req.query.forumId});
    res.send(mess);
});

router.get("/:id", async( req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404);
    }

    const forum = await Message.findById(req.params.id);
    res.send(forum);
});

module.exports = router;