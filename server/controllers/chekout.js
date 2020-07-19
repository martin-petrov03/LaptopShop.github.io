const Laptop = require('../models/Laptop');
const Accessory = require('../models/Accessory');
const Checkout = require('../models/Checkout');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

const createCheckout = async(req, res) => {
    if(await isAuth(req, res)){
        try {
            const userId = req.headers.userid;
            const { fullName, address, productName, quantity } = req.body;

            if(fullName.length >= 5 && address.length >= 5 && productName.length >= 5 && Number.isInteger(quantity) && (quantity >= 1 && quantity <= 10))
            {
                const laptop = await Laptop.findOne({ model: productName });
                const accessory = await Accessory.findOne({ title: productName });

                if(laptop) {
                    await Checkout.create({ fullName, address, productName, url: laptop.url, price: laptop.price, quantity, author: userId });
                    res.status(200).json(
                    {
                        message: 'Checkout has been successfully created!',
                    });
                } else if(accessory) {
                    await Checkout.create({ fullName, address, productName, url: accessory.url, price: accessory.price, quantity, author: userId });
                    res.status(200).json(
                    {
                        message: 'Checkout has been successfully created!',
                    });
                }else {
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
            res.status(400).json(
            {
                message: 'Cannot checkout!',
            });
        }
    }
}

const getCheckouts = async(req, res) => {
    if(await isAdmin(req, res) && await isAuth(req, res)){
        try{
            const checkouts = await Checkout.find();
            res.status(200).json({ 
                message: 'Checkouts!', checkouts
            });
            return;
        }
        catch{
            res.status(500).json({ 
                message: 'Cannot get checkouts!'
            });
            return;
        }
    } else {             
        res.status(400).json({
            message: 'Not Authorized!'
        });
    }
}

const getCheckout = async(req, res) => {
    if(await isAdmin(req, res) && await isAuth(req, res)){
        try{
            const checkout = await Checkout.findById(req.params.id);
            res.status(200).json({ 
                message: 'Checkout', checkout
            });            
        }
        catch{
            res.status(500).json({ 
                message: 'Cannot get checkout with this id!'
            });            
        }
    } else {             
        res.status(400).json({
            message: 'Not Authorized!'
        });
    }
}

const completeCheckout = async(req, res) => {
    if(await isAdmin(req, res) && await isAuth(req, res)){
        const checkoutId = req.params.id;
        try{
            const checkout = await Checkout.findById(checkoutId);
            
            if(!checkout) {
                res.status(400).json({ 
                    message: 'Cannot find the checkout!'
                });                
                return;
            }
            checkout.remove();
            res.status(200)
                .json({
                    message: 'Checkout deleted successfully!'
                });
            return;
        }
        catch{
            res.status(400).json({
                message: 'Cannot find the checkout!'
            });                
            return;
        }
    }
    res.status(400).json({
        message: 'Not Authorized!'
    });
}

module.exports = {
    createCheckout,
    getCheckouts,
    getCheckout,
    completeCheckout
};