"use strict";
const checkboxes = document.querySelectorAll('.checkbox');
const texts = document.querySelectorAll(".subscribe-long");
const cardNumber = document.getElementById("cardNumber");
const expirationdate = document.getElementById("expirationdate");
const inputElement = document.getElementById("expirationdate");
const paymentIcon = document.getElementById("paymentIcon");
const sumbitnoPlans = document.getElementById("newAcc");
const planSection = document.getElementById("plans");
const planPrice = document.querySelector(".planPrice");
const priceAfterTax = document.querySelector(".priceAfterTax");

const plans = {
  free: {
    price: 0
  },
  main: {
    price: 450
  },
  pro: {
    price: 950
  }
}

let currentPlan = plans.free;

function checkPlan() {
  if (currentPlan.price <= 0) {
    console.log(currentPlan.price); 
    planSection.style.display = "none"
    sumbitnoPlans.style.display = "flex"
  } else if (!currentPlan.price == 0) {
    sumbitnoPlans.style.display = "none"
    planSection.style.display = "flex"
    planPrice.innerHTML = currentPlan.price
    priceAfterTax.innerHTML = currentPlan.price * (0.20) + currentPlan.price;
  }
}

window.onload = checkPlan()

if(window.innerWidth < 770) {
    texts.forEach((text) => {
        text.innerHTML = "سنه /"
    })
    texts[2].innerHTML = "شهر /"
}
window.addEventListener("resize", () => {
    if(window.innerWidth < 770) {
        texts.forEach((text) => {
            text.innerHTML = "سنه /"
        })
        texts[2].innerHTML = "شهر /"
    }
    else {
        texts.forEach((text) => {
            text.innerHTML = "لمدة سنه"
        })
        texts[2].innerHTML = "لمدة شهر"
    }
})
checkboxes.forEach(checkbox => {
 checkbox.addEventListener('click', () => {
   // Active current checkbox
   checkbox.checked = true;

   // Loop all checkboxes and disable all except current
   checkboxes.forEach(otherCheckbox => {
     let tmp = checkbox.value
     currentPlan = plans[tmp]
     if (otherCheckbox !== checkbox) {
       otherCheckbox.checked = false;
      }
      checkPlan()
   });
 });
});

// format expiration date

function formatString(event) {
    var inputChar = String.fromCharCode(event.keyCode);
    var code = event.keyCode;
    var allowedKeys = [8];
  
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }
  
    var inputValue = event.target.value;
    
    // Define the regular expressions for formatting
    var regexPatterns = [
      { pattern: /^([1-9]\/|[2-9])$/, replacement: '0$1/' },
      { pattern: /^(0[1-9]|1[0-2])$/, replacement: '$1/' },
      { pattern: /^([0-1])([3-9])$/, replacement: '0$1/$2' },
      { pattern: /^(0?[1-9]|1[0-2])([0-9]{2})$/, replacement: '$1/$2' },
      { pattern: /^([0]+)\/|[0]+$/, replacement: '0' },
      { pattern: /[^\d\/]|^[\/]*$/, replacement: '' },
      { pattern: /\/\//g, replacement: '/' }
    ];
  
    // Apply the formatting based on the regex patterns
    for (var i = 0; i < regexPatterns.length; i++) {
      inputValue = inputValue.replace(regexPatterns[i].pattern, regexPatterns[i].replacement);
    }
  
    // Update the input value
    event.target.value = inputValue;
  }
  
  inputElement.addEventListener("input", formatString);
  
      
  
// check credit card type
 function creditCardType(cc) {
    let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');  
    let mastercard = new RegExp('^5[1-5][0-9]{14}$');
    let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');
  
    if (visa.test(cc)) {
      return 'Visa';
    }
    if (mastercard.test(cc) || mastercard2.test(cc)) {
      return 'Mastercard';
    }
    return undefined;
  }
  cardNumber.addEventListener("change", () => {
      if (creditCardType(cardNumber.value) === "Visa") {
        paymentIcon.style.display = "initial";
        paymentIcon.src = "../assets/visa.png";
      }
      else if(creditCardType(cardNumber.value) === "Mastercard") {
        paymentIcon.style.display = "initial";
        paymentIcon.src = "../assets/mastercard.png";
      }
      else {
        paymentIcon.style.display = "none";
        
      }
})