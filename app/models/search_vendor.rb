class SearchVendor < ActiveRecord::Base
  belongs_to :search
  belongs_to :vendor
end
