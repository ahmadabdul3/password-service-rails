require 'validator'

class AuthenticationController < ApplicationController
  

  def index
    
  end

  def check_password_strength
    password = params[:password]
    result = Validation.get_validator('password').validate(password)
    render :json => result
  end

end