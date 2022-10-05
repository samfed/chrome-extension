// ------- only used to console log the price difference -------
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log("message recieved");
  sendResponse(
    document.querySelector(
      "#subtotals-marketplace-table > tbody > tr:nth-child(4) > td.a-color-price.a-size-medium.a-text-right.grand-total-price.aok-nowrap.a-text-bold.a-nowrap"
    ).innerText
  );
});

// ------ below code is used to display the price gap on the checkout page -------

// crerate a new div to inject in the checkout page DOM
var customDiv = document.createElement("div");

// get the final checkout price from the DOM. EX: '₹15,999.00'
const domContent = document.querySelector(
  "#subtotals-marketplace-table > tbody > tr:nth-child(4) > td.a-color-price.a-size-medium.a-text-right.grand-total-price.aok-nowrap.a-text-bold.a-nowrap"
).innerText;

/**
 * convert string, for example, '₹15,999.00' to Number ₹15,999.00
 * remove ₹ symbol
 * replace , with '' (empty space)
 * round-up (using Math.ceil) to the next 10s integer
 */
const domContentNumber = parseFloat(domContent.slice(1).replace(/,/g, ""));
const roundUpNumber = Math.ceil(domContentNumber / 10) * 10;

// inject the price difference in the above created customDiv element
customDiv.innerHTML = `And the price gap is: ${
  roundUpNumber - domContentNumber
}`;

// path of the element around which the newly created customDiv would be injected
const priceElement = document.querySelector(
  "#subtotals-marketplace-table > tbody > tr:nth-child(5)"
);

// inject customDiv in the DOM
priceElement.parentNode.insertBefore(customDiv, priceElement);
