class VendorsController < ApplicationController

  def new
    @vendor = Vendor.new
  end

  def create
    vendor_params = params.require(:vendor).permit(:name)
    vendor = Vendor.new(vendor_params)
    if vendor.save
      redirect_to root_path
    else
      render :new
    end
  end
end
