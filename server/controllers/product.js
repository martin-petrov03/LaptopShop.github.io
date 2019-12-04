const User = require('../models/User');
const Laptop = require('../models/Laptop');
const isAuth = require('../middleware/is-auth');

const createNewProduct = async(req, res) => {
    if(await isAuth(req, res)){
        //Check for duplication
        const productWithSameModel = await Laptop.findOne({ model: req.body.model });
        const productWithSameUrl = await Laptop.findOne({ url: req.body.url });

        if(productWithSameModel || productWithSameUrl) {
            res.status(409).json(
            {
                message: 'A product already exist!',
            });
            return false;
        }
        
        const authorId = req.headers.userid;
        
        const { model, url, description, price } = req.body;

        if(!url.startsWith('http') || description.length < 10 || model.length < 5)
        {
            res.status(500).json(
            {
                message: 'Product cannot be created!',
            });
            return;
        }

        const newProduct = { model, url, description, price, author: authorId };

        try{
            await Laptop.create(newProduct)                        
            
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

module.exports = {    
    createNewProduct,    
    // deleteProduct
};