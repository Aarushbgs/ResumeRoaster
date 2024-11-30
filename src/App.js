// import React from 'react'
// import './App.css'
// import ProgressBar from "@ramonak/react-progress-bar";

// const App = () => {
//   return (
//     <div className='main-box' >
//       <div className='input-box'>
//         <span>Upload your Resume Here !😊</span>
//       <input type='file'  className='input'/>
//       </div>
//       <ProgressBar completed={20} width="400px"/>
//     </div>
//   )
// }

// export default App

// import React, { useState } from 'react';
// import './App.css';
// import ProgressBar from "@ramonak/react-progress-bar";

// const App = () => {
//   const [fileName, setFileName] = useState(null); // State to hold the file name
//   const [fileUrl, setFileUrl] = useState(null); // State to hold the file URL
//   const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFileName(file.name);
//       // Generate a temporary URL for the uploaded file
//       const tempUrl = URL.createObjectURL(file);
//       setFileUrl(tempUrl);

//       // Simulate upload progress
//       setUploadProgress(20); // Initial progress
//       setTimeout(() => setUploadProgress(100), 1000); // Simulate progress to 100%
//     }
//   };

//   return (
//     <div className='main-box'>
//       <div className='input-box'>
//         <span>Upload your Resume Here! 😊</span>
//         <input type='file' className='input' onChange={handleFileChange} />
//       </div>
//       {fileName && (
//         <>
//           <p>Uploaded File: {fileName}</p>
//           {fileUrl && (
//             <p>
//               File Link: <a href={fileUrl} target="_blank" rel="noopener noreferrer">View File</a>
//             </p>
//           )}
//         </>
//       )}
//       <ProgressBar completed={uploadProgress} width="400px" />
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import './App.css'

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload-file", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='main-box'>
      <form onSubmit={handleSubmit}>

      <div className='dotted-box'>
      <span>Upload your Resume Here! 😊</span>
      <input type="file" onChange={handleFileChange} accept=".pdf"  className='input'/>
      </div>
        <button type="submit" className="btn">chaliye Suru krte hn...</button>
      </form>
      {summary && (
        <div className="result">
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
