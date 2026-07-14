import React from 'react';
import { FaTools } from 'react-icons/fa';

const MaintenanceNotice = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: "'Nunito', sans-serif",
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(186,159,254,0.2)',
        padding: '3rem 2.5rem',
        textAlign: 'center',
        boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
      }}>

        {/* Animated icon */}
        <div style={{
          width: '96px',
          height: '96px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #BA9FFE, #7c3aed)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          boxShadow: '0 0 40px rgba(186,159,254,0.4)',
          animation: 'pulse 2s infinite',
        }}>
          <FaTools style={{ color: '#fff', fontSize: '2.5rem' }} />
        </div>

        {/* Oops heading */}
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: 900,
          color: '#fff',
          margin: '0 0 0.5rem',
          letterSpacing: '-0.5px',
        }}>
          Oops...
        </h1>

        {/* Main message */}
        <p style={{
          fontSize: '1.15rem',
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.7,
          margin: '0 0 2rem',
        }}>
          The app shall be{' '}
          <span style={{ color: '#BA9FFE', fontWeight: 700 }}>restored shortly</span>.
        </p>

        {/* Status pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(186,159,254,0.15)',
          border: '1px solid rgba(186,159,254,0.3)',
          borderRadius: '999px',
          padding: '0.5rem 1.25rem',
          marginBottom: '2rem',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#BA9FFE',
            display: 'inline-block',
            animation: 'blink 1.2s infinite',
          }} />
          <span style={{
            color: '#BA9FFE',
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Under Maintenance
          </span>
        </div>

        {/* Footer note */}
        <p style={{
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.4)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          margin: 0,
        }}>
          We apologize for any inconvenience. Thank you for your patience.
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(186,159,254,0.4); }
          50% { box-shadow: 0 0 70px rgba(186,159,254,0.7); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default MaintenanceNotice;
