class AddFieldsToSearch < ActiveRecord::Migration
  def change
    add_column :searches, :search_query, :string
  end
end
