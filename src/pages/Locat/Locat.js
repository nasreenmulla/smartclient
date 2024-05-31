
// import React, { Component } from 'react'
// import { useEffect,useState } from 'react';
// import api from '../../api/index';

//     const Locat=()=>{

//         const [locations, setLocations] = useState([]);
//   const [formData, setFormData] = useState({
//     LOC_ID: '',
//     LOC_NAME: '',
//     LOC_NAME_A: '',
   
   
//   });
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     fetchLocations();
//   }, []);

//   const fetchLocations = async () => {
//     try {
//       const response = await api.get('/api/Locations');
//       setLocations(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error('Error fetching Locationss:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/api/Locations', formData);
//       setFormData({
//         LOC_ID: '',
//         LOC_NAME: '',
//         LOC_NAME_A: '',
     
//       });
//       fetchLocations();
//       console.log(formData)
//     } catch (error) {
//       console.error('Error adding Departments:', error);
//     }
//   };

//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//         return (
//             <div className='EmployerContainer' >
//               <div className='EmployerBox'>
//               <div className='hea'>
//     <h2>Locations</h2>
//         <div className='head'>
         
//           <button onClick={toggleForm} className="btn btn-primary mb-3">{showForm ? 'close' : 'Add'}</button>
//         </div>
//     </div>
//         {showForm && (
//           <form onSubmit={handleSubmit} className='fo' >
//             <div className="form-group" >
//             <label>Location #</label>
//               <input type="text" className="form-control" name="LOC_ID" value={formData.LOC_ID} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Location Name</label>
//               <input type="text" className="form-control" name="LOC_NAME" value={formData.LOC_NAME} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//             <label >عملموقع</label>
//             <input
//                 type="text"
//                className="form-control"
            
//                name="LOC_NAME_A"
//                value={formData.LOC_NAME_A}
//                onChange={handleChange}
//                />
//             </div>
//             <button type="submit" >Submit</button>
//           </form>
//         )}

        
//        <div className='tt'>
//        <table className="table">
//           <thead>
//             <tr>
//               <th>Location #</th>
//               <th>Location Name</th>
//               <th>عملموقع</th>
             
//             </tr>
//           </thead>
//           <tbody>
//             {locations.map((location) => (
//               <tr key={location._id}>
//                 <td>{location.LOC_ID}</td>
//                 <td>{location.LOC_NAME}</td>
//                 <td>{location.LOC_NAME_A}</td>
               
//               </tr>
//             ))}
//           </tbody>
//         </table>
//        </div>
//               </div>
            
//             </div>
//           )
//     }
  
  
  

// export default Locat;

// import React, { useEffect, useState } from 'react';
// import api from '../../api/index';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// const Locat = () => {
//   const [locations, setLocations] = useState([]);
//   const [formData, setFormData] = useState({
//     LOC_ID: '',
//     LOC_NAME: '',
//     LOC_NAME_A: '',
//   });
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     fetchLocations();
//   }, []);

//   const fetchLocations = async () => {
//     try {
//       const response = await api.get('/api/locations');
//       setLocations(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching locations:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/api/locations', formData);
//       setFormData({
//         LOC_ID: '',
//         LOC_NAME: '',
//         LOC_NAME_A: '',
//       });
//       fetchLocations();
//       console.log(formData);
//     } catch (error) {
//       console.error('Error adding location:', error);
//     }
//   };

//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(locations);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Locations');
//     XLSX.writeFile(workbook, 'locations.xlsx');
//   };

//   const importFromExcel = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = async (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const importedData = XLSX.utils.sheet_to_json(worksheet);

//       try {
//         await api.post('/api/locations/import', { file: importedData });
//         fetchLocations();
//         console.log('Locations imported successfully');
//       } catch (error) {
//         console.error('Error importing locations:', error);
//       }
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div className='EmployerContainer'>
//       <div className='EmployerBox'>
//         <div className='hea'>
//           <h2>Locations</h2>
//           <div className='head'>
//             <button onClick={toggleForm} className="btn btn-primary mb-3">
//               {showForm ? 'Close' : 'Add'}
//             </button>
//             <button onClick={exportToExcel} className="btn btn-secondary mb-3">
//               Export to Excel
//             </button>
            
//             <input type="file" onChange={importFromExcel} className="form-control-file"   />
//           </div>
//         </div>
//         {showForm && (
//           <form onSubmit={handleSubmit} className='fo'>
//             <div className="form-group">
//               <label>Location #</label>
//               <input type="text" className="form-control" name="LOC_ID" value={formData.LOC_ID} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Location Name</label>
//               <input type="text" className="form-control" name="LOC_NAME" value={formData.LOC_NAME} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>عملموقع</label>
//               <input type="text" className="form-control" name="LOC_NAME_A" value={formData.LOC_NAME_A} onChange={handleChange} />
//             </div>
//             <button type="submit">Submit</button>
//           </form>
//         )}
//         <div className='tt'>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Location #</th>
//                 <th>Location Name</th>
//                 <th>عملموقع</th>
//               </tr>
//             </thead>
//             <tbody>
//               {locations.map((location) => (
//                 <tr key={location._id}>
//                   <td>{location.LOC_ID}</td>
//                   <td>{location.LOC_NAME}</td>
//                   <td>{location.LOC_NAME_A}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Locat;
// import React, { useEffect, useState } from 'react';
// import api from '../../api/index';
// import * as XLSX from 'xlsx';

