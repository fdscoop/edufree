import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import './AdminDashboards.css';

function DistrictCoordinatorDashboard({ userRole, districtCode, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    activeAssignments: 0
  });

  // Add teacher form
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject_id: ''
  });

  // Assignment form
  const [assignmentForm, setAssignmentForm] = useState({
    teacher_id: '',
    student_id: '',
    subject: ''
  });

  useEffect(() => {
    fetchData();
  }, [districtCode]);

  async function fetchData() {
    setLoading(true);
    await Promise.all([
      fetchTeachers(),
      fetchStudents(),
      fetchAssignments(),
      fetchSubjects()
    ]);
    setLoading(false);
  }

  async function fetchSubjects() {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*, classes(name)')
        .order('name');

      if (error) throw error;
      setSubjects(data || []);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  }

  async function fetchTeachers() {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select(`
          *,
          subjects(name, id)
        `)
        .eq('district_code', districtCode)
        .eq('role', 'subject_teacher')
        .eq('is_active', true);

      if (error) throw error;
      setTeachers(data || []);
      setStats(prev => ({ ...prev, totalTeachers: data?.length || 0 }));
    } catch (err) {
      console.error('Error fetching teachers:', err);
    }
  }

  async function fetchStudents() {
    try {
      const { data, error } = await supabase
        .from('student_profiles')
        .select(`
          *,
          classes(name)
        `)
        .eq('district', districtCode);

      if (error) throw error;
      setStudents(data || []);
      setStats(prev => ({ ...prev, totalStudents: data?.length || 0 }));
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  }

  async function fetchAssignments() {
    try {
      const { data, error } = await supabase
        .from('teacher_student_assignments')
        .select(`
          id,
          teacher_id,
          student_id,
          subject,
          assigned_date,
          staff:staff (
            id,
            name,
            subjects (name)
          ),
          student_profiles!inner (
            id,
            first_name,
            last_name,
            classes (name),
            district
          )
        `)
        .eq('is_active', true)
        .eq('student_profiles.district', districtCode);

      if (error) throw error;

      setAssignments(data || []);
      setStats(prev => ({ ...prev, activeAssignments: data?.length || 0 }));
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  }

  async function handleAddTeacher(e) {
    e.preventDefault();
    
    try {
      // Create auth user
      const tempPassword = Math.random().toString(36).slice(-8) + 'Aa1!';
      
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: teacherForm.email,
        password: tempPassword,
        options: {
          data: {
            name: teacherForm.name
          }
        }
      });

      if (signUpError) throw signUpError;

      // Add to staff table
      const { error: staffError } = await supabase
        .from('staff')
        .insert([{
          user_id: user.id,
          email: teacherForm.email,
          name: teacherForm.name,
          phone: teacherForm.phone,
          role: 'subject_teacher',
          subject_id: teacherForm.subject_id,
          state_code: userRole.state_code,
          district_code: districtCode,
          is_active: true
        }]);

      if (staffError) throw staffError;

      alert(`Teacher added successfully!\n\nEmail: ${teacherForm.email}\nTemporary Password: ${tempPassword}\n\nPlease share these credentials with the teacher.`);
      
      setTeacherForm({
        name: '',
        email: '',
        phone: '',
        subject_id: ''
      });
      
      fetchTeachers();
    } catch (err) {
      console.error('Error adding teacher:', err);
      alert('Error adding teacher: ' + err.message);
    }
  }

  async function handleCreateAssignment(e) {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('teacher_student_assignments')
        .insert([{
          teacher_id: assignmentForm.teacher_id,
          student_id: assignmentForm.student_id,
          subject: assignmentForm.subject,
          is_active: true
        }]);

      if (error) throw error;

      alert('Teacher assigned successfully!');
      setAssignmentForm({
        teacher_id: '',
        student_id: '',
        subject: ''
      });
      
      fetchAssignments();
    } catch (err) {
      console.error('Error creating assignment:', err);
      alert('Error: ' + err.message);
    }
  }

  async function handleRemoveAssignment(assignmentId) {
    if (!confirm('Are you sure you want to remove this assignment?')) return;

    try {
      const { error } = await supabase
        .from('teacher_student_assignments')
        .update({ is_active: false })
        .eq('id', assignmentId);

      if (error) throw error;

      alert('Assignment removed successfully!');
      fetchAssignments();
    } catch (err) {
      console.error('Error removing assignment:', err);
      alert('Error: ' + err.message);
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const studentsByClass = students.reduce((acc, student) => {
    const className = student.classes?.name || 'Unknown';
    acc[className] = (acc[className] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="coordinator-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>District Coordinator Dashboard</h1>
            <p className="welcome-text">Welcome, {userRole.name}</p>
            <span className="district-badge">{districtCode}</span>
          </div>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-content">
            <h3>{stats.totalTeachers}</h3>
            <p>Teachers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-content">
            <h3>{stats.totalStudents}</h3>
            <p>Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{stats.activeAssignments}</h3>
            <p>Active Assignments</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === 'overview' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={activeTab === 'teachers' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('teachers')}
        >
          Manage Teachers
        </button>
        <button
          className={activeTab === 'students' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('students')}
        >
          View Students
        </button>
        <button
          className={activeTab === 'assignments' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('assignments')}
        >
          Teacher Assignments
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <h2>District Overview</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>Teachers by Subject</h3>
                <ul>
                  {subjects.map(subject => {
                    const count = teachers.filter(t => t.subject_id === subject.id).length;
                    return count > 0 && (
                      <li key={subject.id}>{subject.name}: {count}</li>
                    );
                  })}
                </ul>
              </div>
              <div className="info-card">
                <h3>Students by Class</h3>
                <ul>
                  {Object.entries(studentsByClass).map(([className, count]) => (
                    <li key={className}>{className}: {count}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'teachers' && (
          <div className="teachers-section">
            <h2>Add New Teacher</h2>
            <form onSubmit={handleAddTeacher} className="add-teacher-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={teacherForm.name}
                    onChange={(e) => setTeacherForm({...teacherForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={teacherForm.email}
                    onChange={(e) => setTeacherForm({...teacherForm, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={teacherForm.phone}
                    onChange={(e) => setTeacherForm({...teacherForm, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select
                    value={teacherForm.subject_id}
                    onChange={(e) => setTeacherForm({...teacherForm, subject_id: e.target.value})}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="submit-btn">Add Teacher</button>
            </form>

            <h2 style={{marginTop: '3rem'}}>Current Teachers ({teachers.length})</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(teacher => (
                  <tr key={teacher.id}>
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.phone || 'N/A'}</td>
                    <td><span className="subject-badge">{teacher.subjects?.name || 'N/A'}</span></td>
                    <td><span className="status-active">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="students-section">
            <h2>Students in {districtCode} ({students.length})</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>NOS ID</th>
                  <th>Class</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{`${student.first_name || ''} ${student.last_name || ''}`.trim() || 'N/A'}</td>
                    <td>{student.nos_id || 'N/A'}</td>
                    <td>{student.classes?.name || 'N/A'}</td>
                    <td>{student.email}</td>
                    <td>{student.phone || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="assignments-section">
            <h2>Assign Teacher to Student</h2>
            <form onSubmit={handleCreateAssignment} className="assignment-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Teacher *</label>
                  <select
                    value={assignmentForm.teacher_id}
                    onChange={(e) => setAssignmentForm({...assignmentForm, teacher_id: e.target.value})}
                    required
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name} - {teacher.subjects?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Student *</label>
                  <select
                    value={assignmentForm.student_id}
                    onChange={(e) => setAssignmentForm({...assignmentForm, student_id: e.target.value})}
                    required
                  >
                    <option value="">Select Student</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>
                        {`${student.first_name || ''} ${student.last_name || ''}`.trim()} - {student.classes?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select
                    value={assignmentForm.subject}
                    onChange={(e) => setAssignmentForm({...assignmentForm, subject: e.target.value})}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.name}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="submit-btn">Create Assignment</button>
            </form>

            <h2 style={{marginTop: '3rem'}}>Current Assignments ({assignments.length})</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Assigned Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map(assignment => (
                  <tr key={assignment.id}>
                    <td>{assignment.staff?.name}</td>
                    <td>
                      {`${assignment.student_profiles?.first_name || ''} ${assignment.student_profiles?.last_name || ''}`.trim()} 
                      ({assignment.student_profiles?.classes?.name})
                    </td>
                    <td><span className="subject-badge">{assignment.subject}</span></td>
                    <td>{new Date(assignment.assigned_date).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => handleRemoveAssignment(assignment.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DistrictCoordinatorDashboard;
