import logo_android from './logos/logo_androidjava.png';
import logo_antd from './logos/logo_antd.png';
import logo_axios from './logos/logo_axios.png';
import logo_css from './logos/logo_css.png';
import logo_english from './logos/logo_english.png';
import logo_excel from './logos/logo_excel.png';
import logo_express from './logos/logo_expressjs.png';
import logo_github from './logos/logo_github.png';
import logo_html from './logos/logo_html.png';
import logo_js from './logos/logo_js.png';
import logo_node from './logos/logo_nodejs.png';
import logo_photoshop from './logos/logo_photoshop.png';
import logo_react from './logos/logo_react.png';
import logo_reactrouter from './logos/logo_reactrouter.png';
import logo_redux from './logos/logo_redux.png';
import logo_rest from './logos/logo_rest.png';
import logo_styledcomps from './logos/logo_styledcomps.png';
import logo_typescript from './logos/logo_typescript.png';

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
    icon: logo_html,
    score: 100,
    tag: 'core',
    details: ['Simply everything'],
  },
  {
    title: 'CSS',
    icon: logo_css,
    score: 100,
    tag: 'core',
    details: [
      'Flexbox',
      'Gird',
      'RWD (responsive web design)',
      'Media quires',
      'Animation',
      'SCSS',
      '...etc.',
    ],
  },
  {
    title: 'Javascript',
    icon: logo_js,
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
    icon: logo_react,
    score: 100,
    tag: 'core',
    details: [
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
    icon: logo_typescript,
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
    icon: logo_github,
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
    icon: logo_node,
    score: 50,
    tag: 'core',
    details: ['Basic modules and their usage such as HTTP, File, etc.', 'Server creation'],
  },
  {
    title: 'Android by Java',
    icon: logo_android,
    score: 80,
    tag: 'core',
    details: [
      'Android Studio',
      'Complex UI creation',
      'Various layout managers',
      'UI population using array adapters',
      'ROOM and Database management',
      'Multi-Threading and Async programming',
      '...etc.',
    ],
  },
  {
    title: 'Styled Components',
    icon: logo_styledcomps,
    score: 100,
    tag: 'aux',
    details: [
      'Creating pre-styled components',
      'Passing props to styles',
      'Coupling with CSS',
      'Keyframes and animation',
      '...etc.',
    ],
  },
  {
    title: 'Redux',
    icon: logo_redux,
    score: 60,
    tag: 'aux',
    details: ['Store', 'Reducer', 'Dispatch', '...etc. (fundamental knowledge to manage global states)'],
  },
  {
    title: 'Axios',
    icon: logo_axios,
    score: 100,
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
    icon: logo_antd,
    score: 100,
    tag: 'aux',
    details: ['Using all the power of antD prepared components'],
  },
  {
    title: 'React Router',
    icon: logo_reactrouter,
    score: 90,
    tag: 'aux',
    details: [
      'URL management in UI',
      'Familiarity with ReactRouter V6',
      'BrowserRouter,Routes switching,Navigation,etc.',
      'Params matching',
      '...etc.',
    ],
  },
  {
    title: 'Express.js',
    icon: logo_express,
    score: 50,
    tag: 'aux',
  },
  {
    title: 'Restful APIs',
    icon: logo_rest,
    score: 100,
    tag: 'aux',
    details: ['Simply all there is to know! (HTTP Verbs,their differences, status codes,...)'],
  },
  {
    title: 'English Language',
    icon: logo_english,
    score: 100,
    tag: 'misc',
  },
  {
    title: 'Microsoft Excel',
    icon: logo_excel,
    score: 100,
    tag: 'misc',
  },
  {
    title: 'Adobe Photoshop',
    icon: logo_photoshop,
    score: 100,
    tag: 'misc',
  },
];

export default skills;
