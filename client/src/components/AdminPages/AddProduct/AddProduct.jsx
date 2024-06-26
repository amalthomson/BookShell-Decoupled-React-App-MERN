import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography, Grid } from '@mui/material';

function AddProduct() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    ISBN: '',
    description: '',
    publisher: '',
    publicationDate: '',
    language: '',
    image: null
  });


  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setBook({
        ...book,
        image: e.target.files[0]
      });
    } else {
      const { name, value } = e.target;
      setBook({
        ...book,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', book.title);
      formData.append('author', book.author);
      formData.append('genre', book.genre);
      formData.append('price', book.price);
      formData.append('ISBN', book.ISBN);
      formData.append('description', book.description);
      formData.append('publisher', book.publisher);
      formData.append('publicationDate', book.publicationDate);
      formData.append('language', book.language);
      formData.append('image', book.image);

      const res = await axios.post('http://localhost:5001/admin/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(res.data);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: 4 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
          <img src="/addbooks.png" alt="Add Books" style={{ maxWidth: '50%', height: 'auto' }} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="title"
              label="Title"
              value={book.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="author"
              label="Author"
              value={book.author}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="genre"
              label="Genre"
              value={book.genre}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="price"
              label="Price"
              type="number"
              value={book.price}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="ISBN"
              label="ISBN"
              value={book.ISBN}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="description"
              label="Description"
              value={book.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              name="publisher"
              label="Publisher"
              value={book.publisher}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="publicationDate"
              label="Publication Date"
              type="date"
              value={book.publicationDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              name="language"
              label="Language"
              value={book.language}
              onChange={handleChange}
              fullWidth
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1">Upload Image:</Typography>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Book
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddProduct;
