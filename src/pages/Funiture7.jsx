import React, { useState, useEffect, useRef } from 'react';
import '../css/AuthSystemDemo.css';
import {
    FaUserShield,
    FaKey,
    FaServer,
    FaDatabase,
    FaClock,
    FaMousePointer,
    FaScroll,
    FaExchangeAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaCode,
    FaShieldAlt,
    FaCog,
    FaReact,
    FaLock,
    FaUnlock,
    FaSync
} from 'react-icons/fa';

export default function Funiture7() {
    const [activeFlow, setActiveFlow] = useState('login');
    const [demoStep, setDemoStep] = useState(1);

    // 세션 연장 활동 감지 데모 - 실제 동작
    const [activityCount, setActivityCount] = useState({
        scroll: 0,
        click: 0,
        navigation: 0
    });

    const [sessionInfo, setSessionInfo] = useState({
        lastActivity: new Date().toLocaleTimeString(),
        sessionExtended: false,
        isActive: true
    });

    const lastActivityRef = useRef(null);
    const sessionTimeoutRef = useRef(null);

    // 실제 활동 감지 및 세션 연장 함수
    const handleActivity = (type) => {
        // 활동 카운트 증가
        setActivityCount(prev => ({
            ...prev,
            [type]: prev[type] + 1
        }));

        // 세션 연장 처리
        extendSession();
    };

    // 세션 연장 시뮬레이션
    const extendSession = () => {
        const now = new Date().toLocaleTimeString();
        setSessionInfo({
            lastActivity: now,
            sessionExtended: true,
            isActive: true
        });

        // 세션 연장 표시를 2초 후 숨김
        if (sessionTimeoutRef.current) {
            clearTimeout(sessionTimeoutRef.current);
        }

        sessionTimeoutRef.current = setTimeout(() => {
            setSessionInfo(prev => ({
                ...prev,
                sessionExtended: false
            }));
        }, 2000);
    };

    // 실제 이벤트 리스너 등록 (throttling 포함)
    useEffect(() => {
        let scrollThrottle = null;
        let clickThrottle = null;

        // 스크롤 감지 (throttled)
        const handleScroll = () => {
            if (!scrollThrottle) {
                handleActivity('scroll');
                scrollThrottle = setTimeout(() => {
                    scrollThrottle = null;
                }, 1000); // 1초마다 한 번만
            }
        };

        // 클릭 감지 (throttled)
        const handleClick = (e) => {
            // 데모 버튼 클릭은 제외
            if (!e.target.closest('.activity-sensors') && !e.target.closest('.manual-buttons')) {
                if (!clickThrottle) {
                    handleActivity('click');
                    clickThrottle = setTimeout(() => {
                        clickThrottle = null;
                    }, 500); // 0.5초마다 한 번만
                }
            }
        };

        // 페이지 이동 감지 (popstate 이벤트)
        const handleNavigation = () => {
            handleActivity('navigation');
        };

        // 키보드 이벤트 감지 (추가)
        const handleKeyPress = (e) => {
            // 특정 키만 감지 (예: Tab, Enter, 방향키)
            if (['Tab', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                if (!clickThrottle) {
                    handleActivity('click');
                    clickThrottle = setTimeout(() => {
                        clickThrottle = null;
                    }, 1000);
                }
            }
        };

        // 이벤트 리스너 등록
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyPress);
        window.addEventListener('popstate', handleNavigation);

        // 초기 환영 메시지
        const welcomeTimeout = setTimeout(() => {
            console.log('🔥 실시간 활동 감지가 활성화되었습니다! 페이지를 스크롤하거나 클릭해보세요.');
        }, 1000);

        // 컴포넌트 언마운트시 정리
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('popstate', handleNavigation);

            if (sessionTimeoutRef.current) {
                clearTimeout(sessionTimeoutRef.current);
            }
            if (scrollThrottle) {
                clearTimeout(scrollThrottle);
            }
            if (clickThrottle) {
                clearTimeout(clickThrottle);
            }
            clearTimeout(welcomeTimeout);
        };
    }, []);

    // 수동 활동 시뮬레이션 (데모 버튼용)
    const simulateActivity = (type) => {
        handleActivity(type);
    };

    const authFlows = {
        login: {
            title: '로그인 플로우',
            icon: <FaUserShield />,
            steps: [
                '사용자 ID/PW 입력',
                'BCrypt 암호화 검증',
                'HttpSession 생성',
                'localStorage 설정',
                '로그인 완료'
            ]
        },
        session: {
            title: '세션 검증 플로우',
            icon: <FaKey />,
            steps: [
                'localStorage boolean 확인',
                '서버 세션 ID 대조',
                '/do.logincheck 요청',
                'Session 유효성 검증',
                'true/false 응답'
            ]
        },
        extend: {
            title: '세션 연장 플로우',
            icon: <FaSync />,
            steps: [
                '활동 감지 (scroll/click/navigation)',
                'Activity Listener 실행',
                '/do.logincheck 요청',
                '세션 타임아웃 연장',
                '백그라운드 유지'
            ]
        },
        logout: {
            title: '로그아웃 플로우',
            icon: <FaUnlock />,
            steps: [
                '로그아웃 버튼 클릭',
                '/do.logout 요청',
                'session.invalidate() 실행',
                'localStorage 삭제',
                '로그아웃 완료'
            ]
        }
    };

    return (
        <div className="auth-system-container">
            <div className="auth-system-header">
                <h1>🔐 사용자 인증 & 세션 관리 시스템</h1>
                <p>LocalStorage + HttpSession 기반의 실시간 세션 연장 시스템</p>
                <div className="auth-demo-badge">
                    <span>🛡️ Spring Security · Session Management · Activity Detection</span>
                </div>
            </div>

            {/* 인증 플로우 선택기 */}
            <div className="flow-selector">
                {Object.entries(authFlows).map(([key, flow]) => (
                    <button
                        key={key}
                        className={`flow-button ${activeFlow === key ? 'active' : ''}`}
                        onClick={() => setActiveFlow(key)}
                    >
                        {flow.icon}
                        <span>{flow.title}</span>
                    </button>
                ))}
            </div>

            {/* 선택된 플로우 시각화 */}
            <div className="flow-visualization">
                <div className="flow-container">
                    <h3>{authFlows[activeFlow].title}</h3>
                    <div className="flow-steps">
                        {authFlows[activeFlow].steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flow-step ${demoStep > index ? 'completed' : demoStep === index + 1 ? 'active' : ''}`}
                            >
                                <div className="step-number">{index + 1}</div>
                                <div className="step-content">
                                    <p>{step}</p>
                                </div>
                                {index < authFlows[activeFlow].steps.length - 1 && (
                                    <div className="step-arrow">
                                        <FaExchangeAlt />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flow-controls">
                        <button onClick={() => setDemoStep(1)}>리셋</button>
                        <button
                            onClick={() => setDemoStep(prev => Math.min(prev + 1, authFlows[activeFlow].steps.length))}
                            disabled={demoStep >= authFlows[activeFlow].steps.length}
                        >
                            다음 단계
                        </button>
                    </div>
                </div>
            </div>

            {/* 실시간 활동 감지 데모 */}
            <div className="activity-demo">
                <h3>🎯 실시간 활동 감지 & 세션 연장 데모</h3>
                <p>이 페이지에서 실제로 <strong>스크롤하거나 클릭</strong>하면 자동으로 감지됩니다!</p>

                <div className="demo-instructions">
                    <div className="instruction-item">
                        <FaScroll className="instruction-icon" />
                        <span>페이지를 스크롤해보세요</span>
                    </div>
                    <div className="instruction-item">
                        <FaMousePointer className="instruction-icon" />
                        <span>아무 곳이나 클릭해보세요</span>
                    </div>
                    <div className="instruction-item">
                        <FaExchangeAlt className="instruction-icon" />
                        <span>브라우저 뒤로가기를 눌러보세요</span>
                    </div>
                </div>

                <div className="activity-sensors">
                    <div className="sensor-item">
                        <div className={`activity-indicator scroll ${activityCount.scroll > 0 ? 'active' : ''}`}>
                            <FaScroll />
                            <span>스크롤 감지</span>
                            <div className="activity-count">{activityCount.scroll}</div>
                            {activityCount.scroll === 0 && <div className="waiting-status">대기 중...</div>}
                        </div>
                    </div>

                    <div className="sensor-item">
                        <div className={`activity-indicator click ${activityCount.click > 0 ? 'active' : ''}`}>
                            <FaMousePointer />
                            <span>클릭 감지</span>
                            <div className="activity-count">{activityCount.click}</div>
                            {activityCount.click === 0 && <div className="waiting-status">대기 중...</div>}
                        </div>
                    </div>

                    <div className="sensor-item">
                        <div className={`activity-indicator navigation ${activityCount.navigation > 0 ? 'active' : ''}`}>
                            <FaExchangeAlt />
                            <span>네비게이션 감지</span>
                            <div className="activity-count">{activityCount.navigation}</div>
                            {activityCount.navigation === 0 && <div className="waiting-status">대기 중...</div>}
                        </div>
                    </div>
                </div>

                <div className="manual-demo">
                    <p><strong>수동 테스트:</strong> 실제 감지가 어려우면 아래 버튼으로 시뮬레이션하세요</p>
                    <div className="manual-buttons">
                        <button className="manual-btn" onClick={() => simulateActivity('scroll')}>
                            <FaScroll /> 스크롤 시뮬레이션
                        </button>
                        <button className="manual-btn" onClick={() => simulateActivity('click')}>
                            <FaMousePointer /> 클릭 시뮬레이션
                        </button>
                        <button className="manual-btn" onClick={() => simulateActivity('navigation')}>
                            <FaExchangeAlt /> 네비게이션 시뮬레이션
                        </button>
                    </div>
                </div>

                <div className="session-status">
                    <div className="status-item">
                        <span className="status-label">총 활동 감지:</span>
                        <span className="status-value activity-total">
                            {activityCount.scroll + activityCount.click + activityCount.navigation}회
                        </span>
                    </div>
                    <div className="status-item">
                        <span className="status-label">세션 상태:</span>
                        <span className={`status-value ${sessionInfo.isActive ? 'active' : 'inactive'}`}>
                            {sessionInfo.isActive ? <FaCheckCircle /> : <FaTimesCircle />}
                            {sessionInfo.isActive ? '활성' : '비활성'}
                        </span>
                    </div>
                    <div className="status-item">
                        <span className="status-label">마지막 연장:</span>
                        <span className="status-value last-activity">
                            {sessionInfo.lastActivity}
                            {sessionInfo.sessionExtended && (
                                <span className="session-extended-indicator">
                                    <FaSync className="spin" /> 연장됨!
                                </span>
                            )}
                        </span>
                    </div>
                    <div className="status-item">
                        <span className="status-label">API 호출:</span>
                        <span className="status-value api-status">
                            {sessionInfo.sessionExtended ? (
                                <span className="api-success">
                                    <FaCheckCircle /> /do.logincheck 성공
                                </span>
                            ) : (
                                <span className="api-idle">대기 중</span>
                            )}
                        </span>
                    </div>
                </div>
            </div>

            {/* MooneyBack 실제 구현 설명 */}
            <div className="implementation-details">
                <h2>⚙️ MooneyBack 실제 구현</h2>
                <p className="implementation-intro">Spring Boot + HttpSession 기반의 세션 관리 시스템</p>

                <div className="implementation-sections">
                    {/* 로그인 구현 */}
                    <div className="impl-section">
                        <div className="section-header">
                            <FaUserShield className="section-icon" />
                            <h3>로그인 구현 (MemberController)</h3>
                        </div>
                        <div className="code-explanation">
                            <h4>핵심 기능:</h4>
                            <ul>
                                <li>BCrypt 암호화로 비밀번호 검증</li>
                                <li>HttpSession에 로그인 정보 저장</li>
                                <li>세션 타임아웃 30분 설정</li>
                                <li>프론트엔드에 로그인 상태 반환</li>
                            </ul>
                        </div>
                    </div>

                    {/* 세션 검증 구현 */}
                    <div className="impl-section">
                        <div className="section-header">
                            <FaKey className="section-icon" />
                            <h3>세션 검증 & 연장 (/do.logincheck)</h3>
                        </div>
                        <div className="code-explanation">
                            <h4>핵심 로직:</h4>
                            <ul>
                                <li>localStorage ID와 세션 ID 대조</li>
                                <li>세션 유효성 검증</li>
                                <li>활동 감지시 자동 세션 연장 (1시간)</li>
                                <li>실시간 세션 상태 반환</li>
                            </ul>
                        </div>
                    </div>

                    {/* Spring Security 설정 */}
                    <div className="impl-section">
                        <div className="section-header">
                            <FaShieldAlt className="section-icon" />
                            <h3>Spring Security 설정</h3>
                        </div>
                        <div className="code-explanation">
                            <h4>보안 설정:</h4>
                            <ul>
                                <li>IF_REQUIRED 세션 생성 정책</li>
                                <li>무제한 세션 허용</li>
                                <li>BCryptPasswordEncoder 암호화</li>
                                <li>CORS 및 CSRF 설정</li>
                            </ul>
                        </div>
                    </div>

                    {/* 프론트엔드 활동 감지 */}
                    <div className="impl-section">
                        <div className="section-header">
                            <FaReact className="section-icon" />
                            <h3>프론트엔드 활동 감지</h3>
                        </div>
                        <div className="code-explanation">
                            <h4>감지 이벤트:</h4>
                            <ul>
                                <li>window.addEventListener('scroll')</li>
                                <li>window.addEventListener('click')</li>
                                <li>React Router 페이지 이동</li>
                                <li>자동 /do.logincheck 요청</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* API 엔드포인트 */}
            <div className="auth-api-endpoints">
                <h3>📡 인증 관련 API 엔드포인트</h3>
                <div className="endpoint-list">
                    <div className="endpoint post">
                        <span className="method">POST</span>
                        <span className="url">/do.login</span>
                        <span className="desc">사용자 로그인 & 세션 생성</span>
                    </div>
                    <div className="endpoint post">
                        <span className="method">POST</span>
                        <span className="url">/do.logincheck</span>
                        <span className="desc">세션 검증 & 자동 연장</span>
                    </div>
                    <div className="endpoint post">
                        <span className="method">POST</span>
                        <span className="url">/do.logout</span>
                        <span className="desc">세션 무효화 & 로그아웃</span>
                    </div>
                    <div className="endpoint post">
                        <span className="method">POST</span>
                        <span className="url">/do.registerpage</span>
                        <span className="desc">회원가입 처리</span>
                    </div>
                    <div className="endpoint post">
                        <span className="method">POST</span>
                        <span className="url">/do.Idcheck</span>
                        <span className="desc">아이디 중복 검사</span>
                    </div>
                    <div className="endpoint post">
                        <span className="method">POST</span>
                        <span className="url">/do.passwordcheck</span>
                        <span className="desc">비밀번호 일치 검증</span>
                    </div>
                </div>
            </div>

            {/* 기술 스택 요약 */}
            <div className="tech-summary">
                <h3>🛠️ 사용된 기술 스택</h3>
                <div className="auth-tech-cards">
                    <div className="auth-tech-card">
                        <FaServer />
                        <h4>백엔드</h4>
                        <p>Spring Boot + Spring Security</p>
                    </div>
                    <div className="auth-tech-card">
                        <FaDatabase />
                        <h4>세션 저장소</h4>
                        <p>HttpSession (메모리)</p>
                    </div>
                    <div className="auth-tech-card">
                        <FaLock />
                        <h4>암호화</h4>
                        <p>BCryptPasswordEncoder</p>
                    </div>
                    <div className="auth-tech-card">
                        <FaReact />
                        <h4>프론트엔드</h4>
                        <p>React + LocalStorage</p>
                    </div>
                </div>
            </div>
        </div>
    );
}