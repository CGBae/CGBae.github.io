# Bae Cheolgyu — Robot Software Portfolio

로봇 소프트웨어 프로젝트를 빠르게 훑고 상세 기술 페이지로 들어갈 수 있도록 만든
Astro 정적 포트폴리오 초안입니다. 프로젝트 기술 내용은 제공된 임시 설명만 사용했으며,
확인되지 않은 구현·성과·개인 기여는 placeholder로 남겨 두었습니다.

## Local development

Node.js 24와 npm을 권장합니다.

```bash
npm install
npm run dev
```

기본 개발 주소는 `http://localhost:4321`입니다.

검사와 빌드:

```bash
npm run check
npm run build
npm run check:links
```

한 번에 모두 실행하려면 `npm run verify`를 사용합니다. 정적 결과는 `dist/`에 생성됩니다.

## Routes

- `/`
- `/about/`
- `/projects/turtlebot4/`
- `/projects/automatic-fueling/`
- `/projects/dume/`
- `/projects/palpa/`

실제 이력서가 없으므로 가짜 `resume.pdf`는 생성하지 않았습니다. 현재 Resume 메뉴는
`/about/#resume`의 안내로 이동합니다.

## GitHub Pages — 최종 주소 `https://CGBae.github.io/`

요청한 최종 주소를 사용하려면 GitHub 사용자명이 `CGBae`이고, 원격 저장소 이름을
정확히 `CGBae.github.io`로 만들어야 합니다. 이 방식에서는 Astro `base`가 `/`입니다.

1. GitHub에 `CGBae.github.io` 저장소를 만듭니다.
2. 이 폴더의 내용을 저장소 루트에 push합니다.
3. 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로
   설정합니다.
4. `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 검사, 빌드, 내부 링크
   검증 후 Pages에 배포합니다.

`astro.config.mjs`는 Actions의 `GITHUB_REPOSITORY`를 읽습니다. 저장소명이
`.github.io`로 끝나면 자동으로 사용자 사이트로 판단하여 base `/`를 사용합니다.

> GitHub Pages 주소의 도메인은 대소문자를 구분하지 않습니다. 브라우저나 GitHub UI에서
> `cgbae.github.io`처럼 소문자로 보이더라도 같은 주소입니다. 올바른 도메인은
> `github.io`이며 `gihub.io`는 오타입니다.

## 프로젝트 사이트 방식과의 차이

저장소 이름을 예를 들어 `baecheolgyu`로 만들면 주소는
`https://CGBae.github.io/baecheolgyu/`가 됩니다. Actions에서는 저장소명을 읽어 base를
자동으로 `/baecheolgyu`로 설정합니다. 내부 링크와 정적 자산은 모두 `withBase()`를
통과하므로 두 방식에서 경로가 유지됩니다.

로컬에서 프로젝트 사이트 빌드를 미리 확인하려면 PowerShell에서:

```powershell
$env:PUBLIC_SITE_URL='https://CGBae.github.io'
$env:PUBLIC_BASE_PATH='/baecheolgyu'
npm run verify
Remove-Item Env:PUBLIC_SITE_URL
Remove-Item Env:PUBLIC_BASE_PATH
```

환경변수는 자동 추론 값을 명시적으로 덮어쓸 때만 필요합니다. 예시는 `.env.example`에도
있습니다.

## Project assets

초안에는 기존 로봇 프로젝트의 이미지나 대용량 영상을 복사하지 않았습니다.

- 일반 정적 이미지: `public/images/projects/`에 웹용 압축본을 추가
- Astro 최적화 이미지: `src/assets/`에 추가하고 `ImageMetadata`로 import
- 짧은 웹용 영상: `public/video/` 또는 별도 호스팅 사용
- 홈/상세 자산 설정: `src/data/projects.ts`
- 렌더링 방식: `src/components/MediaFrame.astro`

`MediaFrame`은 placeholder, 정적/최적화 이미지, 사용자 재생 방식의 HTML video,
responsive sizing, alt, 고정 aspect ratio와 `object-fit`을 지원합니다. 대용량 원본 영상은
저장소에 넣지 않습니다.

## Resume, GitHub, Email

- Resume: 실제 파일을 `public/resume.pdf`에 추가한 뒤 `src/data/site.ts`의
  `resumePath`를 `'/resume.pdf'`로 변경
- GitHub: `src/data/site.ts`의 `githubUrl`, `githubLabel` 수정
- Email: `src/data/site.ts`의 `email`을 실제 주소로 변경

현재 GitHub는 요청에 따라 `https://github.com/CGBae`로 설정했습니다. Email, Education,
프로젝트별 공개 저장소와 Resume는 `[사용자 확인 필요]` 상태입니다.

## Applying project analysis documents

프로젝트별 `project-page-spec.md`는 다음 위치에 둡니다.

```text
docs/portfolio-source/<project-slug>/project-page-spec.md
```

세부 규칙은 `docs/portfolio-source/README.md`에 있습니다. 문서를 받은 뒤:

1. `src/data/projects.ts`의 Home 카피와 미디어 설정을 실제 정보로 교체합니다.
2. 대응하는 `src/pages/projects/*.astro`의 Role, 질문, 콘텐츠 slot을 교체합니다.
3. 프로젝트마다 분석 결과에 맞는 별도 섹션 구조를 만듭니다.
4. 실제 결과, Demo, GitHub 링크는 근거와 공개 가능 여부를 확인한 뒤 추가합니다.

## Design notes

색상은 warm white, deep ink, neutral gray, copper, light divider 다섯 가지로 제한했습니다.
둥근 카드, drop shadow, glassmorphism, 기술 로고 그리드와 skill meter를 사용하지 않았고,
각 프로젝트는 Home에서 한 행 전체를 사용합니다. 모션은 첫 화면의 짧은 진입 효과만
사용하며 `prefers-reduced-motion`에서 제거됩니다.
