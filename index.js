/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

function generateFreelancer() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const occupation =
    OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const rate =
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1)) +
    PRICE_RANGE.min;

  return { name, occupation, rate };
}

const freelancerState = Array.from({ length: NUM_FREELANCERS }, () =>
  generateFreelancer(),
);

function calculateAverageRate() {
  const total = freelancerState.reduce((sum, f) => sum + f.rate, 0);
  return total / freelancerState.length;
}

const averageRateState = calculateAverageRate();

function FreelancerRow(f) {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = f.name;

  const occCell = document.createElement("td");
  occCell.textContent = f.occupation;

  const rateCell = document.createElement("td");
  rateCell.textContent = `$${f.rate}`;

  row.append(nameCell, occCell, rateCell);
  return row;
}

function FreelancerRows() {
  const tbody = document.createElement("tbody");
  freelancerState.forEach((f) => {
    tbody.append(FreelancerRow(f));
  });
  return tbody;
}

function AverageRateDisplay() {
  const message = document.createElement("p");
  message.textContent = `The average rate is $${averageRateState.toFixed(2)}.`;
  return message;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
        <h1>Freelancer Forum</h1>
        <p id="AverageRate"></p>
        <table>
            <thead>
                <tr><th>Name</th><th>Occupation</th><th>Rate</th></tr>
            </thead>
            <tbody id="FreelancerRows"></tbody>
        </table>
    `;
  $app.querySelector("#AverageRate").replaceWith(AverageRateDisplay());
  $app.querySelector("#FreelancerRows").replaceWith(FreelancerRows());
}

render();
