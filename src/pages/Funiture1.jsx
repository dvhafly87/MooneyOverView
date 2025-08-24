import React, { useState, useEffect } from 'react';
import '../css/MainPage.css';
import logo3d from '../img/logo3d_nuki.png';
import { FaGithub, FaCalendarAlt, FaUsers, FaCode, FaRobot, FaDatabase, FaReact, FaJava } from 'react-icons/fa';

export default function Funiture1() {
    return (
        <div className="main-page">
            {/* 프로젝트 헤더 */}
            <section className="project-header">
                <div className="logo-section">
                    <img src={logo3d} alt="Mooney Logo" className="main-logo" />
                    <h1>Mooney</h1>
                    <p className="project-subtitle">AI 기능을 탑재한 스마트 가계부 웹 서비스</p>
                </div>
            </section>

            {/* 프로젝트 정보 */}
            <section className="project-info">
                <div className="main-info-card">
                    <div className="main-info-item">
                        <FaUsers className="main-info-icon" />
                        <div>
                            <h3>팀명</h3>
                            <p>Mooney</p>
                        </div>
                    </div>
                    <div className="main-info-item">
                        <FaCalendarAlt className="main-info-icon" />
                        <div>
                            <h3>프로젝트 기간</h3>
                            <p>2025.06.28 ~ 2025.07.31</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 팀 구성 */}
            <section className="team-section">
                <h2>팀 구성</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <div className="member-role">팀장</div>
                        <h3>김규빈</h3>
                        <p>백엔드 총괄</p>
                    </div>
                    <div className="team-member">
                        <div className="member-role">팀원</div>
                        <h3>김민규</h3>
                        <p>백엔드 (로그인+회원가입 CRUD, AI 챗봇)</p>
                    </div>
                    <div className="team-member">
                        <div className="member-role">팀원</div>
                        <h3>노승현</h3>
                        <p>프론트 총괄 + 디자인</p>
                    </div>
                    <div className="team-member">
                        <div className="member-role">팀원</div>
                        <h3>김효빈</h3>
                        <p>디자인 + 프론트</p>
                    </div>
                </div>
            </section>

            {/* 기술 스택 */}
            <section className="tech-stack">
                <h2>기술 스택</h2>
                <div className="tech-grid">
                    <div className="tech-item">
                        <FaJava className="tech-icon" />
                        <h3>백엔드</h3>
                        <p>Spring Boot</p>
                    </div>
                    <div className="tech-item">
                        <FaReact className="tech-icon" />
                        <h3>프론트엔드</h3>
                        <p>React</p>
                    </div>
                    <div className="tech-item">
                        <FaRobot className="tech-icon" />
                        <h3>AI</h3>
                        <p>Meta LLM3 8B</p>
                    </div>
                    <div className="tech-item">
                        <FaDatabase className="tech-icon" />
                        <h3>데이터베이스</h3>
                        <p>OracleDB</p>
                    </div>
                </div>
            </section>

            {/* 프로젝트 소개 */}
            <section className="project-description">
                <h2>프로젝트 소개</h2>
                <div className="description-content">
                    <p>
                        Mooney는 AI 기능을 탑재한 혁신적인 가계부 웹 서비스입니다.
                        Spring Boot 백엔드와 React 프론트엔드를 기반으로 구축되었으며,
                        Meta LLM3 8B 모델을 활용한 지능형 챗봇 시스템을 통해
                        사용자의 재무 데이터를 분석하고 맞춤형 인사이트를 제공합니다.
                    </p>

                    <div className="ai-features">
                        <h3>🤖 AI 챗봇 '무니'의 핵심 기능</h3>
                        <ul>
                            <li><strong>지출 분석:</strong> 이번주/이번달 지출 패턴 분석 및 소비 추이 분석</li>
                            <li><strong>고정 지출:</strong> 반복되는 고정 지출 패턴 분석 및 최적화 제안</li>
                            <li><strong>비교 분석:</strong> 지난달 대비 이번달 소비 추이 및 지출 빈도 분석</li>
                            <li><strong>고액 지출:</strong> 월별 고액 지출건 분석 및 소비 패턴 인사이트</li>
                            <li><strong>주요 소비처:</strong> 카테고리별 지출 분석 및 소비 패턴 추천</li>
                        </ul>
                    </div>

                    <div className="core-features">
                        <h3>💡 핵심 서비스 기능</h3>
                        <ul>
                            <li><strong>스마트 가계부:</strong> 수입/지출 기록, 카테고리 분류, 반복 지출 설정</li>
                            <li><strong>데이터 시각화:</strong> ApexCharts를 활용한 월별/주간 지출 차트 및 카테고리별 분석</li>
                            <li><strong>챌린지 시스템:</strong> 지출 절약 목표 설정, 진행 상황 추적, 포인트 보상 시스템</li>
                            <li><strong>일기 작성:</strong> 금융 일기와 감정 연관성 분석을 통한 소비 패턴 개선</li>
                            <li><strong>구독 관리:</strong> 정기 결제 현황 추적 및 비용 최적화</li>
                        </ul>
                    </div>

                    <div className="tech-highlights">
                        <h3>🔧 기술적 특징</h3>
                        <ul>
                            <li><strong>실시간 데이터 처리:</strong> JPA를 통한 효율적인 데이터베이스 연동 및 실시간 업데이트</li>
                            <li><strong>AI 통합:</strong> Llama3 API 연동으로 자연어 기반 재무 상담 서비스</li>
                            <li><strong>반응형 UI:</strong> 모든 디바이스에서 최적화된 사용자 경험</li>
                            <li><strong>보안 시스템:</strong> 서버사이드 세션 기반 인증 및 사용자 데이터 보호</li>
                            <li><strong>확장성:</strong> 모듈화된 아키텍처로 향후 기능 확장 용이</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}