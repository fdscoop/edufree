import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

export default function AdminPanel({ onBack, onSubjectsUpdated, onNotify }) {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [classForm, setClassForm] = useState({ name: '', order: '' });
  const [subjectForm, setSubjectForm] = useState({ name: '', icon: '', color: '#FF6B35', classId: '' });
  const [staffForm, setStaffForm] = useState({
    identifier: '',
    role: 'district_coordinator',
    stateCode: '',
    districtCode: '',
    subjectId: '',
    classList: '',
  });
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadClasses();
    loadSubjects();
    loadRegions();
  }, []);

  useEffect(() => {
    if (!staffForm.stateCode) {
      setFilteredDistricts([]);
      return;
    }
    const filtered = districts.filter((district) => district.state_code === staffForm.stateCode);
    setFilteredDistricts(filtered);
  }, [staffForm.stateCode, districts]);

  async function loadClasses() {
    try {
      const { data, error: classesError } = await supabase
        .from('classes')
        .select('id, name, display_order')
        .order('display_order', { ascending: true });

      if (classesError) {
        throw classesError;
      }

      setClasses(data || []);
    } catch (err) {
      console.error('Error loading classes for admin panel:', err);
      setError('Unable to load classes. Please refresh.');
      onNotify?.('error', 'Unable to load classes. Please refresh the page.');
    }
  }

  async function loadSubjects() {
    try {
      const { data, error: subjectsError } = await supabase
        .from('subjects')
        .select('id, name')
        .order('name', { ascending: true });

      if (subjectsError) throw subjectsError;
      setSubjects(data || []);
    } catch (err) {
      console.error('Error loading subjects for admin panel:', err);
      setError('Unable to load subjects. Please refresh.');
      onNotify?.('error', 'Unable to load subjects. Please refresh the page.');
    }
  }

  async function loadRegions() {
    try {
      const [{ data: statesData, error: statesError }, { data: districtsData, error: districtsError }] = await Promise.all([
        supabase.from('states').select('code, name').order('name', { ascending: true }),
        supabase.from('districts').select('code, name, state_code').order('name', { ascending: true }),
      ]);
      if (statesError) throw statesError;
      if (districtsError) throw districtsError;
      setStates(statesData || []);
      setDistricts(districtsData || []);
    } catch (err) {
      console.error('Error loading regions for admin panel:', err);
      setError('Unable to load states/districts. Please refresh.');
      onNotify?.('error', 'Unable to load the states and districts list.');
    }
  }

  async function handleCreateClass(event) {
    event.preventDefault();
    setError(null);
    setFeedback(null);

    if (!classForm.name.trim()) {
      setError('Class name is required.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: classForm.name.trim(),
        display_order: classForm.order ? parseInt(classForm.order, 10) : null,
      };
      const { error: insertError } = await supabase.from('classes').insert(payload);
      if (insertError) {
        throw insertError;
      }
      const successMessage = `Class "${classForm.name.trim()}" created.`;
      setFeedback(successMessage);
      onNotify?.('success', successMessage);
      setClassForm({ name: '', order: '' });
      await loadClasses();
    } catch (err) {
      console.error('Error creating class:', err);
      const message = err.message || 'Unable to create class.';
      setError(message);
      onNotify?.('error', message);
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateSubject(event) {
    event.preventDefault();
    setError(null);
    setFeedback(null);

    if (!subjectForm.name.trim() || !subjectForm.classId) {
      setError('Subject name and class are required.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: subjectForm.name.trim(),
        icon: subjectForm.icon || null,
        color: subjectForm.color || null,
        class_id: parseInt(subjectForm.classId, 10),
      };
      const { error: insertError } = await supabase.from('subjects').insert(payload);
      if (insertError) {
        throw insertError;
      }
      const successMessage = `Subject "${subjectForm.name.trim()}" created.`;
      setFeedback(successMessage);
      onNotify?.('success', successMessage);
      setSubjectForm({ name: '', icon: '', color: '#FF6B35', classId: '' });
      if (typeof onSubjectsUpdated === 'function') {
        onSubjectsUpdated();
      }
    } catch (err) {
      console.error('Error creating subject:', err);
      const message = err.message || 'Unable to create subject.';
      setError(message);
      onNotify?.('error', message);
    } finally {
      setSaving(false);
    }
  }

  async function handleAssignStaff(event) {
    event.preventDefault();
    setError(null);
    setFeedback(null);

    if (!staffForm.identifier.trim()) {
      setError('Email is required.');
      return;
    }

    try {
      setSaving(true);
      const identifier = staffForm.identifier.trim().toLowerCase();
      const { data: userRow, error: userError } = await supabase
        .from('student_profiles')
        .select('id, email, first_name, last_name, phone')
        .eq('email', identifier)
        .maybeSingle();

      if (userError) {
        throw userError;
      }

      if (!userRow) {
        setError('No matching student found for that email.');
        onNotify?.('error', 'No account found for that email.');
        return;
      }

      const classArray = staffForm.classList
        ? staffForm.classList.split(',').map((entry) => parseInt(entry.trim(), 10)).filter((value) => !Number.isNaN(value))
        : null;

      const payload = {
        user_id: userRow.id,
        name: `${userRow.first_name || ''} ${userRow.last_name || ''}`.trim() || userRow.email,
        email: userRow.email,
        phone: userRow.phone || null,
        role: staffForm.role,
        state_code: staffForm.stateCode || null,
        district_code: staffForm.districtCode || null,
        subject_id: staffForm.subjectId ? parseInt(staffForm.subjectId, 10) : null,
        assigned_classes: classArray && classArray.length ? classArray : null,
        is_active: true,
      };

      const { error: upsertError } = await supabase
        .from('staff')
        .upsert(payload, { onConflict: 'user_id' });

      if (upsertError) {
        throw upsertError;
      }

      const successMessage = `${staffForm.role.replace(/_/g, ' ')} assigned to ${identifier}.`;
      setFeedback(successMessage);
      onNotify?.('success', successMessage);
      setStaffForm({
        identifier: '',
        role: staffForm.role,
        stateCode: staffForm.stateCode,
        districtCode: '',
        subjectId: '',
        classList: '',
      });
    } catch (err) {
      console.error('Error assigning staff:', err);
      let message;
      if (err?.code === '42501') {
        message = 'Supabase RLS is blocking writes to the staff table. Update your policy to allow admins to insert rows.';
      } else if (err?.code === '42703') {
        message = 'The student_profiles table must include the columns referenced (e.g., nos_id). Please verify your schema.';
      } else {
        message = err.message || 'Unable to assign staff. Please try again.';
      }
      setError(message);
      onNotify?.('error', message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ padding: '5rem 2rem 6rem', minHeight: '100vh', background: '#0F172A', color: 'white' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Admin Panel</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Manage classes and subjects</p>
          </div>
          <button
            onClick={() => onBack?.()}
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '12px',
              color: 'white',
              padding: '0.7rem 1.5rem',
              cursor: 'pointer',
            }}
          >
            ← Back
          </button>
        </div>

        {(feedback || error) && (
          <div style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            borderRadius: '12px',
            background: feedback ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
            border: `1px solid ${feedback ? 'rgba(74, 222, 128, 0.4)' : 'rgba(248, 113, 113, 0.4)'}`,
            color: feedback ? '#bbf7d0' : '#fecaca',
          }}>
            {feedback || error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <form onSubmit={handleCreateClass} style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Create Class</h2>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>Class Name</label>
            <input
              value={classForm.name}
              onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
              placeholder="e.g., X"
              style={inputStyle}
            />
            <label style={{ display: 'block', margin: '1rem 0 0.5rem', color: 'rgba(255,255,255,0.7)' }}>Display Order</label>
            <input
              type="number"
              value={classForm.order}
              onChange={(e) => setClassForm({ ...classForm, order: e.target.value })}
              placeholder="10"
              style={inputStyle}
            />
            <button type="submit" disabled={saving} style={buttonStyle}>
              {saving ? 'Saving...' : 'Create Class'}
            </button>
          </form>

          <form onSubmit={handleCreateSubject} style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Create Subject</h2>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>Subject Name</label>
            <input
              value={subjectForm.name}
              onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
              placeholder="Mathematics"
              style={inputStyle}
            />
            <label style={{ display: 'block', margin: '1rem 0 0.5rem', color: 'rgba(255,255,255,0.7)' }}>Icon (emoji)</label>
            <input
              value={subjectForm.icon}
              onChange={(e) => setSubjectForm({ ...subjectForm, icon: e.target.value })}
              placeholder="📐"
              style={inputStyle}
            />
            <label style={{ display: 'block', margin: '1rem 0 0.5rem', color: 'rgba(255,255,255,0.7)' }}>Color (hex)</label>
            <input
              value={subjectForm.color}
              onChange={(e) => setSubjectForm({ ...subjectForm, color: e.target.value })}
              placeholder="#FF6B35"
              style={inputStyle}
            />
            <label style={{ display: 'block', margin: '1rem 0 0.5rem', color: 'rgba(255,255,255,0.7)' }}>Class</label>
            <select
              value={subjectForm.classId}
              onChange={(e) => setSubjectForm({ ...subjectForm, classId: e.target.value })}
              style={{ ...inputStyle, background: 'rgba(255,255,255,0.05)' }}
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id} style={{ background: '#0F172A' }}>
                  {cls.name}
                </option>
              ))}
            </select>
            <button type="submit" disabled={saving} style={buttonStyle}>
              {saving ? 'Saving...' : 'Create Subject'}
            </button>
          </form>
        </div>

        <form onSubmit={handleAssignStaff} style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Assign Staff / Admin</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            Enter the staff member's email or National Institute of Open Schooling (NIOS) ID (they must already have an account).
          </p>

          <label style={labelStyle}>Student Email</label>
          <input
            value={staffForm.identifier}
            onChange={(e) => setStaffForm({ ...staffForm, identifier: e.target.value })}
            placeholder="student@email.com"
            style={inputStyle}
          />

          <label style={labelStyle}>Role</label>
          <select
            value={staffForm.role}
            onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
            style={{ ...inputStyle, background: 'rgba(255,255,255,0.05)' }}
          >
            <option value="super_admin">Super Admin</option>
            <option value="state_admin">State Admin</option>
            <option value="district_coordinator">District Coordinator</option>
            <option value="subject_teacher">Subject Teacher</option>
          </select>

 		  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>State</label>
              <select
                value={staffForm.stateCode}
                onChange={(e) => setStaffForm({ ...staffForm, stateCode: e.target.value, districtCode: '' })}
                style={{ ...inputStyle, background: 'rgba(255,255,255,0.05)' }}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.code} value={state.code} style={{ background: '#0F172A' }}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>District</label>
              <select
                value={staffForm.districtCode}
                onChange={(e) => setStaffForm({ ...staffForm, districtCode: e.target.value })}
                disabled={!staffForm.stateCode}
                style={{ ...inputStyle, background: 'rgba(255,255,255,0.05)', color: staffForm.stateCode ? 'white' : 'rgba(255,255,255,0.5)' }}
              >
                <option value="">
                  {staffForm.stateCode ? 'Select District' : 'Select a state first'}
                </option>
                {filteredDistricts.map((district) => (
                  <option key={district.code} value={district.code} style={{ background: '#0F172A' }}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label style={labelStyle}>Subject</label>
              <select
                value={staffForm.subjectId}
                onChange={(e) => setStaffForm({ ...staffForm, subjectId: e.target.value })}
                style={{ ...inputStyle, background: 'rgba(255,255,255,0.05)' }}
              >
                <option value="">Optional</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id} style={{ background: '#0F172A' }}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Assigned Classes (comma-separated)</label>
              <input
                value={staffForm.classList}
                onChange={(e) => setStaffForm({ ...staffForm, classList: e.target.value })}
                placeholder="9,10,11"
                style={inputStyle}
              />
            </div>
          </div>

          <button type="submit" disabled={saving} style={buttonStyle}>
            {saving ? 'Saving...' : 'Save Staff Assignment'}
          </button>
        </form>

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.85rem',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: 'white',
  outline: 'none',
};

const labelStyle = {
  display: 'block',
  margin: '1rem 0 0.5rem',
  color: 'rgba(255,255,255,0.7)',
};

const buttonStyle = {
  marginTop: '1.5rem',
  width: '100%',
  padding: '0.9rem',
  background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
  border: 'none',
  borderRadius: '12px',
  color: 'white',
  fontWeight: '600',
  cursor: 'pointer',
};
