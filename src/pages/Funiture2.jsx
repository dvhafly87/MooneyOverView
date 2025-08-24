import React, { useState } from 'react';
import '../css/AccountBookDemo.css';
import {
    FaCalendarAlt,
    FaPlus,
    FaEdit,
    FaTrash,
    FaTags,
    FaMoneyBillWave,
    FaRedoAlt,
    FaCheckCircle,
    FaClock,
    FaDatabase,
    FaServer,
    FaCode
} from 'react-icons/fa';

export default function Funiture2() {
    const [selectedDate, setSelectedDate] = useState('2025-01-17');
    const [selectedCategory, setSelectedCategory] = useState('식비');

    // 목업 데이터
    const mockData = {
        income: [
            { id: 1, amount: 3000000, category: '급여', memo: '1월 월급', date: '2025-01-17' },
            { id: 2, amount: 500000, category: '부업', memo: '프리랜서 수입', date: '2025-01-17' }
        ],
        expense: [
            { id: 3, amount: 15000, category: '식비', memo: '점심식사', date: '2025-01-17' },
            { id: 4, amount: 2500, category: '교통비', memo: '지하철비', date: '2025-01-17' },
            { id: 5, amount: 45000, category: '쇼핑', memo: '생필품 구매', date: '2025-01-17' }
        ],
        categories: ['급여', '부업', '식비', '교통비', '쇼핑', '의료비', '문화생활', '기타']
    };

    return (
        <div className="accountbook-container">
            <div className="accountbook-header">
                <h1>📊 스마트 가계부 관리 시스템</h1>
                <p>React Calendar와 REST API 기반의 실시간 수입/지출 관리</p>
                <div className="demo-badge">
                    <span>📋 레이아웃 데모 · UI/UX 소개 페이지</span>
                </div>
            </div>

            <div className="demo-layout">
                {/* 왼쪽: 캘린더 + 내역 */}
                <div className="demo-left">
                    <div className="calendar-section">
                        <div className="date-display">
                            <FaCalendarAlt className="date-icon" />
                            <span>2025년 1월 17일</span>
                        </div>
                        <div className="mock-calendar">
                            <div className="calendar-header">
                                <span>1월 2025</span>
                            </div>
                            <div className="calendar-grid">
                                <div className="day-header">일</div>
                                <div className="day-header">월</div>
                                <div className="day-header">화</div>
                                <div className="day-header">수</div>
                                <div className="day-header">목</div>
                                <div className="day-header">금</div>
                                <div className="day-header">토</div>

                                {Array.from({ length: 31 }, (_, i) => (
                                    <div
                                        key={i}
                                        className={`calendar-day ${i === 16 ? 'selected' : ''}`}
                                    >
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="entries-section">
                        <div className="income-box">
                            <h3>💰 수입</h3>
                            {mockData.income.map(item => (
                                <div key={item.id} className="entry-item income">
                                    <span className="amount">{item.amount.toLocaleString()}원</span>
                                    <span className="category">#{item.category}</span>
                                    <div className="actions">
                                        <button><FaEdit /></button>
                                        <button><FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="expense-box">
                            <h3>💸 지출</h3>
                            {mockData.expense.map(item => (
                                <div key={item.id} className="entry-item expense">
                                    <span className="amount">{item.amount.toLocaleString()}원</span>
                                    <span className="category">#{item.category}</span>
                                    <div className="actions">
                                        <button><FaEdit /></button>
                                        <button><FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 오른쪽: 입력 폼 */}
                <div className="demo-right">
                    <div className="input-form">
                        <div className="form-header">
                            <h3>📝 거래 기록</h3>
                            <span className="demo-label">데모 UI</span>
                        </div>

                        <div className="form-group">
                            <label>거래 유형</label>
                            <select>
                                <option>수입</option>
                                <option>지출</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>금액</label>
                            <input type="number" placeholder="예: 15000" />
                        </div>

                        <div className="form-group">
                            <label>카테고리</label>
                            <div className="category-tags">
                                {mockData.categories.map(cat => (
                                    <div
                                        key={cat}
                                        className={`category-tag ${selectedCategory === cat ? 'selected' : ''}`}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat}
                                    </div>
                                ))}
                                <div className="category-tag add">
                                    <FaPlus /> 추가
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="checkbox-group">
                                <input type="checkbox" id="repeat" />
                                <label htmlFor="repeat">
                                    <FaRedoAlt /> 반복 지출
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>상태</label>
                            <select>
                                <option>
                                    <FaCheckCircle /> 완료
                                </option>
                                <option>
                                    <FaClock /> 대기중
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>메모</label>
                            <textarea placeholder="거래 내용을 입력하세요..."></textarea>
                        </div>

                        <div className="form-buttons">
                            <button className="save-btn">💾 저장 (데모)</button>
                            <button className="cancel-btn">취소</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 기술 구현 설명 */}
            <div className="tech-explanation">
                <h2>🔧 핵심 기술 구현</h2>
                <p className="tech-intro">실제 MooneyFront 프로젝트에서 구현된 기술과 구조를 소개합니다</p>
                <div className="tech-cards">
                    <div className="tech-card">
                        <FaCode className="tech-icon" />
                        <h3>React Calendar</h3>
                        <p>react-calendar 라이브러리를 활용한 직관적인 날짜 선택 인터페이스</p>
                        <div className="code-snippet">
                            <code>import Calendar from 'react-calendar';</code>
                        </div>
                    </div>

                    <div className="tech-card">
                        <FaServer className="tech-icon" />
                        <h3>REST API 통신</h3>
                        <p>Spring Boot 백엔드와 Fetch API를 통한 실시간 CRUD 작업</p>
                        <div className="code-snippet">
                            <code>POST /expenses/member/&#123;id&#125;?mcatId=&#123;categoryId&#125;</code>
                        </div>
                    </div>

                    <div className="tech-card">
                        <FaDatabase className="tech-icon" />
                        <h3>상태 관리</h3>
                        <p>React Hooks를 활용한 복잡한 폼 상태 및 데이터 관리</p>
                        <div className="code-snippet">
                            <code>useState, useEffect, localStorage</code>
                        </div>
                    </div>
                </div>

                <div className="accountbook-api-endpoints">
                    <h3>📡 API 엔드포인트</h3>
                    <div className="endpoint-list">
                        <div className="endpoint get">
                            <span className="method">GET</span>
                            <span className="url">/categories/member/&#123;memberId&#125;</span>
                            <span className="AccountBookdesc">카테고리 목록 조회</span>
                        </div>
                        <div className="endpoint get">
                            <span className="method">GET</span>
                            <span className="url">/expenses/member/&#123;memberId&#125;/by-date-range</span>
                            <span className="AccountBookdesc">날짜별 수입/지출 내역</span>
                        </div>
                        <div className="endpoint post">
                            <span className="method">POST</span>
                            <span className="url">/expenses/member/&#123;memberId&#125;</span>
                            <span className="AccountBookdesc">새 거래 기록 생성</span>
                        </div>
                        <div className="endpoint put">
                            <span className="method">PUT</span>
                            <span className="url">/expenses/member/&#123;memberId&#125;</span>
                            <span className="AccountBookdesc">거래 기록 수정</span>
                        </div>
                        <div className="endpoint delete">
                            <span className="method">DELETE</span>
                            <span className="url">/expenses/&#123;expenseId&#125;</span>
                            <span className="AccountBookdesc">거래 기록 삭제</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}