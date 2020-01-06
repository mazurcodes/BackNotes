import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';

const Login = (props) => {
  const { login, isAuthenticated } = useContext(AuthContext);

  const initialState = {
    email: '',
    password: ''
  };

  const [user, setUser] = useState(initialState);
  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history])

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    login(user);
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
