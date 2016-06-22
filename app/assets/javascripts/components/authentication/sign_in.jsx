
var SignInForm =
  React.createClass({
    
    getInitialState: function() {
      return {
        email: '',
        passwordInputTimer: null,
        password: '',
        logInFormClass: 'form log-in-box',
        passwordInputMessageClass: 'input-message hidden',
        passwordInputMessageClasses: {
          'hidden': 'input-message hidden',
          'visible': 'input-message'
        },
        passwordStrength: 'weak',
        passwordIndicator: {
          'weak': {
            bubbleClass: 'bubble md red',
            str: 'Weak'
          },
          'ok': {
            bubbleClass: 'bubble md orange',
            str: 'Ok'
          },
          'strong': {
            bubbleClass: 'bubble md green',
            str: 'Strong'
          }
        },
        strIndicatorClasses: {
          hidden: 'tooltip under',
          visible: 'tooltip under visible'
        },
        strIndicatorClass: 'tooltip under',
      };
    },
    componentDidMount: function() {
      setTimeout(this.animateLogInBox, 100);
    },
    animateLogInBox: function() {
      this.setState({
        logInFormClass: 'form log-in-box visible'
      });
    },
    _handleEmailInputChange: function(ev) {
      this.setState({
        email: ev.target.value
      });
    },
    _handlePasswordInputChange: function(ev) {
      //check password strength when user stop typing
      //otherwise too many ajax calls
      var inputValue = ev.target.value;
      this.setState({
        password: inputValue
      });
      this.updateTooltipStatus(inputValue);
      this.updatePasswordInputMessage(inputValue);

      if(inputValue.length > 5) {
        var passwordInputTimer = this.state.passwordInputTimer;
        if (passwordInputTimer != null) {
          clearTimeout(passwordInputTimer);
        }
        this.waitForTypingToEnd(inputValue);
      }
      
    },
    updatePasswordInputMessage: function(inputValue) {
      var length = inputValue.length;
      if(length > 0 && length < 6) {
        this.setState({
          passwordInputMessageClass: this.state.passwordInputMessageClasses.visible
        });
      } else {
        this.setState({
          passwordInputMessageClass: this.state.passwordInputMessageClasses.hidden
        });
      }
    },
    waitForTypingToEnd(inputValue) {
      var callback = function() {
        this.checkPasswordStrength(inputValue);
      }.bind(this);

      this.setState({
        passwordInputTimer: setTimeout(callback, 250)
      });
    },
    _handleSignInClick: function(e) {
      console.log('signing in');
    },
    updateTooltipStatus: function(inputValue) {
      if(inputValue.length > 5) {
        this.setState({
          strIndicatorClass: this.state.strIndicatorClasses.visible
        });
      } else {
        this.setState({
          strIndicatorClass: this.state.strIndicatorClasses.hidden,
          passwordStrength: 'weak'
        });
      }
    },
    updateState: function(variable, value) {
      this.setState({
        variable: value
      })
    },
    checkPasswordStrength: function(inputValue) {
      $.ajax({
        method: "POST",
        url: "/authentication/check_password_strength",
        data: {
          password: inputValue
        }
      })
      .done(function(data){
        console.log(data);
        var strength = data.data;
        if (strength.length > 0) {
          this.setState({
            passwordStrength: strength
          });
        }
      }.bind(this))
      .fail(function(data){
        console.error(data);
      });
    },
    render:function(){
      return (
          <div className='form-box'>
            <form className={this.state.logInFormClass}>
              <div className='row'>
                <input type='email'
                  name='email'
                  placeholder='email'
                  className='input'
                  value={this.state.email}
                  onChange={this._handleEmailInputChange} />
              </div>
              <div className='row'>
                <div className='tooltip-box'>
                  <div className='text'>
                    <input type='password'
                      name='password'
                      className='input'
                      placeholder='password'
                      value={this.state.password}
                      onChange={this._handlePasswordInputChange} />
                    <label className={this.state.passwordInputMessageClass}>6 character minimum</label>
                  </div>
                  <div className='tooltip-container'>
                    <div className={this.state.strIndicatorClass}>
                        <div className="arrow">
                        </div>
                        <div className="text">
                            <div className='bubble-with-message no-pad'>
                              <div className={this.state.passwordIndicator[this.state.passwordStrength].bubbleClass}>
                              </div>
                              <label>
                                {this.state.passwordIndicator[this.state.passwordStrength].str}
                              </label>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <input className='button' type='button' onClick={this._handleSignInClick} defaultValue='login' />
              </div>
            </form>
          </div>

      )
    }
  });

