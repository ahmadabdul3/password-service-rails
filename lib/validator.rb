
require 'standard_response'
require 'string_utilities'

module Validation

  def Validation.get_validator(type)
    return case type
      when "password"
        PasswordValidator.new
      else
        "none"
      end
  end

  class PasswordValidator
    
    def validate(password)
      response = Response.get_object
      if(password.length > 5) 
        score = 0
        
        score = score + length_score(password)
        if score > 0
          score = score + complexity_score(password)
        end

        if score > 0 && score <= 3
          response[Response.data_str] = 'weak'
        elsif score > 3 && score <= 6
          response[Response.data_str] = 'ok'
        elsif score > 6
          response[Response.data_str] = 'strong'
        end
      end
      
      return response
    end

    def length_score(password)
      pass_length = password.length
      score = 0
      
      if pass_length > 5 && pass_length <= 10
        score = 1
      elsif pass_length > 10 && pass_length <= 15
        score = 2
      elsif pass_length > 15
        score = 3
      end #end conditions
      
      return score
    end #end length score

    def complexity_score(password)
      score = 0
      capital_found = false
      special_char_found = false

      password.split("").each do |c|
        if capital_found == false
          result = capital?(c)
          capital_found = result['found']
          score = score + result['value']
        end
        if special_char_found == false
          result = special_char?(c)
          special_char_found = result['found']
          score = score + result['value']
        end
      end #end password loop
      
      return score

    end #end complexity score

    def capital?(character)
      if StringUtils.alphabet_letter?(character) && character == character.upcase
        return get_validator_response_true
      end

      return get_validator_response_false

    end #end capital check

    def special_char?(character)
      special_chars = {
        '!' => true, '@' => true, '#' => true, '$' => true,
        '%' => true, '^' => true, '&' => true, '*' => true,
        '(' => true, ')' => true, '-' => true, '_' => true,
        '+' => true, '=' => true, '`' => true, '~' => true,
        '{' => true, '[' => true, ']' => true, '}' => true,
        '|' => true
      }

      if special_chars[character]
        return get_validator_response_true
      end

      return get_validator_response_false
    end #end special char

    def get_validator_response_false
      return {
        'found' => false,
        'value' => 0
      }
    end
    def get_validator_response_true
      return {
        'found' => true,
        'value' => 3
      }
    end

  end #end passwordValidator class

end