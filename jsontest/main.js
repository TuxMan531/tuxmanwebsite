let high;
let low;

async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/bigdata.json');
        const data = await response.json();
        high = data.high;
        low = data.low;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function updateData(newHigh, newLow) {
    try {
        const response = await fetch('http://localhost:8080/bigdata.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ high: newHigh, low: newLow })
        });
        if (response.ok) {
            console.log('Data updated successfully');
            await fetchData();
        } else {
            console.error('Error updating data');
        }
    } catch (error) {
        console.error('Error updating data:', error);
    }
}

async function main() {
    await fetchData();
    document.getElementById('output').textContent = "High: " + high + " Low: " + low;
}

async function runSelectedCode() {
    await updateData(200, 20);
    document.getElementById('output').textContent = "High: " + high + " Low: " + low;
}

main();