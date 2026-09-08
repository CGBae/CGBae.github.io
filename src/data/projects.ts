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
  period: string;
  role: string;
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
    period: '2026.06.30 — 2026.07.14',
    role: 'ROS2 인터페이스 통합, 추론 결과의 제어 연결, 몰이 구현 지원 및 실기기 통합 검증',
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
    period: '2026.06.15 — 2026.06.29',
    role: 'ArUco 마커 기반 주유구 위치 지정, waypoint 목표점을 통한 노즐 삽입 경로 생성 및 Isaac Sim 시뮬레이션 환경 구성',
    title: 'Automatic Fueling Robot',
    shortTitle: 'Automatic Fueling Robot',
    homeTitle: ['Automatic', 'Fueling Robot'],
    category: 'ROBOT MANIPULATION SIMULATION',
    subtitle: ['ArUco', 'Cartesian Waypoint', 'RMPFlow', 'Isaac Sim'],
    description:
      'ArUco 마커로 주유구 위치를 지정하고 waypoint 목표점으로 노즐 삽입 경로를 생성했습니다. Isaac Sim 환경을 구성해 두 로봇의 자동 주유 동작을 팀 시연으로 연결했습니다.',
    visualDirection: 'ArUco 목표점에서 노즐 동작까지 · Isaac Sim 팀 시연',
    futureQuestion:
      '카메라의 목표점은 어떻게 로봇의 위치 명령이 되었는가?',
    asset: {
      kind: 'image',
      src: '/projects/automatic-fueling-robot/home-nozzle-poster.webp',
      fit: 'contain',
      alt: '최종 팀 시연에서 차량 주유구와 노즐을 함께 보여주는 Isaac Sim 화면',
      label: 'AUTOMATIC FUELING / FINAL SIMULATION',
      aspectRatio: 'landscape',
    },
  },
  {
    number: '03',
    slug: 'dume',
    period: '2026.07.30 — 2026.08.13',
    role: '조립 지원 인터페이스·VLM 조립 검증 및 로봇 스킬 연동',
    title: 'DUM-E',
    shortTitle: 'DUM-E',
    homeTitle: ['DUM-E'],
    category: 'ASSEMBLY ASSISTANCE · ROBOT INTERFACE',
    subtitle: ['Task State', 'Multimodal Inspection', 'ROS2'],
    description:
      '매뉴얼·작업 상태·카메라를 연결한 조립 보조 시스템입니다. 조립 지원 인터페이스, VLM 조립 검증과 로봇 스킬 연동을 담당했습니다.',
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
    period: '2026.07.15 — 2026.07.29',
    role: '두산 로봇팔 티칭펜던트 웹 구현 및 공 분류·주문 포장 과정의 자연스러운 연속 동작 구현',
    title: 'PALPA',
    shortTitle: 'PALPA',
    homeTitle: ['PALPA'],
    category: 'HUMAN-ROBOT CONTROL',
    subtitle: ['Teaching Pendant', 'Waypoint', 'Motion Chaining'],
    description:
      '공 분류·주문 포장을 수행하는 협동로봇 프로젝트입니다. 두산 로봇팔 티칭펜던트를 웹으로 구현하고, 작업 중 움직임이 자연스럽게 이어지도록 연속 동작을 구현했습니다.',
    visualDirection: '실제 협동로봇 시연 · 웹 티칭 · 비동기 이동 연결',
    futureQuestion:
      '웹에서 만든 조작을 어떻게 실제 로봇 명령과 연속 이동으로 연결했는가?',
    asset: {
      kind: 'image',
      src: '/projects/palpa/palpa-demo-poster.webp',
      fit: 'contain',
      alt: '공 슬롯과 포장통, 웹 운용 화면 옆에서 작업하는 PALPA Doosan 협동로봇',
      label: 'PALPA / HUMAN TO ROBOT MOTION',
      aspectRatio: 'landscape',
    },
  },
];

export const projectBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<ProjectSlug, Project>;
