import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} from '../controller/bookController.js';

// Multer + Cloudinary middleware
import upload from '../middleware/upload.js';

const router = express.Router();

// Routes
router.post('/', upload.single('image'), createBook);   
router.get('/', getAllBooks);
router.get('/get', getBookById);
router.put('/update', upload.single('image'), updateBook);  
router.delete('/delete', deleteBook);

export default router;
