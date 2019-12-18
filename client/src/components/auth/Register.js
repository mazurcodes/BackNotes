import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);

  const initialState = {
    name: '',
    email: '',
    password: '',
    password2: ''
  };

  const [user, setUser] = useState(initialState);
  const { name, email, password, password2 } = user;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    register(user);
    console.log('register: ', user);
  };
  return (
    <div className="form-container">
      <h1>Account Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <br/>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
          <label htmlFor="password">Provide password: </label>
          <br/>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password2">Confim password: </label>
          <br/>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" value="Register"/>
      </form>
    </div>
  );
};

export default Register;
