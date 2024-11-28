const FormData = require('../models/FormData');

// Discount calculation function
function calculateDiscount(category, rate, quantity) {
    let discountPercentage = 0;
    if (category === 'Fruits') discountPercentage = 10;
    else if (category === 'Vegitables') discountPercentage = 5;
    else if (category === 'Grocery') discountPercentage = 15;

    const price = rate * quantity;
    const discount = (price * discountPercentage) / 100;
    return { discount, price };
}

exports.getStock = async (req, res) => {
    try {
        const stockItems = await FormData.find();
        res.status(200).json({ status: 'success', data: stockItems });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch stock items!' });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { productId, productName, category, quantity, rate, location } = req.body;

        if (await FormData.findOne({ productId })) {
            return res.status(400).json({ status: 'error', message: 'Product ID already exists!' });
        }

        const { discount, price } = calculateDiscount(category, rate, quantity);
        const formData = new FormData({
            productId,
            productName,
            category,
            quantity,
            rate,
            location,
            price,
            totalAmount: price - discount
        });

        const savedData = await formData.save();
        res.status(200).json({ status: 'success', message: 'Form data stored successfully!' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to store form data!' });
    }
};

exports.updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { productName, category, quantity, rate, location } = req.body;

    try {
        const { discount, price } = calculateDiscount(category, rate, quantity);

        const updatedProduct = await FormData.findOneAndUpdate(
            { productId },
            { productName, category, quantity, rate, location, totalAmount: price - discount, price },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ status: 'error', message: 'Product not found' });
        res.status(200).json({ status: 'success', message: 'Product updated successfully!', data: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to update product!' });
    }
};

exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const deletedProduct = await FormData.findOneAndDelete({ productId });
        if (!deletedProduct) return res.status(404).json({ status: 'error', message: 'Product not found!' });

        res.status(200).json({ status: 'success', message: 'Product deleted successfully!' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to delete product!' });
    }
};

exports.getModal =  async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await FormData.findOne({ productId });
        if (product) {
            res.status(200).json({ status: 'success', product });
        } else {
            res.status(404).json({ status: 'error', message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch product details' });
    }
};