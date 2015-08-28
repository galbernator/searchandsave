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

  // make a request to the Walmart API to get the products that match the search query
  var loadWalmartProducts = function (company) {
    var url = 'http://api.walmartlabs.com/v1/search?apiKey=' + walmartKey + '&query=' + searchQuery + '&format=json&callback=?';
    $.getJSON(url, function(data) {
      // loop through each of the results and then call addProduct on each result
      for (var i=0; i < data.items.length; i += 1) {
        var product = data.items[i];
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

  var bestBuyBrands = ["adobe","adopted","akg","alpine","amana","anna Sui","Apple","ASUS","AT&T","Ballistic","Beats","Belkin","BISSELL","BlackBerry","BLU","Boost Mobile","Bosch","Bose","Bowers & Wilkins","Brother","Case-Mate","Canon","Chief","Cole Haan","Corel","Corsair","Cuisinart","Cynthia Vincent","D-Link","Dell","Denon","Dirt Devil","Disney","Dynex","Dyson","Electrolux","Epson","Eureka","Evutec","Eye-fi","Fitbit","French bull","Frigidaire","Fujifilm","Garmin GPS","GE","Google","GoPro","Griffin","Harman Kardon","Hartke","HBO","Hoover","HP","iFrogz","Isaac Mizrahi New York", "Incase","Infinity","Insignia","Intel","iON","iRobot","Jabra","Jawbone","JBL","JVC","Kaspersky","kate spade new york","Kenwood","Keurig","Kicker","KitchenAid","Klipsch","LeapFrog","Lenovo","LG","LifeProof","Linksys","Logitech","Lorex","Lunatik","MartinLogan","Memorex","Microsoft","Modal","Monster","mophie","Moshi","Motorola","MyPublisher","Nanette Lepore","Nespresso","Nest","Nik","Ninja","Olympus","Onkyo","Optoma","OtterBox","Panasonic","Pentax","PEQ","Philips","Philips Norelco","Philips Sonicare","Pioneer","Plantronics","Platinum","PNY","Polk Audio","Qualcomm","Rocketfish","Rosetta Stone","Roxio","Samson","Samsung","SanDisk","Sanus","Seagate","Sennheiser","Shark","Sharp","Skullcandy","Slingbox","SodaStream","Sol Republic","Sony","Speck","SteelSeries","Swann","Swash","Targus","TCL","Tech21","Thule","TiVo","TomTom","Toshiba","Tracfone","Trend Micro","Turtle Beach","Ultimate Ears","Virgin Mobile","VIZIO","Vitamix","VTech","Wacom","WeBoost","Webroot","Westinghouse","WD","Whirlpool","XFX","Yamaha","Zagg"]

  // var twoWordBrandSearch = function(firstWord, secondWord) {
  //   if (words[i].toLowerCase() === firstWord && words[i+1] === secondWord) {
  //     if (newQuery.length > 0) {
  //       newQuery += '&manufacturer=' + firstWord + '%20' + secondWord;
  //     } else {
  //       newQuery += 'manufacturer=' + firstWord + '%20' + secondWord;
  //     }
  //   }
  // }


  // make the search term suitable for the Best Buy API format for general search
  var bestBuyQuery = function(str) {
    var words = str.split(' ');
    var lowered = [];
    // make sure all manufacturer names are lower case to match search queries
    for (var i = 0; i < bestBuyBrands.length; i += 1) {
      lowered.push(bestBuyBrands[i].toLowerCase());
    };
    var newQuery = "";
    for (var i = 0; i < words.length; i += 1) {
      // manufactures with two words that need to be handled to return appropriate results
      if (words[i].toLowerCase() === 'boost' && words[i+1] === 'mobile') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=boost%20mobile';
        } else {
          newQuery += 'manufacturer=boost%20mobile';
        }
      } else if (words[i].toLowerCase() === 'cole' && words[i+1] === 'haan') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=cole%20haan';
        } else {
          newQuery += 'manufacturer=cole%20haan';
        }
      } else if (words[i].toLowerCase() === 'cynthia' && words[i+1] === 'vincent') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=cynthia%20vincent';
        } else {
          newQuery += 'manufacturer=cynthia%20vincent';
        }
      } else if (words[i].toLowerCase() === 'dirt' && words[i+1] === 'devil') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=dirt%20devil';
        } else {
          newQuery += 'manufacturer=dirt%20devil';
        }
      } else if (words[i].toLowerCase() === 'french' && words[i+1] === 'bull') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=french%20bull';
        } else {
          newQuery += 'manufacturer=french%20bull';
        }
      } else if (words[i].toLowerCase() === 'harman' && words[i+1] === 'kardon') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=harman%20kardon';
        } else {
          newQuery += 'manufacturer=harman%20kardon';
        }
      } else if (words[i].toLowerCase() === 'isaac' && words[i+1] === 'mizrahi') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=isaac%20mizrahi%20new%20york';
        } else {
          newQuery += 'manufacturer=isaac%20mizrahi%20new%20york';
        }
      } else if (words[i].toLowerCase() === 'kate' && words[i+1] === 'spade') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=kate%20spade%20new%20york';
        } else {
          newQuery += 'manufacturer=kate%20spade%20new%20york';
        }
      } else if (words[i].toLowerCase() === 'nanette' && words[i+1] === 'lepore') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=nanette%20lepore';
        } else {
          newQuery += 'manufacturer=nanette%20lepore';
        }
      } else if (words[i].toLowerCase() === 'philips' && words[i+1] === 'norelco') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=philips%20norelco';
        } else {
          newQuery += 'manufacturer=philips%20norelco';
        }
      } else if (words[i].toLowerCase() === 'philips' && words[i+1] === 'sonicare') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=philips%20sonicare';
        } else {
          newQuery += 'manufacturer=philips%20sonicare';
        }
      } else if (words[i].toLowerCase() === 'polk' && words[i+1] === 'audio') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=polk%20audio';
        } else {
          newQuery += 'manufacturer=polk%20audio';
        }
      } else if (words[i].toLowerCase() === 'rosetta' && words[i+1] === 'stone') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=rosetta%20stone';
        } else {
          newQuery += 'manufacturer=rosetta%20stone';
        }
      } else if (words[i].toLowerCase() === 'sol' && words[i+1] === 'republic') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=sol%20republic';
        } else {
          newQuery += 'manufacturer=sol%20republic';
        }
      } else if (words[i].toLowerCase() === 'trend' && words[i+1] === 'micro') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=trend%20micro';
        } else {
          newQuery += 'manufacturer=trend%20micro';
        }
      } else if (words[i].toLowerCase() === 'turtle' && words[i+1] === 'beach') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=turtle%20beach';
        } else {
          newQuery += 'manufacturer=turtle%20beach';
        }
      } else if (words[i].toLowerCase() === 'ultimate' && words[i+1] === 'ears') {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=ultimate%20ears';
        } else {
          newQuery += 'manufacturer=ultimate%20ears';
        }
      } else if (words[i].toLowerCase() === 'virgin' && words[i+1] === 'mobile') {
          if (newQuery.length > 0) {
            newQuery += '&manufacturer=virgin%20mobile';
          } else {
            newQuery += 'manufacturer=virgin%20mobile';
          }
      } else if (lowered.indexOf(words[i].toLowerCase()) >= 0) {
        if (newQuery.length > 0) {
          newQuery += '&manufacturer=' + words[i].toLowerCase();
        } else {
          newQuery += 'manufacturer=' + words[i].toLowerCase();
        }
      } else {
        if (newQuery.length > 0) {
          newQuery += '&search=' + words[i].toLowerCase();
        } else {
          newQuery += 'search=' + words[i].toLowerCase();
        }
      }
    }
    // str.replace(/\s+/g, "&search=");
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
    var html = renderBestBuyProduct(company, product);
    productList.append(html);
  };

  // make a request to the Best Buy API to get the products that match the search query
  var loadBestBuyProducts = function (company) {
    var url = 'http://api.bestbuy.com/v1/products(' + bestBuyQuery(searchQuery) + ')?show=sku,name,shortDescription,customerReviewAverage,thumbnailImage,regularPrice,salePrice,url&sort=salesRankMediumTerm.asc,salePrice.dsc&apiKey=' + bestbuyKey +'&format=json';


    $.getJSON(url, function(data) {
      // loop through each of the results and then call addProduct on each result
      console.log(data);
      for (var i=0; i < data.products.length; i += 1) {
        var product = data.products[i];
        addBestBuyProduct(company, product);
      }
  }, 'jsonp');
  };

// END BESTBUY SEARCH FUNCTIONS________________________________________

  // hide a search result
  productList.on('click', '.hide-product', function(){
    $(this).parent().slideUp(300);
  });

});
