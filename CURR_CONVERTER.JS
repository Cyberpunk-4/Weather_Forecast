// CURR_CONVERTER.JS

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector(".amount input");

// Function to update flag automatically when currency changes
function updateFlag(element) {
    let currCode = element.value;
    let countryCode = "US"; // default
    if (currCode === "USD") countryCode = "US";
    if (currCode === "INR") countryCode = "IN";
    if (currCode === "EUR") countryCode = "EU";
    if (currCode === "AUD") countryCode = "AU";

    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Attach change listener to both dropdowns
dropdowns.forEach((select) => {
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
});

// Function to fetch and convert currency
const getExchangeRate = async () => {
    let amount = amountInput.value;
    if (amount === "" || amount <= 0) {
        amount = 1;
        amountInput.value = "1";
    }

    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();

    // API URL
    const URL = `${BASE_URL}/${from}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        // extract rate
        let rate = data[from][to];
        let finalAmount = (amount * rate).toFixed(2);

        msg.innerText = `${amount} ${from.toUpperCase()} = ${finalAmount} ${to.toUpperCase()}`;
    } catch (error) {
        msg.innerText = "⚠️ Failed to fetch exchange rate. Try again!";
        console.error(error);
    }
};

// Button click event
btn.addEventListener("click", (e) => {
    e.preventDefault(); // stop form reload
    getExchangeRate();
});

// Initial load
window.addEventListener("load", () => {
    getExchangeRate();
});
