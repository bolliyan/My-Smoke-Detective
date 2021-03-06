var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com or http://localhost:3001

// initialise server-sent events
function initSSE() {
    if (typeof (EventSource) !== "undefined") {
        var url = rootUrl + "/api/events";
        var source = new EventSource(url);
        source.onmessage = (event) => {
            updateVariables(JSON.parse(event.data));
        };
    } else {
        alert("Your browser does not support server-sent events.");
    }
}
initSSE();

function updateVariables(data) {
    // update the html elements
    document.getElementById("lastevent").innerHTML = JSON.stringify(data);
    if (data.eventName === "Sensor") {
        document.getElementById("sensormessung").innerHTML = data.eventData;
    }
    if (data.eventName == "Alarm") {
        document.getElementById("rauchalarm"). innerHTML = data.eventData;
    }
    if (data.eventName == "Rauchalarm") {
        document.getElementById("rauch"). innerHTML = data.eventData;
}
}

async function setCounter() {
    // read the value from the input field
    var counter = document.getElementById("counterinput").value;

    // call the function
    var response = await axios.post(rootUrl + "/api/device/0/function/setCounter", { arg: counter });

    // Handle the response from the server
    alert("Response: " + response.data.result); // we could to something meaningful with the return value here ... 
}

async function getTemperature() {
    // request the variable "temperature"
    var response = await axios.get(rootUrl + "/api/device/0/variable/temperature");
    var temperature = response.data.result;

    // update the html element
    document.getElementById("temperature").innerHTML = temperature;
}
async function getHumidity() {
    // request the variable "humidity"
    var response = await axios.get(rootUrl + "/api/device/0/variable/humidity");
    var humidity = response.data.result;

    // update the html element
    document.getElementById("humidity").innerHTML = humidity;
}
async function getGas() {
    // request the variable "gas"
    var response = await axios.get(rootUrl + "/api/device/0/variable/gas");
    var gas = response.data.result;

    // update the html element
    document.getElementById("gas").innerHTML = gas;
}
async function setSmoke() {
    // read the value from the input field
    var smoke = document.getElementById("smokeinput").value;

    // call the function
    var response = await axios.post(rootUrl + "/api/device/0/function/setSmoke", { arg: smoke });
    var smoke = response.data.result;
    
    
}
async function getSmoke() {
    // request the variable "smoke"
    var response = await axios.get(rootUrl + "/api/device/0/variable/smoke");
    var smoke = response.data.result;

    // update the html element
    document.getElementById("smoke").innerHTML = smoke;
}
