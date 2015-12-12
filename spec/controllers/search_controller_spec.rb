require 'rails_helper'

RSpec.describe SearchController, type: :controller do

  describe '#CREATE' do
    context 'with valid attributes' do
      it 'saves a record to the database' do
        expect do
          post :create, search: {search_query: "stuff with things"}, format: 'js'
        end.to change{Search.count}.by 1
      end

      it 'assigns the vaiable products' do
        post :create, search: {search_query: "stuff with things"}, format: 'js'
        expect(assigns(:products)).to_not be nil
      end
    end

    context 'with invalid attributes' do
      it 'validation to fail with no search_query' do
        expect do
          post :create, search: {search_query: nil}, format: 'js'
        end.to raise_error(ActiveRecord::RecordInvalid, "Validation failed: Search query can't be blank")
      end
    end
  end
end
