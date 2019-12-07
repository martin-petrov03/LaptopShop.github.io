const Laptop = require('../models/Laptop');
const Checkout = require('../models/Checkout');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

const createCheckout = async(req, res) => {
    if(await isAuth(req, res)){
        try {
            const { productName, quantity, author } = req.body;

            if(productName.length >= 5 && Number.isInteger(quantity) && (quantity >= 1 && quantity <= 10))
            {
                const laptop = await Laptop.findOne({ model: productName });                
                if(laptop) {
                    await Checkout.create({ productName, url: laptop.url, price: laptop.price, quantity, author });
                    res.status(200).json(
                    {
                        message: 'Checkout has been successfully created!',
                    });
                } else {
                    res.status(400).json(
                    {
                        message: 'Invalid Product!',
                    });
                }
            } else {
                res.status(400).json(
                {
                    message: 'Invalid Data!',
                });
            }
        }
        catch(err) {
            console.log(err);
            res.status(400).json(
            {
                message: 'Cannot checkout!',
            });
        }
    }
}

const returnCheckouts = async(req, res) => {
    if(await isAdmin(req, res) && await isAuth(req, res)){
        try{
            const checkouts = await Checkout.find();
            res.status(200)
                .json({ message: 'Admin!', checkouts });
                return;
        }
        catch{
            res.status(500)
                .json({ message: 'Cannot get checkouts!' });
            return;
        }
    }
    res.status(400)
        .json({ message: 'Not Authorized!' });    
}
module.exports = {    
    createCheckout,
    returnCheckouts
};