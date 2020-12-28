import React from "react";
import "./display.scss";
import deleteIcon from "../../assets/icons/delete-black-18dp.svg";
import editIcon from "../../assets/icons/create-black-18dp.svg";
import profile1 from "../../assets/profile-images/Ellipse -3 (1).png";
import profile2 from "../../assets/profile-images/Ellipse -1.png";
import profile3 from "../../assets/profile-images/Ellipse -8.png";
import profile4 from "../../assets/profile-images/Ellipse -7.png";
import { withRouter } from "react-router-dom";
import EmployeeService from "../../services/employee-service";

const Display = (props) => {
  const employeeService = new EmployeeService();
  const remove=(id)=>{
    
    if(window.confirm("Are you sure to delete?")){
    employeeService.deleteEmployee(id).then(data=>{alert("deleted successfully");window.location.reload();}).catch(err=>console.log("oops")); 
     
    }

  }
  const update=(id)=>{
      props.history.push(`payroll-form/${id}`);
      window.location.reload();
  }
  console.log(props.employeeArray);
  console.log("kirti");
  return (
    <table id="display" className="display">
      <tbody>
        <tr key={-1}>
          <th></th>
          <th>Name</th>
          <th>Gender</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Start Date</th>
          <th>Actions</th>
        </tr>
        {props.employeeArray &&
          props.employeeArray.map((element, ind) => (
            <tr key={ind}>
              <td><img className="profile" 
              src={
                element.profilePic ===
                "../../assets/profile-images/Ellipse -3 (1).png"
                  ? profile1
                  : element.profilePic ===
                    "../../assets/profile-images/Ellipse -1.png"
                  ? profile2
                  : element.profilePic ===
                    "../../assets/profile-images/Ellipse -8.png"
                  ? profile3
                  : profile4
              }
              alt=""
            />
              </td>
              <td>{element.name}</td>
              <td className="gender">{element.gender}</td>
              <td>
                {element.department &&
                  element.department.map((dept) => (
                    <div className="dept-label">{dept}</div>
                  ))}
              </td>
              <td> ₹ {element.salary}</td>
              <td>{element.startDate}</td>
              <td>
                <img
                  src={deleteIcon}
                  onClick={()=>remove(element.empId)}
                  alt="delete"
                />
                <img
                  src={editIcon}
                  onClick={()=>update(element.empId)}
                  alt="edit"
                />
                
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};



export default withRouter(Display);