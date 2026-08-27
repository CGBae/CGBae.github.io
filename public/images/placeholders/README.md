# Project asset placeholders

실제 프로젝트 이미지는 이 폴더에 임의로 복사하지 않았습니다.

압축한 정적 이미지를 `public/images/projects/` 아래에 추가한 뒤
`src/data/projects.ts`의 각 `asset.kind`, `asset.src`, `asset.alt` 값을 수정하세요.
Astro가 최적화할 원본 이미지는 `src/assets/`에 두고 `ImageMetadata` import를 사용하는
방식으로 `MediaFrame.astro`에 전달할 수 있습니다.
