const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const multer = require('multer');
const path = require('path');

// =========================
// KONFIGURASI MULTER
// =========================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// =========================
// FILTER FILE GAMBAR
// =========================
const fileFilter = (req, file, cb) => {
    const allowed = /jpg|jpeg|png/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowed.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Hanya file JPG, JPEG, PNG yang diperbolehkan'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB
    }
});

// =========================
// ROUTES
// =========================
router.get('/recent', itemController.getRecentFoundItems);
router.get('/all', itemController.getAllFoundItems);

// POST LAPORAN KEHILANGAN
router.post('/submit', (req, res) => {
    upload.single('item_image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        itemController.createItemReport(req, res);
    });
});

module.exports = router;
