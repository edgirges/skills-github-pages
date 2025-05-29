function setupAuditCard(cardElement, title, errorCount, errorData) {
    const titleElement = cardElement.querySelector('.audit-title');
    const errorCountElement = cardElement.querySelector('.error-count');
    const chartCanvas = cardElement.querySelector('.error-chart');

    titleElement.textContent = title;
    errorCountElement.textContent = errorCount;

    drawErrorChart(chartCanvas, errorData);
}

function drawErrorChart(canvas, data) {
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear previous drawing
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (!data || data.length === 0) {
        ctx.fillText("No data to display", canvasWidth / 2 - 30, canvasHeight / 2);
        return;
    }

    // Basic chart styling
    ctx.strokeStyle = '#007bff'; // Line color
    ctx.lineWidth = 2;
    ctx.fillStyle = '#333'; // Text color for labels/points
    ctx.font = '10px Arial';

    const padding = 20;
    const chartWidth = canvasWidth - 2 * padding;
    const chartHeight = canvasHeight - 2 * padding;

    const maxValue = Math.max(...data);
    const dataPoints = data.length;

    const xStep = chartWidth / (dataPoints - 1);
    const yStep = chartHeight / maxValue;

    // Draw Y-axis (simple line)
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvasHeight - padding);
    ctx.stroke();

    // Draw X-axis (simple line)
    ctx.beginPath();
    ctx.moveTo(padding, canvasHeight - padding);
    ctx.lineTo(canvasWidth - padding, canvasHeight - padding);
    ctx.stroke();

    // Plot data
    ctx.beginPath();
    ctx.moveTo(padding, canvasHeight - padding - (data[0] * yStep));

    for (let i = 0; i < dataPoints; i++) {
        const x = padding + i * xStep;
        const y = canvasHeight - padding - (data[i] * yStep);
        ctx.lineTo(x, y);
        // Optionally, draw points
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath(); // Reset path for the line
        ctx.moveTo(x,y); // Ensure lineTo continues from this point
    }
    ctx.stroke(); // Draw the line connecting all points

    // Add basic labels (optional, can be expanded)
    // Y-axis max value
    ctx.fillText(maxValue.toString(), 5, padding + 5);
    // X-axis labels (e.g., day numbers for a month)
    for (let i = 0; i < dataPoints; i++) {
        if (i % Math.floor(dataPoints / 5) === 0 || i === dataPoints -1 ) { // Show a few labels
            ctx.fillText((i + 1).toString(), padding + i * xStep -5 , canvasHeight - padding + 15);
        }
    }
}

// --- DUMMY DATA AND EXAMPLE USAGE --- 
// You can change this data to test the card
const DUMMY_ERROR_DATA_MONTH = [
    5, 8, 12, 10, 15, 13, 18, 20, 22, 25, 23, 20, 18, 15, 12, 10, 8, 5, 7, 9, 11, 14, 16, 19, 21, 24, 26, 28, 30, 27
];

document.addEventListener('DOMContentLoaded', () => {
    const card1 = document.querySelector('.audit-card'); // Assuming you have one card for now
    if (card1) {
        setupAuditCard(card1, "Monthly System Audit", DUMMY_ERROR_DATA_MONTH[DUMMY_ERROR_DATA_MONTH.length -1], DUMMY_ERROR_DATA_MONTH);
    }
}); 
