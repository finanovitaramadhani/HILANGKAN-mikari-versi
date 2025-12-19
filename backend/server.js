const express = require('express');
const cors = require('cors');
const path = require('path');
const itemRoutes = require('./routes/itemRoutes');
require('dotenv').config();

const app = express();
const port = 3000;

// ======================
// MIDDLEWARE
// ======================
app.use(cors());

// WAJIB untuk FormData (text fields)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// STATIC FILE (UPLOADS)
// ======================
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ======================
// ROUTES
// ======================
app.use('/api/items', itemRoutes);

// ======================
// START SERVER
// ======================
app.listen(port, () => {
    console.log(`✅ Server berjalan di http://localhost:${port}`);
});
