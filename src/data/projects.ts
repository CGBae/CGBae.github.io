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
  };
}

export const projects: Project[] = [
  {
    number: '01',
    slug: 'turtlebot4',
    title: 'TurtleBot4 Autonomous Navigation',
    shortTitle: 'TurtleBot4',
    homeTitle: ['TurtleBot4', 'Autonomous Navigation'],
    category: 'AUTONOMOUS MOBILE ROBOT',
    subtitle: ['Nav2', 'TF2', 'Target Localization', 'ROS2'],
    description:
      '탐지한 목표의 위치를 로봇이 사용할 수 있는 좌표와 Navigation Goal로 변환해 탐색·접근·몰이·복귀 동작으로 연결한 AMR 프로젝트.',
    visualDirection: 'AMR · MAP · TARGET POSITION · PATH / GOAL · RVIZ',
    futureQuestion:
      '탐지한 객체의 위치를 어떻게 로봇의 이동 Goal로 바꾸었는가?',
    asset: {
      kind: 'placeholder',
      alt: 'TurtleBot4, 지도, 목표 위치와 이동 경로를 보여줄 이미지 자리',
      label: 'TURTLEBOT4 / NAVIGATION ASSET',
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
    category: 'AI · HUMAN-ROBOT INTERACTION',
    subtitle: ['LLM', 'Conversation', 'Manual Copilot'],
    description:
      '사용자와 자연스럽게 대화하면서 조립 매뉴얼의 작업 문맥을 바탕으로 필요한 정보를 제공하는 작업 보조 로봇 프로젝트.',
    visualDirection: 'CONVERSATION UI · ASSEMBLY MANUAL · TASK CONTEXT · WORK ASSISTANCE',
    futureQuestion:
      '자연어와 매뉴얼의 정보를 어떻게 현재 작업 상황과 연결했는가?',
    asset: {
      kind: 'placeholder',
      alt: '사용자 대화, 조립 매뉴얼과 현재 작업 문맥 화면을 보여줄 이미지 자리',
      label: 'DUM-E / COPILOT INTERFACE ASSET',
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
