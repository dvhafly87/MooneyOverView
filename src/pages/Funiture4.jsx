import React, { useState } from 'react';
import '../css/DiaryDemo.css';
import {
    FaCalendarAlt,
    FaEdit,
    FaTrash,
    FaSave,
    FaChartPie,
    FaDatabase,
    FaCode,
    FaServer
} from 'react-icons/fa';

export default function Funiture4() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [editMode, setEditMode] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [diaryText, setDiaryText] = useState('오늘은 평소보다 조금 더 지출이 있었던 날이다. 점심에 친구들과 함께 맛있는 식당에서 식사를 했는데, 생각보다 비싸서 조금 놀랐다. 하지만 오랜만에 만난 친구들과 즐거운 시간을 보낼 수 있어서 후회는 없다.\n\n저녁에는 집에서 요리를 해서 먹었다. 재료비는 얼마 들지 않았지만, 직접 만든 음식이라 더 맛있게 느껴졌다. 이렇게 가끔은 외식도 하고, 가끔은 집에서 요리도 하면서 균형을 맞춰가는 것 같다.');

    // 실제 MooneyFront와 동일한 목업 데이터
    const mockExpenseData = {
        income: 0,
        totalExpense: 47500,
        chartData: [
            { name: '식비', value: 35000, color: '#ff6b6b' },
            { name: '교통비', value: 7500, color: '#4ecdc4' },
            { name: '쇼핑', value: 5000, color: '#45b7d1' }
        ]
    };

    // 날짜 포맷팅 함수
    const formatDisplayDate = (date) => {
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    // 금액 포맷팅 함수
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('ko-KR').format(amount);
    };

    // 버튼 텍스트 계산
    const getButtonText = () => {
        if (editMode) {
            return '💾 저장 (데모)';
        }
        return diaryText.trim() ? '✏️ 수정하기' : '✏️ 일기 쓰기';
    };

    // 버튼 클릭 핸들러
    const handleButtonClick = () => {
        if (editMode) {
            // 저장 로직 (데모에서는 단순히 편집 모드 해제)
            setEditMode(false);
        } else {
            setEditMode(true);
        }
    };

    // 캘린더 변경 핸들러
    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        setShowCalendar(false);
        setEditMode(false);
    };

    return (
        <div className="diary-demo-container">
            <div className="diary-header">
                <h1>📖 일기 작성 시스템</h1>
                <p>하루의 소비 내역과 함께 개인적인 감정과 생각을 기록하는 디지털 일기장</p>
                <div className="diary-demo-badge">
                    <span>📝 실제 기능 데모 · 소비-일기 연동 시스템</span>
                </div>
            </div>

            <div className="diary-main">
                {/* 왼쪽 패널: 소비 요약 */}
                <div className="diary-left">
                    {/* 오늘의 문구 */}
                    <div className="today-phrase">
                        🌿 오늘도 내 하루를 기록해요
                    </div>

                    {/* 날짜 선택 헤더 */}
                    <div className="date-header">
                        <h2 onClick={() => setShowCalendar(!showCalendar)}>
                            <FaCalendarAlt className="calendar-icon" />
                            {formatDisplayDate(selectedDate)} ▼
                        </h2>

                        {/* 캘린더 팝업 */}
                        {showCalendar && (
                            <div className="calendar-popup">
                                <div className="mock-calendar">
                                    <p>📅 캘린더 컴포넌트 (react-calendar)</p>
                                    <div className="calendar-demo">
                                        <div className="diary-calendar-grid">
                                            <div className="diary-calendar-cell">15</div>
                                            <div className="diary-calendar-cell">16</div>
                                            <div className="diary-calendar-cell current">17</div>
                                            <div className="diary-calendar-cell">18</div>
                                            <div className="diary-calendar-cell">19</div>
                                        </div>
                                        <button
                                            className="close-calendar"
                                            onClick={() => setShowCalendar(false)}
                                        >
                                            닫기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 소비 요약 박스 */}
                    <div className="expense-summary">
                        <h3>📌 이 날의 소비 내역</h3>

                        {/* 수입/지출 금액 */}
                        <div className="summary-amounts">
                            {mockExpenseData.income > 0 && (
                                <div className="amount-item income">
                                    <span className="label">수입</span>
                                    <span className="amount">+{formatAmount(mockExpenseData.income)}원</span>
                                </div>
                            )}
                            <div className="amount-item expense">
                                <span className="label">지출</span>
                                <span className="amount">-{formatAmount(mockExpenseData.totalExpense)}원</span>
                            </div>
                        </div>

                        {/* 차트 영역 */}
                        <div className="chart-section">
                            <h4>카테고리별 지출 차트</h4>
                            <div className="mock-chart">
                                {mockExpenseData.totalExpense === 0 ? (
                                    <div className="empty-chart">
                                        <p>이 날은 소비 내역이 없습니다</p>
                                    </div>
                                ) : (
                                    <div className="chart-bars">
                                        {mockExpenseData.chartData.map((item, index) => (
                                            <div key={index} className="chart-bar-item">
                                                <div className="bar-info">
                                                    <span
                                                        className="category-color"
                                                        style={{ backgroundColor: item.color }}
                                                    ></span>
                                                    <span className="category">{item.name}</span>
                                                    <span className="amount">{formatAmount(item.value)}원</span>
                                                </div>
                                                <div className="bar-track">
                                                    <div
                                                        className="bar-fill"
                                                        style={{
                                                            width: `${(item.value / mockExpenseData.totalExpense) * 100}%`,
                                                            backgroundColor: item.color
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="chart-note">
                                            💡 실제로는 <code>CategoryChart</code> 컴포넌트 사용
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 오른쪽 패널: 일기 작성 */}
                <div className="diary-right">
                    <div className="diary-paper">
                        {/* 일기 헤더 */}
                        <div className="paper-header">
                            <h2>Diary</h2>
                            {!editMode && diaryText.trim() && (
                                <button className="delete-btn" onClick={() => alert('삭제 기능 (데모)')}>
                                    🗑️ 삭제
                                </button>
                            )}
                        </div>

                        {/* 일기 내용 */}
                        <div className="paper-content">
                            {editMode ? (
                                // 편집 모드
                                <textarea
                                    value={diaryText}
                                    onChange={(e) => setDiaryText(e.target.value)}
                                    className="diary-textarea"
                                    placeholder="오늘의 소비와 하루를 돌아보며 일기를 작성해보세요..."
                                />
                            ) : (
                                // 읽기 모드 - 줄무늬 종이 스타일
                                <div className="lined-paper">
                                    {diaryText ? (
                                        diaryText.split('\n').map((line, index) => (
                                            <div key={index} className="paper-line">
                                                {line || '\u00A0'}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="empty-msg">아직 작성된 일기가 없습니다 😊</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* 액션 버튼 */}
                        <div className="paper-actions">
                            <button className="action-btn" onClick={handleButtonClick}>
                                {getButtonText()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 기술 구현 설명 */}
            <div className="diary-tech-explanation">
                <h2>🔧 일기 시스템 기술 구현</h2>
                <p className="diary-tech-intro">React Calendar와 차트 라이브러리를 활용한 소비-일기 연동 시스템</p>

                <div className="diary-tech-cards">
                    <div className="diary-tech-card">
                        <FaCode className="tech-icon" />
                        <h3>React Calendar 연동</h3>
                        <p>react-calendar 라이브러리로 날짜 선택 UI를 구현하고 선택된 날짜의 데이터를 실시간 로드</p>
                        <div className="diary-code-snippet">
                            <code>import Calendar from 'react-calendar'</code>
                        </div>
                    </div>

                    <div className="diary-tech-card">
                        <FaChartPie className="tech-icon" />
                        <h3>CategoryChart 컴포넌트</h3>
                        <p>해당 날짜의 소비 내역을 카테고리별로 분류하여 차트로 시각화하는 재사용 가능한 컴포넌트</p>
                        <div className="diary-code-snippet">
                            <code>&#60;CategoryChart data=&#123;expenseData.chartData&#125; /&#62;</code>
                        </div>
                    </div>

                    <div className="diary-tech-card">
                        <FaServer className="tech-icon" />
                        <h3>데이터 연동</h3>
                        <p>일기 API와 소비 내역 API를 병렬로 호출하여 성능을 최적화한 데이터 로딩</p>
                        <div className="diary-code-snippet">
                            <code>Promise.all([loadDiaryData(), loadExpenseData()])</code>
                        </div>
                    </div>
                </div>

                <div className="diary-api-endpoints">
                    <h3>📡 일기 시스템 API</h3>
                    <div className="diary-endpoint-list">
                        <div className="diary-endpoint get">
                            <span className="method">GET</span>
                            <span className="url">/diary/member/&#123;memberId&#125;/date/&#123;date&#125;</span>
                            <span className="desc">특정 날짜의 일기 조회</span>
                        </div>
                        <div className="diary-endpoint post">
                            <span className="method">POST</span>
                            <span className="url">/diary/member/&#123;memberId&#125;</span>
                            <span className="desc">새 일기 작성</span>
                        </div>
                        <div className="diary-endpoint put">
                            <span className="method">PUT</span>
                            <span className="url">/diary/&#123;diaryId&#125;</span>
                            <span className="desc">일기 수정</span>
                        </div>
                        <div className="diary-endpoint delete">
                            <span className="method">DELETE</span>
                            <span className="url">/diary/&#123;diaryId&#125;</span>
                            <span className="desc">일기 삭제</span>
                        </div>
                        <div className="diary-endpoint get">
                            <span className="method">GET</span>
                            <span className="url">/expenses/by-date/&#123;date&#125;</span>
                            <span className="desc">날짜별 소비 내역 조회</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}