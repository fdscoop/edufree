import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import './AdminDashboards.css';

function TeacherDashboard({ userRole, teacherId, onLogout }) {
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentProgress, setStudentProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    avgProgress: 0
  });

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (!teacherId) {
      setAssignedStudents([]);
      setSubjects([]);
      setLoading(false);
      return;
    }
    fetchAssignedStudents();
    fetchSubjectDetails();
  }, [teacherId]);

  async function fetchSubjectDetails() {
    try {
      const { data: staffData } = await supabase
        .from('staff')
        .select('subject_id, assigned_classes')
        .eq('id', teacherId)
        .single();

      if (!staffData || !staffData.subject_id) {
        setSubjects([]);
        return;
      }

      const { data: subjectData } = await supabase
        .from('subjects')
        .select('id, name, class_id')
        .eq('id', staffData.subject_id);

      setSubjects(subjectData || []);
    } catch (err) {
      console.error('Error fetching teacher subject info:', err);
    }
  }

  async function fetchAssignedStudents() {
    setLoading(true);
    try {
      if (!teacherId) {
        setAssignedStudents([]);
        setStats({ totalStudents: 0, activeStudents: 0, avgProgress: 0 });
        setLoading(false);
        return;
      }

      // Fetch students assigned to this teacher
      const { data, error } = await supabase
        .from('teacher_student_assignments')
        .select(`
          id,
          student_id,
          subject,
          assigned_date,
          student_profiles (
            id,
            first_name,
            last_name,
            email,
            nos_id,
            class_id,
            state_code,
            district,
            classes (
              name
            )
          )
        `)
        .eq('teacher_id', teacherId)
        .eq('is_active', true);

      if (error) throw error;

      const studentsData = data.map(assignment => ({
        assignmentId: assignment.id,
        id: assignment.student_profiles.id,
        name: `${assignment.student_profiles.first_name || ''} ${assignment.student_profiles.last_name || ''}`.trim(),
        email: assignment.student_profiles.email,
        nos_id: assignment.student_profiles.nos_id,
        class_name: assignment.student_profiles.classes?.name || 'N/A',
        class_id: assignment.student_profiles.class_id,
        state_code: assignment.student_profiles.state_code,
        district: assignment.student_profiles.district,
        assignedSubject: assignment.subject,
        assignedDate: assignment.assigned_date
      }));

      setAssignedStudents(studentsData);
      
      setStats({
        totalStudents: studentsData.length,
        activeStudents: studentsData.length,
        avgProgress: 0
      });

    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchStudentProgress(studentId) {
    try {
      const { data, error } = await supabase
        .from('student_progress')
        .select(`
          id,
          watched_seconds,
          completed,
          completed_at,
          updated_at,
          lessons (
            id,
            title,
            duration_seconds,
            chapters (
              title,
              subjects (
                name
              )
            )
          )
        `)
        .eq('student_id', studentId);

      if (error) throw error;

      setStudentProgress(data || []);
    } catch (err) {
      console.error('Error fetching progress:', err);
    }
  }

  function handleStudentClick(student) {
    setSelectedStudent(student);
    fetchStudentProgress(student.id);
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="teacher-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Teacher Dashboard</h1>
            <p className="welcome-text">Welcome, {userRole.name}</p>
            {subjects.length > 0 && (
              <span className="subject-badge">{subjects[0].name}</span>
            )}
          </div>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-content">
            <h3>{stats.totalStudents}</h3>
            <p>Assigned Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.activeStudents}</h3>
            <p>Active Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.avgProgress}%</h3>
            <p>Average Progress</p>
          </div>
        </div>
      </div>

      <div className="tab-content">
        <div className="students-section">
            <h2>Assigned Students ({assignedStudents.length})</h2>
            
            {assignedStudents.length === 0 ? (
              <div className="empty-state">
                <p>No students assigned yet.</p>
              </div>
            ) : (
              <div className="students-grid">
                {assignedStudents.map(student => (
                  <div 
                    key={student.id} 
                    className="student-card"
                    onClick={() => handleStudentClick(student)}
                  >
                    <div className="student-header">
                      <h3>{student.name || 'Unnamed Student'}</h3>
                      <span className="class-badge">{student.class_name}</span>
                    </div>
                    <div className="student-details">
                      <p><strong>NOS ID:</strong> {student.nos_id || 'N/A'}</p>
                      <p><strong>Email:</strong> {student.email}</p>
                      <p><strong>Subject:</strong> {student.assignedSubject}</p>
                      <p><strong>District:</strong> {student.district || 'N/A'}</p>
                    </div>
                    <button className="view-progress-btn">View Progress →</button>
                  </div>
                ))}
              </div>
            )}

            {/* Student Progress Modal */}
            {selectedStudent && (
              <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h2>{selectedStudent.name}'s Progress</h2>
                    <button onClick={() => setSelectedStudent(null)} className="close-btn">×</button>
                  </div>
                  
                  <div className="progress-details">
                    <h3>Video Lessons Progress</h3>
                    {studentProgress.length === 0 ? (
                      <p>No progress recorded yet.</p>
                    ) : (
                      <table className="progress-table">
                        <thead>
                          <tr>
                            <th>Lesson</th>
                            <th>Chapter</th>
                            <th>Progress</th>
                            <th>Watch Time</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentProgress.map(progress => {
                            const watchPercentage = progress.lessons.duration_seconds > 0 
                              ? Math.round((progress.watched_seconds / progress.lessons.duration_seconds) * 100)
                              : 0;
                            
                            return (
                              <tr key={progress.id}>
                                <td>{progress.lessons.title}</td>
                                <td>{progress.lessons.chapters?.title || 'N/A'}</td>
                                <td>
                                  <div className="progress-bar">
                                    <div 
                                      className="progress-fill" 
                                      style={{ width: `${watchPercentage}%` }}
                                    >
                                      {watchPercentage}%
                                    </div>
                                  </div>
                                </td>
                                <td>{Math.floor(progress.watched_seconds / 60)} mins</td>
                                <td>
                                  <span className={progress.completed ? 'status-completed' : 'status-in-progress'}>
                                    {progress.completed ? 'Completed' : 'In Progress'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            )}
        </div>
        <div className="upload-section" style={{ marginTop: '2rem' }}>
          <h2>Video Publishing</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            Official video uploads and publishing are handled by the Super Admin team. Please coordinate with your district coordinator if you have draft lesson recordings to share.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
