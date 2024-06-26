// server/Controllers/addressController.js
const Address = require('../Models/Address');

exports.addAddress = async (req, res) => {
    const { userId, street, city, state, country, postalCode } = req.body;
    try {
      const address = await Address.create({ userId, street, city, state, country, postalCode });
      res.status(201).json({ success: true, address });
    } catch (error) {
      console.error('Error adding address:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
exports.getAddress = async (req, res) => {
  const userId = req.params.userId;
  try {
    const addresses = await Address.find({ userId });
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error('Error getting addresses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
