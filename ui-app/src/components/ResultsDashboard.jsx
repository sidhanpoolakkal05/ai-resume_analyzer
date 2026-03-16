import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, TrendingUp, Briefcase, ChevronRight, RefreshCw, BarChart2 } from 'lucide-react';

// Custom Circular Progress Component
const CircularProgress = ({ value, label, color, size = 120, strokeWidth = 8 }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', display: 'block' }}>{progress}%</span>
      </div>
      <span style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{label}</span>
    </div>
  );
};

const ResultsDashboard = ({ results, onReset }) => {
  if (!results) return null;

  const {
    ats_score,
    final_match_percentage,
    skill_match_score,
    text_similarity_score,
    matched_skills = [],
    missing_skills = [],
    feedback = {}
  } = results;

  // Determine colors based on scores
  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 50) return 'var(--warning)';
    return 'var(--danger)';
  };

  return (
    <div className="glass-panel" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', animation: 'float 10s ease-in-out infinite' }}>
      
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
          <BarChart2 color="var(--accent-primary)" size={28} />
          Analysis Results
        </h2>
        <button 
          onClick={onReset}
          className="btn"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }}
        >
          <RefreshCw size={16} /> New Analysis
        </button>
      </div>

      {/* Main Scores Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-card" style={{ padding: '32px 24px', display: 'flex', justifyContent: 'center' }}>
          <CircularProgress 
            value={Math.round(final_match_percentage)} 
            label="Overall Match" 
            color={getScoreColor(final_match_percentage)} 
            size={140}
            strokeWidth={10}
          />
        </div>
        <div className="glass-card" style={{ padding: '32px 24px', display: 'flex', justifyContent: 'center' }}>
          <CircularProgress 
            value={Math.round(ats_score)} 
            label="ATS Score" 
            color={getScoreColor(ats_score)} 
            size={140}
            strokeWidth={10}
          />
        </div>
        <div className="glass-card" style={{ padding: '32px 24px', display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Skill Match</span>
            <span style={{ fontWeight: 'bold', color: getScoreColor(skill_match_score) }}>{skill_match_score}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${skill_match_score}%`, background: getScoreColor(skill_match_score), transition: 'width 1s ease-out' }}></div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Keyword Sim.</span>
            <span style={{ fontWeight: 'bold', color: getScoreColor(text_similarity_score) }}>{text_similarity_score}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${text_similarity_score}%`, background: getScoreColor(text_similarity_score), transition: 'width 1s ease-out 0.2s' }}></div>
          </div>
        </div>
      </div>

      {/* Feedback & Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* Strengths */}
        <div className="glass-card" style={{ padding: '24px', borderTop: '4px solid var(--success)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', marginBottom: '16px', fontSize: '1.2rem' }}>
            <CheckCircle size={20} /> Strengths
          </h3>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{feedback.strengths || "Your resume covers essential core requirements."}</p>
        </div>

        {/* Improvements */}
        <div className="glass-card" style={{ padding: '24px', borderTop: '4px solid var(--warning)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--warning)', marginBottom: '16px', fontSize: '1.2rem' }}>
            <TrendingUp size={20} /> Areas to Improve
          </h3>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{feedback.improvements || "Review your experience descriptions to better align with the job."}</p>
        </div>
        
        {/* Recommendations */}
        <div className="glass-card" style={{ padding: '24px', borderTop: '4px solid var(--info)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--info)', marginBottom: '16px', fontSize: '1.2rem' }}>
            <Briefcase size={20} /> Next Steps
          </h3>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{feedback.recommendations || "Continue tailoring your resume."}</p>
        </div>

      </div>

      {/* Skills Analysis */}
      <div className="glass-card" style={{ padding: '32px' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '1.3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>Skills Breakdown</h3>
        
        <div style={{ marginBottom: '32px' }}>
          <h4 style={{ color: 'var(--success)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={16} /> Found in Resume ({matched_skills.length})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {matched_skills.length > 0 ? matched_skills.map((skill, i) => (
              <span key={i} className="badge badge-success" style={{ padding: '6px 14px', fontSize: '0.9rem' }}>{skill}</span>
            )) : <span style={{ color: 'var(--text-muted)' }}>No matching skills found.</span>}
          </div>
        </div>

        <div>
          <h4 style={{ color: 'var(--danger)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} /> Missing Core Skills ({missing_skills.length})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {missing_skills.length > 0 ? missing_skills.map((skill, i) => (
              <span key={i} className="badge badge-danger" style={{ padding: '6px 14px', fontSize: '0.9rem', opacity: 0.8 }}>{skill}</span>
            )) : <span style={{ color: 'var(--success)' }}>Great! You have all the core skills listed.</span>}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ResultsDashboard;
