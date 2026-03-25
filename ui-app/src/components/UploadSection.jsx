import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Search, Play, FileUp } from 'lucide-react';

const UploadSection = ({ onAnalyze, isAnalyzing }) => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      } else {
        alert('Please upload a PDF file.');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload your resume (PDF) first.');
      return;
    }
    if (!jobDescription) {
      alert('Please paste a job description to analyze against.');
      return;
    }
    onAnalyze(file, jobDescription);
  };

  return (
    <div className="glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', animation: 'float 8s ease-in-out infinite' }}>
      <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Analyze Your Resume</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Upload Resume (PDF)</label>
          
          <div 
            className={`glass-card ${isDragging ? 'dragging' : ''}`}
            style={{ 
              padding: '40px', 
              textAlign: 'center', 
              cursor: 'pointer',
              borderStyle: 'dashed',
              borderColor: isDragging ? 'var(--accent-primary)' : 'var(--glass-border)',
              backgroundColor: isDragging ? 'rgba(99, 102, 241, 0.05)' : 'var(--bg-tertiary)'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input 
              type="file" 
              accept=".pdf" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
            />
            
            {file ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <FileText size={48} color="var(--accent-primary)" />
                <div>
                  <h4 style={{ color: 'var(--text-primary)' }}>{file.name}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze
                  </p>
                </div>
                <button 
                  type="button" 
                  className="badge badge-info" 
                  style={{ marginTop: '8px', border: 'none', cursor: 'pointer' }}
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                >
                  Remove File
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '50%', 
                  background: 'rgba(99, 102, 241, 0.1)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', marginBottom: '8px'
                }}>
                  <UploadCloud size={32} color="var(--accent-primary)" />
                </div>
                <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>Discover your match potential</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '300px', margin: '0 auto' }}>
                  Drag and drop your PDF resume here, or click to browse files
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '32px' }}>
          <label className="form-label" htmlFor="jobDescription">Target Job Description</label>
          <div style={{ position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', top: '18px', left: '16px' }} />
            <textarea 
              id="jobDescription"
              className="form-input" 
              placeholder="Paste the full job description here to analyze matching keywords and missing skills..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              style={{ paddingLeft: '44px' }}
              required
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button 
            type="submit" 
            className={`btn btn-primary ${isAnalyzing ? 'animate-pulse-glow' : ''}`}
            disabled={isAnalyzing}
            style={{ width: '100%', maxWidth: '300px', padding: '16px', fontSize: '1.1rem' }}
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin" style={{ display: 'flex' }}>
                  <Search size={20} />
                </div>
                Analyzing Profile...
              </>
            ) : (
              <>
                <Play size={20} />
                Generate Insights
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadSection;
