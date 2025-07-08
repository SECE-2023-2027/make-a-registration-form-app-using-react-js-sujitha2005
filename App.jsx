import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [flipped, setFlipped] = useState(false);

  // Removed flipping on load to prevent auto-flip
  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      setSubmittedData(JSON.parse(stored));
    }
  }, []);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Minimum 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmittedData(formData);
    localStorage.setItem('userData', JSON.stringify(formData));
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    // Trigger flip
    setFlipped(true);

    // Unflip after 10 seconds
    setTimeout(() => {
      setFlipped(false);
    }, 10000); // 10000ms = 10s
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}>
        {/* Navbar */}
        <nav style={styles.navbar}>
          <div style={styles.logo}>SECE</div>
          <ul style={styles.navLinks}>
            <li>home</li>
            <li>explore</li>
            <li>create</li>
            <li>share</li>
          </ul>
        </nav>

        <div style={styles.container}>
          {/* Left - Flip Card */}
          <div className={`flip-card ${flipped ? 'flipped' : ''}`}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34"
                  alt="creative"
                  style={styles.image}
                />
              </div>
              <div className="flip-card-back">
                {submittedData ? (
                  <>
                    <h2>🎉 Welcome {submittedData.username}!</h2>
                    <p><strong>📧 Email:</strong> {submittedData.email}</p>
                    <p><strong>🔐 Password:</strong> {submittedData.password}</p>
                  </>
                ) : (
                  <p>No data submitted yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div style={styles.rightSide}>
            <h2>Sign Up</h2>
            <p>Please fill out this form to register</p>
            <form onSubmit={handleSubmit}>
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} style={styles.input} />
              {errors.username && <span style={styles.error}>{errors.username}</span>}

              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} />
              {errors.email && <span style={styles.error}>{errors.email}</span>}

              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} />
              {errors.password && <span style={styles.error}>{errors.password}</span>}

              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} style={styles.input} />
              {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}

              <button type="submit" style={styles.button}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(-45deg, #a1c4fd, #007BFF, #00008b)',
    backgroundSize: '600% 600%',
    animation: 'gradientShift 15s ease infinite',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    minHeight: '100vh',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    padding: '0 40px',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 0',
    alignItems: 'center',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    color: '#fff',
    textTransform: 'capitalize',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '40px',
    flexWrap: 'wrap',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  rightSide: {
    width: '35%',
    backgroundColor: '#007BFF',
    borderRadius: '8px',
    padding: '30px',
    color: '#fff',
    marginTop: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0056b3',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginTop: '10px',
  },
  error: {
    color: 'yellow',
    fontSize: '13px',
  },
};

// Gradient animation
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes gradientShift {
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default App;
