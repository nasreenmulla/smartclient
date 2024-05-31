
// import React, { useState, useEffect } from 'react';
// import api from '../../api';

// const Commi = ({ isMenuPushExpanded }) => {
//   const [commits, setCommits] = useState([]);
//   const [formData, setFormData] = useState({
//     COMMITMENT_ID: '',
//     NAME_E: '',
//     NAME_A: '',
//     D: ''
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [images, setImages] = useState([]);
//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     fetchCommits();
//   }, []);

//   const fetchCommits = async () => {
//     try {
//       const response = await api.get('/api/commits');
//       setCommits(response.data);
//     } catch (error) {
//       console.error('Error fetching commitments:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (event) => {
//     setImages([...event.target.files]);
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataWithImages = new FormData();
//     formDataWithImages.append('COMMITMENT_ID', formData.COMMITMENT_ID);
//     formDataWithImages.append('NAME_E', formData.NAME_E);
//     formDataWithImages.append('NAME_A', formData.NAME_A);
//     formDataWithImages.append('D', formData.D);
//     images.forEach(image => {
//       formDataWithImages.append('images', image);
//     });

//     try {
//       await api.post('/api/commits', formDataWithImages, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setFormData({
//         COMMITMENT_ID: '',
//         NAME_E: '',
//         NAME_A: '',
//         D: ''
//       });
//       setImages([]);
//       fetchCommits();
//     } catch (error) {
//       console.error('Error adding commitment:', error);
//     }
//   };

//   const handleImport = async () => {
//     const formData = new FormData();
//     formData.append('file', file);
    
//     try {
//       await api.post('/api/commits/import', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       fetchCommits();
//     } catch (error) {
//       console.error('Error importing commitments:', error);
//     }
//   };

//   const handleExport = async () => {
//     try {
//       const response = await api.get('/api/commits/export', { responseType: 'blob' });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'commitments.xlsx');
//       document.body.appendChild(link);
//       link.click();
//     } catch (error) {
//       console.error('Error exporting commitments:', error);
//     }
//   };

//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//   return (
//     <div className={`EmployerContainer ${isMenuPushExpanded ? 'menu-push-expanded' : ''}`}>
//       <div className='EmployerBox' style={{ overflowY: 'auto' }}>
//         <div className='hea'>
//           <h2>Commitments</h2>
//           <div className='head'>
//             <button onClick={toggleForm} className="btn btn-primary mb-3">{showForm ? 'Close' : 'Add'}</button>
//           </div>
//         </div>
//         {showForm && (
//           <form onSubmit={handleSubmit} className='fo'>
//             <div className="form-group">
//               <label>COMMITMENT_ID #</label>
//               <input type="text" className="form-control" name="COMMITMENT_ID" value={formData.COMMITMENT_ID} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Commitment Name</label>
//               <input type="text" className="form-control" name="NAME_E" value={formData.NAME_E} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>اسم الالتزام</label>
//               <input type="text" className="form-control" name="NAME_A" value={formData.NAME_A} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Description</label>
//               <input type="text" className="form-control" name="D" value={formData.D} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Images</label>
//               <input type="file" accept="image/*" multiple onChange={handleImageChange} />
//             </div>
//             <button type="submit">Submit</button>
//           </form>
//         )}
//         <div className='tt'>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Commitment ID #</th>
//                 <th>Commitment Name</th>
//                 <th>اسم الالتزام</th>
//                 <th>Description</th>
//                 <th>Images</th>
//               </tr>
//             </thead>
//             <tbody>
//               {commits.map((commit) => (
//                 <tr key={commit._id}>
//                   <td>{commit.COMMITMENT_ID}</td>
//                   <td>{commit.NAME_E}</td>
//                   <td>{commit.NAME_A}</td>
//                   <td>{commit.D}</td>
//                   <td>
//                     {commit.imagePaths && commit.imagePaths.map((path, index) => (
//                       <img
//                         key={index}
//                         src={`http://localhost:8000${path}`}
//                         alt={`Commitment ${commit.COMMITMENT_ID} - ${index}`}
//                         style={{ maxWidth: '100px' }}
//                       />
//                     ))}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="import-export">
//           <input type="file" onChange={handleFileChange} />
//           <button onClick={handleImport} className="btn btn-secondary">Import from Excel</button>
//           <button onClick={handleExport} className="btn btn-secondary">Export to Excel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Commi;


