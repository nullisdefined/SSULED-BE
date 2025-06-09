# 오운완 (오늘 운동 완료) 🏋️‍♀️

> 운동 습관 형성과 커뮤니티 기반 동기부여를 위한 웹 기반 운동 인증 플랫폼

[![GitHub Organization](https://img.shields.io/badge/GitHub-SSU--LED-181717?style=flat-square&logo=github)](https://github.com/SSU-LED)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=flat-square)](https://ounwan.site/login)

## 📖 프로젝트 개요

오운완은 현대 사회의 운동 부족 문제를 해결하기 위한 **웹 기반 운동 인증 플랫폼**입니다. 사용자들이 운동 인증 사진을 실시간으로 촬영하여 공유하고, 그룹 단위의 건전한 경쟁과 협업을 통해 자연스럽게 운동 습관을 형성할 수 있도록 지원합니다.

### 🎯 주요 목표
- 사진 기반 운동 인증을 통한 신뢰성 있는 운동 기록
- 그룹 기반 경쟁 및 랭킹 시스템으로 지속적인 참여 유도
- 개인 맞춤형 통계 제공으로 운동 패턴 분석

## 🛠 기술 스택

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=PostgreSQL&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=flat-square&logo=TypeORM&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=Swagger&logoColor=black)

### Infrastructure & DevOps
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=Amazon-AWS&logoColor=white)
![AWS EC2](https://img.shields.io/badge/AWS_EC2-FF9900?style=flat-square&logo=Amazon-EC2&logoColor=white)
![AWS RDS](https://img.shields.io/badge/AWS_RDS-527FFF?style=flat-square&logo=Amazon-RDS&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS_S3-569A31?style=flat-square&logo=Amazon-S3&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=GitHub-Actions&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=Nginx&logoColor=white)

## 🏗 인프라 구조도

<img width="1248" alt="image" src="https://github.com/user-attachments/assets/4391876b-ca73-4b60-bc63-4506868ed1b5" />

## ✨ 주요 기능

### 🔐 사용자 인증
- **소셜 로그인**: 카카오, 네이버 OAuth 연동
- **보안 토큰 관리**: JWT Access Token + HTTP-only Cookie Refresh Token
- **프로필 관리**: 닉네임, 한줄소개, 프로필 이미지 설정

### 📸 운동 인증 시스템
- **실시간 사진 촬영**: 웹 내 카메라 기능으로 조작 방지
- **상세 운동 정보**: 운동 부위, 시간, 공개 범위 설정
- **공개 범위 제어**: 전체 공개 또는 그룹 내 공개 선택

### 👥 그룹 기능
- **그룹 생성/참여**: 최대 50명까지 참여 가능
- **접근 제어**: Public/Private 그룹 설정
- **그룹 피드**: 그룹원들의 운동 인증 공유

### 📊 통계 대시보드
- **개인 통계**: 
  - 스트릭(연속 출석) 기록
  - 시간대별 운동 패턴 분석
  - 운동 부위별 선호도 분석
- **그룹 통계**: 
  - 그룹 내 랭킹 시스템
  - 팀 스트릭 현황
  - 참여율 시각화

### 💬 소셜 기능
- **피드 상호작용**: 좋아요, 댓글 기능
- **인기순 정렬**: 좋아요(1점) + 댓글(2점) 가중치 기반
- **실시간 피드**: 날짜별 정렬된 운동 인증 피드

## 📱 화면 구성

| 소셜 로그인 | 메인 피드(인기게시글 조회) | 운동 인증 업로드 | 상세 게시글 조회 |
|:---:|:---:|:---:|:---:|
| ![소셜로그인](https://github.com/user-attachments/assets/8b70fc17-8750-4de4-b749-9dfa5c3082f4) | ![내게시물피드](https://github.com/user-attachments/assets/db1dc04e-f2ae-419d-ad01-7e210f68b904) | ![업로드](https://github.com/user-attachments/assets/4aaa6b74-d68f-42f8-8a07-bc1b66ff9dbc) | ![내게시물-상세피드](https://github.com/user-attachments/assets/1f086b23-db1d-4bef-82ee-7864968f92ad) |

| 상호작용 (댓글, 좋아요) | 그룹 가입 | 그룹 생성 | 그룹 탈퇴 |
|:---:|:---:|:---:|:---:|
| ![다른사람상세피드조회](https://github.com/user-attachments/assets/79e543bf-df2e-4f90-adf4-41c57d5fca94) | ![그룹가입](https://github.com/user-attachments/assets/cfd39f89-81d3-41ec-9fdb-5d5345c082c7) | ![그룹생성](https://github.com/user-attachments/assets/a9dd5b90-4216-47e2-9d57-62105aa2d049) | ![그룹탈퇴](https://github.com/user-attachments/assets/5d9bc9fb-9aef-401e-a596-eb04ab4b93e8) |

## 🗄 데이터베이스 설계

### ER Diagram

![ssuled-erd](https://github.com/user-attachments/assets/1386d7ae-5e6d-4b67-b010-6383580cc8ab)

## 🚀 설치 및 실행

### 사전 요구사항
- Node.js 20.x
- PostgreSQL 14+
- AWS Account (S3, EC2)

### 개발 환경 설정

1. **Repository 클론**
```bash
git clone https://github.com/SSU-LED/client.git
git clone https://github.com/SSU-LED/server.git
```

2. **Backend 설정**
```bash
cd server
npm install
cp .env.example .env
# .env 파일에 환경변수 설정
npm run start:dev
```

3. **Frontend 설정**
```bash
cd client
npm install
npm run dev
```

### API 문서
- Swagger UI: `http://localhost:3000/api/docs`
- API 명세서: [Swagger Documentation](http://13.125.191.87:7777/api/docs)

## 👥 팀 구성

<table>
<tr>
<td align="center"><strong>Role</strong></td>
<td align="center"><strong>Name</strong></td>
<td align="center"><strong>GitHub</strong></td>
<td align="center"><strong>Contribution</strong></td>
</tr>
<tr>
<td align="center"><strong>Backend</strong></td>
<td align="center">김재우</td>
<td align="center">
<a href="https://github.com/nullisdefined">
<img src="https://github.com/nullisdefined.png" width="50" height="50" style="border-radius: 50%"/>
<br/>
@nullisdefined
</a>
</td>
<td align="center">Post API, Comment API, Like API, Upload API, Group API, 인프라 구축</td>
</tr>
<tr>
<td align="center"><strong>Backend</strong></td>
<td align="center">배지영</td>
<td align="center">
<a href="https://github.com/qowldud">
<img src="https://github.com/qowldud.png" width="50" height="50" style="border-radius: 50%"/>
<br/>
@qowldud
</a>
</td>
<td align="center">OAuth API, Auth API, Rank API, Stats API</td>
</tr>
<tr>
<td align="center"><strong>Frontend</strong></td>
<td align="center">임미래</td>
<td align="center">
<a href="https://github.com/owsug">
<img src="https://github.com/owsug.png" width="50" height="50" style="border-radius: 50%"/>
<br/>
@owsug
</a>
</td>
<td align="center">Login UI, Upload UI, Home UI, My feed UI</td>
</tr>
<tr>
<td align="center"><strong>Frontend</strong></td>
<td align="center">홍지우</td>
<td align="center">
<a href="https://github.com/g4oo0">
<img src="https://github.com/g4oo0.png" width="50" height="50" style="border-radius: 50%"/>
<br/>
@g4oo0
</a>
</td>
<td align="center">Group UI, Profile UI, Statistics UI</td>
</tr>
</table>

## 📄 라이선스

[MIT LICENSE](LICENSE)

## 🔗 관련 링크

- [Live Demo](https://ounwan.site/login)
- [API Documentation](http://13.125.191.87:7777/api/docs)
- [Frontend Repository](https://github.com/SSU-LED/client)
- [Backend Repository](https://github.com/SSU-LED/server)
- [Organization](https://github.com/SSU-LED)

---

<div align="center">

*숭실대학교 소프트웨어학부 소프트웨어 프로젝트 과정*

</div>
