// file.js
const express = require('express');
const multer = require('multer');
const pool = require('./app');
const app = express();

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// File upload
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const filePath = req.file.path;

    // Create a new file
    const [result] = await pool.execute(
      'INSERT INTO files (title, description, file_path) VALUES (?, ?, ?)',
      [title, description, filePath]
    );

    res.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// List files
router.get('/files', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM files');

    res.json({ files: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Download file
router.get('/files/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute('SELECT * FROM files WHERE id = ?', [id]);
    const file = rows[0];

    if (!file) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    res.download(file.file_path);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;




