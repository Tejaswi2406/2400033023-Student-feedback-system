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
  const teacherLinks = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'allfeedback', label: 'My Course Feedback' },
  ];
  // include logout at end of all link sets
  const links =
    role === 'admin' ? adminLinks : role === 'teacher' ? teacherLinks : studentLinks;
  const allLinks = [...links, { key: 'logout', label: 'Logout', logout: true }];

  return (
    <nav className="sidebar">
      <ul>
        {allLinks.map(link => (
          <li
            key={link.key}
            className={(active === link.key ? 'active ' : '') + (link.logout ? 'logout' : '')}
            onClick={() => onNavigate(link.key)}
          >
            {link.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
