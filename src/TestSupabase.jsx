import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

export default function TestSupabase() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  async function testConnection() {
    try {
      setLoading(true);

      // Test 1: Check if Supabase is configured
      console.log('Testing Supabase connection...');

      // Test 2: Fetch data from subjects table
      const { data, error } = await supabase
        .from('subjects')
        .select('*');

      if (error) {
        throw error;
      }

      console.log('✅ Supabase connection successful!');
      console.log('Subjects data:', data);
      setSubjects(data || []);

    } catch (err) {
      console.error('❌ Supabase connection error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>🧪 Supabase Connection Test</h1>

      {loading && (
        <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '8px' }}>
          <p>⏳ Testing connection...</p>
        </div>
      )}

      {error && (
        <div style={{ padding: '1rem', background: '#ffebee', borderRadius: '8px', color: '#c62828' }}>
          <h3>❌ Connection Error</h3>
          <p>{error}</p>
          <details style={{ marginTop: '1rem' }}>
            <summary>Troubleshooting</summary>
            <ul style={{ marginTop: '0.5rem' }}>
              <li>Check if .env file has correct VITE_SUPABASE_URL</li>
              <li>Check if .env file has correct VITE_SUPABASE_ANON_KEY</li>
              <li>Make sure you restarted the dev server after adding .env</li>
              <li>Verify the 'subjects' table exists in Supabase</li>
            </ul>
          </details>
        </div>
      )}

      {!loading && !error && (
        <div style={{ padding: '1rem', background: '#e8f5e9', borderRadius: '8px' }}>
          <h3>✅ Connection Successful!</h3>
          <p>Found {subjects.length} subjects in the database</p>

          {subjects.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <h4>Subjects:</h4>
              <ul>
                {subjects.map((subject, index) => (
                  <li key={index}>
                    {subject.name || subject.subject_name || JSON.stringify(subject)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h4>📋 Checklist:</h4>
        <ul>
          <li>✅ Supabase package installed</li>
          <li>✅ Configuration file created (src/lib/supabase.js)</li>
          <li>
            {!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY
              ? '❌'
              : '✅'} Environment variables set (.env)
          </li>
          <li>{error ? '❌' : subjects.length > 0 ? '✅' : '⏳'} Database connection</li>
          <li>{subjects.length > 0 ? '✅' : '⏳'} Can fetch data from tables</li>
        </ul>
      </div>
    </div>
  );
}
