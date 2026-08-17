import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as loginService } from '../services/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginService(email, password);
            login(data.user, data.token);
            navigate('/');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-900">
            <form onSubmit={handleSubmit} className="w-96 rounded-xl bg-gray-800 p-8 shadow-2xl">
                <h2 className="mb-6 text-3xl font-bold text-center text-blue-400">Welcome Back</h2>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 transition">
                    Login
                </button>
                <p className="mt-4 text-center text-gray-400">
                    Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
