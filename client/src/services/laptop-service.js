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
        const res = await axios.get(BASE_URL + 'laptops/all');
        
        if(res.status === 200) {
            return res.data.laptops;
        }
        return null;
    },
    loadLaptopById: async(id) => {
        const res = await axios.get(BASE_URL + 'laptops/' + id);
        
        if(res.status === 200) {
            return res.data.laptop;
        }
        return null;
    },
    delete: async(id) => {
        let res;
        try {
            res = await axios.delete(BASE_URL + `laptops/delete/${id}`);;        
        }
        catch(err) {            
            return err.response.status;
        }
        return res.status;        
    },
    add: async(model, url, description, price) => {        
        let res;
        try {
            res = await axios.post(BASE_URL + 'laptops/add', { model, url, description, price });        
        }
        catch(err) {            
            return err.response.status;
        }
        return res.status;
    }
}

export default laptopService;