import React, { useState, useEffect,useRef } from 'react';
import api from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import { faSearch, faUndo, faFilter, faTable, faFileAlt, faSave, faDownload,faColumns,faAngleDoubleRight,faCog } from '@fortawesome/free-solid-svg-icons';
const Commi = ({ isMenuPushExpanded }) => {
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
  const [formData, setFormData] = useState({
    COMMITMENT_ID: '',
    NAME_E: '',
    NAME_A: '',
    D: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    fetchCommits();
  }, []);

  const fetchCommits = async () => {
    try {
      const response = await api.get('/api/commits');
      setCommits(response.data);
      console.log(commits)
    } catch (error) {
      console.error('Error fetching commitments:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithImage = new FormData();
    formDataWithImage.append('COMMITMENT_ID', formData.COMMITMENT_ID);
    formDataWithImage.append('NAME_E', formData.NAME_E);
    formDataWithImage.append('NAME_A', formData.NAME_A);
    formDataWithImage.append('D', formData.D);
    if (image) {
      formDataWithImage.append('image', image);
    }

    try {
      await api.post('/api/commits', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(formDataWithImage)
      setFormData({
        COMMITMENT_ID: '',
        NAME_E: '',
        NAME_A: '',
        D: ''
      });
      setImage(null);
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Commits');
    XLSX.writeFile(workbook, 'commit.xlsx');
  };

  const importFromExcel = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/api/commits/import', formData, {
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
        <div className='hea'>
          <h2 style={styles}>Commitments</h2>
          <div className='head' style={dd}>
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
        <div style={{overflowY:'auto'}} className='foEmp'>
            <form onSubmit={handleSubmit} >
            <h1 style={{ 
              textAlign:'left',
    color: '#333333',  // Dark grey text color (almost black)
    backgroundColor: '#E0E0E0',  // Grey background color
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold', 
    borderBottom: '2px solid #333333', 
    padding: '10px' 
  }}>
     Commitment
  </h1>
  <div style={{ position: 'absolute', top: '30px', right: '30px', cursor: 'pointer', padding: '5px', border: '1px solid #ccc', borderRadius: '5px',backgroundColor:'white' }}>
  <FontAwesomeIcon icon={faTimes} onClick={handleCloseForm} style={{ fontSize: '14px' }} />
</div>
           <div  className='formbody' style={{margin:'70px'}}>
           <div className="Dp">
              <label>COMMITMENT_ID #<span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="COMMITMENT_ID" value={formData.COMMITMENT_ID} onChange={handleChange} style={{width:'300px'}} required />
            </div>
            <div className="form-group">
              <label>Commitment Name <span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" name="NAME_E" value={formData.NAME_E} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>اسم الالتزام</label>
              <input type="text" className="form-control" name="NAME_A" value={formData.NAME_A} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea type="text" className="form-control" name="D" value={formData.D} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
           </div>
           <button type="submit" style={{ width: '170px', position: 'relative' }}>
    Add Commitment
    <i className="fas fa-edit" style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)' }}></i>
</button>
          </form>
          </div>
        )}
        <div className='tt'>
          <table className="table">
            <thead>
              <tr>
                <th>Commitment ID #</th>
                <th>Commitment Name</th>
                <th>اسم الالتزام</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {commits.map((commit) => (
                <tr key={commit._id}>
                  <td>{commit.COMMITMENT_ID}</td>
                  <td>{commit.NAME_E}</td>
                  <td>{commit.NAME_A}</td>
                  <td>{commit.D}</td>
                  <td>
                    {commit.imagePath && (
                      <img
                        // src={commit.imagePath}
                        src={`http://localhost:8000${commit.imagePath}`}
                        // alt={`Commitment ${commit.COMMITMENT_ID}`}
                        style={{ maxWidth: '100px' }}
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

export default Commi;
// import React, { useState, useEffect } from 'react';
// import api from '../../api';

// const Commi = ({ isMenuPushExpanded }) => {
//   const [commits, setCommits] = useState([]);
//   const [formData, setFormData] = useState({
//     COMMITMENT_ID: '',
//     NAME_E: '',
//     NAME_A: '',
//     D: '',
//     image1: null,
//     image2: null,
//     image3: null,
//     image4: null
//   });
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     fetchCommits();
//   }, []);

//   const fetchCommits = async () => {
//     try {
//       const response = await api.get('/api/commits');
//       setCommits(response.data);
//     } catch (error) {
//       console.error('Error fetching commitments:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataWithImages = new FormData();
//     formDataWithImages.append('COMMITMENT_ID', formData.COMMITMENT_ID);
//     formDataWithImages.append('NAME_E', formData.NAME_E);
//     formDataWithImages.append('NAME_A', formData.NAME_A);
//     formDataWithImages.append('D', formData.D);
//     if (formData.image1) formDataWithImages.append('image1', formData.image1);
//     if (formData.image2) formDataWithImages.append('image2', formData.image2);
//     if (formData.image3) formDataWithImages.append('image3', formData.image3);
//     if (formData.image4) formDataWithImages.append('image4', formData.image4);

//     try {
//       await api.post('/api/commits', formDataWithImages, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setFormData({
//         COMMITMENT_ID: '',
//         NAME_E: '',
//         NAME_A: '',
//         D: '',
//         image1: null,
//         image2: null,
//         image3: null,
//         image4: null
//       });
//       fetchCommits();
//     } catch (error) {
//       console.error('Error adding commitment:', error);
//     }
//   };

//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//   return (
//     <div className={`EmployerContainer ${isMenuPushExpanded ? 'menu-push-expanded' : ''}`}>
//       <div className='EmployerBox' style={{ overflowY: 'auto' }}>
//         <div className='hea'>
//           <h2>Commitments</h2>
//           <div className='head'>
//             <button onClick={toggleForm} className="btn btn-primary mb-3">{showForm ? 'Close' : 'Add'}</button>
//           </div>
//         </div>
//         {showForm && (
//           <form onSubmit={handleSubmit} className='fo'>
//             <div className="form-group">
//               <label>COMMITMENT_ID #</label>
//               <input type="text" className="form-control" name="COMMITMENT_ID" value={formData.COMMITMENT_ID} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Commitment Name</label>
//               <input type="text" className="form-control" name="NAME_E" value={formData.NAME_E} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>اسم الالتزام</label>
//               <input type="text" className="form-control" name="NAME_A" value={formData.NAME_A} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Description</label>
//               <input type="text" className="form-control" name="D" value={formData.D} onChange={handleChange} />
//             </div>
//             <div className="form-group">
//               <label>Image 1</label>
//               <input type="file" name="image1" accept="image/*" onChange={handleImageChange} />
//             </div>
//             <div className="form-group">
//               <label>Image 2</label>
//               <input type="file" name="image2" accept="image/*" onChange={handleImageChange} />
//             </div>
//             <div className="form-group">
//               <label>Image 3</label>
//               <input type="file" name="image3" accept="image/*" onChange={handleImageChange} />
//             </div>
//             <div className="form-group">
//               <label>Image 4</label>
//               <input type="file" name="image4" accept="image/*" onChange={handleImageChange} />
//             </div>
//             <button type="submit">Submit</button>
//           </form>
//         )}
//         <div className='tt'>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Commitment ID #</th>
//                 <th>Commitment Name</th>
//                 <th>اسم الالتزام</th>
//                 <th>Description</th>
//                 <th>Images1</th>
//                 <th>2</th>
//                 <th>3</th>
//                 <th>4</th>
//               </tr>
//             </thead>
//             <tbody>
//               {commits.map((commit) => (
//                 <tr key={commit._id}>
//                   <td>{commit.COMMITMENT_ID}</td>
//                   <td>{commit.NAME_E}</td>
//                   <td>{commit.NAME_A}</td>
//                   <td>{commit.D}</td>
//                   <td>
//                     {commit.imagePath1 && (
//                       <img
//                         src={`http://localhost:8000${commit.imagePath1}`}
//                         alt={`Commitment ${commit.COMMITMENT_ID} - Image 1`}
//                         style={{ maxWidth: '100px', margin: '5px' }}
//                       />
//                     )}
//                     {commit.imagePath2 && (
//                       <img
//                         src={`http://localhost:8000${commit.imagePath2}`}
//                         alt={`Commitment ${commit.COMMITMENT_ID} - Image 2`}
//                         style={{ maxWidth: '100px', margin: '5px' }}
//                       />
//                     )}
//                     {commit.imagePath3 && (
//                       <img
//                         src={`http://localhost:8000${commit.imagePath3}`}
//                         alt={`Commitment ${commit.COMMITMENT_ID} - Image 3`}
//                         style={{ maxWidth: '100px', margin: '5px' }}
//                       />
//                     )}
//                     {commit.imagePath4 && (
//                       <img
//                         src={`http://localhost:8000${commit.imagePath4}`}
//                         alt={`Commitment ${commit.COMMITMENT_ID} - Image 4`}
//                         style={{ maxWidth: '100px', margin: '5px' }}
//                       />
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Commi;
  
const dd={
  marginLeft:'700px'
}
