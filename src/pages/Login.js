import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSaveToken, savePlayer } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isBtnDisabled: true,
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateForm);
  }

  handleClick = () => {
    const {
      history,
      dispatch,
    } = this.props;
    dispatch(savePlayer(this.state));
    dispatch(getSaveToken());
    history.push('/game');
  }

  handleConfigClick = () => {
    const {
      history,
    } = this.props;
    history.push('/config');
  }

  validateForm = () => {
    const { name, email } = this.state;

    if (name.length && email.length) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  render() {
    const { name, email, isBtnDisabled } = this.state;
    return (
      <>
        <input
          type="text"
          value={ name }
          name="name"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          placeholder="Nome"
        />
        <input
          type="email"
          value={ email }
          name="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          placeholder="E-mail"
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ isBtnDisabled }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleConfigClick }
        >
          Configurações
        </button>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
