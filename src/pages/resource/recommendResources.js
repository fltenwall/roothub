export const RESOURCE_LIST = [
  {
    type: 'cli',
    title: '脚手架',
    name: 'Rh.Js',
    description: 'Rh 工程化项目，常用命令行工具，现只有 create 命令创建工程模板。',
    tags: ['脚手架'],
    img: '',
    previewUrl: 'https://github.com/RootLinkFE/rh.js/blob/master/README.md',
    path: 'https://github.com/RootLinkFE/rh.js',
    script: [{ title: '全局安装', command: 'npm i -g @roothub/cli' }]
  },
  {
    type: 'tool',
    title: 'VSCode插件',
    name: 'RootHub前端研发平台',
    description: 'RootHub VSCode 插件',
    tags: ['React', 'TypeScript', 'VSCode'],
    img: '',
    previewUrl: 'https://marketplace.visualstudio.com/items?itemName=giscafer.roothub',
    path: 'https://github.com/RootLinkFE/vscode-roothub',
    script: ''
  },
  {
    type: 'templates',
    title: '模板',
    name: 'rh-template-react',
    description: '技术栈：基于 Umi 搭建 React + TypeScript + Antd',
    tags: ['React', 'TypeScript', 'ant-design-vue'],
    img: '',
    previewUrl: 'http://umi.leekhub.com/',
    path: 'https://github.com/RootLinkFE/rh-template-react-umi',
    script: ''
  },
  {
    type: 'templates',
    title: '模板',
    name: 'react-native-template',
    description: 'React Native 开发脚手架',
    tags: ['React', 'TypeScript', 'ant-design-vue'],
    img: '',
    previewUrl: 'https://github.com/RootLinkFE/react-native-template/',
    path: 'https://github.com/RootLinkFE/react-native-template',
    script: ''
  },
  {
    type: 'templates',
    title: '模板',
    name: 'rh-template-vue',
    description:
      '利用 vue-cli 的插件，生成项目配置。支持引入 ant-design-vue (配置了 babel-plugin-imports ，无需再额外配置)，支持教育项目的子模块 Shared (需先选择 ant-design-vue)， 支持引入 DLL，支持图片转 Base64',
    tags: ['Vue', 'ant-design-vue'],
    img: '',
    previewUrl: 'https://github.com/RootLinkFE/rh-template-vue/blob/master/README.md',
    path: 'https://github.com/RootLinkFE/rh-template-vue'
  },
  {
    type: 'templates',
    title: '模板',
    name: 'rh-template-vue-admin',
    description: '来源github PanJiaChen/vue-element-admin',
    tags: ['Vue', 'element-ui'],
    img: '',
    previewUrl: 'https://github.com/RootLinkFE/rh-template-vue-admin/blob/master/README.md',
    path: 'https://github.com/RootLinkFE/rh-template-vue-admin'
  },
  {
    type: 'templates',
    title: '模板',
    name: 'rh-template-miniprogram-taro',
    description: 'Taro + taroify + DVA',
    tags: ['小程序', 'Taro'],
    img: '',
    previewUrl: 'https://github.com/RootLinkFE/rh-template-miniprogram-taro/blob/master/README.md',
    path: 'https://github.com/RootLinkFE/rh-template-miniprogram-taro'
  },
  {
    type: 'solution',
    title: '客服IM',
    name: 'Rh-Chat',
    description:
      'RhChat 项目是由 React + Ant Design 组件构建的网页 IM 框架，所有功能都均由插件的形式装载进框架中，方便、易容、快速扩展是框架的特性。',
    tags: ['React', 'ant-design-react'],
    img: 'rh-chat.png',
    previewUrl: 'http://101.42.111.76/devops-project-rp/file/rh-chat/UI/20210426182145/docs/index.html',
    path: 'https://github.com/RootLinkFE/rh-chat',
    script: [{ command: 'npm i rh-chat' }]
  }
]
