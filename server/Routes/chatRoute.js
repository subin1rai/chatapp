const express = require('express');
const chatController = require("../Controller/ChatController"); 
const router = express.Router();

router.post("/", chatController.createChat);
router.get("/:userId", chatController.findUserChats);
router.get("/find/:firstId/:secondId", chatController.findChat);

module.exports = router;
