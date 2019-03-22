import axios from 'axios';

// const instance = axios.create({
//     baseURL:'http://localhost:4200'
// })

const instance = axios.create({
    baseURL:'https://birthrider-backend.herokuapp.com/'
});

export default instance;