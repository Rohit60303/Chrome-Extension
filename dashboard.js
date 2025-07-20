document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/api/analytics");
    const data = await response.json();

    if (!data.length) {
      console.warn("No data to display");
      return;
    }

    const labels = data.map(entry => entry.domain);
    const durations = data.map(entry => (entry.totalDuration / 60000).toFixed(2)); // ms to min
    const backgroundColors = data.map(entry => {
      if (entry.type === "productive") return "#4caf50";   // green
      if (entry.type === "unproductive") return "#f44336"; // red
      return "rgba(54, 162, 235, 0.6)"        // gray
    });

    const ctx = document.getElementById("chart").getContext("2d");

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Time Spent (minutes), RED = Unproductive, GREEN = Productive, BLUE = nuetral',
          data: durations,
          backgroundColor: backgroundColors
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Minutes'
            }
          }
        }
      }
    });
  } catch (err) {
    console.error("Dashboard error:", err);
  }
});
