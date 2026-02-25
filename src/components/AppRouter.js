import React, { useState } from 'react';
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
  const [user, setUser] = useState(null); // {role, email}
  const [active, setActive] = useState('dashboard');
  const [studentFeedbacks, setStudentFeedbacks] = useState([]); // Only for demo
  const [allFeedbacks, setAllFeedbacks] = useState([]); // Only for demo
  const [selectedCourse, setSelectedCourse] = useState('');

  // Demo login
  const handleLogin = ({ role, email }) => {
    setUser({ role, email });
    setActive('dashboard');
  };

  // Demo feedback submit
  const handleSubmitFeedback = (fb) => {
    const feedback = { ...fb, student: user.email };
    setStudentFeedbacks([...studentFeedbacks, feedback]);
    setAllFeedbacks([...allFeedbacks, feedback]);
    setActive('myfeedback');
  };

  // Demo results aggregation
  const aggregateResults = () => {
    const courses = {};
    allFeedbacks.forEach(fb => {
      if (!courses[fb.course]) {
        courses[fb.course] = { count: 0, overall: 0, content: 0, instructor: 0, facilities: 0 };
      }
      courses[fb.course].count++;
      courses[fb.course].overall += fb.overall;
      courses[fb.course].content += fb.content;
      courses[fb.course].instructor += fb.instructor;
      courses[fb.course].facilities += fb.facilities;
    });
    return Object.entries(courses).map(([course, data]) => ({
      course,
      overall: data.overall / data.count,
      content: data.content / data.count,
      instructor: data.instructor / data.count,
      facilities: data.facilities / data.count,
    }));
  };

  // Demo course report
  const getCourseReport = (course) => {
    const filtered = allFeedbacks.filter(fb => fb.course === course);
    if (filtered.length === 0) return null;
    const sum = filtered.reduce((acc, fb) => ({
      overall: acc.overall + fb.overall,
      content: acc.content + fb.content,
      instructor: acc.instructor + fb.instructor,
      facilities: acc.facilities + fb.facilities,
    }), { overall: 0, content: 0, instructor: 0, facilities: 0 });
    return {
      overall: sum.overall / filtered.length,
      content: sum.content / filtered.length,
      instructor: sum.instructor / filtered.length,
      facilities: sum.facilities / filtered.length,
    };
  };

  // Demo insights
  const demoInsights = [
    'Students appreciate clear course content.',
    'Consider improving lab facilities.',
    'Instructor engagement is highly rated.',
  ];

  if (!user) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="app-layout">
      <Sidebar role={user.role} active={active} onNavigate={setActive} />
      <main className="main-content">
        {user.role === 'student' && active === 'dashboard' && <StudentDashboard onNavigate={setActive} />}
        {user.role === 'student' && active === 'submit' && <SubmitFeedback onSubmit={handleSubmitFeedback} />}
        {user.role === 'student' && active === 'myfeedback' && <MyFeedback feedbacks={studentFeedbacks.filter(fb => fb.student === user.email)} />}
        {user.role === 'student' && active === 'results' && <ViewResults results={aggregateResults()} />}
        {user.role === 'admin' && active === 'dashboard' && <AdminDashboard />}
        {user.role === 'admin' && active === 'allfeedback' && <AllFeedback feedbacks={allFeedbacks} />}
        {user.role === 'admin' && active === 'reports' && (
          <CourseReports selectedCourse={selectedCourse} onSelectCourse={setSelectedCourse} reports={getCourseReport(selectedCourse)} />
        )}
        {user.role === 'admin' && active === 'insights' && <Insights insights={demoInsights} />}
      </main>
    </div>
  );
}

export default AppRouter;
