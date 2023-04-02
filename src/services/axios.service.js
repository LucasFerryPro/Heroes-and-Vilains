import axios from 'axios'
let root = 'https://apidemo.iut-bm.univ-fcomte.fr/herocorp/';

const myAxios = axios.create({
    baseURL: root,
    withCredentials: true

});
myAxios.interceptors.response.use(
    res => {
        console.log("OK => "+JSON.stringify(res))
        return res
    },
    error => {
        console.log("ERROR => "+JSON.stringify(error))
        return Promise.reject(error)
    }
)

export default myAxios;