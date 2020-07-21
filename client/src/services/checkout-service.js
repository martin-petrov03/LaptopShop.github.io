import axios from 'axios';
import Cookie from 'js-cookie';
import config from './config';
const BASE_URL = config.BASE_URL;

const userId = Cookie.get('userId');
const token = Cookie.get('token');

axios.defaults.headers = {
    'Content-Type': 'application/json',
    'token': token,
    'userId': userId
};

const laptopService = {
    load: async() => {
        const res = await axios.get(BASE_URL + 'checkouts/all');
        
        if(res.status === 200) {
            return res.data.checkouts;
        }
        return null;
    },
    loadById: async(id) => {
        const res = await axios.get(BASE_URL + 'checkouts/' + id);
        
        if(res.status === 200) {
            return res.data.checkout;
        }
        return null;
    },
    complete: async(id) => {
        let res;        
        try {
            res = await axios.delete(BASE_URL + `checkouts/complete/${id}`);
        }
        catch(err) {
            return err.response.status;
        }
        return res.status;        
    },
    add: async(fullName, address, productName, quantity) => {        
        let res;
        try {
            res = await axios.post(BASE_URL + 'checkouts/add', { fullName, address, productName, quantity });
        }
        catch(err) {            
            return err.response.status;
        }
        return res.status;
    },    
}

export default laptopService;