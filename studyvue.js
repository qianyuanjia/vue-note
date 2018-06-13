1.每一个vue实例需要绑定一个DOM对象作为作用域的根节点。
<div id="app"></div>
var app=new Vue({
	el:"#app",//这里的值可以是任意css选择器
	data:{
		msg:"hello world",
		num:0
		... //定义数据
	}，
	methods:{
		function increase(){
			this.num++
		}
		... //定义方法
	}
});

2.如果要访问实例的属性，可以用如下的形式
console.log(app.$el) //打印出实例挂载的DOM对象
console.log(app.$data) //打印出实例的数据
3.data的属性是直接绑定在实例对象上的，因此访问data中的数据
可以直接这样做：
console.log(app.msg)//data中数据直接绑定在实例上
4.怎样理解Vue的生命周期钩子
当我们使用jQuery的时候，有一个$(document).ready()方法，
这个方法的意思是当DOM文档加载完毕的时候，再执行我们的jQuery
函数，在Vue中，也有一些类似的函数，我们把它们叫做生命周期钩子，
用它们可以指定在Vue实例初始化过程的什么阶段执行什么操作。
*********************************************
created:实例创建完成，还未挂载到DOM元素上的时候调用，
当需要初始化一些数据的时候比较有用。
mounted:实例创建完成并且已经挂载到DOM元素上的时候调用，
一般我们的第一个业务逻辑会在这里开始。
beforeDestroy:实例销毁之前调用，主要用于解绑一些事件
监听函数。
5.文本插值和表达式
- 使用{{}}双大括号是最基本的插值语法，他会自动将我们双向绑定
  的数据实时显示。
  {{msg}}
- {{}}内部可以进行简单的数学运算以及使用三元运算符，比如
  {{6+6*3}} //会显示24
  {{6>3?msg:28}} //会显示msg的内容
- 值得注意的是，文本插值只支持单个表达式，不支持语句和流
  控制，比如下面这种写法会导致编译错误：
  {{if（6>3）{msg}}} //报错
6.过滤器使用串联以及传参
使用方法：在{{date | filter1(arg2,arg3...) | filter2 | ...}}
插值的尾部添加一个”|“管道符以及过滤器的名字对数据进行过滤，经常用于格式
化文本，比如字母大小写转换，货币千位逗号分隔等。数据库数据映射，比如返回
1就显示苹果。过滤的规则支持自定义，通过给Vue实例添加选项filters来设置。
7.指令和事件
指令是Vue模板中最常用的一项功能，它带有前缀v-,能帮助我们
快速完成DOM操作，循环渲染，显示和隐藏等。
***********************************************
- v-text和{{}}功能类似，都是用来解析文本并插入到DOM中，用法：
  <span v-text="msg"></span>等价于<span>{{msg}}</span>
- v-html可以解析html，类似于js中的innerHTML API，可以将 
  符合html语法的字符串解析成DOM并插入文档中。
- v-bind的基本用途是动态更新HTML元素上的属性，比如id、class
  等。如果是写死的属性就不必要用v-bind绑定了。
  它有一个语法糖，写法：
  <div :class="className"></div>
- v-on是用来绑定事件监听器的，比较特殊的是事件支持传参，比如
  <div v-on:click="increase(3)"></div>
  它有一个语法糖，写法：
  <div @click="increase"></div>
8.计算属性
当在视图{{}}中的表达式逻辑太过复杂时，会变得臃肿和难以维护，这时
可以通过计算属性解决。计算属性写法
<div id="app">
	<span>{{text}}</span> 
	<span>{{text.split(",").reverse().join(",")}}</span>  //在插入文本中书写逻辑解决
	<span>{{reverseText}}</span> //通过计算属性解决，逻辑写在计算属性定义中
	<span>{{fullName}}</span>  //默认调用计算属性的getter
</div>

