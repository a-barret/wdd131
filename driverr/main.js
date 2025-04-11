let vehicles = [];
let vehicleCount = 0;
const vehicleListContainer = document.querySelector(".vehicle-list");

function VehicleHTMLTemplate(vehicle) {
    let recordsHTML = "";
    if (vehicle.records.length > 0) {
        for (let i = 0; i < vehicle.records.length; i++) {
            let record = vehicle.records[i];
            recordsHTML += `
            <tbody>
              <tr>
                <td>${record.date}</td>
                <td>${record.odometer}</td>
                <td>${record.gallons}</td>
                <td>${record.gasPrice}</td>
              </tr>
            </tbody>`;
        }
    } else {
        recordsHTML = `
        <tbody>
          <tr>
            <td colspan="4">No records available</td>
          </tr>
        </tbody>`;
    }
    return `
    <article class="vehicle" data-model="${vehicle.model}" id="${vehicle.model}-vehicle">
        <img src="images/generic-vehicle.jpg" alt="Generic Vehicle" class="vehicle-image">
        <div class="stats">
          <p class="year">${vehicle.year}</p>
          <h2>${vehicle.make} ${vehicle.model}</h2>
          <p>Odometer: ${vehicle.odometer}</p>
          <p>Efficiency: ${vehicle.efficiency.toFixed(2)} mpg</p>
          <p>Cost/Mile: $${vehicle.costPerMile.toFixed(2)}/mile</p>
          <p>Total Cost: $${vehicle.totalCost.toFixed(2)}</p>
        </div>
        <div class="records">
          <table id="${vehicle.model}-records">
            <thead>
              <tr>
              <th>Date</th>
              <th>Odometer</th>
              <th>Gallons Purchased</th>
              <th>$/gal</th>
              </tr>
            </thead>
            ${recordsHTML}
          </table>
          <button id="${vehicle.model}-add-record">Add Record</button>
        </div>
        <!-- <button class="delete-vehicle">Delete Vehicle</button> -->
      </article>`;
}

function AddVehicleFormTemplate() {
    return `
    <div class="add-form">
    <div class="form-label">
      <h2>New Vehicle</h2>
      <button class="close-form">X</button>
    </div>
    <form id="add-vehicle-form">
      <label for="year">Year:</label>
      <input type="text" id="year" name="year" required>
      <label for="make">Make:</label>
      <input type="text" id="make" name="make" required>
      <label for="model">Model:</label>
      <input type="text" id="model" name="model" required>
      <label for="odometer">Odometer:</label>
      <input type="number" id="odometer" name="odometer" required>
      <button type="submit">Add Vehicle</button>
    </form>
  </div>`
}

function AddRecordFormTemplate() {
    return `
<div class="add-form">
  <div class="form-label">
    <h2>New Record</h2>
    <button class="close-form">X</button>
  </div>
  <form id="add-record-form">
    <label for="date">Date:*</label>
    <input type="text" id="date" name="date" required>
    <label for="odometer">Odometer:*</label>
    <input type="number" id="odometer" name="odometer" required>
    <label for="gallons-purchased">Gallons Purcahsed:</label>
    <input type="number" id="gallons-purchased" name="gallons-purchased" step="0.001">
    <label for="price-per-gallon">Price/Gallon:</label>
    <input type="number" id="price-per-gallon" name="price-per-gallon" step="0.001">
    <p>* required</p>
    <button type="submit">Add Record</button>
  </form>
</div>`
}

function AddRecordFormHandler(event) {
    let parentVehicleElement = event.target.closest(".vehicle");
    const vehicleModel = parentVehicleElement.dataset.model;
    const parentVehicle = vehicles.find(vehicle => vehicle.model === vehicleModel);
    document.body.insertAdjacentHTML("afterbegin", AddRecordFormTemplate());

    document.querySelector("#add-record-form").addEventListener("submit", (event) => {
        event.preventDefault();
        addRecord(event, parentVehicle);
    });
    document.querySelector(".close-form").addEventListener("click", closeForm);
}

function addRecord(event, vehicle) {
    const formData = new FormData(event.target);
    const record = {
        date: formData.get("date"),
        odometer: formData.get("odometer"),
        gallons: formData.get("gallons-purchased"),
        gasPrice: formData.get("price-per-gallon")
    };
    vehicle.records.push(record);
    calculateVehicleStats(vehicle);
    document.querySelector(`#${vehicle.model}-vehicle`).remove();
    vehicleListContainer.insertAdjacentHTML("afterbegin", VehicleHTMLTemplate(vehicle));
    const addRecordButton = document.querySelector(`#${vehicle.model}-add-record`);
    addRecordButton.addEventListener("click", AddRecordFormHandler);
    closeForm();
}

function AddVehicleFormHandler() {
    document.body.insertAdjacentHTML("afterbegin", AddVehicleFormTemplate());

    document.querySelector("#add-vehicle-form").addEventListener("submit", addVehicle)
    document.querySelector(".close-form").addEventListener("click", closeForm);
}

function closeForm() {
    document.querySelector(".add-form").remove();
}

function addVehicle(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const vehicle = {
        year: formData.get("year"),
        make: formData.get("make"),
        model: formData.get("model"),
        odometer: formData.get("odometer"),
        efficiency: 0,
        costPerMile: 0,
        totalCost: 0,
        records: []
    };
    vehicles.push(vehicle);
    vehicleCount++;
    vehicleListContainer.insertAdjacentHTML("afterbegin", VehicleHTMLTemplate(vehicle));
    const addRecordButton = document.querySelector(`#${vehicle.model}-add-record`);
    addRecordButton.addEventListener("click", AddRecordFormHandler);
    closeForm();
}

function calculateVehicleStats(vehicle) {
    let recentOdometer = vehicle.records[vehicle.records.length - 1].odometer;
    let firstOdometer = vehicle.records[0].odometer;
    let milesDriven = recentOdometer - firstOdometer;

    let totalGallons = 0;
    let totalCost = 0;
    vehicle.records.forEach(record => {
        totalGallons += parseFloat(record.gallons);
        totalCost += parseFloat(record.gasPrice) * parseFloat(record.gallons);
    });

    vehicle.odometer = recentOdometer
    vehicle.efficiency = milesDriven / totalGallons;
    vehicle.costPerMile = totalCost / milesDriven;
    vehicle.totalCost = totalCost;
}

if (vehicles.length > 0) {
    
}
document.querySelector(".add-vehicle").addEventListener("click", AddVehicleFormHandler);
