1.自定义指令
自定义指令有全局注册和局部注册两种方式，区别是把component
换成了directive。
- 钩子函数
指令定义函数提供了几个钩子函数：
bind:只调用一次，指令第一次绑定到元素时调用，这个钩子函数
可以定义一个在绑定时执行一次的初始化动作。
inserted：被绑定的元素插入父节点时调用这个父节点可以不存在
与DOM中。
update：被绑定的元素所在模板更新时调用，不论绑定值是否变化。
通过比较更新前后的绑定值，可以忽略不必要的模板更新。
componentUpdated:被绑定元素所在模板完成一次更新周期时调用。
unbind：只调用一次，指令与元素解绑时调用。
- 钩子函数的参数
el：指令所绑定的元素，可以用来直接操作DOM。
binding：一个对象，包含以下属性。
**name:指令名，不包括v-前缀
**value:指令的绑定值，例如v-custdir="1+1",value的值是2
**oldValue:指令绑定的前一个值，仅在update和componentUpdated
钩子中可用，无论值是否改变都可用。
**expression：绑定值的表达式形式。例如v-custdir="1+1",expression
的值是“1+1”。
**arg:传给指令的参数。例如v-custdir:foo="1+1",arg的值是“foo”。
**modifiers：一个包含修饰符的对象。例如v-custdir.foo.bar="1+1",
修饰符对象为{foo:true，bar:true}。
vnode:Vue编译生成的虚拟节点。
oldVnode:上一个虚拟节点，仅在update和componentUpdated钩子中使用。
自定义一个虚拟节点：
Vue.directive('custdir',{
	inserted:function(el,binding){
		el.innerHTML="<div>我是自定义指令</div>"
		console.log(binding.name+'--'+binding.value)
	}
});
2.render函数
- 当组件的template比较复杂时，可以定义在html中，用template标签包裹，
在template标签中只能有一个直接子节点，template一般有id属性，在
组件实例中的template属性设置为该id值。
<template id="tem">
	<div>
		<h1><slot>我是组件分发内容<slot></h1>
	</div>
</template>	

Vue.component('my-component',{
	template:'#tem'
})
- 使用render函数定义组件
Vue.component('my-component',{
	//createElement是Vue定义的函数，名称不可更改
	//createElement函数返回一个vnode
	//createElement函数的第一个参数不可省略，第二、三个参数可以省略
	//第一个参数可以是String类型，对象类型或者传入一个函数调用，该函数返回一个String或对象
	//第二个参数必须是一个对象，其中的常用属性有class、style、domProps、attrs以及on
	//第三个参数是虚拟节点的子元素，可以是String类型或Array,Array中一般是createElement返回的虚拟节点。
	render:function(createElement){
		var _this=this
		//第一个参数是字符串
		return createElement('div',{
			class:{
				bgRed:true,
				colorRed:true
			},
			attrs:{
				id:'box',
				title:"我是父元素"
			},
			domProps:{
				innerHTML:'' //空字符替换子元素
			},
			on:{
				click:function(){
					//这里的this指向window，所以用_this
					alert("hello")
				}
			}
		},'<span>我是子元素</span>')
	}
	//第一个参数是对象
	render:function(createElement){
		return createElement({
			template:"<div>我是div</div>"
		})
	}
	//第一个参数是函数调用,第三个参数是数组
	render:function(createElement){
		return createElement(setTem(),[
			createElement('div','我是div1'),
			createElement('div','我是div2'),
			createElement('div','我是div3')
		])
	},

	methods:{
		setTem:function(){
			return {
				template:"<div>我是div</div>"
			}
		}
	}
})
- this.$slots在render函数中的应用
createElement返回的就是vnode，它的第三个参数可以是数组
例如this.$slots.header返回的就是一个vnode数组，因此可以
作为createElement的第三个参数。
this.$slots.default//返回的是不具名插槽的vnode数组
- 作用域插槽在render函数中的使用
Vue.component('my-component',{
	render:function(createElement){
		//向不具名插槽中传递数据
		return createElement('div',this.$scopedSlots.default({
			text:'我是子组件传递的数据'，
			msg:"我是message"
		}))
	}
})
- 函数化组件的应用
函数化组件是无状态无实例的，所谓的无实例是指this并不指向当前
组件实例对象，而是指向window,函数化组件可以提供render函数
context参数获取组件、父组件、子组件的数据
代码示例：
Vue.component('my-component',{
	render:function(createElement,context){
		//context.parent 获取父组件实例对象
		//context.props 获取当前子组件的props数据
		//context.children 获取当前子组件的所有子组件对象集合
		return createElement('div',context.props.msg)
	},
	props:['msg']
})
3.使用vue-cli脚手架一键搭建工程
### 安装淘宝npm镜像，提高包下载速率
> npm install -g cnpm --registry=https://registry.npm.taobao.org
### 搭建vue工程五步走
**全局安装vue-cli**
> npm install -g vue-cli
**使用一下命令初始化一个项目**
> vue init webpack my-project
这个命令会在当前目录下创建一个my-project的目录作为工程目录
**进入项目**
> cd my-project
**安装依赖**
> npm install
**启动项目**
npm run dev
### 项目目录结构分析
```
|---build //项目构建（webpack）相关文件 9个 
||--build.js  //生产环境构建代码
||--check-versions.js //检查node&npm等版本
||--dev-client.js //热加载相关
||--dev-sever.js //构建本地服务器
||--utils.js //构建配置公用工具
||--vue-loader.conf.js //vue加载器
||--webpack.base.conf.js //webpack基础环境配置
||--webpack.dev.conf.js //webpack开发环境配置
||--webpack.prod.conf.js //webpack生产环境配置

|---config //项目开发环境配置相关文件 3个
||--dev.env.js //开发环境变量
||--index.js //项目一些配置变量
||--prod.env.js //生产环境变量

|---node_modules //项目依赖的模块
||--...

|---src //项目源码目录文件 5个
||--assets //资源目录
||--logo.png
||--components //vue公共组件
||--hello.vue //组件示例文件
||--router //前端路由
||--index.js //路由配置文件
||--App.vue //页面入口文件（根组件）
||--main.js //程序入口文件（入口js文件）

|---static //静态资源目录，存放图片，json数据等
||--.gitkeep

|---.babelrc //ES6语法编译配置
|---.eidtorconfig //定义代码格式
|---.gitignore //git上传忽略文件配置
|---index.html //入口页面
|---package.json //项目依赖版本信息
|---README.md //项目说明文件
```