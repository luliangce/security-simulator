import ElementPlus from 'element-plus'
import '../element-variables.scss'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import { App } from 'vue'

export default (app:App<Element>):void => {
  app.use(ElementPlus, { locale })
}
