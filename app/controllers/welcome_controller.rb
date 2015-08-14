class WelcomeController < ApplicationController

  def index
    @vendors = Vendor.order("lower(name)")
  end

end
