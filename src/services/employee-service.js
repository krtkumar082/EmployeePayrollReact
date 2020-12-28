import config from '../config/config';
import AxiosService from './axios-service';

export default class  EmployeeService{
    axiosService=new AxiosService();
    baseUrl = config.baseUrl;
    addEmployee(data) {
        return this.axiosService.postService(`${this.baseUrl}/create`, data);
    }
    getAllEmployee() {
        return this.axiosService.getService(`${this.baseUrl}/`);
      }
      getEmployee(id) {
        return this.axiosService.getService(`${this.baseUrl}/get/${id}`);
      }
      deleteEmployee(id) {
        return this.axiosService.deleteService(`${this.baseUrl}/delete/${id}`);
      }
      updateEmployee(id,data) {
        return this.axiosService.putService(`${this.baseUrl}/update/${id}`,data);
      }
}