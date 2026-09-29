document.addEventListener("teeinblue-event-component-injected", function () {
  const elementToMove = document.querySelector(
    ".custom-delivery-date__wrapper.product-block"
  );
  const insertAfterElement = document.querySelector("#teeFormInputs");
  if (elementToMove && insertAfterElement) {
    insertAfterElement.after(elementToMove);
  }

  const div = document.createElement("div");
  div.textContent = "";
  document.querySelector(".tee-block.tee-product-price").after(div);
  setInterval(function () {
    if (
      document
        .querySelector(".tee-price--saving")
        .querySelectorAll(".money.theme-money.price")
    ) {
      var compare_price = document.querySelector(
        ".money.theme-money.price.tee-price--compare"
      ).innerHTML;
      var regular_price = document.querySelector(
        ".money.tee-price--current"
      ).innerHTML;
      let compareValue = parseFloat(
        compare_price.replace(/[^0-9,.-]/g, "").replace(",", ".")
      );
      let regularValue = parseFloat(
        regular_price.replace(/[^0-9,.-]/g, "").replace(",", ".")
      );

      let priceDifference = compareValue - regularValue;

      compare_price = compare_price.replace(/[^\d.]/g, "");
      regular_price = regular_price.replace(/[^\d.]/g, "");

      var precent =
        ((parseFloat(compare_price) - parseFloat(regular_price)) /
          parseFloat(compare_price)) *
        100;

      document
        .querySelector(".tee-price--saving")
        .querySelectorAll(".money.theme-money.price")[0].innerHTML =
        parseInt(precent) + "% RABATT";

      div.innerHTML = `<div class='tee-price-dis'>du sparst aktuell <span class='priceDifference'>${priceDifference}€</span> Euro - nur für kurze Zeit!</div>`;
    }
  }, 100);
});

document.addEventListener("teeinblue-event-component-injected", function () {
  const parent = document.querySelector(".tee-block.tee-product-price");
  const price_current = document.querySelector(
    "span.money.theme-money.price.tee-price--current"
  );
  const price_regular = document.querySelector(
    "span.tee-price--compare-wrapper.tee-price--regular-wrapper"
  );

  if(parent && price_current && price_regular) {
    parent.insertBefore(price_regular, price_current);
  }
});
