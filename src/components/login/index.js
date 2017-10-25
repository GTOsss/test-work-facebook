import React from 'react';
import FBIcon from 'react-icons/lib/fa/facebook-square';
import PropTypes from 'prop-types';

import style from './login.scss';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onClickLogin() {
    this.props.login();
  }

  render() {
    return (
      <div className={style.wrapLogin}>
        <div className={style.loginBtn} onClick={this.onClickLogin}>
          <FBIcon color={'#FFF'} size={39} className={style.FBIcon} />Вход через Facebook
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
};

Login.defaultProps = {
  login: null,
};


export default Login;
