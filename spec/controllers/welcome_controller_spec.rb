require 'rails_helper'

RSpec.describe WelcomeController, type: :controller do

  describe '#INDEX' do
    it 'renders index.html.erb file' do
      get :index
      expect(response).to render_template(:index)
    end

    it 'assigns an instance variable @search' do
      get :index
      expect(assigns(:search)).to be_a_new Search
    end
  end

end
