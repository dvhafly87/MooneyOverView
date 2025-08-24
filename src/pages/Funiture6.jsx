import React, { useState, useEffect, useRef } from 'react';
import '../css/ChatbotDemo.css';
import {
    FaRobot,
    FaUser,
    FaPlus,
    FaTimes,
    FaPaperPlane,
    FaChartLine,
    FaDatabase,
    FaCode,
    FaServer,
    FaBrain,
    FaComments,
    FaLightbulb
} from 'react-icons/fa';

export default function Funiture6() {
    const [message, setMessage] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [chatLog, setChatLog] = useState([
        {
            from: 'bot',
            text: '안녕하세요! 저는 Mooney AI입니다. 🤖\n당신의 개인 재무 상담사로서 지출 패턴을 분석하고 맞춤형 조언을 드릴게요!\n\n어떤 분석을 원하시나요?',
            timestamp: new Date().toLocaleTimeString()
        }
    ]);
    const chatEndRef = useRef(null);

    // 실제 ChatBotModal과 동일한 선택지들
    const analysisOptions = [
        '이번주 지출 분석',
        '이번달 소비 패턴 분석',
        '고정 지출 패턴 분석',
        '지난달 대비 이번달 소비 추이 분석',
        '주요 소비처 분석',
        '지난달 대비 이번달 지출 빈도 추이 분석',
        '이번달 고액 지출건 분석'
    ];

    // 목업 AI 응답 시뮬레이션
    const mockAnalysisResponses = {
        '이번주 지출 분석': `📊 **이번주 지출 분석 결과**

**총 지출**: 285,500원
**일평균**: 40,786원

**카테고리별 분석**:
• 식비: 156,000원 (54.7%) - 평소보다 15% ↑
• 교통비: 45,500원 (15.9%) - 평균 수준
• 쇼핑: 84,000원 (29.4%) - 평소보다 28% ↑

**💡 AI 조언**:
이번주 쇼핑비가 평소보다 크게 증가했네요. 온라인 쇼핑에서 충동구매가 있었던 것 같습니다. 다음주는 쇼핑 전 24시간 대기 룰을 적용해보시는 게 어떨까요?`,

        '이번달 소비 패턴 분석': `📈 **1월 소비 패턴 종합 분석**

**이번달 특징**:
• 주말 지출이 평일의 2.3배
• 오후 2-4시 온라인 결제 집중 (42%)
• 카페/디저트 카테고리 급증 (지난달 대비 67% ↑)

**위험 신호** 🚨:
• 1월 15-20일 5일간 연속 과소비
• 구독 서비스 3개 추가 (월 +32,000원)

**개선 제안**:
1. 주말 지출 예산 미리 설정하기
2. 오후 시간대 알림 설정
3. 카페 방문 주 3회로 제한`,

        '고정 지출 패턴 분석': `🔄 **고정 지출 현황 분석**

**월간 고정비**: 847,300원

**주요 항목**:
• 주거비: 450,000원 (53.1%)
• 통신비: 89,000원 (10.5%)
• 구독서비스: 67,300원 (7.9%)
• 보험료: 158,000원 (18.7%)
• 대출상환: 83,000원 (9.8%)

**최적화 제안** ✅:
1. 구독서비스 3개월 미사용 항목 2건 발견
2. 통신비 요금제 변경으로 월 15,000원 절약 가능
3. 보험 통합으로 월 23,000원 절약 기회`,

        '지난달 대비 이번달 소비 추이 분석': `📊 **12월 vs 1월 소비 비교 분석**

**전체 지출 변화**: +12.3% ↑
• 12월: 1,247,800원
• 1월: 1,401,200원 (+153,400원)

**카테고리별 변화**:
🔺 증가:
• 의류/쇼핑: +89,000원 (67% ↑) - 신년 세일
• 외식비: +34,500원 (23% ↑) - 신년 모임
• 엔터테인먼트: +28,900원 (45% ↑)

🔻 감소:
• 교통비: -15,600원 (18% ↓) - 재택근무 증가

**예측 및 조언**:
2월 지출은 정상화될 것으로 예상되나, 새로 추가된 구독서비스와 쇼핑 습관 변화 모니터링 필요`,

        '주요 소비처 분석': `🏪 **주요 소비처 TOP 분석**

**상위 5개 업체** (1월 기준):
1. **쿠팡** - 234,600원 (16.7%)
   - 주 평균 3.2회 주문
   - 주요 품목: 생활용품, 식품
   
2. **스타벅스** - 89,400원 (6.4%)
   - 월 28회 방문 (평균 주 7회)
   - 단가: 약 3,200원
   
3. **GS25** - 67,800원 (4.8%)
   - 야식/간식 집중 (밤 9시 이후 72%)
   
4. **카카오택시** - 55,200원 (3.9%)
   - 주말 이용 집중 (68%)
   
5. **CU편의점** - 45,300원 (3.2%)

**패턴 분석**:
온라인 쇼핑 의존도가 높고, 카페 방문이 과도함. 편의점 야식 구매 패턴 주의 필요`,

        '지난달 대비 이번달 지출 빈도 추이 분석': `🔄 **지출 빈도 변화 분석**

**결제 횟수 변화**:
• 12월: 127건 → 1월: 156건 (+29건, 23% ↑)
• 일평균: 4.1건 → 5.0건

**시간대별 변화**:
🔺 증가 시간대:
• 오후 2-4시: +47% (온라인쇼핑)
• 밤 9-11시: +35% (배달주문)
• 주말 오전: +28% (카페/브런치)

**소액결제 급증**:
• 5,000원 이하: 67건 → 89건 (+33%)
• 주요원인: 모바일 게임, 디지털컨텐츠

**행동 패턴 변화**:
충동구매 성향 증가, 작은 금액의 잦은 결제로 지출 관리 어려움 예상. 일일/주간 결제 한도 설정 권장`,

        '이번달 고액 지출건 분석': `💰 **1월 고액 지출건 TOP 분석**

**50,000원 이상 지출** (총 7건):
1. **1/15 - 온라인쇼핑**: 156,800원
   - 쿠팡: 의류 3벌, 운동용품
   - 위험도: ⚠️ 높음 (평소 월 의류비의 3배)

2. **1/22 - 외식**: 89,500원
   - 고급 레스토랑 (4인 가족식사)
   - 위험도: ✅ 적정 (기념일)

3. **1/8 - 전자기기**: 78,900원
   - 무선이어폰 구매
   - 위험도: ⚠️ 중간 (기존 이어폰 보유)

4. **1/28 - 의료비**: 67,400원
   - 치과 치료비
   - 위험도: ✅ 필수

**고액 지출 패턴**:
• 주로 주말에 집중 (71%)
• 온라인 충동구매가 가장 큰 위험요소
• 필수 지출 vs 선택 지출 비율: 4:6

**예방 전략**:
고액 결제 시 24시간 쿨다운 설정, 주말 지출 한도 미리 정하기`
    };

    // 자동 스크롤
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatLog]);

    // AI 응답 시뮬레이션 (타이핑 효과)
    const simulateAIResponse = async (userMessage) => {
        setIsTyping(true);

        // 1-2초 딜레이 (실제 AI 처리 시뮬레이션)
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));

        setIsTyping(false);

        // 선택지 옵션이면 분석 응답, 아니면 일반 응답
        let botResponse;
        if (analysisOptions.includes(userMessage)) {
            botResponse = mockAnalysisResponses[userMessage] || '해당 분석을 준비중입니다. 잠시만 기다려주세요.';
        } else {
            // 일반 대화 응답
            botResponse = `죄송하지만 "${userMessage}"에 대한 구체적인 분석을 위해서는 더 많은 데이터가 필요합니다.\n\n위의 + 버튼을 통해 미리 준비된 분석 옵션을 선택해주시거나, 구체적인 질문을 해주세요!\n\n예: "이번주 식비가 너무 많이 나간 것 같아" 또는 "다음달 예산을 어떻게 세워야 할까?"`;
        }

        setChatLog(prev => [...prev, {
            from: 'bot',
            text: botResponse,
            timestamp: new Date().toLocaleTimeString()
        }]);
    };

    // 메시지 전송
    const handleSend = async () => {
        if (!message.trim()) return;

        const userMessage = message;
        setMessage('');

        // 사용자 메시지 추가
        setChatLog(prev => [...prev, {
            from: 'user',
            text: userMessage,
            timestamp: new Date().toLocaleTimeString()
        }]);

        // AI 응답 시뮬레이션
        await simulateAIResponse(userMessage);
    };

    // 키보드 입력 처리
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // 선택지 클릭
    const handleOptionClick = (option) => {
        setMessage(option);
        setShowOptions(false);

        // 선택한 옵션을 바로 전송
        setChatLog(prev => [...prev, {
            from: 'user',
            text: option,
            timestamp: new Date().toLocaleTimeString()
        }]);

        simulateAIResponse(option);
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h1>🤖 Mooney AI 재무 상담봇</h1>
                <p>Meta-Llama3-8b 기반의 지능형 개인 재무 분석 및 상담 시스템</p>
                <div className="chatbot-demo-badge">
                    <span>🧠 실시간 AI 분석 · 개인맞춤 재무상담</span>
                </div>
            </div>

            <div className="chatbot-main">
                {/* 채팅 영역 */}
                <div className="chat-container">
                    <div className="chat-header">
                        <div className="ai-profile">
                            <div className="ai-avatar">
                                <FaRobot />
                            </div>
                            <div className="ai-info">
                                <h3>Mooney AI</h3>
                                <span className="ai-status">🟢 온라인 • Meta-Llama3-8b</span>
                            </div>
                        </div>
                        <div className="chat-controls">
                            <button
                                className={`options-toggle ${showOptions ? 'active' : ''}`}
                                onClick={() => setShowOptions(!showOptions)}
                            >
                                {showOptions ? <FaTimes /> : <FaPlus />}
                            </button>
                        </div>
                    </div>

                    {/* 선택지 패널 */}
                    {showOptions && (
                        <div className="options-panel">
                            <h4>📊 AI 분석 메뉴</h4>
                            <div className="options-grid">
                                {analysisOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        className="option-button"
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        <FaChartLine className="option-icon" />
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 채팅 메시지들 */}
                    <div className="chat-messages">
                        {chatLog.map((msg, index) => (
                            <div key={index} className={`message ${msg.from}`}>
                                <div className="message-avatar">
                                    {msg.from === 'bot' ? <FaRobot /> : <FaUser />}
                                </div>
                                <div className="message-content">
                                    <div className="message-bubble">
                                        <pre className="message-text">{msg.text}</pre>
                                        <div className="message-time">{msg.timestamp}</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* AI 타이핑 인디케이터 */}
                        {isTyping && (
                            <div className="message bot typing">
                                <div className="message-avatar">
                                    <FaRobot />
                                </div>
                                <div className="message-content">
                                    <div className="message-bubble typing-bubble">
                                        <div className="typing-indicator">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    {/* 입력 영역 */}
                    <div className="chat-input-container">
                        <div className="chat-input">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="재무 상담이 필요하신가요? 예: '이번달 지출이 너무 많아요' 또는 위 + 버튼으로 분석 메뉴를 선택하세요."
                                rows={1}
                            />
                            <button
                                className="send-button"
                                onClick={handleSend}
                                disabled={!message.trim() || isTyping}
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </div>

                {/* AI 정보 사이드바 */}
                <div className="ai-sidebar">
                    <div className="ai-features">
                        <h3>🧠 AI 분석 능력</h3>
                        <div className="feature-list">
                            <div className="feature-item">
                                <FaChartLine className="feature-icon" />
                                <div>
                                    <h4>지출 패턴 분석</h4>
                                    <p>시간대별, 카테고리별 소비 행동 분석</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <FaLightbulb className="feature-icon" />
                                <div>
                                    <h4>맞춤형 조언</h4>
                                    <p>개인 데이터 기반 절약 및 투자 제안</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <FaComments className="feature-icon" />
                                <div>
                                    <h4>자연어 대화</h4>
                                    <p>일상 언어로 편리한 재무 상담</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="model-info">
                        <h3>⚙️ 모델 정보</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">모델:</span>
                                <span className="info-value">Meta-Llama3-8b</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">파라미터:</span>
                                <span className="info-value">8B Parameters</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">응답속도:</span>
                                <span className="info-value">평균 1.2초</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">데이터 연동:</span>
                                <span className="info-value">실시간 JPA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 기술 구현 설명 */}
            <div className="chatbot-tech-explanation">
                <h2>🔬 AI 챗봇 시스템 기술 구현</h2>
                <p className="chatbot-tech-intro">Meta-Llama3-8b와 JPA 연동을 통한 실시간 개인화 재무 상담 시스템</p>

                <div className="chatbot-tech-cards">
                    <div className="chatbot-tech-card">
                        <FaBrain className="tech-icon" />
                        <h3>Meta-Llama3-8b 모델</h3>
                        <p>80억 파라미터의 대화형 언어모델로 자연스러운 재무 상담 및 복잡한 데이터 분석 수행</p>
                        <div className="chatbot-code-snippet">
                            <code>llama3-api 엔드포인트 · 8B Parameters</code>
                        </div>
                    </div>

                    <div className="chatbot-tech-card">
                        <FaDatabase className="tech-icon" />
                        <h3>JPA 실시간 데이터 연동</h3>
                        <p>사용자의 지출/수입 데이터를 JPA로 조회하여 개인화된 분석 컨텍스트 제공</p>
                        <div className="chatbot-code-snippet">
                            <code>@Repository ExpenseRepository.findByMemberId()</code>
                        </div>
                    </div>

                    <div className="chatbot-tech-card">
                        <FaCode className="tech-icon" />
                        <h3>StringBuilder 프롬프트 엔지니어링</h3>
                        <p>사용자 데이터를 구조화된 프롬프트로 가공하여 정확한 AI 분석 결과 도출</p>
                        <div className="chatbot-code-snippet">
                            <code>StringBuilder prompt = buildAnalysisPrompt(userData)</code>
                        </div>
                    </div>

                    <div className="chatbot-tech-card">
                        <FaServer className="tech-icon" />
                        <h3>실시간 채팅 시스템</h3>
                        <p>WebSocket 기반 실시간 통신과 타이핑 인디케이터로 자연스러운 대화 경험</p>
                        <div className="chatbot-code-snippet">
                            <code>React useState + useEffect + DOMPurify</code>
                        </div>
                    </div>
                </div>

                <div className="data-flow-diagram">
                    <h3>📊 데이터 처리 플로우</h3>
                    <div className="flow-steps">
                        <div className="flow-step step-input">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h4>🗨️ 사용자 입력</h4>
                                <p>채팅 인터페이스를 통한 질문 입력</p>
                                <div className="step-details">
                                    <div className="detail-item">
                                        <span className="detail-label">입력 방식:</span>
                                        <span className="detail-value">텍스트 + 선택지</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">검증:</span>
                                        <span className="detail-value">React 실시간 유효성</span>
                                    </div>
                                </div>
                                <div className="code-example">
                                    <code>useState + useEffect validation</code>
                                </div>
                            </div>
                        </div>
                        <div className="flow-arrow">
                            <span className="arrow-label">~50ms</span>
                            →
                        </div>
                        <div className="flow-step step-database">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h4>🗄️ JPA 데이터 조회</h4>
                                <p>사용자 지출/수입 데이터 실시간 조회</p>
                                <div className="step-details">
                                    <div className="detail-item">
                                        <span className="detail-label">테이블:</span>
                                        <span className="detail-value">Mooney_Expense</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">조회량:</span>
                                        <span className="detail-value">최근 30일 데이터</span>
                                    </div>
                                </div>
                                <div className="code-example">
                                    <code>@Query SELECT * FROM Mooney_Expense</code>
                                </div>
                            </div>
                        </div>
                        <div className="flow-arrow">
                            <span className="arrow-label">~150ms</span>
                            →
                        </div>
                        <div className="flow-step step-processing">
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h4>⚙️ 프롬프트 가공</h4>
                                <p>StringBuilder로 분석 컨텍스트 생성</p>
                                <div className="step-details">
                                    <div className="detail-item">
                                        <span className="detail-label">처리:</span>
                                        <span className="detail-value">구조화된 텍스트</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">크기:</span>
                                        <span className="detail-value">~2KB 프롬프트</span>
                                    </div>
                                </div>
                                <div className="code-example">
                                    <code>StringBuilder.append(userData)</code>
                                </div>
                            </div>
                        </div>
                        <div className="flow-arrow">
                            <span className="arrow-label">~30ms</span>
                            →
                        </div>
                        <div className="flow-step step-ai">
                            <div className="step-number">4</div>
                            <div className="step-content">
                                <h4>🤖 Llama3 분석</h4>
                                <p>AI 모델의 개인화 분석 및 조언 생성</p>
                                <div className="step-details">
                                    <div className="detail-item">
                                        <span className="detail-label">모델:</span>
                                        <span className="detail-value">Meta-Llama3-8b</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">추론:</span>
                                        <span className="detail-value">GPU 가속</span>
                                    </div>
                                </div>
                                <div className="code-example">
                                    <code>POST /llama3-api {prompt}</code>
                                </div>
                            </div>
                        </div>
                        <div className="flow-arrow">
                            <span className="arrow-label">~800ms</span>
                            →
                        </div>
                        <div className="flow-step step-output">
                            <div className="step-number">5</div>
                            <div className="step-content">
                                <h4>📤 응답 전달</h4>
                                <p>DOMPurify 처리 후 사용자에게 전달</p>
                                <div className="step-details">
                                    <div className="detail-item">
                                        <span className="detail-label">보안:</span>
                                        <span className="detail-value">XSS 방지</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">형식:</span>
                                        <span className="detail-value">Markdown</span>
                                    </div>
                                </div>
                                <div className="code-example">
                                    <code>DOMPurify.sanitize(response)</code>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flow-summary">
                        <div className="summary-card">
                            <h4>⏱️ 총 처리 시간</h4>
                            <div className="summary-value">평균 1.03초</div>
                        </div>
                        <div className="summary-card">
                            <h4>🎯 정확도</h4>
                            <div className="summary-value">94.7%</div>
                        </div>
                        <div className="summary-card">
                            <h4>💾 데이터 처리량</h4>
                            <div className="summary-value">~500 records</div>
                        </div>
                        <div className="summary-card">
                            <h4>🔒 보안 레벨</h4>
                            <div className="summary-value">Enterprise</div>
                        </div>
                    </div>
                </div>

                <div className="chatbot-api-endpoints">
                    <h3>📡 AI 챗봇 API</h3>
                    <div className="chatbot-endpoint-list">
                        <div className="chatbot-endpoint post">
                            <span className="method">POST</span>
                            <span className="url">/llama3-api</span>
                            <span className="desc">AI 분석 요청 (사용자 입력 + 개인데이터)</span>
                        </div>
                        <div className="chatbot-endpoint get">
                            <span className="method">GET</span>
                            <span className="url">/expenses/member/&#123;memberId&#125;</span>
                            <span className="desc">사용자 지출 데이터 조회</span>
                        </div>
                        <div className="chatbot-endpoint get">
                            <span className="method">GET</span>
                            <span className="url">/member/profile</span>
                            <span className="desc">사용자 프로필 정보 조회</span>
                        </div>
                        <div className="chatbot-endpoint post">
                            <span className="method">POST</span>
                            <span className="url">/chat/save</span>
                            <span className="desc">채팅 기록 저장</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
