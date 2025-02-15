//  arrays.js
const steps = ["one", "two", "three"];
function listTemplate(step) {
  return `<li>${step}</li>` //the html string made from step
}
const stepsHtml = steps.map(listTemplate); // use map to convert the list from strings to HTML
document.querySelector("#myList").innerHTML = stepsHtml.join(); // set the innerHTML

const grades = ["A", "B", "A"];
function toGradePointAverage(grade) {
  if (grade == "A") {
    return 4
  } else if (grade == "B") {
    return 3
  } else if (grade == "C") {
    return 2
  } else if (grade == "D") {
    return 1
  } else {
    return 0
  }
}

const gpaScores = grades.map(toGradePointAverage);

const pointsTotal = gpaScores.reduce(function (total, item) {
  return total + item;
});

const gpa = pointsTotal / gpaScores.length;

const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
const shortwords = words.filter(function (word) {
  return word.length < 6;
});

const numbers = [12, 34, 21, 54];
const luckyNumber = 21;

const luckyNumberLocation = numbers.indexOf(luckyNumber);