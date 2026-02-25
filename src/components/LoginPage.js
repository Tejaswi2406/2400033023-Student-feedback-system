import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ role, email, password });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Your voice shapes better education</h2>
        <div className="role-select">
          <label>Select Role</label>
          <div className="role-buttons">
            <button type="button" className={role === 'student' ? 'active' : ''} onClick={() => setRole('student')}>Student</button>
            <button type="button" className={role === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}>Admin</button>
          </div>
        </div>
        <label>Email Address</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
        <button className="sign-in-btn" type="submit">Sign In</button>
        <div className="demo-note">Demo: Use any email & password</div>
      </form>
    </div>
  );
}

export default LoginPage;