var app=new Vue({
	el:"#app",
	data:{
		text:"123,456,789", //需求:将这个字符串转换为789,456,123
		firstName:"Mosi",
		lastName:"Qi"
	},
	//计算属性定义
	computed:{
		reverseText:function(){
			return this.text.split(",").reverse().join(",")
		},
		 fullName: {
             // getter
             get: function() {
                 return this.firstName + ' ' + this.lastName
             },
             // setter
             set: function(newValue) {
                 var names = newValue.split(' ')
                 this.firstName = names[0]
                 this.lastName = names[names.length - 1]
             }
         }
	}
});
//计算属性的setter 调用
app.fullName="Jack Chen"; //直接给计算属性赋值
此时，{{fullName}} //为"Jack Chen"

在一个计算属性中可以完成复杂的逻辑，包括运算、函数调用等，只要
最终返回一个结果就可以。计算属性还可以依赖多个Vue实例的数据，只要
其中任意数据变化，计算属性就会重新执行，视图也会更新。
每一个计算属性都包含一个getter和一个setter，我们一般都是使用计算属性
的getter获取数据，有时，你也可以提供一个setter函数，当手动修改计算属
性的值就像修改一个普通数据那样时，就会重发setter函数，执行一些自定义
的操作。
计算属性中的函数和data中的属性一样，都是直接绑定Vue实例上的，因此可以
用app.reverseText调用，并且计算属性能够实现的逻辑通过在methods声明
方法同样能够解决，它们之间的不同之处在于计算属性是基于它们的依赖进行缓
存的，也就是说当计算属性所依赖的data中属性没有发生变化时，每次访问这个
计算属性它不需要重新执行计算属性中的逻辑更新数据，而是直接从缓存中读取，
但是利用method代替的话，不管依赖的属性有没有发生变化，每次访问这个
method都需要重新计算,也就是不需要缓存。

**如果是调用方法，只要页面重新渲染，方法就会重新执行，没有渲染，就不需要
重新执行。
计算属性：不管渲染还是不渲染，只要计算属性依赖的数据未发生变化，就永远不变。
使用计算属性还是methods取决于你是否需要缓存，当遍历大量数据和做大量计算
时，应当使用计算属性，以避免频繁执行复杂操作，降低Web性能。
**计算属性不能传参，只能通过依赖的属性做出相应的变化，想要根据外部参数灵活
地返回值，就使用methods来做。
9.v-bind绑定class的三种方法
- 对象语法，键是类名，只是bool
- 绑定class数组语法，数组中的元素是类名
- 数组和对象混用绑定class
  <style>
  	.divStyle{
  		background:red;
  		height:100px;
  		width:100px;
  	}
  </style>
  <div id="app">
  	<!--对象语法绑定-->
  	<div :class="{divStyle:isActive}"></div>
  	<div :class="[class1,class2]"><div>
  	<div :class="[{class1:isActive},class2]"></div>
  </div>
  var app=new Vue({
  	el:"#app",
  	data:{
  		isActive:true,
  		class1:"borderStyle",
  		class2:"divStyle"
  	}
  });
**当class的表达式过长或逻辑过于复杂时，还可以绑定一个
  计算属性，一般当条件多于两个时，都可以使用data或computed。
10.绑定内联样式
使用v-bind:style可以给元素绑定内联样式，方法与:class类似，
也有对象语法和数组语法，数组语法用的很少。
注意：CSS属性名可以使用驼峰式语法或者短横线分隔命名。
应用多个样式对象时，可以使用数组语法，在实际业务中，style的
数组语法并不常用，较为常用的是计算属性。
使用较新的css3属性名称时，Vue.js会自动加上前缀，无需手动添加。
<div id="app">
 	<div :style="{color:fontColor,fontSize:fontSize}"></div>
  </div>
  var app=new Vue({
  	el:"#app",
  	data:{
  		fontColor:"red",
  		fontSize:"16px"
  	}
  });