// const Locat = () => {
//   const [locations, setLocations] = useState([]);
//   const [formData, setFormData] = useState({
//     LOC_ID: '',
//     LOC_NAME: '',
//     LOC_NAME_A: '',
//   });
//   const [showForm, setShowForm] = useState(false);
//   const fileInputRef = React.createRef();

//   useEffect(() => {
//     fetchLocations();
//   }, []);

//   const fetchLocations = async () => {
//     try {
//       const response = await api.get('/api/locations');
//       setLocations(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching locations:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/api/locations', formData);
//       setFormData({
//         LOC_ID: '',
//         LOC_NAME: '',
//         LOC_NAME_A: '',
//       });
//       fetchLocations();
//       console.log(formData);
//     } catch (error) {
//       console.error('Error adding location:', error);
//     }
//   };

//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(locations);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Locations');
//     XLSX.writeFile(workbook, 'locations.xlsx');
//   };

//   const importFromExcel = async (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = async (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const importedData = XLSX.utils.sheet_to_json(worksheet);

//       try {
//         await api.post('/api/locations/import', { locations: importedData });
//         fetchLocations();
//         console.log('Locations imported successfully');
//       } catch (error) {
//         console.error('Error importing locations:', error);
//       }
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   const handleImportClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className='EmployerContainer'>
//       <div className='EmployerBox'>
//         <div className='hea'>
//           <h2>Locations</h2>
//           <div className='head'>
//             <button onClick={toggleForm} className="btn btn-primary mb-3">
//               {showForm ? 'Close' : 'Add'}
//             </button>
//             <button onClick={exportToExcel} className="btn btn-secondary mb-3">
//               Export to Excel
//             </button>
//             <button onClick={handleImportClick} className="btn btn-secondary mb-3">
//               Import from Excel
//             </button>
//             <input
//               type="file"
//               ref={fileInputRef}
//               style={{ display: 'none' }}
//               onChange={importFromExcel}
//             />
//           </div>
//         </div>
//         {showForm && (
//           <form onSubmit={handleSubmit} className='fo'>
//             <div className="form-group">
//               <label>Location #</label>
//               <input type="text" className="form-control" name="LOC_ID" value={formData.LOC_ID} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Location Name</label>
//               <input type="text" className="form-control" name="LOC_NAME" value={formData.LOC_NAME} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>عملموقع</label>
//               <input type="text" className="form-control" name="LOC_NAME_A" value={formData.LOC_NAME_A} onChange={handleChange} />
//             </div>
//             <button type="submit">Submit</button>
//           </form>
//         )}
//         <div className='tt'>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Location #</th>
//                 <th>Location Name</th>
//                 <th>عملموقع</th>
//               </tr>
//             </thead>
//             <tbody>
//               {locations.map((location) => (
//                 <tr key={location._id}>
//                   <td>{location.LOC_ID}</td>
//                   <td>{location.LOC_NAME}</td>
//                   <td>{location.LOC_NAME_A}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Locat;
import React, { useEffect, useState, useRef } from 'react';
import api from '../../api/index';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faUndo, faFilter, faTable, faFileAlt, faSave, faDownload,faColumns,faAngleDoubleRight,faCog } from '@fortawesome/free-solid-svg-icons';

const Locat = () => {
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
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    LOC_ID: '',
    LOC_NAME: '',
    LOC_NAME_A: '',
  });
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await api.get('/api/locations');
      setLocations(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/locations', formData);
      setFormData({
        LOC_ID: '',
        LOC_NAME: '',
        LOC_NAME_A: '',
      });
      fetchLocations();
      console.log(formData);
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(locations);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Locations');
    XLSX.writeFile(workbook, 'locations.xlsx');
  };

  const importFromExcel = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/api/locations/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchLocations();
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
    <div className='EmployerContainer'>
      <div className='EmployerBox'>
        <div className='hea'>
          <h2 style={styles}>Locations</h2>
          <div className='head' style={dd} >
            <button onClick={toggleForm} className="btn btn-primary mb-3">
              {showForm ? 'Close' : 'Add'}
            </button>
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
         <div className='foEmp' style={{overflowY:'auto'}}>
           <form onSubmit={handleSubmit}>
                                      <h1 style={{ 
              textAlign:'left',
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
     Location
  </h1>
  <div style={{ position: 'absolute', top: '30px', right: '30px', cursor: 'pointer', padding: '5px', border: '1px solid #ccc', borderRadius: '5px',backgroundColor:'white' }}>
  <FontAwesomeIcon icon={faTimes} onClick={handleCloseForm} style={{ fontSize: '14px' }} />
</div>
           <div className='formbody' style={{margin:'70px'}}>
           <div className="Dp" >
              <label>Location #<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="LOC_ID" value={formData.LOC_ID} onChange={handleChange} style={{width:'300px'}} required />
            </div>
            <div className="form-group">
              <label>Location Name <span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="LOC_NAME" value={formData.LOC_NAME} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>عملموقع</label>
              <input type="text" className="form-control" name="LOC_NAME_A" value={formData.LOC_NAME_A} onChange={handleChange} />
            </div>
           </div>
           <button type="submit" style={{ width: '170px', position: 'relative' }}>
    Add Location
    <i className="fas fa-edit" style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)' }}></i>
</button>
          </form>
          </div>

        )}
        <div className='tt'>
          <table className="table">
            <thead>
              <tr>
                <th>Location #</th>
                <th>Location Name</th>
                <th>عملموقع</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location._id}>
                  <td>{location.LOC_ID}</td>
                  <td>{location.LOC_NAME}</td>
                  <td>{location.LOC_NAME_A}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const dd={
  marginLeft: '700px',
}
export default Locat;

