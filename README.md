# v-drag

> Vue 拖拽指令, 针对移动端可快速设置任意元素可以自由拖拽移动

### 安装 Installation

添加 v-drag 到你的项目

```bash
npm install v-drag
```

... or yarn

```bash
yarn add v-drag
```

### 使用方式 Basic Usage

Vue 插件形式安装

```js
import vDrag from "v-drag";

Vue.use(vDrag);
```

可在任意元素上添加指令, 默认为随意拖拽

```html
<div v-drag></div>
```

可根据需要设置锁定移动方向

```html
<div v-drag-x></div>
<div v-drag-y></div>
```

或者使用命令参数形式

```html
<div v-drag:x></div>
<div v-drag:y></div>
```
