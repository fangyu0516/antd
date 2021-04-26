// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  mock:false,
  // history: { type: 'hash' },
  hash: true,
  antd: {
    // dark: true,
  },
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 210,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  //hashHistory 使用如 https://cdn.com/#/users/123 这样的 URL，取井号后面的字符作为路径。
  //browserHistory 则直接使用 https://cdn.com/users/123 这样的 URL。
  //使用 hashHistory 时浏览器访问到的始终都是根目录下 index.html。
  //使用 browserHistory 则需要服务器做好处理 URL 的准备，处理应用启动最初的 / 这样的请求应该没问题，但当用户来回跳转并在 /users/123 刷新时，
  //服务器就会收到来自 /users/123 的请求，这时你需要配置服务器能处理这个 URL 返回正确的 index.html，否则就会出现 404 找不到该页面的情况。
  //如果没有对服务器端的控制权限，建议在配置中开启 exportStatic，这样编译后的 dist 目录会对每一个路由都生成一个 index.html，从而每个路由都能支持 deeplink 直接访问。强烈推荐使用默认的 browserHistory。
  exportStatic: {},
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },

  // openAPI: [
  //   {
  //     requestLibPath: "import { request } from 'umi'",
  //     // 或者使用在线的版本
  //     // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
  //     schemaPath: join(__dirname, 'oneapi.json'),
  //     mock: false,
  //   },
  //   {
  //     requestLibPath: "import { request } from 'umi'",
  //     schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
  //     projectName: 'swagger',
  //   },
  // ],
});
