import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import Sidebar from './Sidebar';
import StudentDashboard from './StudentDashboard';
import AdminDashboard from './AdminDashboard';
import SubmitFeedback from './SubmitFeedback';
import MyFeedback from './MyFeedback';
import ViewResults from './ViewResults';
import AllFeedback from './AllFeedback';
import CourseReports from './CourseReports';
import Insights from './Insights';

function AppRouter() {
  const [user, setUser] = useState(null); // {role, email, subject?}
  const [active, setActive] = useState('dashboard');
  const [studentFeedbacks, setStudentFeedbacks] = useState(() => {
    try {
      const raw = localStorage.getItem('studentFeedbacks');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [allFeedbacks, setAllFeedbacks] = useState(() => {
    try {
      const raw = localStorage.getItem('allFeedbacks');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }); 
  const [selectedCourse, setSelectedCourse] = useState('');

  // Demo login – now supports teacher subjects
  const handleLogin = ({ role, email, subject }) => {
    setUser({ role, email, subject });
    setActive('dashboard');
  };

  const handleLogout = () => {
    // clear user and reset active page
    setUser(null);
    setActive('dashboard');
  };

  // wrap navigation to intercept logout link
  const handleNavigate = (key) => {
    if (key === 'logout') {
      handleLogout();
    } else {
      setActive(key);
    }
  };

  // Demo feedback submit
  const handleSubmitFeedback = (fb) => {
    const feedback = { ...fb, student: user.email }; 
    const nextStudent = [...studentFeedbacks, feedback];
    const nextAll = [...allFeedbacks, feedback];
    setStudentFeedbacks(nextStudent);
    setAllFeedbacks(nextAll);
    setActive('myfeedback');
  };

  // persist feedbacks so admin (and others) can see submissions across logins/reloads
  useEffect(() => {
    try {
      localStorage.setItem('studentFeedbacks', JSON.stringify(studentFeedbacks));
    } catch (e) {
      // ignore localStorage errors
    }
  }, [studentFeedbacks]);

  useEffect(() => {
    try {
      localStorage.setItem('allFeedbacks', JSON.stringify(allFeedbacks));
    } catch (e) {
      // ignore localStorage errors
    }
  }, [allFeedbacks]);

  // Results aggregation (for admin view)
  const aggregateResults = () => {
    const courses = {};
    allFeedbacks.forEach(fb => {
      if (!courses[fb.course]) {
        courses[fb.course] = { count: 0, overall: 0, content: 0, teachingMethodology: 0, doubtClarification: 0 };
      }
      courses[fb.course].count++;
      courses[fb.course].overall += fb.overall;
      courses[fb.course].content += fb.content;
      courses[fb.course].teachingMethodology += fb.teachingMethodology;
      courses[fb.course].doubtClarification += fb.doubtClarification;
    });
    return Object.entries(courses).map(([course, data]) => ({
      course,
      overall: data.overall / data.count,
      content: data.content / data.count,
      teachingMethodology: data.teachingMethodology / data.count,
      doubtClarification: data.doubtClarification / data.count,
    }));
  };

  // Course report (for admin view)
  const getCourseReport = (course) => {
    const filtered = allFeedbacks.filter(fb => fb.course === course);
    if (filtered.length === 0) return null;
    const sum = filtered.reduce((acc, fb) => ({
      overall: acc.overall + fb.overall,
      content: acc.content + fb.content,
      teachingMethodology: acc.teachingMethodology + fb.teachingMethodology,
      doubtClarification: acc.doubtClarification + fb.doubtClarification,
    }), { overall: 0, content: 0, teachingMethodology: 0, doubtClarification: 0 });
    return {
      overall: sum.overall / filtered.length,
      content: sum.content / filtered.length,
      teachingMethodology: sum.teachingMethodology / filtered.length,
      doubtClarification: sum.doubtClarification / filtered.length,
    };
  };

  // Return feedback entries matching a particular course/subject (used by teachers)
  const getTeacherFeedbacks = (subject) => {
    return allFeedbacks.filter(fb => fb.course === subject);
  };

  // Demo insights
  const demoInsights = [
    'Students appreciate clear course content.',
    'Consider improving teaching methodology delivery.',
    'Doubt clarification support is highly rated.',
  ];

  if (!user) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="app-layout">
      <Sidebar role={user.role} active={active} onNavigate={handleNavigate} />
      <main className="main-content">
        {/* Student views */}
        {user.role === 'student' && active === 'dashboard' && <StudentDashboard onNavigate={setActive} />}
        {user.role === 'student' && active === 'submit' && <SubmitFeedback onSubmit={handleSubmitFeedback} />}
        {user.role === 'student' && active === 'myfeedback' && (
          <MyFeedback feedbacks={studentFeedbacks.filter(fb => fb.student === user.email)} />
        )}
        {user.role === 'student' && active === 'results' && <ViewResults results={aggregateResults()} />}

        {/* Admin views */}
        {user.role === 'admin' && active === 'dashboard' && <AdminDashboard />}
        {user.role === 'admin' && active === 'allfeedback' && <AllFeedback feedbacks={allFeedbacks} />}
        {user.role === 'admin' && active === 'reports' && (
          <CourseReports selectedCourse={selectedCourse} onSelectCourse={setSelectedCourse} reports={getCourseReport(selectedCourse)} />
        )}
        {user.role === 'admin' && active === 'insights' && <Insights insights={demoInsights} />}

        {/* Teacher views */}
        {user.role === 'teacher' && active === 'dashboard' && (
          <div>
            <h2>Teacher Dashboard</h2>
            <p>
              Subject: <strong>{user.subject}</strong>
            </p>
            <p>Below are the feedback entries submitted for your course.</p>
            <AllFeedback feedbacks={getTeacherFeedbacks(user.subject)} />
          </div>
        )}
        {user.role === 'teacher' && active === 'allfeedback' && (
          <div>
            <h2>Feedback for {user.subject}</h2>
            <AllFeedback feedbacks={getTeacherFeedbacks(user.subject)} />
          </div>
        )}
      </main>
    </div>
  );
}

export default AppRouter;
