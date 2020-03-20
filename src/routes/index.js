import AsyncLoadable from '@/utils/AsyncLoadable';

const Index = AsyncLoadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index'))

// 通用
const ButtonView = AsyncLoadable(() => import(/* webpackChunkName: 'button' */ '@/views/PublicView/Button'))
const IconView = AsyncLoadable(() => import(/* webpackChunkName: 'icon' */ '@/views/PublicView/Icon'))

// 导航
const DropdownView = AsyncLoadable(() => import(/* webpackChunkName: 'dropdown' */ '@/views/NavView/Dropdown'))
const MenuView = AsyncLoadable(() => import(/* webpackChunkName: 'menu' */ '@/views/NavView/Menu'))
const StepView = AsyncLoadable(() => import(/* webpackChunkName: 'step' */ '@/views/NavView/Step'))

// 表单
const FormBaseView = AsyncLoadable(() => import(/* webpackChunkName: 'formBase' */ '@/views/FormView/FormBaseView'))
const FormStepView = AsyncLoadable(() => import(/* webpackChunkName: 'formStep' */ '@/views/FormView/FormStepView'))

// 展示
const TableView = AsyncLoadable(() => import(/* webpackChunkName: 'table' */ '@/views/ShowView/Table'))
const CollapseView = AsyncLoadable(() => import(/* webpackChunkName: 'collapse' */ '@/views/ShowView/Collapse'))
const TreeView = AsyncLoadable(() => import(/* webpackChunkName: 'tree' */ '@/views/ShowView/Tree'))
const TabsView = AsyncLoadable(() => import(/* webpackChunkName: 'tabs' */ '@/views/ShowView/Tabs'))

// 其它
const ProgressView = AsyncLoadable(() => import(/* webpackChunkName: 'progress' */ '@/views/Others/Progress'))
const AnimationView = AsyncLoadable(() => import(/* webpackChunkName: 'animation' */ '@/views/Others/Animation'))
const EditorView = AsyncLoadable(() => import(/* webpackChunkName: 'editor' */ '@/views/Others/Editor'))
const UploadView = AsyncLoadable(() => import(/* webpackChunkName: 'upload' */ '@/views/Others/Upload'))

const Three = AsyncLoadable(() => import(/* webpackChunkName: 'three' */ '@/views/TestView'))
const About = AsyncLoadable(() => import(/* webpackChunkName: 'about' */ '@/views/About'))

const routes = [
    { path: '/index', exact: true, name: 'Index', component: Index, auth: [1] },
    { path: '/public/button', exact: false, name: '按钮', component: ButtonView, auth: [1] },
    { path: '/public/icon', exact: false, name: '图标', component: IconView, auth: [1] },
    { path: '/nav/dropdown', exact: false, name: '下拉菜单', component: DropdownView },
    { path: '/nav/menu', exact: false, name: '下拉菜单', component: MenuView },
    { path: '/nav/steps', exact: false, name: '步骤条', component: StepView },
    { path: '/form/base-form', exact: false, name: '表单', component: FormBaseView },
    { path: '/form/step-form', exact: false, name: '表单', component: FormStepView },
    { path: '/show/table', exact: false, name: '表格', component: TableView },
    { path: '/show/collapse', exact: false, name: '折叠面板', component: CollapseView },
    { path: '/show/tree', exact: false, name: '树形控件', component: TreeView },
    { path: '/show/tabs', exact: false, name: '选项卡', component: TabsView },
    { path: '/others/progress', exact: false, name: '进度条', component: ProgressView, auth: [1] },
    { path: '/others/animation', exact: false, name: '动画', component: AnimationView, auth: [1] },
    { path: '/others/editor', exact: false, name: '富文本', component: EditorView, auth: [1] },
    { path: '/others/upload', exact: false, name: '上传', component: UploadView, auth: [1] },
    { path: '/one/two/three', exact: false, name: '三级', component: Three },
    { path: '/about', exact: false, name: '关于', component: About, auth: [1] }
]

export default routes;
