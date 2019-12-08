const Laptop = require('../models/Laptop');
const Accessory = require('../models/Accessory');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

const createNewAccessory = async(req, res) => {
    if(await isAuth(req, res)){
        //Check for duplication
        const accessoryWithSameTitle = await Accessory.findOne({ title: req.body.title });
        const accessoryWithSameUrl = await Accessory.findOne({ url: req.body.url });

        if(accessoryWithSameTitle || accessoryWithSameUrl) {
            res.status(409).json(
            {
                message: 'A product already exist!',
            });
            return false;
        }
        
        const authorId = req.headers.userid;
        
        const { title, url, description, price } = req.body;

        if(price < 0.01) {
            res.status(400).json(
            {
                message: 'Price is invalid!',
            });
            return;
        }

        if((!url.startsWith('http') || description.length < 10 || title.length < 5) && authorId)
        {
            res.status(400).json(
            {
                message: 'Product cannot be created!',
            });
            return;
        }

        const newProduct = { title, url, description, price, author: authorId };

        try{
            await Accessory.create(newProduct)                        
            
            res.status(200).json(
                {
                    message: 'Product successfully created!'                  
                }
            );
        }
        catch(err) {            
            res.status(500).json(
            {
                message: 'Product cannot be created!',
            });
        }
    }
}

const deleteAccessory = async(req, res) => {
    const productId = req.params.id;
    const userId = req.headers.userid;

    if(await isAuth(req, res)){
        try {
            const accessory = await Accessory.findById(productId);
            
            if(accessory && (accessory.author == userId || await isAdmin(req, res))) {
                Accessory.deleteOne({
                    _id: productId
                }).then(() => {
                    res.status(200).json(
                    {
                        message: 'Product has been successfully deleted!',
                    });
                })
            } else if(accessory.author !== userId) {
                res.status(400).json(
                {
                    message: 'Cannot delete the product!',
                });
            }else {
                res.status(400).json(
                {
                    message: 'Cannot find the product!',
                });
            }
        }
        catch(err) {
            res.status(500).json(
            {
                message: 'Cannot delete the product!',
            });
        }
    }
}

module.exports = {    
    createNewAccessory,    
    deleteAccessory
};