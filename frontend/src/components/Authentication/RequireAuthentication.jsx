import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAuthentication = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  window.addEventListener('storage', () => {
    if (!user) {
      navigate('/login');
    }
  });
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return <div>{children}</div>;
};

export default RequireAuthentication;
