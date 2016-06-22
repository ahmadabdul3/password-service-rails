module StringUtils

  def StringUtils.is_number? string
    return true if Float(string) rescue false
  end
  def StringUtils.alphabet_letter?(string)
    return string =~ /[[:alpha:]]/
  end
  def StringUtils.numeric?(string)
    return string =~ /[[:digit:]]/
  end

end