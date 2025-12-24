let records = JSON.parse(localStorage.getItem("records")) || [];
let cgpaArr = JSON.parse(localStorage.getItem("cgpaArr")) || [];

// RTU Grade Point System
function gradePoint(m){
  if(m >= 90) return 10;
  if(m >= 80) return 9;
  if(m >= 70) return 8;
  if(m >= 60) return 7;
  if(m >= 50) return 6;
  if(m >= 40) return 5;
  return 0;
}

function calculate(){

  let rollVal = document.getElementById("roll").value;
  let nameVal = document.getElementById("name").value;

  let marks = [
    Number(document.getElementById("cg_m").value),
    Number(document.getElementById("cd_m").value),
    Number(document.getElementById("wc_m").value),
    Number(document.getElementById("it_m").value),
    Number(document.getElementById("os_m").value)
  ];

  let credits = [3,3,3,3,3]; // AUTO CREDITS

  let totalPoints = 0;
  let totalCredits = 0;

  for(let i=0;i<5;i++){
    totalPoints += gradePoint(marks[i]) * credits[i];
    totalCredits += credits[i];
  }

  let sgpa = (totalPoints / totalCredits).toFixed(2);

  cgpaArr.push(Number(sgpa));
  let cgpa = (cgpaArr.reduce((a,b)=>a+b,0) / cgpaArr.length).toFixed(2);

  let result = sgpa >= 5 ? "PASS" : "FAIL";

  // PRINT DATA
  document.getElementById("pRoll").innerText = rollVal;
  document.getElementById("pName").innerText = nameVal;

  document.getElementById("mCG").innerText = marks[0];
  document.getElementById("mCD").innerText = marks[1];
  document.getElementById("mWC").innerText = marks[2];
  document.getElementById("mIT").innerText = marks[3];
  document.getElementById("mOS").innerText = marks[4];

  document.getElementById("totalMarks").innerText =
    marks.reduce((a,b)=>a+b,0);

  document.getElementById("pSGPA").innerText = sgpa;
  document.getElementById("pCGPA").innerText = cgpa;
  document.getElementById("pResult").innerText = result;

  // STORE
  records.push({roll: rollVal, name: nameVal, sgpa, cgpa, result});
  localStorage.setItem("records", JSON.stringify(records));
  localStorage.setItem("cgpaArr", JSON.stringify(cgpaArr));
}
