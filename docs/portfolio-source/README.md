# Portfolio content source

이 폴더는 각 로봇 프로젝트의 분석 결과를 포트폴리오 페이지로 옮기기 위한 입력
문서를 보관합니다. 현재 상세 페이지의 문장은 모두 초안 또는 placeholder입니다.

## Expected structure

```text
docs/portfolio-source/
├── turtlebot4/project-page-spec.md
├── automatic-fueling/project-page-spec.md
├── dume/project-page-spec.md
└── palpa/project-page-spec.md
```

분석 문서를 받을 때마다 해당 상세 페이지를 개별적으로 수정합니다. 네 페이지를 같은
섹션 템플릿에 맞추지 말고, 문서가 입증하는 핵심 질문과 사용 가능한 시각 자료에 따라
섹션 순서와 밀도를 결정합니다.

## Replacement checklist

1. `src/data/projects.ts`에서 Home 제목, 기술 문구, 설명, 자산 정보를 갱신합니다.
2. 해당 `src/pages/projects/*.astro`에서 Role과 `Analysis pending` 문구를 교체합니다.
3. 구현 근거, 개인 기여, 결과가 분석 문서에 있는 범위 안에서만 상세 섹션을 작성합니다.
4. Demo와 GitHub는 공개 URL과 공개 가능 여부를 확인한 뒤 링크합니다.
5. 이미지의 `alt`는 실제 장면과 전달 목적을 설명하도록 다시 작성합니다.
