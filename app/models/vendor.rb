class Vendor < ActiveRecord::Base

  validates :name, uniqueness: true, presence: true

  has_many :search_vendors, dependent: :destroy
  has_many :searches, through: :search_vendors

end
