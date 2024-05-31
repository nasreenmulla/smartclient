



import React, { useState, useEffect,useRef } from 'react';
import api from '../../../api';
import './Employer.css'
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faUndo, faFilter, faTable, faFileAlt, faSave, faDownload,faColumns,faAngleDoubleRight,faCog } from '@fortawesome/free-solid-svg-icons';

const Employer = ({ isMenuPushExpanded }) => {
  const [searchColumn, setSearchColumn] = useState('All Columns');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
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
  const [commits, setCommits] = useState([]);
  const fileInputRef = useRef();
  const [formData, setFormData] = useState({
      id: '',
    name: '',
    nameInArabic: '',
    idExpiryDate: '',
    bankShortName: '',
    iban: '',
    licenseexpiry:'',
    taxicardexpiry:'',
    crcardexpiry:'',
    image1: null,
    image2: null,
    image3: null,
    image4: null
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCommits();
  }, []);

  const fetchCommits = async () => {
    try {
      const response = await api.get('/api/employers');
      setCommits(response.data);
    } catch (error) {
      console.error('Error fetching commitments:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithImages = new FormData();
    formDataWithImages.append('id', formData.id);
    formDataWithImages.append('name', formData.name);
    formDataWithImages.append('nameInArabic', formData.nameInArabic);
    formDataWithImages.append('idExpiryDate', formData.idExpiryDate);
    formDataWithImages.append('bankShortName',formData.bankShortName);
    formDataWithImages.append('iban',formData.iban);
    formDataWithImages.append('licenseexpiry',formData.licenseexpiry);
    formDataWithImages.append('taxicardexpiry',formData.taxicardexpiry);
    formDataWithImages.append('crcardexpiry',formData.crcardexpiry)
    if (formData.image1) formDataWithImages.append('image1', formData.image1);
    if (formData.image2) formDataWithImages.append('image2', formData.image2);
    if (formData.image3) formDataWithImages.append('image3', formData.image3);
    if (formData.image4) formDataWithImages.append('image4', formData.image4);

    try {
      await api.post('/api/employers', formDataWithImages, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFormData({
           id: '',
    name: '',
    nameInArabic: '',
    idExpiryDate: '',
    bankShortName: '',
    iban: '',
    licenseexpiry:'',
    taxicardexpiry:'',
    crcardexpiry:'',
        image1: null,
        image2: null,
        image3: null,
        image4: null
      });
      fetchCommits();
    } catch (error) {
      console.error('Error adding commitment:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(commits);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employer');
    XLSX.writeFile(workbook, 'employer.xlsx');
  };

  const importFromExcel = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/api/employers/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchCommits();
      console.log('Locations imported successfully');
    } catch (error) {
      console.error('Error importing locations:', error);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };
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
  return (
    <div className={`EmployerContainer ${isMenuPushExpanded ? 'menu-push-expanded' : ''}`}>
      <div className='EmployerBox' style={{ overflowY: 'auto' }}>
        <div className='hea' >
          <div className='O'>
          <h2 style={styles}>Employers </h2>
          </div>
          <div className='head'>
            <button onClick={toggleForm} className="btn btn-primary mb-3">{showForm ? 'Close' : 'Add'}</button>
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
          <div className='foEmp' style={{overflowY:'auto'}} >

<form onSubmit={handleSubmit}  >
              <h1 style={{ 
              textAlign:'left',
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
    EmployerProfile
  </h1>
  <div style={{ position: 'absolute', top: '30px', right: '30px', cursor: 'pointer', padding: '5px', border: '1px solid #ccc', borderRadius: '5px',backgroundColor:'white' }}>
  <FontAwesomeIcon icon={faTimes} onClick={handleCloseForm} style={{ fontSize: '14px' }} />
</div>

  {/* <FontAwesomeIcon icon={faTimes} onClick={handleCloseForm} style={{ position: 'absolute', top: '30px', right: '30px', cursor: 'pointer' }} /> */}
            <div className='formbody' style={{margin:'70px'}}>
            <div className='one'>
            <div className="I">
              <label>ID #<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="id" value={formData.id} onChange={handleChange} required />
            </div>
            <div className="N">
              <label>Name<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            </div>
            <div className='Se'>
            <div className="Arbi">
              <label>اسم الالتزام</label>
              <input type="text" className="form-control" name="nameInArabic" value={formData.nameInArabic} onChange={handleChange} />
            </div>
            <div className="Dat">
              <label>idExpiryDate</label>
              <input type="Date" className="form-control" name="idExpiryDate" value={formData.idExpiryDate} onChange={handleChange} />
            </div>
            </div>
            <div className='bthird'>
            <div className="Ba">
              <label>Bankshortname<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="bankShortName" value={formData.bankShortName} onChange={handleChange} required />
            </div>
            <div className="iba">
              <label>iban<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="iban" value={formData.iban} onChange={handleChange} required />
            </div>
            </div>
            <div className='DD'>
            <div className="form-group">
              <label>LicenseExpiryDate</label>
              <input type="Date" className="form-control" name="licenseexpiry" value={formData.licenseexpiry} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>taxicardExpiryDate</label>
              <input type="Date" className="form-control" name="taxicardexpiry" value={formData.taxicardexpiry} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>CRcardExpiry</label>
              <input type="Date" className="form-control" name="crcardexpiry" value={formData.crcardexpiry} onChange={handleChange} />
            </div>
            </div>

           <div className='Imag'> 
           <div className="form-group">
              <label>Image 1</label>
              <input type="file" name="image1" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="form-group">
              <label>Image 2</label>
              <input type="file" name="image2" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="form-group">
              <label>Image 3</label>
              <input type="file" name="image3" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="form-group">
              <label>Image 4</label>
              <input type="file" name="image4" accept="image/*" onChange={handleImageChange} />
            </div>
           </div>
            </div>
            <button type="submit" style={{ width: '170px', position: 'relative' }}>
    Add Employer
    <i className="fas fa-edit" style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)' }}></i>
</button>
          </form>
            </div>
        )}
        <div className='tt'>
          <table className="table">
            <thead>
              <tr>
                <th> ID #</th>
                <th> Name</th>
                <th>اسم الالتزام</th>
                <th>iDexpirydate</th>
                <th>bankshortname</th>
                <th>iban</th>
                <th>LIcenseexpiry</th>
                <th>Taxicardexpiry</th>
                <th>CRcardExpiry</th>
                <th>IDCard</th>
                <th>License</th>
                <th>TaxiCard</th>
                <th>CR</th>
              </tr>
            </thead>
            <tbody>
              {commits.map((commit) => (
                <tr key={commit._id}>
                  <td>{commit.id}</td>
                  <td>{commit.name}</td>
                  <td>{commit.nameInArabic}</td>
                  <td>{commit.idExpiryDate}</td>
                  <td>{commit.bankShortName}</td>
                  <td>{commit.iban}</td>
                  <td>{commit.licenseexpiry}</td>
                  <td>{commit.taxicardexpiry}</td>
                  <td>{commit.crcardexpiry}</td>
                  
                  <td>
                    {commit.imagePath1 && (
                      <img
                        src={`http://localhost:8000${commit.imagePath1}`}
                        alt={`Commitment ${commit.COMMITMENT_ID} - Image 1`}
                        style={{ maxWidth: '100px', margin: '5px' }}
                      />
                    )}
                    </td>
                    <td>
                      
                    {commit.imagePath2 && (
                      <img
                        src={`http://localhost:8000${commit.imagePath2}`}
                        alt={`Commitment ${commit.COMMITMENT_ID} - Image 2`}
                        style={{ maxWidth: '100px', margin: '5px' }}
                      />
                    )}
                    </td>
                   <td>
                   {commit.imagePath3 && (
                      <img
                        src={`http://localhost:8000${commit.imagePath3}`}
                        alt={`Commitment ${commit.COMMITMENT_ID} - Image 3`}
                        style={{ maxWidth: '100px', margin: '5px' }}
                      />
                    )}
                   </td>
                   <td>
                    {commit.imagePath4 && (
                      <img
                        src={`http://localhost:8000${commit.imagePath4}`}
                        alt={`Commitment ${commit.COMMITMENT_ID} - Image 4`}
                        style={{ maxWidth: '100px', margin: '5px' }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employer;

// import React, { useState, useEffect } from 'react';
// import api from '../../../api';
// import './Employer.css';

// const Employer = ({ isMenuPushExpanded }) => {
 
//   const [employers, setEmployers] = useState([]);
//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     nameInArabic: '',
//     idExpiryDate: '',
//     bankShortName: '',
//     iban: '',
//     licenseexpiry:'',
//     taxicardexpiry:'',
//     crcardexpiry:'',
    
   
//   });
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     fetchEmployers();
//   }, []);

//   const fetchEmployers = async () => {
//     try {
//       const response = await api.get('/api/employers');
//       setEmployers(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error('Error fetching employers:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       await api.post('/api/employers', formData
       
//       );
//       setFormData({
//         id: '',
//         name: '',
//         nameInArabic: '',
//         idExpiryDate: '',
//         iban: '',
//         bankShortName: '',
//         licenseexpiry: '',
//         taxicardexpiry: '',
//         crcardexpiry: ''
//       });
     
//       fetchEmployers();
//     } catch (error) {
//       console.error('Error adding employer:', error);
//     }
//   };




//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//   return (
//     <div className={`EmployerContainer ${isMenuPushExpanded ? 'menu-push-expanded' : ''}`}  >
//       <div className='EmployerBox' style={{ overflow:'auto' }}>
//     <div className='hea'>
//     <h2>Employer</h2>
//         <div className='head'>
         
//           <button onClick={toggleForm} className="btn btn-primary mb-3">{showForm ? 'close' : 'Add'}</button>
//         </div>
//     </div>
//         {showForm && (
//           <form onSubmit={handleSubmit} className='fo'  style={{ overflowX: 'auto' }} >
//             <div className="form-group" >
//             <label>ID #</label>
//               <input type="text" className="form-control" name="id" value={formData.id} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Name</label>
//               <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//             <label htmlFor="nameInArabic">نعمة شريف</label>
//             <input
//                 type="text"
//                className="form-control"
//               id="nameInArabic"
//                name="nameInArabic"
//                value={formData.nameInArabic}
//                onChange={handleChange}
//                />
//             </div>
//             <div className="form-group">
//               <label>Date of ID Expiry</label>
//               <input type="date" className="form-control" name="idExpiryDate" value={formData.idExpiryDate} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>IBAN</label>
//               <input type="text" className="form-control" name="iban" value={formData.iban} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Bank Short Name</label>
//               <input type="text" className="form-control" name="bankShortName" value={formData.bankShortName} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>LicenseExpiryDate</label>
//               <input type="date" className="form-control" name="licenseexpiry" value={formData.licenseexpiry} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>TaxiCard ExpiryDate</label>
//               <input type="date" className="form-control" name="taxicardexpiry" value={formData.taxicardexpiry} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>CRExpiryDate</label>
//               <input type="date" className="form-control" name="crcardexpiry" value={formData.crcardexpiry} onChange={handleChange} />
//             </div>
         
           
          

//             <button type="submit" >Submit</button>
//           </form>
//         )}

        
//        <div className='tt'>
//        <table className="table">
//           <thead>
//             <tr>
//               <th>ID #</th>
//               <th>Name</th>
//               <th>نعمة شريف</th>
//               <th>Date of ID Expiry</th>
//               <th>IBAN</th>
//               <th>Bank Short Name</th>
//               <th>LicenseExpiryDate</th>
//               <th>TaxiCard</th>
//               <th>crcardexpiry</th>
             
              
//             </tr>
//           </thead>
//           <tbody>
//             {employers.map((employer) => (
//               <tr key={employer._id}>
//                 <td>{employer.id}</td>
//                 <td>{employer.name}</td>
//                 <td>{employer.nameInArabic}</td>
//                 <td>{employer.idExpiryDate}</td>
//                 <td>{employer.iban}</td>
//                 <td>{employer.bankShortName}</td>
//                 <td>{employer.licenseexpiry}</td>
//                 <td>{employer.taxicardexpiry}</td>
//                 <td>{employer.crcardexpiry}</td>
       

               
//               </tr>
//             ))}
//           </tbody>
//         </table>
//        </div>
//       </div>
//     </div>
//   );
// };

// export default Employer;
