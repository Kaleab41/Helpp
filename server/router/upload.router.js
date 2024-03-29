const express = require("express");
const router = express.Router();
const path = require("path");

router.get('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    console.log({ filename })
    const filePath = path.join(path.resolve(__dirname, '..'), 'uploads', 'files', '1711536946974-Screenshot from 2024-03-17 13-30-32.png');
    res.sendFile(filePath);
});

router.get('/attendance/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', 'attendance', filename);
    res.sendFile(filePath);
});

router.get('/material/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', 'material', filename);
    res.sendFile(filePath);
});

module.exports = router;