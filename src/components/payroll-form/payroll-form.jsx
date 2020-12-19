import React, {useState, useEffect} from  'react';
import profile1 from "../../assets/profile-images/Ellipse -3 (1).png";
import profile2 from "../../assets/profile-images/Ellipse -1.png";
import profile3 from "../../assets/profile-images/Ellipse -8.png";
import profile4 from "../../assets/profile-images/Ellipse -7.png";
import './payroll-form.scss';
import logo from '../../assets/images/logo.png';
import { useParams, Link, withRouter } from 'react-router-dom';
import EmployeeService from '../../services/employee-service';

const PayrollForm = (props) =>{
    let employeeService=new EmployeeService();
    let initialValue = {
        name: '',
        profileArray: [
            { url: '../../assets/profile-images/Ellipse -3 (1).png' },
            { url: '../../assets/profile-images/Ellipse -1.png' },
            { url: '../../assets/profile-images/Ellipse -8.png' },
            { url: '../../assets/profile-images/Ellipse -7.png' }
        ],
        allDepartment: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departmentValue: [],
        gender: '',
        salary: '400000',
        day: '1',
        month: 'Jan',
        year: '2020',
        startDate: '',
        notes: '',
        id: '',
        profileUrl: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''
        }
    }
    const [formValue, setForm] = useState(initialValue);
    const params = useParams();

    useEffect(() => {
        if (params.id) {   
              getDataById(params.id);
        }
      }, []);

      const getDataById = (id) => {
        console.log(id);
        employeeService
          .getEmployee(id)
          .then((data) => {
            let obj = data.data;
            setData(obj);
            console.log(data.data);
          })
          .catch((err) => {
            console.log("err is ", err);
          });
      };
    
    const setData = (obj) => {
        console.log(obj);
        let array = obj.startDate.split(" ");
        setForm({
          ...formValue,
          ...obj,
          id: obj.id,
          departmentValue: obj.department,
          isUpdate: true,
          day: array[0],
          month: array[1],
          year: array[2],
        });
      };


