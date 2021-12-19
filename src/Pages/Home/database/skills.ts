import { images } from '../../../media';

export type Skill = {
  title: string;
  icon?: any;
  score: number;
  details?: string[];
  tag: 'core' | 'aux' | 'misc';
};

var skills: Skill[];
skills = [
  {
    title: 'HTML',
    icon: images.logo_html,
    score: 100,
    tag: 'core',
    details: ['Simply all there is to know!'],
  },
  {
    title: 'CSS',
    icon: images.logo_css,
    score: 100,
    tag: 'core',
    details: [
      'Flexbox',
      'Gird',
      'RWD (responsive web design)',
      'Media queries',
      'Animation and transition',
      'SCSS',
      '...etc.',
    ],
  },
  {
    title: 'Javascript',
    icon: images.logo_js,
    score: 100,
    tag: 'core',
    details: [
      'ES6 syntax and features',
      'Functional programming',
      'DOM manipulation',
      'BOM controls',
      'AJAX and Fetch API',
      'Promises',
      'Async/Await',
      '...etc.',
    ],
  },
  {
    title: 'React',
    icon: images.logo_react,
    score: 100,
    tag: 'core',
    details: [
      'SPAs',
      'Class components',
      'Function components',
      'Hooks (State,Effect,layoutEffect,Ref,Context,Memo,etc.)',
      'Modular project development',
      'Stateful & Stateless components',
      'etc.',
    ],
  },
  {
    title: 'TypeScript',
    icon: images.logo_typescript,
    score: 100,
    tag: 'core',
    details: [
      'Type alias and Interface',
      'Type mapping',
      'Union and Intersection types',
      'Type assertion',
      'Literal,Optional and Readonly types',
      'nonNull assertion',
      'Generic types',
      '...etc.',
    ],
  },
  {
    title: 'Git & Github',
    icon: images.logo_git,
    score: 90,
    tag: 'core',
    details: [
      'Repository creation and management',
      'Branching',
      'Forking',
      'Staging and Commiting',
      'Pulling and Pushing',
      'Stashing',
      'Rebasing',
      'Github page',
      '...etc.',
    ],
  },
  {
    title: 'Node.js',
    icon: images.logo_nodejs,
    score: 50,
    tag: 'core',
    details: ['Basic modules and their usage such as HTTP, File, etc.', 'Server creation'],
  },
  {
    title: 'Android by Java',
    icon: images.logo_android,
    score: 80,
    tag: 'core',
    details: [
      'Android Studio',
      'Complex UI design',
      'Various layout managers',
      'UI population using array adapters',
      'ROOM and Database management',
      'Multi-Threading and Async programming',
      '...etc.',
    ],
  },
  {
    title: 'Styled Components',
    icon: images.logo_styledcomps,
    score: 100,
    tag: 'aux',
    details: [
      'Creating pre-styled components',
      'Passing props to styles',
      'Coupling with CSS',
      'Keyframes and animation',
      'Media queries',
      '...etc.',
    ],
  },
  {
    title: 'Redux',
    icon: images.logo_redux,
    score: 60,
    tag: 'aux',
    details: ['Store', 'Reducer', 'Dispatch', '...etc. (fundamental knowledge to manage global states)'],
  },
  {
    title: 'Axios',
    icon: images.logo_axios,
    score: 90,
    tag: 'aux',
    details: [
      'Stablishing data communication with server and handling request/response',
      'Setting axios config object',
      'Using axios instance',
      'Defining interceptor',
      'Error handling',
      '...etc.',
    ],
  },
  {
    title: 'Ant Design',
    icon: images.logo_antd,
    score: 100,
    tag: 'aux',
    details: ['Using all the power of antD prepared components'],
  },
  {
    title: 'React Router',
    icon: images.logo_reactrouter,
    score: 90,
    tag: 'aux',
    details: [
      'ReactRouter V6',
      'URL management in UI',
      'BrowserRouter,Routes switching,Navigation,etc.',
      'Params matching',
      '...etc.',
    ],
  },
  {
    title: 'Express.js',
    icon: images.logo_expressjs,
    score: 40,
    tag: 'aux',
    details: ['Fundamental knowledge'],
  },
  {
    title: 'Restful APIs',
    icon: images.logo_rest,
    score: 100,
    tag: 'aux',
    details: ['Simply all there is to know! (HTTP Verbs,their differences, status codes,...)'],
  },
  {
    title: '3js & \n React Three Fiber',
    icon: images.logo_3js,
    score: 20,
    tag: 'aux',
    details: ['Very basic knowledge to set up a scene, camera, geometry, etc.'],
  },
  {
    title: 'English Language',
    icon: images.logo_englishlang,
    score: 100,
    tag: 'misc',
  },
  {
    title: 'Microsoft Excel',
    icon: images.logo_excel,
    score: 100,
    tag: 'misc',
  },
  {
    title: 'Adobe Photoshop',
    icon: images.logo_photoshop,
    score: 100,
    tag: 'misc',
  },
];

export default skills;
