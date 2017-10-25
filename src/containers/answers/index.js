import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyAnswers from '../../components/forms/my-answers';
import AllAnswers from '../../components/all-answers';
import Loader from '../../components/loader';

import style from './answers.scss';

class Answers extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      activeTab: 1,
    };
  }

  componentDidMount() {
    this.props.loadAnswers();
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onSubmit(values) {
    this.props.saveAnswer(values);
  }

  render() {
    const { isLoading, answers, loadAnswers, id, deleteAnswer } = this.props;

    return (
      <div className={cx(style.wrap)}>
        {isLoading ?
          <Loader /> :
          <div className={style.wrapContent}>
            <div className={style.wrapTabButtons}>
              <div
                className={cx(style.tabBtn, this.state.activeTab === 1 ? style.tabBtnActive : '')}
                onClick={() => this.toggle(1)}
              >
                Мой вопрос
              </div>
              <div
                className={cx(style.tabBtn, this.state.activeTab === 2 ? style.tabBtnActive : '')}
                onClick={() => this.toggle(2)}
              >
                Все вопросы
              </div>
            </div>
            <div className={cx(style.screen, 'col-md-6')}>
              {this.state.activeTab === 1 ?
                <MyAnswers
                  onSubmit={this.onSubmit}
                /> : null}
              {this.state.activeTab === 2 ?
                <AllAnswers
                  loadAnswers={loadAnswers}
                  answers={answers}
                  id={id}
                  deleteAnswer={deleteAnswer}
                /> : null}
            </div>
          </div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.loading.loadingObj.user || state.loading.loadingObj.answer,
  answers: state.user.answers,
  id: state.user.id,
});

Answers.propTypes = {
  isLoading: PropTypes.bool,
  answers: PropTypes.arrayOf(PropTypes.object),
  loadAnswers: PropTypes.bool,
  id: PropTypes.string,
  deleteAnswer: PropTypes.func,
  saveAnswer: PropTypes.func,
};

Answers.defaultProps = {
  isLoading: true,
  answers: [],
  loadAnswers: false,
  id: '',
  deleteAnswer: null,
  saveAnswer: null,
};


export default connect(mapStateToProps)(Answers);
