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
        const res = await axios.get('http://localhost:3001/accessories/all');
        
        if(res.status === 200) {
            return res.data.accessories;
        }
        return null;
    },
    loadAccessoryById: async(id) => {
        const res = await axios.get('http://localhost:3001/accessories/' + id);
        
        if(res.status === 200) {
            return res.data.accessory;
        }
        return null;
    },
    delete: async(id) => {
        let res;        
        try {
            res = await axios.delete(`http://localhost:3001/accessories/delete/${id}`);
        }
        catch(err) {
            return err.response.status;
        }
        return res.status;        
    },
    add: async(title, url, description, price) => {        
        let res;
        try {
            res = await axios.post('http://localhost:3001/accessories/add', { title, url, description, price });   
        }
        catch(err) {            
            return err.response;
        }
        return res.status;
    }
}

export default laptopService;