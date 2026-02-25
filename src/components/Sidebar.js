import React from 'react';
import './Sidebar.css';

function Sidebar({ role, active, onNavigate }) {
  const studentLinks = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'submit', label: 'Submit Feedback' },
    { key: 'myfeedback', label: 'My Feedback' },
    { key: 'results', label: 'View Results' },
  ];
  const adminLinks = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'allfeedback', label: 'All Feedback' },
    { key: 'reports', label: 'Course Reports' },
    { key: 'insights', label: 'Insights' },
  ];
  const links = role === 'admin' ? adminLinks : studentLinks;
  return (
    <nav className="sidebar">
      <ul>
        {links.map(link => (
          <li key={link.key} className={active === link.key ? 'active' : ''} onClick={() => onNavigate(link.key)}>
            {link.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
