import { useEffect } from 'react';

const LogOut = () => {
  // const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('Authorizaton');
    localStorage.removeItem('username');
    localStorage.clear();
    // navigate(`/`);
    window.location.replace('/');
  });
};

export default LogOut;
