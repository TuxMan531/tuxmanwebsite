function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let bitHigh
let bitLow
bitHigh = 0;
bitLow = 0;

async function fetchData() {
    try {
        const response = await fetch('http://localhost:8080/bigdata.json');
        const data = await response.json();
        bitHigh = data.bithigh;
        bitLow = data.bitlow;
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
            body: JSON.stringify({ bithigh: newHigh, bitlow: newLow })
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


async function getBitcoinPrice() {
    await fetchData();
    let price1;
    let price2;
    let amount1Worth;
    let amount2Worth;
    let diffrence1;
    let diffrence2;
    let totaltotal;
    let totaldff;
// btc price
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
    const data = await response.json();
    price1 = data.bpi.USD.rate;
    console.log("btc price: " + price1);
    document.getElementById("btc").innerHTML = "$" + price1;
    price1 = parseFloat(price1.replace(/,/g, ''));
// doge price
    const response2 = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd');
    const data2 = await response2.json();
    price2 = data2.dogecoin.usd;
    console.log("doge price: " + price2);
    document.getElementById("dodc").innerHTML = "$" + price2;
    price2 = parseFloat(price2);

    amount1Worth = 0.00016466 * price1;  // 0.00016466BTC for $15
    amount2Worth = 49.5 * price2; // 49.5 DOGE for $20
    diffrence1 = amount1Worth - 15;
    diffrence2 = amount2Worth - 20;

    totaltotal = amount1Worth + amount2Worth;
    totaldff = diffrence1 + diffrence2;

    document.getElementById("pl1").innerHTML = "$" + diffrence1.toFixed(3);
    document.getElementById("worth1").innerHTML = "$" + amount1Worth.toFixed(3);
    document.getElementById("worth2").innerHTML = "$" + amount2Worth.toFixed(3);
    document.getElementById("pl2").innerHTML = "$" + diffrence2.toFixed(3);
    document.getElementById("totalpl").innerHTML = "$" + totaldff.toFixed(3);
    document.getElementById("totalworth").innerHTML = "$" + totaltotal.toFixed(3);

    //update json data
    if(diffrence1 > bitHigh){
        await updateData(diffrence1, bitLow);
    } else if(bitLow > diffrence1){
        await updateData(bitHigh, diffrence1);
    }

    console.log("gap")
    console.log(bitHigh + "<-- high low -->" + bitLow)
    console.log("btc pl: $" + diffrence1)
    document.getElementById('jsonout').textContent = "BitHigh: $" + bitHigh.toFixed(3) + " BitLow: $" + bitLow.toFixed(3);
}

async function startTracking() {
    let couuntdown = 10;
    while (true) {
        await getBitcoinPrice();
        while (couuntdown !== 0) {
            document.getElementById("update").innerHTML = couuntdown;
            await sleep(1000); // 1000 = 1 second
            couuntdown = couuntdown - 1;
        }
        couuntdown = 30;
    }
}

startTracking();