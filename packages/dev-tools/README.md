# @ztc/dev-tools

## 调试流程

以监听模式启动编译。

```bash
yarn workspace @ztc/dev-tools build:watch
```

之后在另一个命令行窗口启动服务。

```bash
yarn workspace @ztc/dev-tools serve
```

查看表单渲染器效果： http://localhost:9000/

查看组件真实效果： http://localhost:9000/dev/

注意：监听到代码发生变化后只会编译，但不会刷新浏览器，需要手动刷新。

## debug-panel 组件用法

使用 zt-debug-panel 组件包裹开发的组件，如果组件需要依赖其它元素，结构比较复杂，那么只需要给组件设置 id 为 component 即可，调试面板可以自动识别。

```html
<zt-debug-panel>
  <div style="width: 300px; height: 300px">
    <zhitian-components-bar-chart
      id="component"
    ></zhitian-components-bar-chart>
  </div>
</zt-debug-panel>
```
