import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '~/App';

const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: 'CLEAR' });
    navigate('/login');
  };

  return <button onClick={handleLogout}>Log out</button>;
};

export default Logout;
