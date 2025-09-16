document.addEventListener('DOMContentLoaded', () => {
  const tempDisplay = document.getElementById('tempValue');
  const humidityDisplay = document.getElementById('humidityValue');
  const statusMessage = document.getElementById('statusMessage');
  const simulateBtn = document.getElementById('simulateBtn');

  const daysCount = document.getElementById('daysCount');
  const startBtn = document.getElementById('startIncubation');
  const pauseBtn = document.getElementById('pauseIncubation');
  const resetBtn = document.getElementById('resetIncubation');
  const demoMode = document.getElementById('demoMode');

  let incubationInterval = null;
  let days = 0;

  // ==================== SIMULACIÓN DE SENSORES ====================
  simulateBtn.addEventListener('click', () => {
    const tempSim = (Math.random() * (39 - 36) + 36).toFixed(1); 
    const humiditySim = (Math.random() * (65 - 55) + 55).toFixed(1);

    tempDisplay.textContent = `${tempSim} °C`;
    humidityDisplay.textContent = `${humiditySim} %`;

    let status = '';
    if (tempSim >= 36 && tempSim <= 38.5 && humiditySim >= 58 && humiditySim <= 62) {
      status = 'Condiciones óptimas para la incubación.';
      statusMessage.style.color = '#2e7d32'; // verde
    } else {
      status = 'Condiciones fuera de rango, ajustar parámetros.';
      statusMessage.style.color = '#b71c1c'; // rojo
    }
    statusMessage.textContent = status;
  });

  // ==================== CONTADOR DE DÍAS ====================
  function updateDays() {
    days++;
    daysCount.textContent = `${days} días`;
  }

  startBtn.addEventListener('click', () => {
    if (!incubationInterval) {
      const intervalTime = demoMode.checked ? 5000 : 86400000; // 5s o 24h
      incubationInterval = setInterval(updateDays, intervalTime);
      startBtn.disabled = true;
      pauseBtn.disabled = false;
    }
  });

  pauseBtn.addEventListener('click', () => {
    clearInterval(incubationInterval);
    incubationInterval = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(incubationInterval);
    incubationInterval = null;
    days = 0;
    daysCount.textContent = "0 días";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  });
});