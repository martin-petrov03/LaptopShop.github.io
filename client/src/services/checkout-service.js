import axios from 'axios';
import Cookie from 'js-cookie';

const userId = Cookie.get('userId');
const token = Cookie.get('token');

axios.defaults.headers = {
    'Content-Type': 'application/json',
    'token': token,
    'userId': userId
};

const laptopService = {
    load: async() => {
        const res = await axios.get('http://localhost:3001/checkouts/all');
        
        if(res.status === 200) {
            return res.data.checkouts;
        }
        return null;
    },    
    complete: async(id) => {
        let res;        
        try {
            res = await axios.delete(`http://localhost:3001/checkouts/complete/${id}`);
        }
        catch(err) {
            return err.response.status;
        }
        return res.status;        
    },
    add: async(fullName, address, productName, quantity) => {        
        let res;
        try {
            res = await axios.post('http://localhost:3001/checkouts/add', { fullName, address, productName, quantity });
        }
        catch(err) {            
            return err.response.status;
        }
        return res.status;
    },    
}

export default laptopService;