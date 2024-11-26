const BookModel = require('../models/Books'); // Replace with your actual book model path
const OrderModel = require('../models/Order'); // Replace with your actual order model path

exports.createOrder = async (req, res) => {
    const { user, books, paymentMethod } = req.body;
  
    try {  
      // Prepare order items
      const orderItems = [];
      let total = 0;
  
      for (const item of books) {
        const { bookId, quantity } = item;
  
        // Validate quantity
        if (!quantity || quantity < 1) {
          return res.status(400).json({ message: `Invalid quantity for book ID ${bookId}.` });
        }
  
        // Fetch book details
        const book = await BookModel.findById(bookId);
        if (!book) {
          return res.status(404).json({ message: `Book with ID ${bookId} not found.` });
        }
  
        // Add book to order items
        const bookData = {
          isbn13: book.isbn13,
          isbn10: book.isbn10,
          title: book.title,
          price: book.price,
        };
  
        orderItems.push({
          book: bookData,
          quantity,
        });
  
        // Accumulate total price
        total += book.price * quantity;
      }
  
      // Round total to two decimal places
      total = Math.round(total * 100) / 100;
  
      // Calculate payment surcharge
      let paymentSurcharge = 0;
      if (paymentMethod === 'Dobírka') {
        paymentSurcharge = 50; // Fixed surcharge for Dobírka
      } else if (paymentMethod === 'Kartou online') {
        paymentSurcharge = Math.round(total * 0.01 * 100) / 100; // 1% of the total price
      }
  
      const finalTotal = Math.round((total + paymentSurcharge) * 100) / 100;
  
      // Create the order
      const order = new OrderModel({
        user, // Directly embed the user data
        items: orderItems,
        payment: paymentMethod,
        price: total,
        total: finalTotal,
      });
  
      // Save the order to the database
      await order.save();
  
      res.status(201).json({
        message: 'Order created successfully.',
        order: {
          ...order.toObject(),
          paymentSurcharge, // Include the calculated surcharge in the response
        },
      });
    } catch (error) {
      logger.error('Error in createOrder controller:', error.message);
      res.status(500).json({ message: error.message });
    }
  };
