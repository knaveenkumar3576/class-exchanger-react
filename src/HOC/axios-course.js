import axios from 'axios';

const axiosHandler = axios.create({
    baseURL: 'https://course-matching-system.appspot.com',
    // headers: {
    //     'Access-Control-Allow-Origin': '*'
    // }
})

export default axiosHandler 