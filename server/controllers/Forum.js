const express = require("express");
const router = express.Router();
const Forum = require("../models/Forum");
const mongoose = require("mongoose");
const protected = require('../middleware/Protected');

router.put("/create", protected, async( req, res) => {
    const forum = Forum({
        name: req.body.name,
        categoryId: req.body.categoryId
        
    });

    await forum.save();
    res.send(forum);
});

router.get("/", async( req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.query.categoryId)) {
        return res.sendStatus(404);
    }

    const fora = await Forum.find({categoryId: req.query.categoryId});
    res.send(fora);
});

router.get("/:id", async( req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.sendStatus(404);
    }

    const forum = await Forum.findById(req.params.id);
    res.send(forum);
});

module.exports = router;