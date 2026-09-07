export type ProjectSlug =
  | 'turtlebot4'
  | 'automatic-fueling'
  | 'dume'
  | 'palpa';

export interface Project {
  number: string;
  slug: ProjectSlug;
  title: string;
  shortTitle: string;
  homeTitle: string[];
  category: string;
  subtitle: string[];
  description: string;
  visualDirection: string;
  futureQuestion: string;
  asset: {
    kind: 'placeholder' | 'image' | 'video';
    src?: string;
    poster?: string;
    alt: string;
    label: string;
    aspectRatio: 'landscape' | 'wide' | 'portrait';
    fit?: 'cover' | 'contain';
  };
}

export const projects: Project[] = [
  {
    number: '01',
    slug: 'turtlebot4',
    title: 'TurtleBot4 · FarmGuard Bot',
    shortTitle: 'TurtleBot4',
    homeTitle: ['TurtleBot4', 'Autonomous Navigation'],
    category: 'AUTONOMOUS MOBILE ROBOT',
    subtitle: ['Nav2 Action', 'Homography', 'Dynamic Goal', 'ROS2'],
    description:
      '팜가드봇 — 고정 카메라의 탐지 위치를 두 TurtleBot4의 출구 기준 이동 목표로 연결한 프로젝트. ROS2 인터페이스 통합, 몰이 구현 지원과 실기기 검증에 참여했습니다.',
    visualDirection: '실내 모형 시연 · 원본 3배속 · 발췌 편집',
    futureQuestion:
      '탐지한 객체의 위치를 어떻게 로봇의 이동 Goal로 바꾸었는가?',
    asset: {
      kind: 'image',
      src: '/projects/turtlebot4/hero-poster.webp',
      fit: 'contain',
      alt: '실내 가벽과 출구 표시 사이에서 모형 목표 주변에 배치된 두 TurtleBot4',
      label: 'TURTLEBOT4 / FARMGUARD BOT',
      aspectRatio: 'landscape',
    },
  },
  {
    number: '02',
    slug: 'automatic-fueling',
    title: 'Automatic Fueling Robot',
    shortTitle: 'Automatic Fueling Robot',
    homeTitle: ['Automatic', 'Fueling Robot'],
    category: 'ROBOT MANIPULATION SIMULATION',
    subtitle: ['ArUco', 'Pose Estimation', 'Isaac Sim', 'Motion Planning'],
    description:
      '시각적으로 추정한 주유구 위치를 로봇팔의 접근·정렬·삽입 동작으로 연결하는 자동 주유 로봇 프로젝트.',
    visualDirection: 'ISAAC SIM · ROBOT ARM · ARUCO · POSE · APPROACH / ALIGNMENT / INSERTION',
    futureQuestion:
      '카메라에서 얻은 목표 Pose를 어떻게 실행 가능한 로봇팔 Motion으로 바꾸었는가?',
    asset: {
      kind: 'image',
      src: '/projects/automatic-fueling-robot/hero-nozzle-poster.webp',
      alt: 'Isaac Sim에서 로봇팔이 차량 주유구를 향해 노즐을 접근시키는 장면',
      label: 'AUTOMATIC FUELING / FINAL SIMULATION',
      aspectRatio: 'landscape',
    },
  },
  {
    number: '03',
    slug: 'dume',
    title: 'DUM-E',
    shortTitle: 'DUM-E',
    homeTitle: ['DUM-E'],
    category: 'ASSEMBLY ASSISTANCE · ROBOT INTERFACE',
    subtitle: ['Task State', 'Multimodal Inspection', 'ROS2'],
    description:
      '조립 매뉴얼의 단계별 기준과 카메라 관찰을 연결하고, 필요한 검사와 도구 전달을 로봇 동작으로 이어가는 작업 보조 시스템.',
    visualDirection: '실제 장비 시연 · 조립 검사 · 도구 전달',
    futureQuestion:
      '자연어와 매뉴얼의 정보를 어떻게 현재 작업 상황과 연결했는가?',
    asset: {
      kind: 'image',
      src: '/projects/dume/demo-highlight-poster.webp',
      fit: 'contain',
      alt: 'DUM-E 로봇이 조립 위치를 촬영하는 실제 시연과 근접 카메라 화면',
      label: 'DUM-E / ASSEMBLY ASSISTANCE',
      aspectRatio: 'landscape',
    },
  },
  {
    number: '04',
    slug: 'palpa',
    title: 'PALPA',
    shortTitle: 'PALPA',
    homeTitle: ['PALPA'],
    category: 'HUMAN-ROBOT CONTROL',
    subtitle: ['Teaching Pendant', 'Robot Control', 'Motion Quality'],
    description:
      '웹 기반 로봇 조작 인터페이스와 로봇팔 제어를 연결하고 연속 이동의 움직임 품질을 개선한 프로젝트.',
    visualDirection: 'TEACHING PENDANT · ROBOT MOTION · TRAJECTORY / WAYPOINT · BEFORE / AFTER',
    futureQuestion:
      '사용자의 조작을 어떻게 안정적인 로봇 Motion으로 변환했는가?',
    asset: {
      kind: 'placeholder',
      alt: '웹 티칭 펜던트, 로봇 이동 경로와 움직임 비교를 보여줄 이미지 자리',
      label: 'PALPA / ROBOT CONTROL ASSET',
      aspectRatio: 'landscape',
    },
  },
];

export const projectBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<ProjectSlug, Project>;
