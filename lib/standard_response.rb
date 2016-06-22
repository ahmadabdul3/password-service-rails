module Response

  def Response.get_object
    return {
      Response.status_str => Response.success_str,
      Response.data_str => Response.empty_str,
      Response.message_str => Response.empty_str
    }
  end

  def Response.success_str
    return 'success'
  end
  def Response.fail_str
    return 'fail'
  end
  def Response.status_str
    return 'status'
  end
  def Response.data_str
    return 'data'
  end
  def Response.message_str
    return 'message'
  end
  def Response.empty_str
    return ''
  end



end