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
        const res = await axios.get('http://localhost:3001/laptops/all');
        
        if(res.status === 200) {
            return res.data.laptops;
        }
        return null;
    },
    loadLaptopById: async(id) => {
        const res = await axios.get('http://localhost:3001/laptops/' + id);
        
        if(res.status === 200) {
            return res.data.laptop;
        }
        return null;
    },
    delete: async(id) => {
        let res;
        try {
            res = await axios.delete(`http://localhost:3001/laptops/delete/${id}`);;        
        }
        catch(err) {            
            return err.response.status;
        }
        return res.status;        
    },
    add: async(model, url, description, price) => {        
        let res;
        try {
            res = await axios.post('http://localhost:3001/laptops/add', { model, url, description, price });        
        }
        catch(err) {            
            return err.response.status;
        }
        return res.status;
    }
}

export default laptopService;