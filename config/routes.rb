Rails.application.routes.draw do

   root 'welcome#index'

   resources :search, only: [:create]

end
