const User = require('../models/User');
const Laptop = require('../models/Laptop');
const isAuth = require('../middleware/is-auth');

const createNewProduct = async(req, res) => {
    if(await isAuth(req, res)){
        //Check for duplication
        const product = await Laptop.findOne({ name: req.body.model });
        
        if(product) {
            res.status(409).json(
            {
                message: 'A product with this name already exist!',
            });
            return false;
        }
        
        const authorId = req.headers.userid;
        
        const { model, url, description, price } = req.body;

        if(!url.startsWith('http'))
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
// console.log(req.headers.userid);
// console.log(req.headers.token);


// const deleteProduct = async(req, res) => {
//     const productId = req.params.id;

//     if(await isAuth(req, res)){
//         Product.findById(productId).then(product => {
//             if(product) {
//                 Product.deleteOne({
//                     _id: productId 
//                 }).then(() => {
//                     res.status(200).json(
//                     {
//                         message: 'Product has been successfully deleted!',
//                     });
//                 })
//             }else {
//                 res.status(500).json(
//                 {
//                     message: 'Cannot find the product!',
//                 });                
//             }
//         })
//         .catch(err => {
//             res.status(500).json(
//             {
//                 message: 'Cannot find the product!',
//             });
//         });
//     }
// }

module.exports = {    
    createNewProduct,    
    // deleteProduct
};