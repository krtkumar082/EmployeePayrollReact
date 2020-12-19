import config from '../config/config';
import AxiosService from './axios-service';

export default class  EmployeeService{
    axiosService=new AxiosService();
    baseUrl = config.baseUrl;
    addEmployee(data) {
        return this.axiosService.postService(`${this.baseUrl}/employee`, data);
    }
    getAllEmployee() {
        return this.axiosService.getService(`${this.baseUrl}/employee`);
      }
      getEmployee(id) {
        return this.axiosService.getService(`${this.baseUrl}/employee/${id}`);
      }
      deleteEmployee(id) {
        return this.axiosService.deleteService(`${this.baseUrl}/employee/${id}`);
      }
      updateEmployee(id,data) {
        return this.axiosService.putService(`${this.baseUrl}/employee/${id}`,data);
      }
}