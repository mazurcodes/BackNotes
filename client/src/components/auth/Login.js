import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);

  const initialState = {
    email: '',
    password: ''
  };

  const [user, setUser] = useState(initialState);
  const { email, password } = user;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    login(user);
    console.log('login: ', user);
  };
  return (
    <div className="form-container">
      <h1>Account Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <br/>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <br/>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" value="LOGIN"/>
      </form>
    </div>
  );
};

export default Login;
