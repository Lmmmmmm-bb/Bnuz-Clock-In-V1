import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { components, plugins } from './plugins/element'

const app = createApp(App)

app.use(router)
// 按需注册组件
components.forEach(component => {
	app.component(component.name, component)
})
// 按需注册插件
plugins.forEach(plugin => {
	app.use(plugin)
})

app.mount('#app')
