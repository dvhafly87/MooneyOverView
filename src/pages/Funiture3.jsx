import React, { useState } from 'react';
import '../css/ChallengeDemo.css';
import {
    FaTrophy,
    FaPlus,
    FaEdit,
    FaTrash,
    FaFire,
    FaCoins,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaHourglassHalf,
    FaCalendarCheck,
    FaServer,
    FaCode,
    FaDatabase
} from 'react-icons/fa';

export default function Funiture3() {
    const [selectedChallenge, setSelectedChallenge] = useState(null);

    // 목업 데이터
    const mockData = {
        currentChallenge: {
            id: 1,
            title: "1월 식비 절약 챌린지",
            startDate: "2025-01-01",
            endDate: "2025-01-31",
            targetAmount: 200000,
            currentAmount: 145000,
            timeProgress: 55, // 55% 시간 경과
            remainingDays: 14,
            status: "진행중",
            reward: 50
        },
        completedChallenges: [
            {
                id: 2,
                title: "12월 커피값 줄이기",
                startDate: "2024-12-01",
                endDate: "2024-12-31",
                targetAmount: 80000,
                currentAmount: 75000,
                status: "성공",
                reward: 30
            },
            {
                id: 3,
                title: "11월 쇼핑 금지",
                startDate: "2024-11-01",
                endDate: "2024-11-30",
                targetAmount: 150000,
                currentAmount: 180000,
                status: "실패",
                reward: 0
            }
        ],
        pendingChallenges: [
            {
                id: 4,
                title: "2월 교통비 절약",
                startDate: "2025-02-01",
                endDate: "2025-02-28",
                targetAmount: 100000,
                status: "시작 대기중",
                reward: 40
            }
        ],
        userStats: {
            totalPoints: 1250,
            successRate: 67,
            totalChallenges: 12,
            successfulChallenges: 8
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "성공": return "#4CAF50";
            case "실패": return "#f44336";
            case "진행중": return "#2196F3";
            case "시작 대기중": return "#FF9800";
            default: return "#666";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "성공": return <FaCheckCircle />;
            case "실패": return <FaTimesCircle />;
            case "진행중": return <FaHourglassHalf />;
            case "시작 대기중": return <FaClock />;
            default: return <FaHourglassHalf />;
        }
    };

    const calculateProgress = (current, target) => {
        return Math.min((current / target) * 100, 100);
    };

    return (
        <div className="challenge-container">
            <div className="challenge-header">
                <h1>🏆 챌린지 시스템</h1>
                <p>게임화된 절약 시스템으로 재미있게 목표 달성하기</p>
                <div className="demo-badge">
                    <span>🎮 인터랙티브 데모 · 시스템 소개 페이지</span>
                </div>
            </div>

            <div className="challenge-dashboard">
                {/* 왼쪽 컬럼: 메인 챌린지 */}
                <div className="dashboard-left">
                    {/* 현재 진행중 챌린지 */}
                    <div className="current-challenge-card">
                        <div className="card-header">
                            <h2>🔥 현재 진행중인 챌린지</h2>
                            <span className="demo-label">데모 UI</span>
                        </div>

                        {mockData.currentChallenge ? (
                            <div className="challenge-content">
                                <div className="challenge-title-section">
                                    <h3>{mockData.currentChallenge.title}</h3>
                                    <div className="challenge-period">
                                        {mockData.currentChallenge.startDate} ~ {mockData.currentChallenge.endDate}
                                    </div>
                                </div>

                                <div className="challenge-target">
                                    <span>목표 지출: {mockData.currentChallenge.targetAmount.toLocaleString()}원</span>
                                </div>

                                {/* 기간 진행률 게이지 */}
                                <div className="gauge-section">
                                    <div className="gauge-header">
                                        <span className="gauge-label">기간 진행률</span>
                                        <span className="gauge-value">
                                            {mockData.currentChallenge.remainingDays}일 남음
                                        </span>
                                    </div>
                                    <div className="gauge-bar">
                                        <div
                                            className="gauge-fill time-progress"
                                            style={{ width: `${mockData.currentChallenge.timeProgress}%` }}
                                        ></div>
                                    </div>
                                    <div className="gauge-text">{mockData.currentChallenge.timeProgress}% 진행</div>
                                </div>

                                {/* 지출 진행률 게이지 */}
                                <div className="gauge-section">
                                    <div className="gauge-header">
                                        <span className="gauge-label">지출 진행률</span>
                                        <span className="gauge-value">
                                            {Math.round(calculateProgress(mockData.currentChallenge.currentAmount, mockData.currentChallenge.targetAmount))}%
                                        </span>
                                    </div>
                                    <div className="gauge-bar">
                                        <div
                                            className="gauge-fill expense-progress"
                                            style={{ width: `${calculateProgress(mockData.currentChallenge.currentAmount, mockData.currentChallenge.targetAmount)}%` }}
                                        ></div>
                                    </div>
                                    <div className="amount-info">
                                        <span>현재 지출: {mockData.currentChallenge.currentAmount.toLocaleString()}원</span>
                                        <span className="remaining-budget">
                                            남은 예산: {(mockData.currentChallenge.targetAmount - mockData.currentChallenge.currentAmount).toLocaleString()}원
                                        </span>
                                    </div>
                                </div>

                                <div className="action-buttons">
                                    <button className="edit-btn">
                                        <FaEdit /> 수정 (데모)
                                    </button>
                                    <button className="delete-btn">
                                        <FaTrash /> 삭제
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="empty-challenge">
                                <p>현재 진행중인 챌린지가 없습니다.</p>
                                <button className="create-challenge-btn">
                                    <FaPlus /> 새 챌린지 만들기
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 완료된 챌린지들 */}
                    <div className="completed-challenges-card">
                        <h3>📋 완료된 챌린지</h3>
                        <div className="challenge-list">
                            {mockData.completedChallenges.map(challenge => (
                                <div key={challenge.id} className="challenge-item">
                                    <div className="challenge-item-header">
                                        <h4>{challenge.title}</h4>
                                        <div
                                            className="status-badge"
                                            style={{ backgroundColor: getStatusColor(challenge.status) }}
                                        >
                                            {getStatusIcon(challenge.status)}
                                            {challenge.status}
                                        </div>
                                    </div>
                                    <div className="challenge-item-details">
                                        <span>{challenge.startDate} ~ {challenge.endDate}</span>
                                        <span>
                                            {challenge.currentAmount.toLocaleString()} / {challenge.targetAmount.toLocaleString()}원
                                            ({Math.round(calculateProgress(challenge.currentAmount, challenge.targetAmount))}%)
                                        </span>
                                    </div>
                                    <div className="mini-gauge-bar">
                                        <div
                                            className="mini-gauge-fill"
                                            style={{
                                                width: `${calculateProgress(challenge.currentAmount, challenge.targetAmount)}%`,
                                                backgroundColor: getStatusColor(challenge.status)
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 오른쪽 컬럼: 통계 및 대기 챌린지 */}
                <div className="dashboard-right">
                    {/* 챌린지 추가 버튼 */}
                    <button className="add-challenge-btn">
                        <FaPlus /> 새 챌린지 추가
                    </button>

                    {/* 성공률 카드 */}
                    <div className="stats-card success-rate">
                        <div className="stats-icon">
                            <FaTrophy />
                        </div>
                        <div className="stats-content">
                            <h3>챌린지 성공률</h3>
                            <div className="stats-value">{mockData.userStats.successRate}%</div>
                            <div className="stats-detail">
                                {mockData.userStats.successfulChallenges} / {mockData.userStats.totalChallenges} 성공
                            </div>
                        </div>
                    </div>

                    {/* 포인트 카드 */}
                    <div className="stats-card points">
                        <div className="stats-icon">
                            <FaCoins />
                        </div>
                        <div className="stats-content">
                            <h3>보유 포인트</h3>
                            <div className="stats-value">{mockData.userStats.totalPoints.toLocaleString()}</div>
                            <div className="stats-detail">P</div>
                        </div>
                    </div>

                    {/* 대기중인 챌린지 */}
                    <div className="pending-challenges-card">
                        <h3>⏳ 시작 대기 중</h3>
                        <div className="pending-list">
                            {mockData.pendingChallenges.map(challenge => (
                                <div key={challenge.id} className="pending-item">
                                    <div className="pending-header">
                                        <h4>{challenge.title}</h4>
                                        <div className="status-badge pending">
                                            <FaClock />
                                            대기중
                                        </div>
                                    </div>
                                    <div className="pending-details">
                                        <span>{challenge.startDate} ~ {challenge.endDate}</span>
                                        <span>목표: {challenge.targetAmount.toLocaleString()}원</span>
                                        <span>보상: {challenge.reward}P</span>
                                    </div>
                                    <div className="pending-actions">
                                        <button className="edit-btn mini">
                                            <FaEdit />
                                        </button>
                                        <button className="delete-btn mini">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 기술 구현 설명 */}
            <div className="tech-explanation">
                <h2>🔧 챌린지 시스템 기술 구현</h2>
                <p className="tech-intro">실제 MooneyFront 프로젝트의 게임화 시스템과 상태 관리 로직을 소개합니다</p>

                <div className="tech-cards">
                    <div className="tech-card">
                        <FaCode className="tech-icon" />
                        <h3>상태 관리 시스템</h3>
                        <p>React Hooks와 useCallback을 활용한 복잡한 상태 계산 로직 최적화</p>
                        <div className="code-snippet">
                            <code>calculateChallengeStatus(), calculateTimeProgress()</code>
                        </div>
                    </div>

                    <div className="tech-card">
                        <FaServer className="tech-icon" />
                        <h3>실시간 진행률 계산</h3>
                        <p>지출 API와 연동하여 실시간으로 챌린지 진행 상황을 업데이트</p>
                        <div className="code-snippet">
                            <code>BACK_CHALLENGE_API.getExpenseAmount()</code>
                        </div>
                    </div>

                    <div className="tech-card">
                        <FaDatabase className="tech-icon" />
                        <h3>포인트 보상 시스템</h3>
                        <p>챌린지 성공 시 자동으로 포인트를 지급하는 보상 시스템</p>
                        <div className="code-snippet">
                            <code>getUserPoints(), updateUserPoints()</code>
                        </div>
                    </div>
                </div>

                <div className="challenge-api-endpoints">
                    <h3>📡 챌린지 시스템 API</h3>
                    <div className="endpoint-list">
                        <div className="endpoint get">
                            <span className="method">GET</span>
                            <span className="url">/challenges/member/&#123;memberId&#125;</span>
                            <span className="ChallengeDesc">사용자의 모든 챌린지 조회</span>
                        </div>
                        <div className="endpoint post">
                            <span className="method">POST</span>
                            <span className="url">/challenges/member/&#123;memberId&#125;</span>
                            <span className="ChallengeDesc">새로운 챌린지 생성</span>
                        </div>
                        <div className="endpoint put">
                            <span className="method">PUT</span>
                            <span className="url">/challenges/&#123;challengeId&#125;</span>
                            <span className="ChallengeDesc">챌린지 수정</span>
                        </div>
                        <div className="endpoint delete">
                            <span className="method">DELETE</span>
                            <span className="url">/challenges/&#123;challengeId&#125;</span>
                            <span className="ChallengeDesc">챌린지 삭제</span>
                        </div>
                        <div className="endpoint get">
                            <span className="method">GET</span>
                            <span className="url">/challenges/user-points</span>
                            <span className="ChallengeDesc">사용자 포인트 조회</span>
                        </div>
                        <div className="endpoint get">
                            <span className="method">GET</span>
                            <span className="url">/expenses/amount-by-period</span>
                            <span className="ChallengeDesc">기간별 지출 금액 계산</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
