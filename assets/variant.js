/**
 * Variant data send to the cart page.
 * Full Mechanism for variant id.
 * @returns
 */
function getVariantFromOptions() {
  let variantArr = []
  $(".product-category select").map(function (i, el) {
    variant = { value: $(el).val(), index: $(el).data('index') };
    variantArr.push(variant)
  });
  console.log(variantArr);
  return variantArr;
}

function updateHistoryState(variant) {
  if (!history.replaceState || !variant) {
    return;
  }
  var newurl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    '?variant=' +
    variant.id;

  window.history.replaceState({ path: newurl }, '', newurl);
}

$('.product-category select').on('change', function () {
  var selectedValues = getVariantFromOptions();
  //console.log(selectedValues);
  var variants = window.product.variants;
  //console.log(variants);

  // Search for product variants based on what was selected in the dropdowns
  var found = _.find(variants, function (variant) {
    //console.log(variant);
    return selectedValues.every(function (values) {
      //console.log(values);
      return _.isEqual(variant[values.index], values.value); // return selected varient
    });
  });

  console.log(found);

  updateHistoryState(found)
  $('#variant-id').val(found.id)

});
