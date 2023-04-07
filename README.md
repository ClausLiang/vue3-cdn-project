# vue3-cdn-project
html直接cdn引入vue3，ant-d-vue等库
ant-d-vue需要依赖dayjs所以也引用了dayjs及相关plugin

## dom里怎么使用template
dom里直接使用template会有问题，需要把template放到`<script type="x-template" id="tem">`中，这样有个缺点是代码不能高亮。

## cdn引入ant-d-vue需要处理国际化的问题
需要把antd相关国际化的脚本拷贝到本地引入项目中，并把dayjs国际化文件也拷贝到本地。

## antd起别名vueAntd
为了避免ant-d-vue跟别的库的影响，比如页面内嵌到react项目可能会跟react引的antd起冲突，可以将antd起个别名vueAntd，分别要改
1.lib/antd.min.js导出的变量名，改了两处。
2.index.html中vue use()方法中antd的名字改为vueAntd，以及vueAntd.message.error()全局方法的antd名字修改。

## 单个html没法触发路由钩子等函数，dom可以监听visibilitychange事件，当页面展示时调用相关方法
```js
document.addEventListener('visibilitychange',function(){
    if(document.visibilityState==='visible'){
        app.search()
    }
})
```
