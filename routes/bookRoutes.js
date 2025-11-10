import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} from '../controller/bookController.js';

const router = express.Router();

// Routes
router.post('/', createBook);        
router.get('/', getAllBooks);        
router.get('/get', getBookById);     
router.put('/update', updateBook);   
router.delete('/delete', deleteBook); 

export default router;
