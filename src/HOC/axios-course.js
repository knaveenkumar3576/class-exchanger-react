import axios from 'axios';

const axiosHandler = axios.create({
    baseURL: 'https://course-matching-system.appspot.com/',
    // xsrfHeaderName : "X-CSRFTOKEN",
    // xsrfCookieName : "csrftoken"
})

export default axiosHandler