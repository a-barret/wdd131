function getGrades(inputSelector) {
    const input = document.querySelector(inputSelector).value;
    const grades = input.Split(",");
    const gradesClean = grades.map(function (grade) {
        grade.trim();
        grade.toUpperCase();
    });
    return gradesClean;
}

function convertGradetoPoints(grade) {
    let points;
    if (grade === "A") {
        points = 4;
    } else if (grade === "B") {
        points = 3;
    } else if (grade === "C") {
        points = 2;
    } else if (grade === "D") {
        points = 1;
    } else {
        points = 0;
    }
    return points;
}

function calculateGPA(grades) {
    gradePoints = grades.map(convertGradetoPoints);
    let pointsTotal = gradePoints.reduce(function (total, item) {
        return total + item;
    });
      
    let gpa = pointsTotal / gpaScores.length;
    return gpa;
}

function outputGPA(gpa, selector) {
    const output = document.querySelector(selector);
    output.innerText = gpa;
}

function clickHandler() {
    const grades = getGrades("#grades");
    const gpa = calculateGPA(grades);
    outputGPA(gpa, "#output");
}

document.querySelector("#submitButton").addEventListener("click", clickHandler);