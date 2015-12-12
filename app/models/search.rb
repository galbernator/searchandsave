class Search < ActiveRecord::Base

  validates :search_query, presence: true

  has_many :search_vendors, dependent: :destroy
  has_many :vendors, through: :search_vendors
end
