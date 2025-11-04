// ✅ Mock data fallback since API returns 401 Unauthorized
const MOCK_DATA = [
  {
    name: "Jessica Taylor",
    gender: "Female",
    age: 28,
    phone_number: "555-1234",
    email: "jessica.taylor@example.com",
    address: "123 Health St, California, USA",
    diagnosis_history: [
      {
        month: "January",
        year: 2021,
        blood_pressure: { systolic: { value: 120 }, diastolic: { value: 80 } },
        heart_rate: { value: 72 },
        temperature: { value: 98.6 }
      },
      {
        month: "January",
        year: 2022,
        blood_pressure: { systolic: { value: 125 }, diastolic: { value: 83 } },
        heart_rate: { value: 75 },
        temperature: { value: 98.4 }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: { systolic: { value: 130 }, diastolic: { value: 85 } },
        heart_rate: { value: 78 },
        temperature: { value: 98.7 }
      }
    ]
  }
];

const patientContainer = document.getElementById("patientDetails");
const diagnosisList = document.getElementById("diagnosisList");
const ctx = document.getElementById("bpChart").getContext("2d");

// ✅ Directly use mock data
function fetchPatientData() {
  try {
    const data = MOCK_DATA;
    const jessica = data.find((p) => p.name === "Jessica Taylor");

    if (jessica) {
      displayPatientInfo(jessica);
      displayDiagnosis(jessica);
      renderChart(jessica);
    }
  } catch (error) {
    console.error("Error loading mock data:", error);
  }
}

function displayPatientInfo(patient) {
  patientContainer.innerHTML = `
    <p><strong>Name:</strong> ${patient.name}</p>
    <p><strong>Gender:</strong> ${patient.gender}</p>
    <p><strong>Age:</strong> ${patient.age}</p>
    <p><strong>Phone:</strong> ${patient.phone_number}</p>
    <p><strong>Email:</strong> ${patient.email}</p>
    <p><strong>Address:</strong> ${patient.address}</p>
  `;
}

function displayDiagnosis(patient) {
  diagnosisList.innerHTML = "";
  patient.diagnosis_history.forEach((record) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${record.month} ${record.year}</strong><br/>
      🩸 BP: ${record.blood_pressure.systolic.value}/${record.blood_pressure.diastolic.value} mmHg<br/>
      ❤️ Heart Rate: ${record.heart_rate.value} bpm<br/>
      🌡️ Temperature: ${record.temperature.value}°F
    `;
    diagnosisList.appendChild(li);
  });
}

function renderChart(patient) {
  const years = patient.diagnosis_history.map((r) => r.year);
  const systolic = patient.diagnosis_history.map((r) => r.blood_pressure.systolic.value);
  const diastolic = patient.diagnosis_history.map((r) => r.blood_pressure.diastolic.value);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: "Systolic (mmHg)",
          data: systolic,
          borderColor: "#3498db",
          backgroundColor: "rgba(52, 152, 219, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: "Diastolic (mmHg)",
          data: diastolic,
          borderColor: "#e74c3c",
          backgroundColor: "rgba(231, 76, 60, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
      scales: {
        y: { beginAtZero: false, title: { display: true, text: "mmHg" } },
        x: { title: { display: true, text: "Year" } },
      },
    },
  });
}

fetchPatientData();
