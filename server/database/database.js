const mongoose = require('mongoose');
const uri = 'mongodb+srv://Admin:admin@eshop.zmcak.mongodb.net/LaptopShop?retryWrites=true&w=majority';
//const uri = 'mongodb+srv://Admin:admin@cluster0.7amxv.mongodb.net/test';
//mongodb://localhost:27017/laptop-shop

mongoose.Promise = global.Promise;
module.exports = () => {
    mongoose.set('useCreateIndex', true);       
  
    mongoose.connect(uri, {
        useNewUrlParser: true
    });
    
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            console.log(err);
        }
        
        console.log('Database ready!');
    });

    db.on('error', reason => {
        console.log(reason);
    });
};