# Bae Cheolgyu — Robot Software Portfolio

신입 로봇 소프트웨어 개발자 배철규의 포트폴리오입니다. 인식·이동·조작·인터페이스 프로젝트에서 담당한 구현과 시연, 관련 코드를 함께 소개합니다.

[포트폴리오 ↗](https://cgbae.github.io/) · [About ↗](https://cgbae.github.io/about/) · [이력서 PDF ↗](https://cgbae.github.io/bae-cheolgyu-resume.pdf) · [GitHub ↗](https://github.com/CGBae)

## 프로젝트 안내

개인 담당과 구현 근거를 먼저 확인할 수 있도록 아래 순서로 배치했습니다. 메인·About·상세 페이지의 다음 프로젝트 이동은 같은 순서를 사용합니다.

| 순서 | 프로젝트 | 중심 경험 | 원본 저장소 |
| --- | --- | --- | --- |
| 01 | [PALPA](https://cgbae.github.io/projects/palpa/) | 웹 티칭펜던트·연속 동작 | [ROKEY-Project-F2-1](https://github.com/CGBae/ROKEY-Project-F2-1) |
| 02 | [Automatic Fueling Robot](https://cgbae.github.io/projects/automatic-fueling/) | ArUco 위치·waypoint·Isaac Sim | [ROKEY-Project-F4-1-](https://github.com/CGBae/ROKEY-Project-F4-1-) |
| 03 | [DUM-E](https://cgbae.github.io/projects/dume/) | VLM 검사·작업 문맥·로봇 스킬 | [ROKEY-Project-F2-2](https://github.com/CGBae/ROKEY-Project-F2-2) |
| 04 | [TurtleBot4](https://cgbae.github.io/projects/turtlebot4/) | ROS2 통합·추론 연결·실기 검증 | [ROKEY-Project-F3-4-2](https://github.com/CGBae/ROKEY-Project-F3-4-2) |

프로젝트 본문의 구현 링크는 분석한 공개 커밋에 고정되어 있습니다. 개인 담당과 팀의 연동 대상을 구분하고, 편집 시연·시뮬레이션·미완성 기능의 범위를 해당 설명에 표시합니다.

## 로컬 개발

Node.js 24와 npm을 사용하는 Astro 정적 사이트입니다. 저장소 루트에서 npm ci로 의존성을 설치하고 npm run dev로 실행합니다. 기본 주소는 http://localhost:4321입니다.

- npm run check: Astro·TypeScript 진단
- npm run build: dist/에 정적 사이트 생성
- npm run check:links: 빌드 결과의 내부 페이지·미디어·앵커 확인
- npm run verify: 위 세 검사를 순서대로 실행

사이트 검사는 로봇 프로그램이나 실제 장비를 실행하는 시험과 별도입니다.

## 경로와 유지보수 위치

| 대상 | 위치 |
| --- | --- |
| 메인 / 프로젝트 순서·기간·역할 | [index.astro](src/pages/index.astro), [projects.ts](src/data/projects.ts) |
| About / 경험과 성장 목표 | [about.astro](src/pages/about.astro) |
| 프로젝트 상세 | [src/pages/projects/](src/pages/projects/) |
| 공통 상단·코드 링크·다음 프로젝트 | [ProjectHero](src/components/ProjectHero.astro), [ProjectCodeLinks](src/components/ProjectCodeLinks.astro), [ProjectNavigation](src/components/ProjectNavigation.astro) |
| 공개 구현 링크 | [project-sources.json](src/data/project-sources.json) |
| 연락처·이력서 경로 | [site.ts](src/data/site.ts) |
| 이력서 | [public/bae-cheolgyu-resume.pdf](public/bae-cheolgyu-resume.pdf) |
| 프로젝트 이미지·영상·자막 | [public/projects/](public/projects/) |
| 프로젝트 스타일 | [case-study.css](src/styles/case-study.css) |
| 입력 자료 규칙 | [portfolio-source 안내](docs/portfolio-source/README.md) |
| 검토 기록 | [docs/reviews/](docs/reviews/) |

웹 경로는 /, /about/, /projects/palpa/, /projects/automatic-fueling/, /projects/dume/, /projects/turtlebot4/입니다.
Resume 메뉴는 게시된 1페이지 PDF로 연결하며, About에서 PDF 열기와 다운로드를 제공합니다.

## GitHub Pages 배포

공개 주소는 https://cgbae.github.io/이며, main 브랜치에 push하면 [GitHub Actions](.github/workflows/deploy.yml)가 검사·빌드·내부 링크 확인 후 Pages에 배포합니다.

[astro.config.mjs](astro.config.mjs)는 GitHub 사용자 사이트와 프로젝트 사이트의 base 경로를 구분합니다. 별도 경로로 배포할 때는 [.env.example](.env.example)의 PUBLIC_SITE_URL·PUBLIC_BASE_PATH 설정과 [withBase](src/utils/paths.ts)를 함께 확인합니다.

## 미디어와 문서 관리

웹에는 원본 비율을 유지한 이미지, 압축 영상, 필요한 장면 설명 자막을 사용합니다. 영상은 기본 재생 컨트롤을 제공하며 자동 재생은 prefers-reduced-motion 설정을 존중합니다. 원본 대용량 자료와 로컬 검토 산출물은 웹용 파일과 구분해 관리합니다.

현재 색상과 서체를 유지하며 담당 역할·구현 이유·결과를 우선 배치하고, 세부 설정과 추가 자료는 펼쳐볼 수 있도록 구성했습니다.
