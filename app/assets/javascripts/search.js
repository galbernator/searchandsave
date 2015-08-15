$(document).ready(function() {

  var walmartKey = '6n63u29dzaagpfhjuhrzhpqz';
  var bestbuyKey = 'g9geuwyx5xr49eka2hb3cwn8';
  var searchQuery
  var productList = $('#results-display');

  // when search button is clicked, clear results list and then check which vendors are checked
  $('#search-button').click(function() {
    // assign the search input to the searchQuery variable
    searchQuery = $('#search-input').val().trim();
    // clear any existing results that might be on the page
    productList.html('');
    // show the results area
    var resultArea = $("#search-result-area")
    if (resultArea.css("display") == "none") {
      resultArea.show();
    };
    // check Walmart is selected to fetch results if checked
    if ($('#walmart').attr('checked') !== undefined ) {
      var company = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/New_Walmart_Logo.svg/1280px-New_Walmart_Logo.svg.png";
      loadWalmartProducts(company);
    };

    // check to see if BestBuy is checked and then get search results
    if ($('#bestbuy').attr('checked') !== undefined ) {
      var company = "http://img1.wikia.nocookie.net/__cb20100902185528/logopedia/images/2/28/800px-Best_Buy_Logo_svg.png";
      loadBestBuyProducts(company);
    };
  });

// START WALMART SEARCH FUNCTIONS_______________________________________________

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
    return '<div class="row product-row" product-id="' + product.itemId + '"><span id="close" class="hide-product glyphicon glyphicon-remove-circle"></span><div class="col-xs-12 col-sm-3 center"><a href="' + product.productUrl + '" target="_blank"><img src="' + product.thumbnailImage + '" class="product-img" /></a><br /><span class="current-price">$' + product.salePrice + '</span><br /><span class="regular-price">' + walmartSaleCheck(product) + '</span></div><div class="col-xs-12 col-sm-6 center"><div class="product-content"><a href="' + product.productUrl + '" target="_blank"><h3 class="product-name">' + product.name + '</h3></a><span class="product-description">' + walmartDescriptionPresent(product) + '</span></div></div><div class="col-xs-12 col-sm-3 center" id="vendor-section"><a href="' + product.productUrl + '" target="_blank"><div class="vendor-info"><button class="buy-now-button">Buy Now</button><br><span class="buy-now">from:</span><br /><img src="' + company + '" class="company-logo" /></div></a></div></div>';
  };

  // adds the product from the list to the page by calling renderProduct
  var addWalmartProduct = function (company, product) {
    var html = renderWalmartProduct(company, product);
    productList.append(html);
  };

  var loadWalmartProducts = function (company) {
    var url = 'http://api.walmartlabs.com/v1/search?apiKey=' + walmartKey + '&query=' + searchQuery + '&format=json&callback=?';
    $.getJSON(url, function(data) {
      // loop through each of the results and then call addProduct on each result
      for (var i=0; i < data.items.length; i += 1) {
        var product = data.items[i]
        addWalmartProduct(company, product);
      };
    })
  };

// END WALMART SEARCH FUNCTIONS________________________________________


// START BESTBUY SEARCH FUNCTIONS_______________________________________________

  // check and see if the item is on sale
  var bestBuySaleCheck = function(product) {
    if (product.msrp === undefined) {
      return ""
    } else {
      return "Regularly: $" + product.msrp
    }
  };

  // make the search term suitable for the Best Buy API format for general search
  var bestBuyQuery = function(str) {
    var newQuery = str = str.replace(/\s+/g, "&search=");
    return newQuery
  };

  // check and see if there is a product description, if not replace with text
  var bestBuyDescriptionPresent = function(product){
    // if (product.shortDescription == undefined) {
    //   return "There is no description available for this item."
    // } else {
    //   return product.shortDescription
    // }
  };

  // check and see if the item is on sale
  var bestBuySaleCheck = function(product) {
    // if (product.msrp === undefined) {
    //   return ""
    // } else {
    //   return "Regularly: $" + product.msrp
    // }
  };

  // takes the product information and returns a table row with the product information
  var renderBestBuyProduct = function (company, product) {
    return '<div class="row product-row" product-id="' + product.sku + '"><span id="close" class="hide-product glyphicon glyphicon-remove-circle"></span><div class="col-xs-12 col-sm-3 center"><a href="' + product.url + '" target="_blank"><img src="' + product.thumbnailImage + '" class="product-img" /></a><br /><span class="current-price">$' + product.salePrice + '</span><br /><span class="regular-price">' + product.regularPrice + '</span></div><div class="col-xs-12 col-sm-6 center"><div class="product-content"><a href="' + product.url + '" target="_blank"><h3 class="product-name">' + product.name + '</h3></a><span class="product-description">' + product.shortDescription + '</span></div></div><div class="col-xs-12 col-sm-3 center" id="vendor-section"><a href="' + product.url + '" target="_blank"><div class="vendor-info"><button class="buy-now-button">Buy Now</button><br><span class="buy-now">from:</span><br /><img src="' + company + '"  class="company-logo" /></div></a></div></div>';
  };

  // adds the product from the list to the page by calling renderProduct
  var addBestBuyProduct = function (company, product) {
    var html = renderWalmartProduct(company, product);
    productList.append(html);
  };

  var loadBestBuyProducts = function (company) {
    var url = 'http://api.bestbuy.com/v1/products(search=' + bestBuyQuery(searchQuery) + ')?show=sku,name,shortDescription,customerReviewAverage,thumbnailImage,regularPrice,salePrice,url&sort=salesRankMediumTerm.asc,salePrice.dsc&apiKey=' + bestbuyKey +'&format=json';


    $.getJSON(url, function(data) {
      // loop through each of the results and then call addProduct on each result
      console.log(data);
      for (var i=0; i < data.products.length; i += 1) {
        var product = data.products[i]
        console.log("The product URL is " + product.url);
        addWalmartProduct(company, product);
      }
  }, 'jsonp');
  };

// END BESTBUY SEARCH FUNCTIONS________________________________________

  // hide a search result
  productList.on('click', '.hide-product', function(){
    $(this).parent().slideUp(300);
  });

});
