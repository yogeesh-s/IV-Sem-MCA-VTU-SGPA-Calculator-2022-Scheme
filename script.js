const apptitle = "IV Sem SGPA Calculator";

const subjects = [
  "Professional Elective 5",
  "Professional Elective 6",
  "Technical SEMINAR",
  "Project work phase - 2",
];

const subject_code = [
  "22MCA41X",
  "22MCA42X",
  "22MCA43",
  "22MCA44",
];

const credits = [3, 3, 2, 16];

const marks = [];

const generateTitle = () => {
  const title = document.createElement("title");
  title.innerText = apptitle;
  document.head.appendChild(title);
};

const generateCalculator = (subjects, subject_code, credits) => {
  const div = document.createElement("div");
  div.className = "container";
  document.body.appendChild(div);
  let rows = subjects.length;
  const h2 = document.createElement("h2");
  h2.innerText = apptitle;
  document.querySelectorAll(".container")[0].appendChild(h2);
  for (let i = 0; i < rows; i++) {
    const div = document.createElement("div");
    div.className = "row";
    const label = document.createElement("label");
    label.innerText = subjects[i];
    label.for = "subject" + i;
    div.appendChild(label);
    const input = document.createElement("input");
    input.type = "number";
    input.id = "subject" + i;
    input.placeholder = subject_code[i];
    if(subject_code[i] == "22MCA44"){
      input.min = 0;
      input.max = 200;
    }else{
      input.min = 0;
      input.max = 100;
    }
    div.appendChild(input);
    document.querySelectorAll(".container")[0].appendChild(div);
    const creditdiv = document.createElement("div");
    creditdiv.className = "credit";
    creditdiv.innerText = "credits: " + credits[i];
    div.appendChild(creditdiv);
  }
  const button = document.createElement("button");
  button.innerText = "Calculate SGPA";
  document.querySelectorAll(".container")[0].appendChild(button);
  let heading3 = document.createElement("h3");
  heading3.innerText = "Made with ❤️️ by Yogeesh S";
  document.querySelectorAll(".container")[0].appendChild(heading3);
};



const generateResult = (subjects, subject_code, credits) => {
  let totalmarks = (totalcredits = totalgradepoints = totalcreditpoints = 0);
  maindiv.innerHTML = "";
  maindiv.style = "block";
  let rows = subjects.length;
  const h2 = document.createElement("h2");
  h2.innerText = "Result";
  document.querySelectorAll(".container")[1].appendChild(h2);
  const div = document.createElement("div");
  div.className = "result-table";
  document.querySelectorAll(".container")[1].appendChild(div);
  const table = document.createElement("table");
  div.appendChild(table);
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.innerText = "Subject and code";
  tr.appendChild(th1);
  const th2 = document.createElement("th");
  th2.innerText = "Marks";
  tr.appendChild(th2);
  const th3 = document.createElement("th");
  th3.innerText = "Credits";
  tr.appendChild(th3);
  const th4 = document.createElement("th");
  th4.innerText = "Grade Points";
  tr.appendChild(th4);
  const th5 = document.createElement("th");
  th5.innerText = "Credit Points";
  tr.appendChild(th5);
  table.appendChild(tr);
  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = subjects[i] + "\n" + subject_code[i];
    tr.appendChild(td1);
    const td2 = document.createElement("td");
    td2.innerText = Number(document.getElementById("subject" + i).value);
    totalmarks += Number(document.getElementById("subject" + i).value);
    tr.appendChild(td2);
    const td3 = document.createElement("td");
    td3.innerText = credits[i];
    totalcredits += credits[i];
    tr.appendChild(td3);
    const td4 = document.createElement("td");
    let gradepoints;
    if(subject_code[i] == "22MCA44"){
      gradepoints = calculateGradePoints(
        Math.ceil(Number(document.querySelector("#subject" + i).value)/2)
      );
    }else{
      gradepoints = calculateGradePoints(
        Number(document.querySelector("#subject" + i).value)
      );
    }
    totalgradepoints += gradepoints;
    td4.innerText = gradepoints;
    tr.appendChild(td4);
    const td5 = document.createElement("td");
    td5.innerText = credits[i] * gradepoints;
    totalcreditpoints += credits[i] * gradepoints;
    tr.appendChild(td5);
    table.appendChild(tr);
  }
  const lasttr = document.createElement("tr");
  const tottd1 = document.createElement("th");
  tottd1.innerText = "Total";
  lasttr.appendChild(tottd1);
  const tottd2 = document.createElement("td");
  tottd2.innerHTML = "<b>" + totalmarks + "</b>";
  lasttr.appendChild(tottd2);
  const tottd3 = document.createElement("td");
  tottd3.innerHTML = "<b>" + totalcredits + "</b>";
  lasttr.appendChild(tottd3);
  const tottd4 = document.createElement("td");
  tottd4.innerHTML = "<b>" + totalgradepoints + "</b>";
  lasttr.appendChild(tottd4);
  const tottd5 = document.createElement("td");
  tottd5.innerHTML = "<b>" + totalcreditpoints + "</b>";
  lasttr.appendChild(tottd5);
  table.appendChild(lasttr);
  const h22 = document.createElement("h2");
  h22.innerText =
    "Your SGPA is: " + (totalcreditpoints / totalcredits).toFixed(2);
  document.querySelectorAll(".container")[1].appendChild(h22);
  let button = document.createElement("button");
  button.id = "print";
  button.innerText = "Print Result";
  document.querySelectorAll(".container")[1].appendChild(button);
  let heading3 = document.createElement("h3");
  heading3.innerText = "Made with ❤️️ by Yogeesh S";
  document.querySelectorAll(".container")[1].appendChild(heading3);
  document.querySelector("#print").addEventListener("click", () => {
    let printContent = document.querySelectorAll(".container")[1].innerHTML;
    let bodyContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = bodyContent;
  });
};

const checkValidMarks = () => {
  let rows = subjects.length;
  for (let i = 0; i < rows; i++) {
    let marks = document.querySelector("#subject" + i).value;
    let nmarks = Number(marks);
    if (marks == "") {
      alert(
        "Please check your marks for " +
          subjects[i] +
          "  [" +
          subject_code[i] +
          "]"
      );
      return false;
    }else if(subject_code[i] == "22MCA44"){
      return true;
    }
    else if (nmarks < 0 || nmarks > 100) {
      alert(
        "Please check your marks for " +
          subjects[i] +
          "  [" +
          subject_code[i] +
          "]"
      );
      return false;
    }
  }
  return true;
};

const calculateGradePoints = (marks) => {
  console.log(marks);
  if (marks >= 90) {
    return 10;
  } else if (marks >= 80 && marks <= 89) {
    return 9;
  } else if (marks >= 70 && marks <= 79) {
    return 8;
  } else if (marks >= 60 && marks <= 69) {
    return 7;
  } else if (marks >= 55 && marks <= 59) {
    return 6;
  } else if (marks >= 50 && marks <= 54) {
    return 5;
  } else {
    return 0;
  }
};

generateTitle();
generateCalculator(subjects, subject_code, credits);
document.querySelector("button").addEventListener("click", () => {
  if (checkValidMarks()) {
    generateResult(subjects, subject_code, credits);
    window.scrollTo(0, 740);
  }
});
const maindiv = document.createElement("div");
maindiv.className = "container";
document.body.appendChild(maindiv);
maindiv.style.display = "none";
