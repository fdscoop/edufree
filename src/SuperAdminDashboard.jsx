import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import './AdminDashboards.css';

function SuperAdminDashboard({ userRole, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [states, setStates] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStates: 0,
    totalStaff: 0,
    totalStudents: 0,
    totalSubjects: 0
  });

  // Add state admin form
  const [stateAdminForm, setStateAdminForm] = useState({
    name: '',
    email: '',
    phone: '',
    state_code: ''
  });
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    youtube_id: '',
    subject_id: '',
    chapter_id: '',
    duration_seconds: '',
    order_index: 1,
  });
  const [chapterOptions, setChapterOptions] = useState([]);
  const [pendingLessons, setPendingLessons] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    await Promise.all([
      fetchStates(),
      fetchAllStaff(),
      fetchAllStudents(),
      fetchSubjects(),
      fetchPendingLessons()
    ]);
    setLoading(false);
  }

  async function fetchStates() {
    try {
      const { data, error } = await supabase
        .from('states')
        .select('*')
        .order('name');

      if (error) throw error;
      setStates(data || []);
      setStats(prev => ({ ...prev, totalStates: data?.length || 0 }));
    } catch (err) {
      console.error('Error fetching states:', err);
    }
  }

  async function fetchAllStaff() {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*, subjects(name)')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllStaff(data || []);
      setStats(prev => ({ ...prev, totalStaff: data?.length || 0 }));
    } catch (err) {
      console.error('Error fetching staff:', err);
    }
  }

  async function fetchAllStudents() {
    try {
      const { data, error } = await supabase
        .from('student_profiles')
        .select('*, classes(name)')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setAllStudents(data || []);
      setStats(prev => ({ ...prev, totalStudents: data?.length || 0 }));
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  }

  async function fetchSubjects() {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*, classes(name)')
        .order('name');

      if (error) throw error;
      setSubjects(data || []);
      setStats(prev => ({ ...prev, totalSubjects: data?.length || 0 }));
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  }

  async function fetchPendingLessons() {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select(`
          id,
          title,
          youtube_id,
          is_published,
          created_at,
          chapter_id,
          chapters (
            title,
            subjects (
              id,
              name
            )
          )
        `)
        .eq('is_published', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingLessons(data || []);
    } catch (err) {
      console.error('Error fetching pending lessons:', err);
    }
  }

  useEffect(() => {
    if (videoForm.subject_id) {
      loadChapters(videoForm.subject_id);
    } else {
      setChapterOptions([]);
    }
  }, [videoForm.subject_id]);

  async function loadChapters(subjectId) {
    try {
      const { data, error } = await supabase
        .from('chapters')
        .select('id, title')
        .eq('subject_id', subjectId)
        .order('order_index');
      if (error) throw error;
      setChapterOptions(data || []);
    } catch (err) {
      console.error('Error loading chapters:', err);
    }
  }

  async function handleAddStateAdmin(e) {
    e.preventDefault();
    
    try {
      const tempPassword = Math.random().toString(36).slice(-8) + 'Aa1!';
      
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: stateAdminForm.email,
        password: tempPassword,
        options: {
          data: {
            name: stateAdminForm.name
          }
        }
      });

      if (signUpError) throw signUpError;

      const { error: staffError } = await supabase
        .from('staff')
        .insert([{
          user_id: user.id,
          email: stateAdminForm.email,
          name: stateAdminForm.name,
          phone: stateAdminForm.phone,
          role: 'state_admin',
          state_code: stateAdminForm.state_code,
          is_active: true
        }]);

      if (staffError) throw staffError;

      alert(`State Admin added successfully!\n\nEmail: ${stateAdminForm.email}\nTemporary Password: ${tempPassword}\n\nPlease share these credentials.`);
      
      setStateAdminForm({
        name: '',
        email: '',
        phone: '',
        state_code: ''
      });
      
      fetchAllStaff();
    } catch (err) {
      console.error('Error adding state admin:', err);
      alert('Error adding state admin: ' + err.message);
    }
  }

  function extractYouTubeId(url) {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : url.trim();
  }

  async function handleVideoUpload(e) {
    e.preventDefault();
    if (!videoForm.subject_id || !videoForm.chapter_id) {
      alert('Please select a subject and chapter.');
      return;
    }
    try {
      const payload = {
        title: videoForm.title.trim(),
        description: videoForm.description.trim() || null,
        youtube_id: extractYouTubeId(videoForm.youtube_id),
        chapter_id: videoForm.chapter_id,
        duration_seconds: Number(videoForm.duration_seconds) || null,
        order_index: Number(videoForm.order_index) || 0,
        is_published: true,
      };
      const { error } = await supabase.from('lessons').insert([payload]);
      if (error) throw error;
      alert('Video published successfully!');
      setVideoForm({
        title: '',
        description: '',
        youtube_id: '',
        subject_id: '',
        chapter_id: '',
        duration_seconds: '',
        order_index: 1,
      });
      setChapterOptions([]);
      await fetchPendingLessons();
    } catch (err) {
      console.error('Error publishing video:', err);
      alert(err.message || 'Unable to publish video.');
    }
  }

  async function handleApproveLesson(lessonId) {
    try {
      const { error } = await supabase
        .from('lessons')
        .update({ is_published: true })
        .eq('id', lessonId);
      if (error) throw error;
      await fetchPendingLessons();
      alert('Draft video published.');
    } catch (err) {
      console.error('Error approving lesson:', err);
      alert(err.message || 'Unable to approve lesson.');
    }
  }

  async function handleRejectLesson(lessonId) {
    if (!window.confirm('Reject and remove this draft video?')) return;
    try {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId);
      if (error) throw error;
      await fetchPendingLessons();
      alert('Draft video removed.');
    } catch (err) {
      console.error('Error rejecting lesson:', err);
      alert(err.message || 'Unable to reject lesson.');
    }
  }

  const stateAdmins = allStaff.filter(s => s.role === 'state_admin');
  const coordinators = allStaff.filter(s => s.role === 'district_coordinator');
  const teachers = allStaff.filter(s => s.role === 'subject_teacher');

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="super-admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>🔐 Super Admin Dashboard</h1>
            <p className="welcome-text">Welcome, {userRole.name}</p>
            <span className="admin-badge">SUPER ADMIN</span>
          </div>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🗺️</div>
          <div className="stat-content">
            <h3>{stats.totalStates}</h3>
            <p>States</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalStaff}</h3>
            <p>Total Staff</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-content">
            <h3>{stats.totalStudents}</h3>
            <p>Students (Recent 100)</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>{stats.totalSubjects}</h3>
            <p>Subjects</p>
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
          className={activeTab === 'states' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('states')}
        >
          States
        </button>
        <button
          className={activeTab === 'admins' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('admins')}
        >
          State Admins
        </button>
        <button
          className={activeTab === 'staff' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('staff')}
        >
          All Staff
        </button>
        <button
          className={activeTab === 'students' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
        <button
          className={activeTab === 'content' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('content')}
        >
          Content
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <h2>Platform Overview</h2>
            
            <div className="overview-grid">
              <div className="overview-card">
                <h3>Staff Distribution</h3>
                <div className="stat-breakdown">
                  <div className="stat-item">
                    <span className="label">State Admins:</span>
                    <span className="value">{stateAdmins.length}</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">District Coordinators:</span>
                    <span className="value">{coordinators.length}</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Teachers:</span>
                    <span className="value">{teachers.length}</span>
                  </div>
                </div>
              </div>

              <div className="overview-card">
                <h3>Students by State (Top 10)</h3>
                <ul>
                  {states.slice(0, 10).map(state => {
                    const count = allStudents.filter(s => s.state_code === state.code).length;
                    return count > 0 && (
                      <li key={state.code}>
                        {state.name}: {count}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="overview-card">
                <h3>Teachers by State (Top 10)</h3>
                <ul>
                  {states.slice(0, 10).map(state => {
                    const count = teachers.filter(t => t.state_code === state.code).length;
                    return count > 0 && (
                      <li key={state.code}>
                        {state.name}: {count}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="overview-card">
                <h3>Subjects by Class</h3>
                <ul>
                  {subjects.map(subject => (
                    <li key={subject.id}>
                      {subject.name} ({subject.classes?.name || 'N/A'})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'states' && (
          <div className="states-section">
            <h2>All States ({states.length})</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>State Code</th>
                  <th>State Name</th>
                  <th>State Admins</th>
                  <th>Coordinators</th>
                  <th>Teachers</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {states.map(state => (
                  <tr key={state.code}>
                    <td><strong>{state.code}</strong></td>
                    <td>{state.name}</td>
                    <td>{stateAdmins.filter(a => a.state_code === state.code).length}</td>
                    <td>{coordinators.filter(c => c.state_code === state.code).length}</td>
                    <td>{teachers.filter(t => t.state_code === state.code).length}</td>
                    <td>{allStudents.filter(s => s.state_code === state.code).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'admins' && (
          <div className="admins-section">
            <h2>Add State Admin</h2>
            <form onSubmit={handleAddStateAdmin} className="add-admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={stateAdminForm.name}
                    onChange={(e) => setStateAdminForm({...stateAdminForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={stateAdminForm.email}
                    onChange={(e) => setStateAdminForm({...stateAdminForm, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={stateAdminForm.phone}
                    onChange={(e) => setStateAdminForm({...stateAdminForm, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <select
                    value={stateAdminForm.state_code}
                    onChange={(e) => setStateAdminForm({...stateAdminForm, state_code: e.target.value})}
                    required
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state.code} value={state.code}>
                        {state.name} ({state.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="submit-btn">Add State Admin</button>
            </form>

            <h2 style={{marginTop: '3rem'}}>Current State Admins ({stateAdmins.length})</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>State</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stateAdmins.map(admin => (
                  <tr key={admin.id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.phone || 'N/A'}</td>
                    <td>
                      {states.find(s => s.code === admin.state_code)?.name || admin.state_code}
                    </td>
                    <td><span className="status-active">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="staff-section">
            <h2>All Staff ({allStaff.length})</h2>
            
            <div className="filter-tabs">
              <div className="role-summary">
                <span>State Admins: {stateAdmins.length}</span>
                <span>Coordinators: {coordinators.length}</span>
                <span>Teachers: {teachers.length}</span>
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>State</th>
                  <th>District</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {allStaff.map(staff => (
                  <tr key={staff.id}>
                    <td>{staff.name}</td>
                    <td>{staff.email}</td>
                    <td>
                      <span className={`role-badge role-${staff.role}`}>
                        {staff.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td>{staff.state_code || '-'}</td>
                    <td>{staff.district_code || '-'}</td>
                    <td>{staff.subjects?.name || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="students-section">
            <h2>Recent Students ({allStudents.length})</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>NOS ID</th>
                  <th>Class</th>
                  <th>State</th>
                  <th>District</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {allStudents.map(student => (
                  <tr key={student.id}>
                    <td>{`${student.first_name || ''} ${student.last_name || ''}`.trim() || 'N/A'}</td>
                    <td>{student.nos_id || 'N/A'}</td>
                    <td>{student.classes?.name || 'N/A'}</td>
                    <td>{student.state_code}</td>
                    <td>{student.district}</td>
                    <td>{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="table-note">Showing 100 most recent students</p>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="upload-section">
            <h2>Publish Official Video Lessons</h2>
            <form onSubmit={handleVideoUpload} className="upload-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Lesson Title *</label>
                  <input
                    type="text"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select
                    value={videoForm.subject_id}
                    onChange={(e) => setVideoForm({ ...videoForm, subject_id: e.target.value, chapter_id: '' })}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name} ({subject.classes?.name || 'Class'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Chapter *</label>
                  <select
                    value={videoForm.chapter_id}
                    onChange={(e) => setVideoForm({ ...videoForm, chapter_id: e.target.value })}
                    required
                    disabled={!videoForm.subject_id || chapterOptions.length === 0}
                  >
                    <option value="">{chapterOptions.length ? 'Select Chapter' : 'Select a subject first'}</option>
                    {chapterOptions.map(chapter => (
                      <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>YouTube URL or ID *</label>
                  <input
                    type="text"
                    value={videoForm.youtube_id}
                    onChange={(e) => setVideoForm({ ...videoForm, youtube_id: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={videoForm.description}
                    onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Duration (seconds)</label>
                  <input
                    type="number"
                    min="1"
                    value={videoForm.duration_seconds}
                    onChange={(e) => setVideoForm({ ...videoForm, duration_seconds: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Lesson Order</label>
                  <input
                    type="number"
                    min="0"
                    value={videoForm.order_index}
                    onChange={(e) => setVideoForm({ ...videoForm, order_index: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">Publish Video</button>
            </form>

            <h2 style={{ marginTop: '3rem' }}>Pending Draft Videos ({pendingLessons.length})</h2>
            {pendingLessons.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>No pending drafts. Teachers can send drafts through their coordinators.</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Chapter</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingLessons.map(lesson => (
                    <tr key={lesson.id}>
                      <td>{lesson.title}</td>
                      <td>{lesson.chapters?.subjects?.name || 'N/A'}</td>
                      <td>{lesson.chapters?.title || 'N/A'}</td>
                      <td>{lesson.created_at ? new Date(lesson.created_at).toLocaleDateString() : '—'}</td>
                      <td style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="submit-btn" style={{ padding: '0.4rem 0.9rem' }} onClick={() => handleApproveLesson(lesson.id)}>
                          Publish
                        </button>
                        <button className="remove-btn" onClick={() => handleRejectLesson(lesson.id)}>
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
