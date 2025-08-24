import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartBar, FaBook, FaRobot, FaTrophy, FaBookOpen, FaInfoCircle } from 'react-icons/fa';

const Navigation = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: '홈', icon: <FaHome /> },
        { path: '/dashboard', label: '대시보드', icon: <FaChartBar /> },
        { path: '/accountbook', label: '가계부', icon: <FaBook /> },
        { path: '/chatbot', label: 'AI 챗봇', icon: <FaRobot /> },
        { path: '/challenge', label: '챌린지', icon: <FaTrophy /> },
        { path: '/diary', label: '일기', icon: <FaBookOpen /> },
        { path: '/project-info', label: '프로젝트', icon: <FaInfoCircle /> },
    ];

    return (
        <nav className="nav">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    💰 Mooney
                </Link>
                <ul className="nav-menu">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation; 