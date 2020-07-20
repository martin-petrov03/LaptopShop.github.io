const mongoose = require('mongoose');
const uri = 'mongodb+srv://Admin:admin@cluster0.7amxv.mongodb.net/LaptopShop?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;
module.exports = () => {
    mongoose.set('useCreateIndex', true);
    //mongodb+srv://Admin:<password>@cluster0-ehp1t.mongodb.net/<dbname>?retryWrites=true&w=majority
    //mongodb://localhost:27017/laptop-shop
  
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