//    if(props.location.state){
//        Object.assign(formValue,props.location.state[1]);
//        formValue.isUpdate=true;
//        const strs=formValue.startDate.split(" ");
//        formValue.day=strs[0];
//        formValue.month=strs[1];
//        formValue.year=strs[2];
//    }

    

    const changeValue  = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const onCheckChange = (name) =>{
        let index = formValue.departmentValue.indexOf(name);
        let checkArray = [...formValue.departmentValue]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({ ...formValue, departmentValue: checkArray });
    }
    const getChecked = (name) =>{
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }

    const validData = async () =>{
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''
        }
        if (!formValue.name.match('^[A-Z]{1}[a-zA-Z]{2,}')) {
            error.name = 'Name is Invalid!!'
            isError = true;
        }
        if (formValue.gender.length < 1) {
            error.gender = 'Gender is a required field'
            isError = true;
        }
        
        if ((formValue.salary.valueOf()<400000)||(formValue.salary.valueOf()>500000)) {
            error.salary = 'Salary should be between 4,00,000 and 5,00,000!!'
            isError = true;
        }
        if (formValue.profileUrl.length < 1) {
            error.profileUrl = 'Profile is a required field'
            isError = true;
        }

        if (formValue.departmentValue.length < 1) {
            error.department = 'Department is a required field'
            isError = true;
        }

        await setForm({ ...formValue, error: error })
        return isError;

    }

    const save = async (event) =>{
        event.preventDefault();
        if (await validData()){
            console.log('error', formValue);
            return;
        }
        let object = {
            name: formValue.name,
            profileUrl: formValue.profileUrl,
            gender: formValue.gender,
            department: formValue.departmentValue,
            salary: formValue.salary,
            startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
            notes: formValue.notes,
            id: formValue.id
        }


       console.log(formValue.isUpdate);
      if(formValue.isUpdate){
        employeeService.updateEmployee(formValue.id,object).then(data =>  {
            console.log("data updated");
            alert("Data updated :")
            props.history.push('')
        }).catch((err)=> console.log("err on update"));
    }
     else {employeeService.addEmployee(object).then(data =>  {
            console.log("data added");
            alert("Data added :")
            props.history.push('')
        }).catch((err)=> console.log("err on add"));
    }

    }
    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});
        console.log(formValue);
    }

    // Components
    const profiles = [profile1, profile2, profile3, profile4];

    function ProfilePic(props){     
        return (
            <label>
                <input type="radio" name="profileUrl" checked={formValue.profileUrl==props.profile} value={props.profile} onChange={changeValue} />
                <img className="profile" src={profiles[formValue.profileArray.map(x=>x.url).indexOf(props.profile)]} />
            </label>
        );
    }

    const departments = ["HR", "Sales", "Finance", "Engineer", "Others"];

    function Department(props){
        return (<>
            <input className="checkbox" type="checkbox" id={props.department} onChange={() => onCheckChange(props.department)} 
                    defaultChecked={getChecked(props.department)} name="department" value={props.department} />
            <label className="text" htmlFor={props.department}>{props.department}</label>
        </>);
    }
    const days = Array.from(new Array(31),(val,index)=>index+1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = [2020,2019,2018,2017,2016];
    return (
        <div className="payroll-main">
            <header className='header row center'>
                <div className="logo">
                    <img src={logo} alt="" />
                    <div>
                        <span className="emp-text">EMPLOYEE</span> <br/>
                        <span className="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </header>
            <div className="form-content">
                <form className="form" action="#" onReset={reset} onSubmit={save}>
                    <div className="form-head">Employee Payroll Form</div>
                    <div className="row-content">
                        <label className="label text" hmtlFor="name">Name</label>
                        <input className="input" type="text" id="name" name="name" placeholder="Your Name.."  value={formValue.name} onChange={changeValue} />
                    </div>
                    <div className="error">{formValue.error.name}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="profileUrl">Profile image</label>
                        <div className="profile-radio-content">
                            {formValue.profileArray.map((profile)=><ProfilePic key={profile.url.toString()} profile={profile.url}/>)}
                        </div>
                    </div>
                    <div className="error">{formValue.error.profileUrl}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" name="gender" value="male"onChange={changeValue} />
                            <label className="text" htmlFor="male">male</label>
                            <input type="radio" id="female" name="gender" value="female"onChange={changeValue} />
                            <label className="text" htmlFor="female">female</label>
                        </div>
                    </div>
                    <div className="error">{formValue.error.gender}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="department">Department</label>
                        <div>
                            {departments.map((department) => <Department key={department.toString()} department={department} />)}
                        </div>
                    </div>
                    <div className="error">{formValue.error.department}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="salary">Choose Your Salary: </label>
                        <input className="input" type="range" onChange={changeValue} name="salary" id="salary" min="300000" max="500000" step="100" defaultValue="400000" />
                        <output className="salary-output text" htmlFor="salary">{formValue.salary}</output>
                    </div>
                    <div className="error">{formValue.error.salary}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <div>
                            <select onChange={changeValue} id="day" className="date" name="day">
                                {days.map((item) => <option key={"day"+item.toString()} value={item}>{item}</option> )}
                            </select>
                            <select onChange={changeValue} id="month" className="date" name="month">
                                {months.map((item) => <option key={"month"+item.toString()} value={item.slice(0,3)}>{item}</option> )}
                            </select>
                            <select onChange={changeValue} id="year" className="date" name="year">
                                {years.map((item) => <option key={"year"+item.toString()} value={item}>{item}</option> )}
                            </select>
                        </div>
                    </div>
                    <div className="error">{formValue.error.startDate}</div>
                    <div className="row-content">
                        <label className="label text" htmlFor="notes">Notes</label>
                        <textarea onChange={changeValue} id="notes" value={formValue.notes} className="input" name="notes" 
                            placeholder="additional info.." style={{height: '100%'}}></textarea>
                    </div>
                    <div className="buttonParent">
                        <Link to="/home" className="resetButton button cancelButton">Cancel</Link>
                        <div className="submit-reset">
                            <button type="submit" className="button submitButton" id="submitButton" >{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="reset" onClick={reset} className="resetButton button">Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default withRouter(PayrollForm);