import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, TrendingUp, Briefcase } from 'lucide-react';
import UploadSection from './components/UploadSection';
import ResultsDashboard from './components/ResultsDashboard';
import './index.css';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (file, jobDescription) => {
    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jobDescription);

    try {
      // Assuming backend runs on localhost:8000
      const response = await fetch('http://localhost:8000/match-resume/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('Failed to analyze resume. Please assure the backend server is running on port 8000 and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <>
      {/* Background Mesh */}
      <div className="bg-mesh">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="app-container">
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '40px' }} className="animate-float">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '16px' }}>
            <span className="text-gradient">AI Resume Analyzer</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Optimize your resume for ATS systems. Instantly analyze your skills against job descriptions with AI precision.
          </p>
        </header>

        {/* Main Content */}
        <main>
          {error && (
            <div className="glass-card" style={{ padding: '16px', marginBottom: '24px', borderLeft: '4px solid var(--danger)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AlertCircle size={24} color="var(--danger)" />
              <p style={{ color: '#fff', margin: 0 }}>{error}</p>
            </div>
          )}

          {!results ? (
            <UploadSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          ) : (
            <ResultsDashboard results={results} onReset={handleReset} />
          )}
        </main>
        
        {/* Footer */}
        <footer style={{ marginTop: '60px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <p>© {new Date().getFullYear()} AI Resume Analyzer. Built for the modern job seeker.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
