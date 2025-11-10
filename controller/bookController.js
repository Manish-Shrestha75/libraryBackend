import pool from '../config/db.js';

// Create a book
export const createBook = async (req, res) => {
  try {
    const { title, author, published_date, genre } = req.body;
    const result = await pool.query(
      'INSERT INTO books (title, author, published_date, genre) VALUES ($1, $2, $3, $4) ',
      [title, author, published_date, genre]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
// Get by id

 export const getBookById = async (req, res) => {
  try {
    // Get the ID from the request body
    const { id } = req.body;

    // Validate the ID
    const bookId = parseInt(id, 10);
    if (!bookId) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    // Query the database
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);

    // If no book found
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Return the book
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



//updating the books 
export const updateBook = async (req, res) => {
  try {
    const { id, title, author, published_date, genre } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: "Book ID is required" });
    }

    const result = await pool.query(
      "UPDATE books SET title=$1, author=$2, published_date=$3, genre=$4 WHERE id=$5 ",
      [title, author, published_date, genre, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book updated successfully", book: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//deleting the books 
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Book ID is required" });
    }

    const result = await pool.query(
      "DELETE FROM books WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book deleted successfully", deletedBook: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
  