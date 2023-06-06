import { useState, useEffect } from "react";
import axios from "axios";
import DynamicChart from "./chart_marks";

function Marks() {
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/";
    }
  }, []);

  const [rollNum, setRollNum] = useState("");
  const [semesterNum, setSemesterNum] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showError, setShowError] = useState(false);
  const [matchError, setMatchError] = useState(false);
  // const [showAddStudent, setShowAddStudent] = useState(false);

  const handleStudentSearch = async (e) => {
    e.preventDefault();
    if (!rollNum) {
      setShowError(true);
      return;
    }
    try {
      const semesterNums = semesterNum.split(",");
      const response = await fetch(
        `http://localhost:8000/api/searchMark/?roll=${rollNum}&sem=${semesterNums.join(
          ","
        )}`
      );
      const data = await response.json();
      setSearchResults(data);
      setShowError(false);
      console.log(data);
      data.length === 0 ? setMatchError(true) : setMatchError(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (

    <div style={{display: "flex", flexDirection: "column"}} className="addStudents">
    <div class="getDetailsForm" style={{display: "flex", justifyContent: "center", marginTop:"50px"}}>
    <form
      style={{
        position: "absolute",
        width: "350px",
        // top: "301px",
        height: "472px",
      }}
      onSubmit={handleStudentSearch}
    >
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          top: "0%",
          right: "0%",
          bottom: "0%",
          left: "0%",
          borderRadius: "20px",
          backgroundColor: "#fff",
        }}
      />
      <div
        style={{
          position: "absolute",
          height: "11.86%",
          width: "50.87%",
          top: "64.83%",
          left: "12.14%",
          fontSize: "18px",
          color: "#000",
          textAlign: "left",
          display: "inline-block",
        }}
      >
        Semester Number
      </div>
      <b
        style={{
          position: "absolute",
          height: "8.69%",
          width: "45.38%",
          top: "7.63%",
          left: "27.46%",
          fontSize: "30px",
          display: "inline-block",
          color: "#000",
          textAlign: "left",
        }}
        
      >
        ACADEMIZE
      </b>
      <input
        style={{
          border: "none",
          backgroundColor: "#fff",
          position: "absolute",
          height: "9.53%",
          width: "79.77%",
          top: "50%",
          right: "9.25%",
          bottom: "40.47%",
          left: "10.98%",
          borderRadius: "100px",
          padding: '15px',
          border: "thin solid grey"
        }}
        type="text"
        placeholder="Roll Number"
        value={rollNum}
        onChange={(e) => setRollNum(e.target.value)}
        
      />
      <div
        style={{
          position: "absolute",
          width: "34.1%",
          top: "43.22%",
          left: "12.14%",
          fontSize: "18px",
          color: "#000",
          textAlign: "left",
          display: "inline-block",
        }}
      >
        Roll Number
      </div>
      <input
        style={{
          border: "none",
          backgroundColor: "#fff",
          position: "absolute",
          height: "9.53%",
          width: "79.77%",
          top: "72.03%",
          right: "9.25%",
          bottom: "18.43%",
          left: "10.98%",
          borderRadius: "100px",
          padding:"15px",
          border: "thin solid grey"
        }}
        type="text"
        placeholder="Semesters (comma-seperated)"
        value={semesterNum}
        onChange={(e) => setSemesterNum(e.target.value)}
      />
      <div
        style={{
          position: "absolute",
          height: "6.78%",
          width: "30.64%",
          top: "85.59%",
          right: "36.99%",
          bottom: "7.63%",
          left: "32.37%",
          // backgroundColor: "#fff",
        }}
      />
      <button
      class="whitebutton"
        style={{
          cursor: "pointer",
          padding: "0",
          position: "absolute",
          height: "40px",
          width: "100px",
          top: "85.59%",
          right: "36.99%",
          bottom: "7.63%",          
          borderRadius: "100px",
          
        }}
      >
        Search
      </button>
    {showError && (
          <p style={{ color: "red" }}>Please enter a search term</p>
        )}
        {matchError && (
          <p style={{ color: "red", marginLeft:'30px'}}>No results found!</p>
        )}
      
      <b
        style={{
          position: "absolute",
          top: "22.25%",
          left: "12.43%",
          fontSize: "28px",
          color: "#000",
          textAlign: "left",
      }}
      >
        Subject Performance
      </b>
    </form>
    </div>
        <div style={{marginTop: "30%", display: "flex", justifyContent: "center", }}>
        {searchResults.length > 0 && (
          <div
            className="dataDisplay"
          >
            {searchResults.length > 0 && (
              <div style={{ padding: "1%" }}>
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "750",
                    textAlign: "start",
                  }}
                >
                  {searchResults[0].student_name__name}
                </p>
                <br />
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    textAlign: "start",
                  }}
                >
                  Roll Number: {searchResults[0].student_name__roll_num}
                </p>
                <br />
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    textAlign: "start",
                  }}
                >
                  Phone: {searchResults[0].student_name__phone_number}
                </p>
                <br />
              </div>
            )}
  
            {searchResults.map((item, index) => {
              if (
                index === 0 ||
                item.semester_num !== searchResults[index - 1].semester_num
              ) {
                return (
                  <div key={index} style={{ }} >
                    <p
                      style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        textAlign: "start",
                      }}
                    >
                      Semester {item.semester_num}
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "400",
                        textAlign: "start",
                      }}
                    >
                      {item.subject__subject}: {item.marks}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div key={index} style={{ }}>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "400",
                        textAlign: "start",
                      }}
                    >
                      {item.subject__subject}: {item.marks}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        )}
        {
          <div style={{opacity: "0"}}>..........................</div>
        }
        {searchResults.length > 0 && (
          <DynamicChart
            data={searchResults.map((item) => ({
              name: `${item.subject__subject}`,
              value: item.marks,
              semester: item.semester_num,
            }))}
          />
        )}
        </div>
      </div>
    );
  }
  
  export default Marks;