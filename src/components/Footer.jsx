import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Mooney - AI 가계부</h4>
                    <p>더 스마트한 재무 관리의 시작</p>
                </div>

                <div className="footer-section">
                    <h5>팀 구성</h5>
                    <p>김규빈 (팀장/백엔드)</p>
                    <p>김민규 (백엔드/AI)</p>
                    <p>김효빈 (프론트엔드/디자인)</p>
                    <p>노승현 (프론트엔드/디자인)</p>
                </div>

                <div className="footer-section">
                    <h5>기술 스택</h5>
                    <p>React • Vite • ApexCharts</p>
                    <p>Spring Boot • AI/ML</p>
                </div>

                <div className="footer-section">
                    <h5>연락처</h5>
                    <div className="social-links">
                        <a href="#" className="social-link">
                            <FaGithub />
                        </a>
                        <a href="#" className="social-link">
                            <FaLinkedin />
                        </a>
                        <a href="#" className="social-link">
                            <FaEnvelope />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 Mooney Team. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer; 