



import React, { Component } from 'react'
import { useEffect,useState ,useRef} from 'react';
import './Employes.css'
import api from '../../api/index';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faUndo, faFilter, faTable, faFileAlt, faSave, faDownload,faColumns,faAngleDoubleRight,faCog } from '@fortawesome/free-solid-svg-icons';



    const Employes=()=>{
      const [searchColumn, setSearchColumn] = useState('All Columns');
      const [showDropdown, setShowDropdown] = useState(false);
      const [searchInitiated, setSearchInitiated] = useState(false);
      const [filteredEmployees, setFilteredEmployees] = useState([]);

        const [employes, setEmployes] = useState([]);
        const [dep,setDep]=useState([]);
        const [selecteddep,setSelecteddep]=useState([]);
        

      
        const toggleDropdown = () => {
          setShowDropdown(!showDropdown);
        };

        const [EmployeeID, setEmployeeID] = useState('');
        const [emp,setEmp]=useState([]);
        const [selectedemp,setSelectedemp]=useState([]);


        const [wor,setWor]=useState([]);
        const [selectedwork,setSelectedwork]=useState([]);


        const [nat,setNat]=useState([]);
        // const [selectednat,setSelectednat]=useState([]);

        const [bank,setBank]=useState([]);
        const [selectedbank,setSelectedbank]=useState([]);

        const fetchban=async()=>{
          try{
            const response=await api.get('/api/banks')
            setBank(response.data)
          }catch(error){
            console.error('error fetching payees',error)
          }
        }
       useEffect(()=>{
        fetchban();
       },[])

       const handlebanchange=(event)=>{
        setSelectedbank(event.target.value)
       }
        const fetchnat=async()=>{
          try{
            const response=await api.get('/api/nationalities')
            setNat(response.data)
          }catch(error){
            console.error('error fetching payess',error)
          }
        }
        useEffect(()=>{
          fetchnat();
        },[])
        // const handlenatchange=(event)=>{
        //   setSelectednat(event.target.nat)
        // }
        const fetchwo=async()=>{
          try{
            const response=await api.get('/api/locations')
            setWor(response.data)
          }catch(error){
            console.error('errror fetching payee',error)
          }
        }
        useEffect(()=>{
          fetchwo();
        },[])
       const  handlewochange=(event)=>{
          setSelectedwork(event.target.value);
        }
        const fetchem=async()=>{
          try{
            const response=await api.get('/api/employers')
            setEmp(response.data)
          }catch(error){
            console.error('errpr fetching payees',error)
          }
        }
        useEffect(()=>{
          fetchem();
        },[])
        const handleemchange=(event)=>{
          setSelectedemp(event.target.value)
        }
        const fetchde = async () => {
          try {
            const response = await api.get('/api/departments');
            setDep(response.data);
            console.log(response.data)
          } catch (error) {
            console.error('Error fetching payees:', error);
          }
        };
        useEffect(() => {
          fetchde();
        }, []);
        const handledepchange=(event)=>{
          setSelecteddep(event.target.value)
        };
  const [formData, setFormData] = useState({
   
    Name:'',
    Birthdaydate:'',
    age:'',
    EmployeeID:'',
    Qid:'',
    Nationality:'',
    Title:'',
    Status:'',
    BloodType:'',
    Religion:'',
    Smoker:'',
    empimage:'',
    Gender:'',

    Hiredate:'',
    Employer:'',
    Worklocation:'',
    Job:'',
    Department:'',
    WorkingStatus:'',
    Resign:'',



    Bankacc:'',
    Bankname:'',
    iban:'',
    BankCode:'',




    Phone:'',
    Email:'',
    Mobile:'',
    Fax:'',
    currentAddress:'',
    HomeAddress:'',
   
    
   
  
  });
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef();
  

  useEffect(() => {
    fetchEmployes();
  }, []);

  const fetchEmployes = async () => {
    try {
      const response = await api.get('/api/employes');
      setEmployes(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching Locationss:', error);
    }
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // If the bank name is being changed, update the BankCode as well
    if (name === 'Bankname') {
      const selectedBank = bank.find((payee) => payee._id === value);
      console.log(selectedBank)
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        BankCode: selectedBank ? selectedBank.BANK_CODE : ''
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response=  await api.post('/api/employes', formData);
      // setEmployeeID(response.data.EmployeeID);
      setFormData({
        Name:'',
        Birthdaydate:'',
        age:'',
        EmployeeID:'',
        Qid:'',
        Nationality:'',
        Title:'',
        Status:'',
        BloodType:'',
        Religion:'',
        Smoker:'',
        empimage:'',
        Gender:'',
        Hiredate:'',
        Employer:'',
        Worklocation:'',
        Job:'',
        Department:'',
        WorkingStatus:'',
        Resign:'',
        Bankacc:'',
        Bankname:'',
        iban:'',
        BankCode:'',
        Phone:'',
        Email:'',
        Mobile:'',
        Fax:'',
        currentAddress:'',
        HomeAddress:'',
       
      });
      fetchEmployes();
      console.log(formData)
    } catch (error) {
      console.error('Error adding Departments:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(employes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employes');
    XLSX.writeFile(workbook, 'employee.xlsx');
  };

  const importFromExcel = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/api/employs/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchEmployes();
      console.log('Locations imported successfully');
    } catch (error) {
      console.error('Error importing locations:', error);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setFormData((prevState) => ({
      ...prevState,
      age: age
    }));
  };
 
  useEffect(() => {
    console.log('Bank Array:', bank); // Log bank array
  }, [bank]);

  const styles = {
    color: '#FFFFFF', // White text color
    backgroundColor: '#2196F3', // Blue background color
    fontFamily: 'Arial, sans-serif', // Font family
    fontWeight: 'bold', // Bold text
    borderBottom: '4px solid #1565C0', // Darker blue bottom border
    padding: '15px', // Padding
    textAlign: 'center', // Center align text
    borderRadius: '5px', // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
    margin: '20px 0' // Margin for spacing
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchClick = () => {
    setSearchInitiated(true);
    const filtered = employes.filter((employe) => {
         if (searchColumn === 'All Columns') {
      return Object.values(employe).some((value) =>
        value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
      );
    } else {
      return employe[searchColumn] ? employe[searchColumn].toString().toLowerCase().includes(searchTerm.toLowerCase()) : false;
    }
    });
    setFilteredEmployees(filtered);
  };

  const handleResetClick = () => {
    setSearchInitiated(false);
    setSearchTerm('');
    setSearchColumn('All Columns');
    setFilteredEmployees([]);
  };


        return (
            <div className='EmployerContainer'  >
              <div className='EmployerBox' style={{overflow:'auto'}}>
              <div className='hea'>
   <div >
   <h2 style={styles}>Employees</h2>
   </div>
        <div className='head' style={dd}>
         
          <button onClick={toggleForm} className="btn btn-primary mb-3">{showForm ? 'close' : 'Add'}</button>
          <button onClick={exportToExcel} className="btn btn-primary mb-3">
              Export 
            </button>
            <button onClick={handleImportClick} className="btn btn-primary mb-3">
              Import
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={importFromExcel}
              accept=".xlsx, .xls"
            />
        </div>
    </div>
        {showForm && (
          <form onSubmit={handleSubmit}   >
           
          <div >
          
            <div  style={{overflowY:'auto'}} className='foEmp'>
            <h1 style={{ 
              textAlign:'center',
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
    HRMS EmployeeProfile
  </h1>
  <div style={{ position: 'absolute', top: '30px', right: '30px', cursor: 'pointer', padding: '5px', border: '1px solid #ccc', borderRadius: '5px',backgroundColor:'white' }}>
  <FontAwesomeIcon icon={faTimes} onClick={handleCloseForm} style={{ fontSize: '14px' }} />
</div>
            {/* <h1 style={{ textAlign: 'center', marginBottom: '20px' }} >HRMS EmployeeProfile</h1> */}
          <div className='formbody' style={{margin:'70px'}}>
          <div className="form-group" >
            <div className="form-groupN">
              <label>Name <span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="Name" value={formData.Name} onChange={handleChange} required />
            </div>
            <div className="t">
      <div>
      <label>Birthday Date</label>
          <input
            type="date"
            className="form-control"
            name="Birthdaydate"
            value={formData.Birthdaydate}
            onChange={(e) => {
              handleChange(e);
              calculateAge(e.target.value);
            }}
          />
      </div>
      <div className="form-group">
          <label>Age</label>
          <input
            type="text"
            className="form-control"
            name="age"
            value={formData.age}
            onChange={handleChange}
            readOnly
          />
        </div>
          
        </div>
      
            
            
            </div>
           <div className='three'>
           <div className="form-group">
              <label>QID # <span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="Qid" value={formData.Qid} onChange={handleChange} required />
            </div>
            <div>
          <label>EmployeeID #  <span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="EmployeeID" value={formData.EmployeeID} onChange={handleChange}  />
          </div>
          <div className="form-group">
            <label >Nationality</label>
            <select value={formData.Nationality} name='Nationality' onChange={handleChange}>
                  <option value="">Select nationality</option>
                  {nat.map((payee) => (
                    <option key={payee.id} value={payee.id}>
                      {payee.NAME_E}
                    </option>
                  ))}
                </select>
            </div>
            
            </div> 
            
        
            <div className='four'>
            <div className="form-group">
            <label >Title</label>
            {/* <select className="form-control"> */}
            <select value={formData.Title} name='Title' onChange={handleChange}>
            <option value="">Select title</option>
        <option value="Mr">Mr</option>
        <option value="Ms">Ms</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
    </select>
            </div>
            
            <div className="form-group">
            <label >Status</label>
            <select value={formData.Status} name='Status' onChange={handleChange}>
              <option value="">select maritial status</option>
        <option value="married">Married</option>
        <option value="divorced">Divorced</option>
        <option value="single">Single</option>
        <option value="widowed">Widowed</option>
    </select>
            </div>
            <div className="form-group">
            <label >Gender</label>
            <select value={formData.Gender} name='Gender' onChange={handleChange}>
            <option value="">Select Gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
    </select>
            </div>
            </div>
            
          <div className='five'>
          <div className="form-group">
            <label >BloodType</label>
            <select value={formData.BloodType} name='BloodType' onChange={handleChange}>
            <option value="">Selecttype</option>
        <option value="A+">A+</option>
        <option value="A?">A?</option>
        <option value="AB+">AB+</option>
        <option value="AB?">AB?</option>
        <option value="B+"> B+ </option>
        <option value="B?">B?</option>
        <option value="O+">O+</option>
        <option value="O?">O?</option>
    </select>
            </div>

            <div className="form-group">
            <label >Religion</label>
            <select value={formData.Religion} name='Religion' onChange={handleChange}>
            <option value="">choosereligion</option>
        <option value="islam">Islam</option>
        <option value="christanity">Christanity</option>
        <option value="judaism">judaism</option>
        <option value="hinduism">hinduism</option>
        <option value="Bhuduism"> Bhuduism </option>
        <option value="Others">Others</option>
  
    </select>
    </div>
    <div className="form-group">
            <label >Smoker</label>
            <select value={formData.Smoker} name='Smoker' onChange={handleChange}>
            <option value="">choose</option>
        <option value="yes">Yes</option>
        <option value="No">No</option>
        
  
    </select>
    
            </div>

          </div>
            
           

    
            <div className="form-group" style={{width:'250px'}}>
            <label >Employeeimage</label>
            <input
                type="file"
               className="form-control"
            
               name="empimage"
               value={formData.empimage}
               onChange={handleChange}
               />
            </div>

            
           
           
            <div>
  <h2 style={{ 
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
    Job Details
  </h2>
</div>

            <div className="form-groupH">
            <label >Hiredate</label>
            <input
                type="date"
               className="form-control"
            
               name="Hiredate"
               value={formData.Hiredate}
               onChange={handleChange}
               />
            </div>
           <div className='ht'>
           <div className="form-group">
            <label >Employer <span style={{ color: 'red' }}>*</span></label>
            <select value={formData.Employer} name='Employer' onChange={handleChange} required>
                  <option value="">Select Employer</option>
                  {emp.map((payee) => (
                    <option key={payee.id} value={payee.id}>
                      {payee.name}
                    </option>
                  ))}
                </select>
            </div>
            <div className="form-group">
            <label >Worklocation  <span style={{ color: 'red' }}>*</span></label>
            <select value={formData.Worklocation} name='Worklocation' onChange={handleChange} required>
                  <option value="">Select Location</option>
                  {wor.map((payee) => (
                    <option key={payee.id} value={payee.id}>
                      {payee.LOC_NAME}
                    </option>
                  ))}
                </select>
            </div>
           </div>
            <div className='hthree'>
            <div className="form-group">
            <label >Job</label>
            <input
                type="text"
               className="form-control"
            
               name="Job"
               value={formData.Job}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label >Department</label>
            <select value={formData.Department} name='Department' onChange={handleChange}>
                  <option value="">Select department</option>
                  {dep.map((payee) => (
                    <option key={payee.id} value={payee.id}>
                      {payee.departmentname}
                    </option>
                  ))}
                </select>
            </div>
            </div>
<div className='hfour'>
<div className="form-group">
            <label >WorkingStatus</label>
            <select value={formData.WorkingStatus} name='WorkingStatus' onChange={handleChange}>
            <option value="">choose</option>
        <option value="working">Working</option>
        <option value="Suspended">Suspended</option>
        <option value="Resigned">Resigned</option>
        <option value="in Vacation">In vacation</option>
        <option value="Dead">Dead</option>
    </select>
            </div>
           
            <div className="form-group">
            <label >Resigndate</label>
            <input
                type="date"
               className="form-control"
            
               name="Resign"
               value={formData.Resign}
               onChange={handleChange}
               />
            </div>
</div>
          
<div>
  <h2 style={{ 
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
    Bank Details
  </h2>
</div>
            <div className='B'>
            <div className="form-group">
  <label>Bank Name <span style={{ color: 'red' }}>*</span></label>
  <select
    value={formData.Bankname}
    name='Bankname'
    onChange={handleChange}
    className="form-control"
  >
    <option value="">Select bank</option>
    {bank.map((payee) => (
      <option key={payee._id} value={payee._id}>
        {payee.NAME_E}
      </option>
    ))}
  </select>
</div>
            <div className="form-group">
            <label >Iban <span style={{ color: 'red' }}>*</span></label>
            <input
                type="text"
               className="form-control"
            
               name="iban"
               value={formData.iban}
               onChange={handleChange}
               required
               />
            </div>
             
            </div>
           <div className='BB'>
           <div className="form-group">
            <label >Bankacc</label>
            <input
                type="text"
               className="form-control"
            
               name="Bankacc"
               value={formData.Bankacc}
               onChange={handleChange}
               />
            </div>
           
            <div className="form-group">
            <label >BankCode</label>
            {/* <input
                type="text"
               
               name="BankCode"
               value={formData.BankCode}
               onChange={handleChange}
               /> */}
                <input
    type="text"
    className="form-control"
    name="BankCode"
    value={formData.BankCode}
    onChange={handleChange}
    readOnly
  />
              
                 
            </div>
           </div>

           <div>
  <h2 style={{ 
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
    Contact Info
  </h2>
</div>
            <div className='C'>
            <div className="form-group">
            <label >Phone</label>
            <input
                type="text"
               className="form-control"
            
               name="Phone"
               value={formData.Phone}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label >Email</label>
            <input
                type="Email"
               className="form-control"
            
               name="Email"
               value={formData.Email}
               onChange={handleChange}
               />
            </div>
            </div>
               
            <div className='Ct'>
            <div className="form-group">
            <label >Mobile</label>
            <input
                type="text"
               className="form-control"
            
               name="Mobile"
               value={formData.Mobile}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label >Fax</label>
            <input
                type="text"
               className="form-control"
            
               name="Fax"
               value={formData.Fax}
               onChange={handleChange}
               />
            </div>
            </div>
            <div className="form-group">
            <label >CurrentAddress</label>
            <input
                type="text"
               className="form-control"
            
               name="currentAddress"
               value={formData.currentAddress}
               onChange={handleChange}
               />
            </div>
            <div className="form-group">
            <label >HomeAddress</label>
            <input
                type="text"
               className="form-control"
            
               name="HomeAddress"
               value={formData.HomeAddress}
               onChange={handleChange}
               />
            </div>
         
           
      
         
           
           
          </div>
          <button type="submit" style={{ width: '170px', position: 'relative' }}>
    Add Employes
    <i className="fas fa-edit" style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)' }}></i>
</button>

            </div>
          </div>
          </form>
        )}

<div className='tt'>
<div style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ border: '1px solid #ccc', padding: '5px', display: 'flex', alignItems: 'center', borderRadius: '5px' }}>
    <FontAwesomeIcon icon={faSearch} style={{ marginRight: '10px' }} />
    <select
      value={searchColumn}
      onChange={(e) => setSearchColumn(e.target.value)}
      style={{ padding: '5px', border: 'none', outline: 'none', background: 'transparent' }}
    >
      <option value="All Columns">All Columns</option>
      <option value="EmployeeID">EmployeeID</option>
      <option value="Name">Name</option>
      <option value="Job">Job</option>
      <option value="Department">Department</option>
      <option value="Employer">Employer</option>
      <option value="Worklocation">Worklocation</option>
      <option value="Nationality">Nationality</option>
      <option value="Gender">Gender</option>
      <option value="Bankacc">Bankacc</option>
      <option value="Hiredate">Hiredate</option>
      <option value="Birthdaydate">Birthdaydate</option>
      <option value="Phone">Phone</option>
      <option value="Mobile">Mobile</option>
      <option value="Email">Email</option>
      <option value="Status">Status</option>
      <option value="BankCode">BankCode</option>
    </select>
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearchChange}
      style={{ padding: '5px', border: 'none', outline: 'none' }}
    />
  </div>
  <button onClick={handleSearchClick} style={{ width: '85px', marginLeft: '10px', backgroundColor: '#ECECEC', color: '#555', padding: '10px 20px', border: '1px solid black', borderRadius: '5px', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px' }}>
  <FontAwesomeIcon icon={faAngleDoubleRight} />

          Go
        </button>
        <button onClick={handleResetClick} style={{ width: '100px', marginLeft: '10px', backgroundColor: '#ECECEC', color: '#555', padding: '10px 20px', border: '1px solid black', borderRadius: '5px', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', transition: 'background-color 0.3s, color 0.3s' }}>
        <FontAwesomeIcon icon={faUndo} />
          Reset
        </button>
  <div style={{ marginLeft: '10px', position: 'relative' }}>
  <button style={{ width: '110px', backgroundColor: '#ECECEC', color: '#555', padding: '10px 20px', border: '1px solid black', borderRadius: '5px', cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', transition: 'background-color 0.3s, color 0.3s' }} onClick={toggleDropdown}>
  <FontAwesomeIcon icon={faCog} />
            Actions
          </button>
    { showDropdown&& (
              <div style={{ position: 'absolute', top: '100%', left: '0', backgroundColor: 'white', border: '1px solid #ccc', boxShadow: '0 8px 16px rgba(0,0,0,0.2)', zIndex: '1' }}>
                <ul style={{ listStyle: 'none', margin: '0', padding: '0',width:'170px' }}>
                  <li style={{ padding: '8px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faColumns} style={{ marginRight: '10px' }} />
                    Select Columns
                  </li>
                  <li style={{ padding: '8px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faFilter} style={{ marginRight: '10px' }} />
                    Filter
                  </li>
                  <li style={{ padding: '8px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faTable} style={{ marginRight: '10px' }} />
                    Rows Per Page
                  </li>
                  <li style={{ padding: '8px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '10px' }} />
                    Format
                  </li>
                  <li style={{ padding: '8px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faUndo} style={{ marginRight: '10px' }} />
                    Flashback
                  </li>
                  <li style={{ padding: '8px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faSave} style={{ marginRight: '10px' }} />
                    Save Report
                  </li>
                  <li style={{ padding: '8px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faUndo} style={{ marginRight: '10px' }} />
                    Reset
                  </li>
                  <li style={{ padding: '8px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faDownload} style={{ marginRight: '10px' }} />
                    Download
                  </li>
                </ul>
              </div>
            )}
  </div>
</div>




      <table className="table">
        <thead>
          <tr>
            <th>EmployeeID</th>
            <th>Name</th>
            <th>Job</th>
            <th>Department</th>
            <th>Employer</th>
            <th>Worklocation</th>
            <th>Nationality</th>
            <th>Gender</th>
            <th>Bankacc</th>
            <th>Hiredate</th>
            <th>Birthdaydate</th>
            <th>Phone</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Status</th>
            <th>BankCode</th>
          </tr>
        </thead>
        
        <tbody>
          {searchInitiated
            ? filteredEmployees.map((employe) => (
                <tr key={employe._id}>
                  <td>{employe.EmployeeID}</td>
                  <td>{employe.Name}</td>
                  <td>{employe.Job}</td>
                  <td>{employe.Department}</td>
                  <td>{employe.Employer}</td>
                  <td>{employe.Worklocation}</td>
                  <td>{employe.Nationality}</td>
                  <td>{employe.Gender}</td>
                  <td>{employe.Bankacc}</td>
                  <td>{employe.Hiredate}</td>
                  <td>{employe.Birthdaydate}</td>
                  <td>{employe.Phone}</td>
                  <td>{employe.Mobile}</td>
                  <td>{employe.Email}</td>
                  <td>{employe.Status}</td>
                  <td>{employe.BankCode}</td>
                </tr>
              ))
            : employes.map((employe) => (
                <tr key={employe._id}>
                  <td>{employe.EmployeeID}</td>
                  <td>{employe.Name}</td>
                  <td>{employe.Job}</td>
                  <td>{employe.Department}</td>
                  <td>{employe.Employer}</td>
                  <td>{employe.Worklocation}</td>
                  <td>{employe.Nationality}</td>
                  <td>{employe.Gender}</td>
                  <td>{employe.Bankacc}</td>
                  <td>{employe.Hiredate}</td>
                  <td>{employe.Birthdaydate}</td>
                  <td>{employe.Phone}</td>
                  <td>{employe.Mobile}</td>
                  <td>{employe.Email}</td>
                  <td>{employe.Status}</td>
                  <td>{employe.BankCode}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
       {/* <div className='tt'>
        <h1 style={{textAlign:'left'}}>hello</h1>
       <table className="table">
          <thead>
            <tr>
              <th>EmployeeID</th>
              <th>Name</th>
              <th>Job</th>
              <th>Department</th>
              <th>Employer</th>
              <th>worklocation</th>
              <th>Nationality</th>
              <th>Gender</th>
              <th>Bankacc</th>
              <th>Hiredate</th>
              <th>Birthdaydate</th>
              <th>Phone</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Status</th>
              <th>BankCode</th>
             
            </tr>
          </thead>
          <tbody>
            {employes.map((employe) => (
              <tr key={employe._id}>
                <td>{employe.EmployeeID}</td>
                <td>{employe.Name}</td>
                <td>{employe.Job}</td>
                <td>{employe.Department}</td>
                <td>{employe.Employer}</td>
                <td>{employe.Worklocation}</td>
                <td>{employe.Nationality}</td>
                <td>{employe.Gender}</td>
                <td>{employe.Bankacc}</td>
                <td>{employe.Hiredate}</td>
                <td>{employe.Birthdaydate}</td>
                <td>{employe.Phone}</td>
                <td>{employe.Mobile}</td>
                <td>{employe.Email}</td>
                <td>{employe.Status}</td>
                <td>{employe.BankCode}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
       </div> */}
              </div>
            
            </div>
          )
    }
  
  
  const dd={
    marginLeft:'700px'
  }

export default Employes;

