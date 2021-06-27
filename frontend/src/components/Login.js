import React from 'react';
import '../index.css';
import Header from './Header.js';
import { NavLink } from 'react-router-dom';

function Login(props) {

  const {onLogin} = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailInput(e) {
    setEmail(e.target.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({email, password});
    setEmail('');
    setPassword('');
  }


  return (<>
    <Header>
      <p>
        <NavLink exact className="header__switch" to="/sign-up">Регистрация</NavLink>
      </p>
    </Header>

    <main className="block">
      <section className="login">
        <p className="login__title">Вход</p>
        <form onSubmit={handleSubmit} className="login__form">
          <input required id="email" name="email" type="email" value={email} onChange={handleEmailInput} placeholder="Email" className="login__input"/>
          <input required id="password" name="password" type="password" value={password} onChange={handlePasswordInput} placeholder="Пароль" className="login__input" />
          <button type="submit" className="login__submit">Войти</button>
        </form>
      </section>
    </main>
  </>);
}

export default Login;
