class CreateSearchVendors < ActiveRecord::Migration
  def change
    create_table :search_vendors do |t|
      t.references :search, index: true, foreign_key: true
      t.references :vendor, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
