import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as userActions from '../../redux-store/actions/user';
import Login from '../../components/login';
import Answers from '../answers';
import Loader from '../../components/loader';

import style from '../../style/main.scss';

class App extends React.PureComponent {
  componentDidMount() {
    this.props.actions.init();
  }

  render() {
    const { isLogin, isLoading,
      actions: { loadAnswers, saveAnswer, deleteAnswer, login },
    } = this.props;

    return (
      <div className={style.wrapCenter}>
        {isLoading ? <Loader /> : ''}
        {!isLoading && (isLogin ?
          <Answers
            loadAnswers={loadAnswers}
            saveAnswer={saveAnswer}
            deleteAnswer={deleteAnswer}
          /> :
          <Login login={login} />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const isLogin = state.user.loginStatus.status === 'connected';
  return {
    userId: state.user.id,
    userName: state.user.name,
    isLogin,
    isLoading: state.loading.loadingObj.loginStatus,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators(userActions, dispatch),
  },
});

App.propTypes = {
  isLogin: PropTypes.bool,
  isLoading: PropTypes.bool,
  actions: PropTypes.objectOf(PropTypes.any),
};

App.defaultProps = {
  isLogin: true,
  isLoading: true,
  actions: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

