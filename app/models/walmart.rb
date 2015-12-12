class Walmart
  require "walmart_open"

  def self.item_results(query)
    client = WalmartOpen::Client.new do |config|
      config.product_api_key = "6n63u29dzaagpfhjuhrzhpqz"
      config.product_calls_per_second = 5
      config.debug = true
    end
    client.search(query)
  end

  def self.get_products(query)
    response = item_results(query)
    product_results = []
    product_info = response.items.map do |item|
      {
        msrp: item.raw_attributes["msrp"],
        sale_price: item.raw_attributes["salePrice"],
        sku: item.upc,
        link: item.url,
        image: item.thumbnail_image,
        name: item.name,
        description: item.short_description,
        company: "walmart",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/New_Walmart_Logo.svg/1280px-New_Walmart_Logo.svg.png"
      }
    end
    product_info
  end

end
