class SearchController < ApplicationController

  def create
    search = Search.create!(search_params)
    query = search.search_query
    vendors = search.search_vendors.map { |sv| Vendor.find sv.vendor.id }
    @products = []
    vendors.each do |vendor|
      case vendor.name
      when "Walmart"
        walmart_results = Walmart.get_products(query)
        @products << walmart_results unless walmart_results.nil?
      when "Best Buy"
      else
        @products << "This didn't work very well now did it?!?!"
      end
    end
    @products.sort! { |a, b| a[:sale_price] <=> b[:sale_price] } unless @products.any? { |p| p.class == String }
    respond_to do |format|
      format.js { @products }
    end
  end

  private

  def search_params
    params.require(:search).permit([:search_query, {vendor_ids: []},])
  end
end
