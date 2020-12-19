import config from '../config/config';
const axios = require('axios').default;

export default class AxiosService{
    postService(url='',payload=null,tokenRequired=false,httpOptions=null){
      return axios.post(url, payload,tokenRequired && httpOptions);
    }

    
    
}
//module.exports = new AxiosService();
