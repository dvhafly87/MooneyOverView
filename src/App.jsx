import './css/App.css';

import React, { useState, useEffect } from 'react';
import SideBar from './pages/SideBar.jsx';
import Page1 from './pages/Funiture1.jsx';
import Page2 from './pages/Funiture2.jsx';
import Page3 from './pages/Funiture3.jsx';
import Page4 from './pages/Funiture4.jsx';
import Page5 from './pages/Funiture5.jsx';
import Page6 from './pages/Funiture6.jsx';
import Page7 from './pages/Funiture7.jsx';
import { FaBars } from 'react-icons/fa';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  // localStorage에서 저장된 상태를 가져오거나 기본값 true 사용
  const [sidebarIsOpen, setSidebarIsOpen] = useState(() => {
    const savedState = localStorage.getItem('sidebarIsOpen');
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 사이드바 상태 변경 함수
  const toggleSidebar = () => {
    const newState = !sidebarIsOpen;
    setSidebarIsOpen(newState);
    localStorage.setItem('sidebarIsOpen', JSON.stringify(newState));
  };

  return (
    <Router>
      <div className={`container ${sidebarIsOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <SideBar isOpen={sidebarIsOpen} toggleSidebar={toggleSidebar} />

        {/* 모바일 햄버거 메뉴 버튼 */}
        {isMobile && (
          <button
            className="mobile-menu-btn"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        )}

        <main className="content">
          <Routes>
            <Route path="/" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3 />} />
            <Route path="/page4" element={<Page4 />} />
            <Route path="/page5" element={<Page5 />} />
            <Route path="/page6" element={<Page6 />} />
            <Route path="/page7" element={<Page7 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

