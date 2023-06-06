import { ChangeEvent, useState, useEffect } from 'react';

function AddStudents() {
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/";
    }
  }, []);
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleUploadClick = () => {
    console.log(file);
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    // console.log(formData)
    // console.log(Array.from(formData.entries()));
    console.log(formData.getAll('file')[0]);
    fetch('http://localhost:8000/api/uploadstudents/', {
      method: 'POST',
      body: formData,
      
      headers: {
        'content-disposition': `attachment; filename=${file.name}`,
        // 'content-type': 'application/json',
        'content-length': `${file.size}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className='addStudents'>
      <div style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems: "center"}}>
        <section>
          <div style={{overflowY: "auto", backgroundColor:"#FFFFFF", height: "400px", width:"80vw", marginTop: "150px", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "20px", color: "000"}}>
            <h1 style={{marginTop: "10px", fontSize:"20px"}}>My Class</h1>
          </div>
        </section>
        <section className='upload'>
          <div style={{width: '300px', backgroundColor:'#FFFFFF', borderRadius:'10px', padding: '23px'}}>
            <div style={{fontSize:'20px', color:'#000', fontSize:"15px"}}>
              <p>Upload your files here.</p>
              <br />
              <p style={{textAlign:'left'}}>The data in the files should be in the following format:</p>
              <br />
              <p style={{textAlign:'left'}}>Column 1: Roll Number</p>
              <p style={{textAlign:'left'}}>Column 2: Name</p>
              <p style={{textAlign:'left'}}>Column 3: Semester Number</p>
              <p style={{textAlign:'left'}}>Column 4: Subject</p>
              <p style={{textAlign:'left'}}>Column 5: Marks</p>
              <br />
              <p>You can add as many rows as required. </p>
              <p style={{fontSize:'15px'}}>If you would prefer a different data format then please <a href="https://www.instagram.com/amfoss.in/" target='_blank'>contact us</a></p>
            </div>
          </div>
          <p style={{opacity: "0"}}>...........................</p>
          <div
            style={{
              top: "301px",
              left: "1039px",
              width: "346px",
              height: "400px",
              textAlign: "left",
              fontSize: "30px",
              fontFamily: "Poppins",
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // justifyContent: "space-evenly",
            }}
          >
            <h3>ACADEMIZE</h3>
            <p style={{fontSize: "25px"}}>Add Students</p>
            
            <input className='chooseFile' type="file" name="file" id="fileinput"
              style={{
                fontFamily: "sans-serif",
                font: "poppins",
                fontSize: "15px",
                cursor: "pointer",
                marginTop: "30%",
              }}
              accept=".csv, .xlsx, .xls, .ods, .txt"
              onChange={handleFileChange}
            />
            <div style={{marginTop: "30%"}}>
              <button onClick={handleUploadClick} className='whitebutton' style={{}}>
                Upload
              </button>
            </div>
          </div>
        </section>
        <div style={{position: "absolute", top: "80%", display: "flex"}}>
        </div>
      </div>
    </div>
  );
}

export default AddStudents;