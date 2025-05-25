import { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
import fakeUser from "../fakeUser";


const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    setUser(fakeUser);
    localStorage.setItem('user', JSON.stringify(fakeUser));
    navigate('/dashboard');
  };

  return (
    <>
      <h1 className="text-center">This is Login Page</h1>
      <ul>
        <li><a href="/register">Register</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/store">Store</a></li>
      </ul>
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default Login;
