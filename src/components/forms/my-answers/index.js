import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Button from '../../inputs/button';
import Input from '../../inputs/input';
import InputSelect from '../../inputs/input-select';

import style from './my-answers.scss';

const options = [
  { label: 'нужно выбрать', value: '-1' },
  { label: 'я точно не приду', value: '0' },
  { label: 'я точно приду', value: '1' },
];

let Form = class FormClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numberFriendsFocus: false };
    this.onChangeNumberFriends = this.onChangeNumberFriends.bind(this);
  }

  onChangeNumberFriends(e) {
    let text = e.target.value;
    text = text.replace(/\D+/g, '');
    this.inputNumberFriends.value = text;
  }


  render() {
    const { handleSubmit, sendDisable } = this.props;

    return (
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.wrapRow}>
          <div className={style.wrapColumn}>
            <label className={style.label} htmlFor="userName">Имя</label>
            <Field
              name="userName"
              component={props => (
                <Input
                  {...props}
                />
              )}
            />
          </div>
        </div>

        <label className={style.label} htmlFor="countFriend">Количество друзей</label>
        <div>
          <Field
            name="countFriend"
            component={props => (
              <Input
                {...props}
                onChange={this.onChangeNumberFriends}
                setRef={e => this.inputNumberFriends = e} // eslint-disable-line
              />
            )}
          />
        </div>

        <label className={style.label} htmlFor="isCome">Собираетесь прийти?</label>
        <Field
          name="isCome"
          component={props => (
            <InputSelect
              {...props}
              cssInput={{
                borderColor: this.state.numberFriendsFocus ? '#1787FD' : '#CBCBCB',
              }}
              options={options}
            />
          )}
        />
        <Button type="submit" disabled={sendDisable}>Ok</Button>
      </form>
    );
  }
}
;

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  sendDisable: PropTypes.bool,
};

Form.defaultProps = {
  sendDisable: false,
};

Form = reduxForm({ form: 'myAnswers' })(Form);

const selector = formValueSelector('myAnswers');
const mapStateToProps = (state) => {
  const answer = state.user.answers.filter(el => state.user.id === el.id)[0] || {};
  const userNameLS = answer.userName;
  const isComeLS = answer.isCome;
  const countFriendLS = answer.countFriend;
  const initialValues = {
    isCome: isComeLS || '-1',
    userName: userNameLS || state.user.name,
    countFriend: countFriendLS || '',
  };
  return { initialValues, sendDisable: selector(state, 'isCome') === '-1' };
};

export default connect(mapStateToProps)(Form);
