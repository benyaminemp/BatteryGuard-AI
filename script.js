
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

async function submitParamData() {
  const file = document.getElementById("paramData").files[0];
  if (!file) return alert("Please upload a .csv file");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:5000/api/estimate", {
      method: "POST",
      body: formData
    });
    const result = await res.json();
    document.getElementById("results").innerHTML = `
      <h3>Estimated Parameters</h3>
      <p>R0: ${result.R0}</p>
      <p>R1: ${result.R1}</p>
      <p>C1: ${result.C1}</p>
      <p>Other Info: ${result.notes}</p>
    `;
  } catch (err) {
    alert("Estimation failed. Ensure backend is running and the file is valid.");
    console.error(err);
  }
}
