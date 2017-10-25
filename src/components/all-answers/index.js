import React from 'react';
import cx from 'classnames';
import IconOk from 'react-icons/lib/fa/check';
import IconCancel from 'react-icons/lib/fa/close';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Input from '../inputs/input';

import style from './all-answers.scss';

class AllAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.modalToggle = this.modalToggle.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.cancel = this.cancel.bind(this);
    this.filter = this.filter.bind(this);
    this.state = {
      isModalOpen: false,
      userName: '',
      answersFilter: [],
      answers: [],
    };
  }

  componentWillMount() {
    this.setState({
      answers: this.props.answers,
      answersFilter: this.props.answers,
    });
  }

  componentDidMount() {
    this.props.loadAnswers();
  }

  componentWillReceiveProps(props) {
    this.setState({
      answers: props.answers,
      answersFilter: props.answers,
    });
  }

  filter(e) {
    const value = e.target.value.toLowerCase();
    const result = this.state.answers.filter(el => el.userName.toLowerCase().indexOf(value) >= 0);
    this.setState({
      answersFilter: result,
    });
  }

  modalToggle(name) {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      userName: name,
    });
  }

  deleteAnswer() {
    this.props.deleteAnswer();
    this.modalToggle();
  }

  cancel() {
    this.modalToggle();
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.modalToggle}>
          <ModalBody>
            Я, {this.state.userName} хочу отказаться от своего решения и удалить свой ответ
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.deleteAnswer}>Да</Button>
            <Button onClick={this.cancel}>Нет</Button>
          </ModalFooter>
        </Modal>

        <label htmlFor="filter" className={style.label}>Фильтр</label>
        <Input type="text" name="filter" className={style.input} onChange={this.filter} />

        <table className={cx('table', style.table)}>
          <tbody>
            {this.state.answersFilter.map(el => (
              <tr
                key={el.id}
                className={el.id === id ? style.activeTr : style.tr}
                onClick={el.id === id ? () => { this.modalToggle(el.userName); } : null}
              >
                <td><img src={el.userImg} alt="loading..." className={style.userImg} /></td>
                <td>{el.userName}</td>
                <td>{+el.isCome ? <IconOk size={50} /> : <IconCancel size={50} />}</td>
                <td>{+el.countFriend || null}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

AllAnswers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string,
  loadAnswers: PropTypes.func,
  deleteAnswer: PropTypes.func,
};

AllAnswers.defaultProps = {
  answers: [],
  id: '',
  loadAnswers: null,
  deleteAnswer: null,
};

export default AllAnswers;
