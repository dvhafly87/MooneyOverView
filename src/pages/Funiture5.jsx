import React, { useState } from 'react';
import '../css/SubscriptionDemo.css';
import {
    FaCreditCard,
    FaPlus,
    FaEdit,
    FaTrash,
    FaCheck,
    FaClock,
    FaExclamationTriangle,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaServer,
    FaCode,
    FaDatabase,
    FaFilter,
    FaSort
} from 'react-icons/fa';

export default function Funiture5() {
    const [selectedFilter, setSelectedFilter] = useState('ALL');
    const [selectedSort, setSelectedSort] = useState('LATEST');

    // 실제 MooneyFront와 동일한 목업 데이터
    const mockSubscriptions = [
        {
            mexpId: 1,
            mexpDec: 'Netflix 스탠다드 플랜',
            mexpAmt: 13500,
            mexpRptdd: '2025-01-15',
            mexpStatus: 'PENDING',
            categoryName: '엔터테인먼트',
            categoryColor: '#e74c3c',
            mcatId: 1,
            lastPaymentDate: '2024-12-15'
        },
        {
            mexpId: 2,
            mexpDec: 'Spotify Premium',
            mexpAmt: 10900,
            mexpRptdd: '2025-01-20',
            mexpStatus: 'COMPLETED',
            categoryName: '엔터테인먼트',
            categoryColor: '#e74c3c',
            mcatId: 1,
            lastPaymentDate: '2025-01-20'
        },
        {
            mexpId: 3,
            mexpDec: 'Adobe Creative Cloud',
            mexpAmt: 24000,
            mexpRptdd: '2025-01-10',
            mexpStatus: 'OVERDUE',
            categoryName: '업무 도구',
            categoryColor: '#3498db',
            mcatId: 2,
            lastPaymentDate: '2024-12-10'
        },
        {
            mexpId: 4,
            mexpDec: '네이버 클라우드 플랫폼',
            mexpAmt: 15000,
            mexpRptdd: '2025-01-25',
            mexpStatus: 'PENDING',
            categoryName: '업무 도구',
            categoryColor: '#3498db',
            mcatId: 2,
            lastPaymentDate: '2024-12-25'
        },
        {
            mexpId: 5,
            mexpDec: '카카오톡 플러스 친구',
            mexpAmt: 3300,
            mexpRptdd: '2025-01-30',
            mexpStatus: 'COMPLETED',
            categoryName: '커뮤니케이션',
            categoryColor: '#f39c12',
            mcatId: 3,
            lastPaymentDate: '2025-01-30'
        }
    ];

    const getStatusInfo = (status) => {
        switch (status) {
            case 'PENDING':
                return {
                    color: '#f39c12',
                    icon: <FaClock />,
                    text: '결제 예정',
                    bgColor: '#fef3c7'
                };
            case 'COMPLETED':
                return {
                    color: '#27ae60',
                    icon: <FaCheck />,
                    text: '결제 완료',
                    bgColor: '#d1fae5'
                };
            case 'OVERDUE':
                return {
                    color: '#e74c3c',
                    icon: <FaExclamationTriangle />,
                    text: '연체됨',
                    bgColor: '#fee2e2'
                };
            default:
                return {
                    color: '#6c757d',
                    icon: <FaClock />,
                    text: '알 수 없음',
                    bgColor: '#f8f9fa'
                };
        }
    };

    const getDaysUntilPayment = (paymentDate) => {
        const today = new Date();
        const payment = new Date(paymentDate);
        const diffTime = payment - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return `${Math.abs(diffDays)}일 연체`;
        if (diffDays === 0) return '오늘';
        if (diffDays === 1) return '내일';
        return `${diffDays}일 후`;
    };

    const filteredSubscriptions = mockSubscriptions.filter(sub => {
        if (selectedFilter === 'ALL') return true;
        return sub.mexpStatus === selectedFilter;
    });

    const sortedSubscriptions = filteredSubscriptions.sort((a, b) => {
        if (selectedSort === 'LATEST') {
            return new Date(b.mexpRptdd) - new Date(a.mexpRptdd);
        }
        if (selectedSort === 'AMOUNT_HIGH') {
            return b.mexpAmt - a.mexpAmt;
        }
        if (selectedSort === 'AMOUNT_LOW') {
            return a.mexpAmt - b.mexpAmt;
        }
        return 0;
    });

    const totalMonthlyAmount = mockSubscriptions.reduce((sum, sub) => sum + sub.mexpAmt, 0);
    const pendingAmount = mockSubscriptions
        .filter(sub => sub.mexpStatus === 'PENDING')
        .reduce((sum, sub) => sum + sub.mexpAmt, 0);
    const overdueCount = mockSubscriptions.filter(sub => sub.mexpStatus === 'OVERDUE').length;

    return (
        <div className="subscription-container">
            <div className="subscription-header">
                <h1>💳 구독 서비스 관리</h1>
                <p>월간 구독 서비스의 결제 및 상태를 체계적으로 관리하는 시스템</p>
                <div className="sub-demo-badge">
                    <span>🔄 실시간 상태 관리 · 자동 결제 시스템</span>
                </div>
            </div>

            <div className="subscription-dashboard">
                {/* 상단: 요약 카드들 */}
                <div className="summary-cards">
                    <div className="summary-card total">
                        <div className="card-icon">
                            <FaMoneyBillWave />
                        </div>
                        <div className="card-content">
                            <h3>총 월간 비용</h3>
                            <div className="amount">{totalMonthlyAmount.toLocaleString()}원</div>
                            <div className="subtitle">{mockSubscriptions.length}개 구독 서비스</div>
                        </div>
                    </div>

                    <div className="summary-card pending">
                        <div className="card-icon">
                            <FaClock />
                        </div>
                        <div className="card-content">
                            <h3>결제 예정</h3>
                            <div className="amount">{pendingAmount.toLocaleString()}원</div>
                            <div className="subtitle">이번 달 남은 결제</div>
                        </div>
                    </div>

                    <div className="summary-card alert">
                        <div className="card-icon">
                            <FaExclamationTriangle />
                        </div>
                        <div className="card-content">
                            <h3>주의 필요</h3>
                            <div className="amount">{overdueCount}건</div>
                            <div className="subtitle">연체된 구독</div>
                        </div>
                    </div>
                </div>

                {/* 메인 컨텐츠 */}
                <div className="main-content">
                    {/* 왼쪽: 구독 목록 */}
                    <div className="subscription-list">
                        <div className="list-header">
                            <h2>구독 목록</h2>
                            <div className="controls">
                                <div className="filter-controls">
                                    <FaFilter className="control-icon" />
                                    <select
                                        value={selectedFilter}
                                        onChange={(e) => setSelectedFilter(e.target.value)}
                                        className="filter-select"
                                    >
                                        <option value="ALL">전체</option>
                                        <option value="PENDING">결제 예정</option>
                                        <option value="COMPLETED">결제 완료</option>
                                        <option value="OVERDUE">연체됨</option>
                                    </select>
                                </div>

                                <div className="sort-controls">
                                    <FaSort className="control-icon" />
                                    <select
                                        value={selectedSort}
                                        onChange={(e) => setSelectedSort(e.target.value)}
                                        className="sort-select"
                                    >
                                        <option value="LATEST">최신순</option>
                                        <option value="AMOUNT_HIGH">금액 높은 순</option>
                                        <option value="AMOUNT_LOW">금액 낮은 순</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="subscriptions">
                            {sortedSubscriptions.map(subscription => {
                                const statusInfo = getStatusInfo(subscription.mexpStatus);
                                return (
                                    <div key={subscription.mexpId} className="subscription-item">
                                        <div className="subscription-main">
                                            <div className="service-info">
                                                <div className="service-icon">
                                                    <FaCreditCard style={{ color: subscription.categoryColor }} />
                                                </div>
                                                <div className="service-details">
                                                    <h4>{subscription.mexpDec}</h4>
                                                    <div className="service-meta">
                                                        <span
                                                            className="category-tag"
                                                            style={{ backgroundColor: subscription.categoryColor + '20', color: subscription.categoryColor }}
                                                        >
                                                            #{subscription.categoryName}
                                                        </span>
                                                        <span className="payment-cycle">월간 구독</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="subscription-status">
                                                <div className="amount">{subscription.mexpAmt.toLocaleString()}원</div>
                                                <div
                                                    className="status-badge"
                                                    style={{
                                                        backgroundColor: statusInfo.bgColor,
                                                        color: statusInfo.color
                                                    }}
                                                >
                                                    {statusInfo.icon}
                                                    {statusInfo.text}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="subscription-details">
                                            <div className="detail-item">
                                                <FaCalendarAlt className="detail-icon" />
                                                <span>다음 결제: {subscription.mexpRptdd} ({getDaysUntilPayment(subscription.mexpRptdd)})</span>
                                            </div>
                                            <div className="detail-item">
                                                <FaCheck className="detail-icon" />
                                                <span>최근 결제: {subscription.lastPaymentDate}</span>
                                            </div>
                                        </div>

                                        <div className="subscription-actions">
                                            {subscription.mexpStatus === 'PENDING' && (
                                                <button className="pay-now-btn">
                                                    <FaCheck /> 결제 완료 (데모)
                                                </button>
                                            )}
                                            <button className="edit-btn">
                                                <FaEdit /> 수정
                                            </button>
                                            <button className="delete-btn">
                                                <FaTrash /> 삭제
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 오른쪽: 새 구독 추가 폼 */}
                    <div className="add-subscription">
                        <div className="form-header">
                            <h3>새 구독 추가</h3>
                            <span className="demo-label">데모 폼</span>
                        </div>

                        <div className="subscription-form">
                            <div className="form-group">
                                <label>서비스 이름</label>
                                <input type="text" placeholder="예: Disney+" />
                            </div>

                            <div className="form-group">
                                <label>월 결제 금액</label>
                                <input type="number" placeholder="예: 9900" />
                            </div>

                            <div className="form-group">
                                <label>카테고리</label>
                                <select>
                                    <option>엔터테인먼트</option>
                                    <option>업무 도구</option>
                                    <option>커뮤니케이션</option>
                                    <option>클라우드 스토리지</option>
                                    <option>기타</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>첫 결제일</label>
                                <input type="date" />
                            </div>

                            <div className="form-group">
                                <label>결제 주기</label>
                                <select>
                                    <option>월간 (매월)</option>
                                    <option>분기 (3개월)</option>
                                    <option>연간 (12개월)</option>
                                </select>
                            </div>

                            <div className="form-actions">
                                <button className="add-btn">
                                    <FaPlus /> 구독 추가 (데모)
                                </button>
                                <button className="reset-btn">
                                    초기화
                                </button>
                            </div>
                        </div>

                        {/* 빠른 추가 템플릿 */}
                        <div className="quick-templates">
                            <h4>빠른 추가</h4>
                            <div className="template-grid">
                                <button className="template-btn">
                                    <span className="template-name">YouTube Premium</span>
                                    <span className="template-price">14,900원</span>
                                </button>
                                <button className="template-btn">
                                    <span className="template-name">Apple Music</span>
                                    <span className="template-price">10,900원</span>
                                </button>
                                <button className="template-btn">
                                    <span className="template-name">Microsoft 365</span>
                                    <span className="template-price">8,900원</span>
                                </button>
                                <button className="template-btn">
                                    <span className="template-name">iCloud+</span>
                                    <span className="template-price">1,300원</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 기술 구현 설명 */}
            <div className="sub-tech-explanation">
                <h2>🔧 구독 관리 시스템 기술 구현</h2>
                <p className="sub-tech-intro">월간 반복 결제와 상태 관리를 자동화한 구독 서비스 관리 시스템</p>

                <div className="sub-tech-cards">
                    <div className="sub-tech-card">
                        <FaServer className="tech-icon" />
                        <h3>자동 결제 시스템</h3>
                        <p>PENDING → COMPLETED → 다음 달 PENDING 생성의 자동 순환 시스템</p>
                        <div className="sub-code-snippet">
                            <code>completePayment(), createNextMonthSubscription()</code>
                        </div>
                    </div>

                    <div className="sub-tech-card">
                        <FaDatabase className="tech-icon" />
                        <h3>상태 관리</h3>
                        <p>PENDING, COMPLETED, OVERDUE 상태 기반의 구독 라이프사이클 관리</p>
                        <div className="sub-code-snippet">
                            <code>mexpStatus, mexpRpt, mexpFrequency</code>
                        </div>
                    </div>

                    <div className="sub-tech-card">
                        <FaCode className="tech-icon" />
                        <h3>필터링 & 정렬</h3>
                        <p>상태별 필터링과 금액/날짜 기준 정렬로 효율적인 구독 관리 인터페이스</p>
                        <div className="sub-code-snippet">
                            <code>filter(), sort(), alignWay, filterWay</code>
                        </div>
                    </div>
                </div>

                <div className="sub-api-endpoints">
                    <h3>📡 구독 관리 API</h3>
                    <div className="sub-endpoint-list">
                        <div className="sub-endpoint get">
                            <span className="method">GET</span>
                            <span className="url">/expenses/member/&#123;memberId&#125;</span>
                            <span className="desc">구독 목록 조회 (반복 지출 필터링)</span>
                        </div>
                        <div className="sub-endpoint post">
                            <span className="method">POST</span>
                            <span className="url">/expenses/member/&#123;memberId&#125;</span>
                            <span className="desc">새 구독 추가</span>
                        </div>
                        <div className="sub-endpoint put">
                            <span className="method">PUT</span>
                            <span className="url">/expenses/&#123;mexpId&#125;</span>
                            <span className="desc">구독 정보 수정</span>
                        </div>
                        <div className="sub-endpoint delete">
                            <span className="method">DELETE</span>
                            <span className="url">/expenses/&#123;mexpId&#125;</span>
                            <span className="desc">구독 삭제 (PENDING/OVERDUE만)</span>
                        </div>
                        <div className="sub-endpoint post">
                            <span className="method">POST</span>
                            <span className="url">/subscriptions/&#123;mexpId&#125;/complete</span>
                            <span className="desc">결제 완료 처리</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
