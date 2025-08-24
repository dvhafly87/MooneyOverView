import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/Sidebar.css';
import logo3d from '../img/logo3d_nuki.png';
import {
    FaHome,
    FaBook,
    FaTrophy,
    FaPen,
    FaUser,
    FaCreditCard,
    FaChartBar,
    FaCalendar,
    FaBars,
    FaChevronLeft,
    FaRobot,
    FaUsers,
    FaTimes
} from 'react-icons/fa';

function Sidebar({ isOpen, toggleSidebar }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLinkClick = () => {
        if (isMobile && isOpen) {
            toggleSidebar();
        }
    };

    return (
        <>
            {/* 모바일 오버레이 */}
            {isMobile && (
                <motion.div
                    className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
                    onClick={toggleSidebar}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            )}

            <motion.nav
                className={`sidebar ${isMobile ? 'mobile-sidebar' : ''}`}
                initial={{
                    width: isOpen ? (isMobile ? 280 : 250) : (isMobile ? 0 : 80),
                    x: isMobile ? (isOpen ? 0 : -280) : 0
                }}
                animate={{
                    width: isOpen ? (isMobile ? 280 : 250) : (isMobile ? 0 : 80),
                    x: isMobile ? (isOpen ? 0 : -280) : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <ul>
                    <motion.li
                        className="Side-logo-container"
                        animate={{
                            padding: isOpen ? '25px 20px' : '15px 10px',
                            minHeight: isOpen ? 120 : 80
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="logo-header">
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.p
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Mooney
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            {/* 데스크톱/태블릿에서만 토글 버튼 표시 */}
                            {!isMobile && (
                                <button className="toggle-btn" onClick={toggleSidebar}>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 0 : 180 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {isOpen ? <FaChevronLeft className="toggle-icon" /> : <FaBars className="toggle-icon" />}
                                    </motion.div>
                                </button>
                            )}
                        </div>
                        <motion.div
                            className="imgwrapper"
                            animate={{
                                width: isOpen ? 120 : 48,
                                height: isOpen ? 80 : 32,
                                borderRadius: isOpen ? 20 : 12
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src={logo3d} alt="logo" />
                        </motion.div>
                    </motion.li>
                    <li><Link to="/" onClick={handleLinkClick}><FaHome className="menu-icon" /><AnimatePresence>{isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>메인 페이지</motion.span>}</AnimatePresence></Link></li>
                    <li><Link to="/page2" onClick={handleLinkClick}><FaBook className="menu-icon" /><AnimatePresence>{isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>가계부 관리</motion.span>}</AnimatePresence></Link></li>
                    <li><Link to="/page3" onClick={handleLinkClick}><FaTrophy className="menu-icon" /><AnimatePresence>{isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>챌린지 시스템</motion.span>}</AnimatePresence></Link></li>
                    <li><Link to="/page4" onClick={handleLinkClick}><FaPen className="menu-icon" /><AnimatePresence>{isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>일기 작성</motion.span>}</AnimatePresence></Link></li>
                    <li><Link to="/page5" onClick={handleLinkClick}><FaCreditCard className="menu-icon" /><AnimatePresence>{isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>구독 서비스 관리</motion.span>}</AnimatePresence></Link></li>
                    <li><Link to="/page6" onClick={handleLinkClick}><FaRobot className="menu-icon" /><AnimatePresence>{isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>AI 챗봇</motion.span>}</AnimatePresence></Link></li>
                    <li><Link to="/page7" onClick={handleLinkClick}><FaUsers className="menu-icon" /><AnimatePresence>{isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>사용자 관리</motion.span>}</AnimatePresence></Link></li>
                </ul>

                {/* 모바일 닫기 버튼 */}
                {isMobile && (
                    <motion.button
                        className="mobile-close-btn"
                        onClick={toggleSidebar}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <FaTimes />
                    </motion.button>
                )}
            </motion.nav>
        </>
    );
}

export default Sidebar;