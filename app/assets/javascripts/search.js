$(document).ready(function() {

  var key = '6n63u29dzaagpfhjuhrzhpqz';
  var searchQuery
  var productList = $('#results-display');

  // when search button is clicked, clear results list and then check which vendors are checked
  $('#search-button').click(function() {
    $('#results-display').html('');
    // show the results area
    var resultArea = $("#search-result-area")
    if (resultArea.css("display") == "none") {
      resultArea.show();
    };
    // check vendors to fetch results for
    if ($('#walmart').attr('checked') !== undefined ) {
      var company = "http://cdn-7.famouslogos.us/images/wal-mart-logo.jpg"
      searchQuery = $('#search-input').val();
      loadWalmartProducts(company);
    };
  });

  // check and see if there is a product description, if not replace with text
  var walmartDescriptionPresent = function(product){
    if (product.shortDescription == undefined) {
      return "There is no description available for this item."
    } else {
      return product.shortDescription
    }
  };

  // check and see if the item is on sale
  var walmartSaleCheck = function(product) {
    if (product.msrp === undefined) {
      return ""
    } else {
      return "Regularly: $" + product.msrp
    }
  };

  // takes the product information and returns a table row with the product information
  var renderWalmartProduct = function (company, product) {
    console.log(product.name + " has an MSRP of " + product.msrp);
    return '<div class="row product-row" product-id="' + product.itemId + '"><span id="close" class="hide-product glyphicon glyphicon-remove-circle"></span><div class="col-xs-12 col-sm-3 center"><a href="' + product.productUrl + '" target="_blank"><img src="' + product.thumbnailImage + '" class="product-img" /></a><br /><span class="current-price">$' + product.salePrice + '</span><br /><span class="regular-price">' + walmartSaleCheck(product) + '</span></div><div class="col-xs-12 col-sm-6 center"><div class="product-content"><a href="' + product.productUrl + '" target="_blank"><h3 class="product-name">' + product.name + '</h3></a><span class="product-description">' + walmartDescriptionPresent(product) + '</span></div></div><div class="col-xs-12 col-sm-3 center" id="vendor-section"><a href="' + product.productUrl + '" target="_blank"><div class="vendor-info"><button class="buy-now-button">Buy Now</button><br><span class="buy-now">from:</span><img src="' + company + '" class="company-logo" /></div></a></div></div>';
  };

  // adds the product from the list to the page by calling renderProduct
  var addWalmartProduct = function (company, product) {
    var html = renderWalmartProduct(company, product);
    productList.append(html);
  };

  var loadWalmartProducts = function (company) {
    var url = 'http://api.walmartlabs.com/v1/search?apiKey=' + key + '&query=' + searchQuery + '&format=json&callback=?';
    $.getJSON(url, function(data) {
      // clear the current list of products
      productList.html('');
      // loop through each of the results and then call addProduct on each result
      console.log(data);
      for (var i=0; i < data.items.length; i += 1) {
        var product = data.items[i]
        addWalmartProduct(company, product);
      };
    })
  };

  // hide a search result
  productList.on('click', '.hide-product', function(){
    $(this).parent().slideUp(300);
  });

});
