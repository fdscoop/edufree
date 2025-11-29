import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import './AdminDashboards.css';

function StateAdminDashboard({ userRole, stateCode, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [districts, setDistricts] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDistricts: 0,
    totalCoordinators: 0,
    totalTeachers: 0,
    totalStudents: 0
  });

  // Add coordinator form
  const [coordinatorForm, setCoordinatorForm] = useState({
    name: '',
    email: '',
    phone: '',
    district_code: ''
  });

  useEffect(() => {
    fetchData();
  }, [stateCode]);

  async function fetchData() {
    setLoading(true);
    await Promise.all([
      fetchDistricts(),
      fetchCoordinators(),
      fetchTeachers(),
      fetchStudents()
    ]);
    setLoading(false);
  }

  async function fetchDistricts() {
    try {
      const { data, error } = await supabase
        .from('districts')
        .select('*')
        .eq('state_code', stateCode)
        .order('name');

      if (error) throw error;
      setDistricts(data || []);
      setStats(prev => ({ ...prev, totalDistricts: data?.length || 0 }));
    } catch (err) {
      console.error('Error fetching districts:', err);
    }
  }

  async function fetchCoordinators() {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*, districts(name)')
        .eq('state_code', stateCode)
        .eq('role', 'district_coordinator')
        .eq('is_active', true);

      if (error) throw error;
      setCoordinators(data || []);
      setStats(prev => ({ ...prev, totalCoordinators: data?.length || 0 }));
    } catch (err) {
      console.error('Error fetching coordinators:', err);
    }
  }

  async function fetchTeachers() {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*, subjects(name), districts(name)')
        .eq('state_code', stateCode)
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
        .select('*, classes(name)')
        .eq('state_code', stateCode);

      if (error) throw error;
      setStudents(data || []);
      setStats(prev => ({ ...prev, totalStudents: data?.length || 0 }));
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  }

  async function handleAddCoordinator(e) {
    e.preventDefault();
    
    try {
      const tempPassword = Math.random().toString(36).slice(-8) + 'Aa1!';
      
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: coordinatorForm.email,
        password: tempPassword,
        options: {
          data: {
            name: coordinatorForm.name
          }
        }
      });

      if (signUpError) throw signUpError;

      const { error: staffError } = await supabase
        .from('staff')
        .insert([{
          user_id: user.id,
          email: coordinatorForm.email,
          name: coordinatorForm.name,
          phone: coordinatorForm.phone,
          role: 'district_coordinator',
          state_code: stateCode,
          district_code: coordinatorForm.district_code,
          is_active: true
        }]);

      if (staffError) throw staffError;

      alert(`Coordinator added successfully!\n\nEmail: ${coordinatorForm.email}\nTemporary Password: ${tempPassword}\n\nPlease share these credentials.`);
      
      setCoordinatorForm({
        name: '',
        email: '',
        phone: '',
        district_code: ''
      });
      
      fetchCoordinators();
    } catch (err) {
      console.error('Error adding coordinator:', err);
      alert('Error adding coordinator: ' + err.message);
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="state-admin-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>State Admin Dashboard</h1>
            <p className="welcome-text">Welcome, {userRole.name}</p>
            <span className="state-badge">{stateCode}</span>
          </div>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏛️</div>
          <div className="stat-content">
            <h3>{stats.totalDistricts}</h3>
            <p>Districts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👔</div>
          <div className="stat-content">
            <h3>{stats.totalCoordinators}</h3>
            <p>Coordinators</p>
          </div>
        </div>
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
          className={activeTab === 'districts' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('districts')}
        >
          Districts
        </button>
        <button
          className={activeTab === 'coordinators' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('coordinators')}
        >
          Coordinators
        </button>
        <button
          className={activeTab === 'staff' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('staff')}
        >
          All Staff
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <h2>State Overview - {stateCode}</h2>
            
            <div className="overview-grid">
              <div className="overview-card">
                <h3>Districts ({districts.length})</h3>
                <ul className="district-list">
                  {districts.map(district => (
                    <li key={district.code}>
                      {district.name} ({district.code})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="overview-card">
                <h3>Teachers by District</h3>
                <ul>
                  {districts.map(district => {
                    const count = teachers.filter(t => t.district_code === district.code).length;
                    return count > 0 && (
                      <li key={district.code}>
                        {district.name}: {count}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="overview-card">
                <h3>Students by District</h3>
                <ul>
                  {districts.map(district => {
                    const count = students.filter(s => s.district === district.code).length;
                    return count > 0 && (
                      <li key={district.code}>
                        {district.name}: {count}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'districts' && (
          <div className="districts-section">
            <h2>Districts in {stateCode} ({districts.length})</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>District Code</th>
                  <th>District Name</th>
                  <th>Coordinators</th>
                  <th>Teachers</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {districts.map(district => (
                  <tr key={district.code}>
                    <td><strong>{district.code}</strong></td>
                    <td>{district.name}</td>
                    <td>{coordinators.filter(c => c.district_code === district.code).length}</td>
                    <td>{teachers.filter(t => t.district_code === district.code).length}</td>
                    <td>{students.filter(s => s.district === district.code).length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'coordinators' && (
          <div className="coordinators-section">
            <h2>Add District Coordinator</h2>
            <form onSubmit={handleAddCoordinator} className="add-coordinator-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={coordinatorForm.name}
                    onChange={(e) => setCoordinatorForm({...coordinatorForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={coordinatorForm.email}
                    onChange={(e) => setCoordinatorForm({...coordinatorForm, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={coordinatorForm.phone}
                    onChange={(e) => setCoordinatorForm({...coordinatorForm, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>District *</label>
                  <select
                    value={coordinatorForm.district_code}
                    onChange={(e) => setCoordinatorForm({...coordinatorForm, district_code: e.target.value})}
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map(district => (
                      <option key={district.code} value={district.code}>
                        {district.name} ({district.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="submit-btn">Add Coordinator</button>
            </form>

            <h2 style={{marginTop: '3rem'}}>Current Coordinators ({coordinators.length})</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>District</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {coordinators.map(coordinator => (
                  <tr key={coordinator.id}>
                    <td>{coordinator.name}</td>
                    <td>{coordinator.email}</td>
                    <td>{coordinator.phone || 'N/A'}</td>
                    <td>{coordinator.districts?.name || coordinator.district_code}</td>
                    <td><span className="status-active">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="staff-section">
            <h2>All Staff in {stateCode}</h2>
            
            <h3>Coordinators ({coordinators.length})</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>District</th>
                </tr>
              </thead>
              <tbody>
                {coordinators.map(coordinator => (
                  <tr key={coordinator.id}>
                    <td>{coordinator.name}</td>
                    <td>{coordinator.email}</td>
                    <td>{coordinator.district_code}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 style={{marginTop: '2rem'}}>Teachers ({teachers.length})</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>District</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(teacher => (
                  <tr key={teacher.id}>
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td><span className="subject-badge">{teacher.subjects?.name || 'N/A'}</span></td>
                    <td>{teacher.district_code}</td>
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

export default StateAdminDashboard;
