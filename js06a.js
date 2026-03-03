"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Chapter case

      Order Form Code
      Author: Sami Achnine
      Date:  Mar 03 2026

      Filename: js06a.js
 */


window.addEventListener("load", function () {
      let orderForm = document.forms.orderForm;
      let model = orderForm.elements.model;

      // select model selection list when form opens
      model.focus();

      // add event listenre for each form element
      for (let i = 0; i < orderForm.elements.length; i++) {
            orderForm.elements[i].addEventListener("change", calcOrder);
      }

      // calc is short for calculator
      calcOrder();
});

// calc is short for calculator (modern slang)
function calcOrder() {
      // determine the selected model
      let mIndex = model.selectedIndex;
      let mValue = model.options[mIndex].value;

      // determine selected quantity
      let qIndex = orderForm.elements.qty.selectedIndex;
      let quantity = orderForm.elements.qty[qIndex].value;

      // model cost = model cost * quantity
      let modelCost = mValue * quantity;
      orderForm.elements.modelCost.value = modelCost.toLocaleString("en-US", {style: "currency", currency: "USD"});

      // retrieve and charge cost of protection plan
      let planValue = document.querySelector('input[name="plan"]:checked').value;
      let planCost = planValue * quantity;
      orderForm.elements.planCost.value = planCost.toLocaleString("en-US", {style: "currency", currency: "USD"});

      // calculate order subtotal
      let subtotal = modelCost + planCost;
      orderForm.elements.subtotal.value = subtotal.toLocaleString("en-US", {style: "currency", currency: "USD"});

      // calculate 5% sales tax
      let salesTax = subtotal * 0.05
      orderForm.elements.salesTax.value = salesTax.toLocaleString("en-US", {style: "currency", currency: "USD"});

      // calculate total cost
      let totalCost = subtotal + salesTax;
      orderForm.elements.totalCost.value = totalCost.toLocaleString("en-US", {style: "currency", currency: "USD"});

      orderForm.elements.modelName.value = model.options[mIndex].text;
      let selectedPlan = document.querySelector(`input[name="plan"]:checked`);
      orderForm.elements.planName.value = selectedPlan.labels[0].textContent;
}
