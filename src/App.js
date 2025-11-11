

// import React, { useState } from "react";
// import './App.css'


// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [summary, setSummary] = useState("");

//   const [flag,setflag]=useState(false);


//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handlereset=()=>{
//     setflag(false);
//     setSummary("");
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("https://resumeroaster-ewwo.onrender.com/upload-file", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       setSummary(data.summary);
//       setflag(true);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className='main-box'>

  
     
// {
//   !flag&& <form onSubmit={handleSubmit}>
//   <div className='dotted-box'>
//   <span>Upload your Resume Here! 😊</span>
  
//   <div className="int-box">
//   <input type="file" onChange={handleFileChange} accept=".pdf"  className='input'/>
  
//   </div>

 
//     <button type="submit" className="btn">Roast</button>
//     </div>
//   </form>
// }
//        {flag&&summary && (
//         <div className="result-box">
//           <div className="result">
//           <h2>Summary:</h2>
//           <p>{summary}</p>
//         </div>

//         <button onClick={handlereset}>Reset</button>
//         </div>
      
//       )}
//     </div>
//   );
// };

// export default FileUpload;  
import React, { useState } from "react";
import "./App.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false); // 👈 new state

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleReset = () => {
    setFlag(false);
    setSummary("");
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a PDF first!");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true); // 👈 start loading before fetch
    setSummary("");
    setFlag(false);

    try {
      const response = await fetch("https://resumeroaster-ewwo.onrender.com/upload-file", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSummary(data.summary);
      setFlag(true);
    } catch (error) {
      console.error("Error:", error);
      setSummary("⚠️ Something went wrong! Please try again.");
      setFlag(true);
    } finally {
      setLoading(false); // 👈 stop loading
    }
  };

  return (
    <div className="main-box">
      {!flag && (
        <form onSubmit={handleSubmit}>
          <div className="dotted-box">
            <span>Upload your Resume Here! 😊</span>

            <div className="int-box">
              <input type="file" onChange={handleFileChange} accept=".pdf" className="input" />
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Processing..." : "Roast"}
            </button>

            {/* 👇 Show animated emoji while loading */}
            {loading && (
              <div className="loading-emoji">
                🔥🤖 Roasting your resume... Please wait ⏳
              </div>
            )}
          </div>
        </form>
      )}

      {flag && summary && (
        <div className="result-box">
          <div className="result">
            <h2>Summary:</h2>
            <p>{summary}</p>
          </div>

          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
