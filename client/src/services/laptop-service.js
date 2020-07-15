import axios from 'axios';

const laptopService = {
    load: async() => {
        const res = await axios.get('http://localhost:3001/laptops/all');
        
        if(res.status === 200) {
            return res.data.laptops;
        }
        return null;
    }
}

export default laptopService;