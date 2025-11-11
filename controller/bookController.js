import pool from '../config/db.js';



// Create a book
export const createBook = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    const { title, author, published_date, genre, image_url: manualUrl } = req.body;

    // Cloudinary uploaded file URL or manual URL
    const image_url = req.file?.path || manualUrl || null;
    console.log("IMAGE URL FROM CLOUDINARY:", image_url);

    const result = await pool.query(
      'INSERT INTO books (title, author, published_date, genre, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, author, published_date, genre, image_url]
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
    
    const { id } = req.body;
   
    const bookId = parseInt(id, 10);
    if (!bookId) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }


  
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [bookId]);
     if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }


    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Updating the books
export const updateBook = async (req, res) => {
  try {
    const { id, title, author, published_date, genre, image_url: manualUrl } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Book ID is required" });
    }

    // Cloudinary uploaded file or manual URL
    const image_url = req.file?.path || manualUrl;

    let query = "UPDATE books SET title=$1, author=$2, published_date=$3, genre=$4";
    let values = [title, author, published_date, genre];

    if (image_url) {
      query += ", image_url=$5 WHERE id=$6 RETURNING *";
      values.push(image_url, id);
    } else {
      query += " WHERE id=$5 RETURNING *";
      values.push(id);
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book updated successfully", book: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Deleting the books
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
