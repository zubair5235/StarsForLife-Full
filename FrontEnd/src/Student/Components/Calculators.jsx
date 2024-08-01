import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import "../CSS/Calculators.css";
import Home from "../Assets/Home Icon.jpg";

function Calculators() {
  const Navigate = useNavigate();

  const calculatorModeRef = useRef();
  const contentRef = useRef();
  const titleRef = useRef();
  const addButtonRef = useRef();
  const calculateButtonRef = useRef();
  const toggleButtonRef = useRef();
  const resultRef = useRef();

  const [mode, setMode] = useState("CGPA");
  const [rows, setRows] = useState([
    { id: 1, title: "Semester 1", grade: "", credits: "", gpa: "" },
  ]);
  const [result, setResult] = useState("");

  const grades = {
    S: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    E: 5,
    F: 0,
  };

  const handleHomeNavigation = () => {
    Navigate("/mainpage");
  };

  const handleToggle = () => {
    const newMode = mode === "CGPA" ? "GPA" : "CGPA";
    const toggle = document.querySelector(".Toggle-btn");
    toggle.classList.toggle("on");
    setMode(newMode);
    setRows([
      {
        id: 1,
        title: newMode === "CGPA" ? "Semester 1" : "Subject 1",
        grade: "",
        credits: "",
        gpa: "",
      },
    ]);
    setResult("");
  };

  const handleAddMore = () => {
    const newRows = [...rows];
    const newId = newRows[newRows.length - 1].id + 1;
    newRows.push({
      id: newId,
      title: mode === "CGPA" ? `Semester ${newId}` : `Subject ${newId}`,
      grade: "",
      credits: "",
      gpa: "",
    });
    setRows(newRows);
  };

  const handleDeleteRow = (id) => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalWeightedGrades = 0;

    rows.forEach((row) => {
      const credits = parseFloat(row.credits);
      const gradeValue = grades[row.grade];
      if (!isNaN(credits) && !isNaN(gradeValue)) {
        totalCredits += credits;
        totalWeightedGrades += credits * gradeValue;
      }
    });

    return totalCredits === 0 ? 0 : totalWeightedGrades / totalCredits;
  };

  const calculateCGPA = () => {
    let totalOverallCredits = 0;
    let totalOverallWeightedGPAs = 0;

    rows.forEach((row) => {
      const credits = parseFloat(row.credits);
      const gpa = parseFloat(row.gpa);
      if (!isNaN(credits) && !isNaN(gpa)) {
        totalOverallCredits += credits;
        totalOverallWeightedGPAs += credits * gpa;
      }
    });

    return totalOverallCredits === 0
      ? 0
      : totalOverallWeightedGPAs / totalOverallCredits;
  };

  const handleCalculate = () => {
    const result =
      mode === "CGPA" ? calculateCGPA().toFixed(2) : calculateGPA().toFixed(2);
    setResult(`Calculated ${mode}: ${result}`);
  };

  return (
    <>
      <div className="calculators-container">
        <div className="topBar">
          <button className="home-btn" onClick={handleHomeNavigation}>
            <img src={Home} alt="" />
            Home
          </button>
        </div>

        <div className="filters">
          <div className="leftSide"></div>
          <div className="rightSide">
            <div className="toggle">
              <p>CGPA</p>
              <div className="Toggle-btn" onClick={handleToggle}>
                <div className="round"></div>
              </div>
              <p>GPA</p>
            </div>
          </div>
        </div>

        <div className="calculator">
          <table className="calculator-table">
            <thead>
              <tr>
                <th ref={calculatorModeRef}>
                  {mode === "CGPA" ? "CGPA Calculator" : "GPA Calculator"}
                </th>
                <th ref={contentRef}>{mode === "CGPA" ? "GPA" : "Grade"}</th>
                <th>Credits</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.title}</td>
                  <td>
                    {mode === "CGPA" ? (
                      <input
                        type="number"
                        value={row.gpa}
                        onChange={(e) => {
                          const newRows = [...rows];
                          newRows.find((r) => r.id === row.id).gpa =
                            e.target.value;
                          setRows(newRows);
                        }}
                      />
                    ) : (
                      <select
                        className="grade-select"
                        value={row.grade}
                        onChange={(e) => {
                          const newRows = [...rows];
                          newRows.find((r) => r.id === row.id).grade =
                            e.target.value;
                          setRows(newRows);
                        }}
                      >
                        <option value="">Grade</option>
                        {Object.keys(grades).map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.credits}
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows.find((r) => r.id === row.id).credits =
                          e.target.value;
                        setRows(newRows);
                      }}
                    />
                  </td>
                  <td>
                    <Icon
                      icon="carbon:close-filled"
                      width="20"
                      height="20"
                      onClick={() => handleDeleteRow(row.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="add-more-btn"
            ref={addButtonRef}
            onClick={handleAddMore}
          >
            {mode === "CGPA" ? "Add More Semesters" : "Add More Subjects"}
          </button>
          <button
            className="calculate-btn"
            ref={calculateButtonRef}
            onClick={handleCalculate}
          >
            Calculate {mode === "CGPA" ? "CGPA" : "GPA"}
          </button>

          {result && (
            <div className="result" ref={resultRef}>
              {result}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Calculators;
