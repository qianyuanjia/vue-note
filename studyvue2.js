1.Vue基本指令
- v-cloak 
  解决页面初始化慢导致页面闪动的问题（文本插值替换的闪动）
  v-cloak一般与display:none;配合使用
  在css中添加
  [v-cloak]:{
  	display:none;
  }
  <span v-cloak>{{msg}}</span>
- v-once
  定义它的元素或组件只渲染一次
  <span v-once>{{msg}}</span>
  无论之后msg如何变化，页面中只显示msg最初渲染的结果
2.条件渲染指令
  v-if:值为true就在DOM中添加这个元素，false就移除
  v-else:与v-if配合使用，类似于if...else...语句，
  当v-if为true就移除这个元素，v-if为false就添加显示。
  v-else-if是vue2.0之后出现的，与v-if配合使用。
  <span v-if="1>2">{{apple}}</span>
  <span v-else-if="3<4">{{banana}}</span>
  <span v-else>{{peach}}</span> //只有v-else后不跟bool值
  v-if的弊端：
  vue在渲染元素时，出于效率的考虑，会尽可能地复用已有的元素而非重
  新渲染，因此有时会有意想不到的bug，它只会渲染前后变化的元素。
  解决方法：在元素上加key属性，如果元素之间的可以不同，就不会复用
  而是重新渲染，相当于申明我们两个是不一样的，请不要把我们当一样的
  使用。
  <input type="text" name="username" key="name">
  <input type="text" name="email" key="email" >
- v-show
  v-show的用法和v-if相同，但是它们的渲染机制上存在很大的区别。
  v-if是实时渲染，值为true时就渲染并添加到DOM中，它的内容可以实时
  更新，而v-if得元素实际上总是存在于DOM中，它只改变元素的display
  属性，实现显示和隐藏的效果，它的内容不会实时更新。如果元素内容比较
  复杂，并且需要频繁显示和隐藏，就用v-show。如果元素的内容需要实时
  更新，就用v-if。
3.列表渲染指令v-for
  当需要将一个数组遍历或枚举一个对象属性并循环显示时，就会用到列表
  渲染指令。
  使用场景：
  *遍历数组
  *遍历对象
  v-for遍历数组
  <div id="app">
	  // 只需要数组的每项，不需要索引
	  <span v-for="item in items">{{item.name}}</span>
	  //需要带索引的显示
	  <span v-for="(item,idx) in items">{{idx+1}}--{{item.name}}</span>
	  //遍历对象，可以获取对象的值、键、索引（value,key,index）
	  <span v-for="(value,key,idx) in obj">第{{idx+1}}种颜色：{{key}}--{{value}}</span>
  </div>
  var app=new Vue({
  	el:#app,
  	data:{
  		items:[
			{name:"jack"},
			{name:"mike"},
			{name:"alice"}
  		],
  		obj:{
  			color1:"white",
  			color2:"black",
  			color3:"red"
  		}
  	}
  });  
  ***当通过索引改变数组某一项的值或者通过length属性改变数组的长度时，
  数组在页面上的显示内容并不会更新，也就是说这样的变化vue检测不到，但
  是通过数组的API改变数组的内容能够被vue检测到。
  --改变数组某一项解决方法：
  Vue.set(arr,index,newValue) //将数组arr索引值为index的元素的值改为newValue
  --改变数组的长度
  arr.splice(index)//删除数组索引index以及之后的元素
  arr.splice(index,0,val1,val2,val3..)//从数组索引位置index开始插入元素val1，va2...
4.修饰符
在vue中传入event对象用$event
stop：阻止事件向上冒泡
prevent：阻止默认事件
self:作用在元素本身而非子元素的时候调用，点子元素触发子元素事件，父元素事件不触发。
self运用场景：当父元素和子元素有相同类型的监听事件，在父元素事件上用self修饰符，点子元素触发子元素事件，父元素事件不触发。
once：该事件监听只执行一次，之后就不会触发了。
用法：
<button @click.stop="handle">点我阻止冒泡</button>
<a href="" @click.prevent="handle">阻止刷新页面</a>
当监听键盘事件时，可以使用修饰符监听具体的按键：
//指定的keyCode
<input type="text" @keydown.13="handle"> 
//指定键的名称，以下是vue为我们提供的：
.enter  .tab  .delete...
5.表单与v-model
v-model用于在表单类元素上双向绑定数据
注意：当用v-model进行双向绑定实例数据之后，表单控件的值只依赖于所绑定的数据，不再关心初始化时插入的value。
#单选按钮：
单个单选按钮，直接用v-bind:checked绑定一个布尔值。
如果是单选按钮组，先使得每个按钮的name属性一致，之后通过v-model绑定按钮组的值，如下：
<input type="radio" name="fruits" value="watermelon" v-model="fruitName">
<input type="radio" name="fruits" value="banana" v-model="fruitName"> //默认被选中
<input type="radio" name="fruits" value="apple" v-model="fruitName">
var app=new Vue({
	el:"#qpp",
	data:{
		fruitName:"banana"
	}
})
#复选框
单个复选框，直接v-bind:checked绑定一个布尔值。
如果是复选框组，通过v-model配合value来使用，v-model绑定一个数组，如果是其他值，就会转化为bool值，与所有复选框的checked属性相对应。
<input type="checkbox" value="watermelon" v-model="fruitArr">
<input type="checkbox" value="banana" v-model="fruitArr"> //默认被选中
<input type="checkbox" value="apple" v-model="fruitArr">
var app=new Vue({
	el:"#qpp",
	data:{
		fruitArr:[]
		//fruitArr:"banana" 字符串会自动转化为bool，相当于给所有复选框的checked属性赋值。
	}
})
#下拉菜单
如果是单选，v-model所绑定的值初始化可以为数组，也可以为字符串，但是下拉菜单最终的值只有一个。
如果是多选，v-model所绑定的值必须是一个数组，最终下拉菜单的值也是一个数组。
//单选
<select name="fruit" v-model="fruitName">
	<option value="banana">香蕉</option>
	<option value="apple">苹果</option>
	<option value="peach">桃子</option>
</select>
//多选
<select name="fruit" v-model="fruitName" multiple>
	<option value="banana">香蕉</option>
	<option value="apple">苹果</option>
	<option value="peach">桃子</option>
</select>
var app=new Vue({
	el:"#app",
	data:{
		fruitName:[]
	}
})
**总结：不管是什么类型的表单，如果是单选，初始化最好给定字符串，
	如果是多选，初始化最好给定一个数组。
v-model修饰符
lazy：只有在表单失去焦点时才更新数据。
number：将表单输入的值转换为number类型绑定在v-model数据中。
trim：将表单中输入的首尾空格去掉，再双向绑定。
6.vue组件的使用方法
- 全局注册组件，所有实例可用
  Vue.component('component-name',{
  	template:`
		<div>我是一个全局组件</div>
  	`
  });
- 局部注册组件，在某个组件中可用
var app= new Vue({
	el:"#app",
	data:{},
	components:{
		"component-name":{
			template:"<div>我是一个局部组件</div>"	
		}
	}
})
** vue组件的模板在某些情况下会受到html标签的限制，比如在
table元素中只能存在thead,tbody,tfoot等标签，如果不是，
就会在table标签之外渲染。所以在table等标签内使用组件是无效
的，此时可以使用is属性来挂载组件。
//无效，组件会渲染在table标签之外
<tabel>
	<component></component>
</tabel>
//使用is属性挂载
<table>
	<tbody is="component"></tbody>
</table>
**组件使用的注意事项
- 组件的命名必须符合一种规范，推荐使用xxx-yyy的形式进行命名，
也可以全都用小写字母的形式命名，但是不能用驼峰式命名。
- template中的内容必须被一个DOM元素包裹，可以有嵌套。
- 在组件的定义中，除了template属性外，还可以有data，computed,
methods等，和实例具有的属性差不多。
- 但是组件中的data必须是一个方法，它返回一个对象，包含组件中使用
的数据,这样做就能使得每个组件中的数据都是独立的。
var app= new Vue({
	el:"#app",
	data:{},
	components:{
		"component-name":{
			template:"<div>我是一个局部组件</div>"	,
			data:function(){
				return {
					count:0
				}
			}
		}
	}
})
8.使用props从父组件向子组件传递数据
- 在子组件中使用props接受来自父组件的数据，父组件在子组件标签上以属性的方式
传递数据，在子组件中props属性对应一个数组，数组中的元素时子组件上属性的名称，
这些属性名称对应一个传过来的数据，可以在子组件中直接使用。
- props是来自父组件的数据，子组件中的data返回的是自己的数据，这些数据的作用
域是子组件本身，可以在子组件的template，computed，methods中直接使用。
- props属性定义的形式有两种，为字符串数组以及对象形式。
- 可以使用过v-bind动态绑定父组件的数据。
9.单向数据流
通过props传递数据是单向的，也就是父组件数据变化会传递给子组件，但是反过来不行。
主要目的是为了尽可能将父子组件解耦，避免子组件无意修改了父组件的状态。
9.vue组件中camelCased(驼峰式)命名和kebab-case(短横线命名)
- 在html中，标签以及标签中的属性是不区分大小写的，因此在html中使用组件必须以短横线
命名或全小写字母命名，否则会报错。在html中不允许使用驼峰！！！
- 在组件中，父组件给子组件传递数据必须用短横线或小写字母命名，在template中，必须
使用驼峰式命名，若为短横线的命名方式，会直接报错。
- 在组件的data中，用this.XXX引用时，只能是驼峰命名方式，若为短横线的命名方式则会报错。
10.数据验证
在props中可以对父组件传递的数据进行类型验证以及自定义验证。
可以验证数据的类型，如果父组件不传值的话可以设置默认值，可以要求必须传值，
最后可以自定义验证方式。
验证的类型可以是：
String，Number,Boolean,Object,Array,Function
验证的方式：
props:{
	a:Number ,//类型千万不能加引号
	b:[Number,String], //可以允许多种类型
	c:{
		type:Boolean, //验证类型
		default:true, //设置默认值
		required:true //是否必须传值
 	},
 	d:{
 		validator:function(value){
 			return value>10
 		} //自定义验证方式
 	},
 	//如果默认值为对象类型，应该如下设置
 	e:{
 		type:Array,
 		default:function(){
 			return [1,2,3]
 		}
 	}
}
11.子组件向父组件传递数据
组件通信可以分为父子组件通信、兄弟组件通信以及跨级组件通信。
vue中子组件通过$emit出发自定义事件并向其传入参数，父组件
监听这个事件并执行事件逻辑，就拿到了子组件传递过来的数据，这
是JavaScript的一种设计模式--观察者模式。
代码实例：
<div id="app">
	我的余额：{{cash}}
	<cash-change @changecash="showCash"></cash-change>
</div>

var app=new Vue({
	el:"#app",
	data:{
		cash:2000
	},
	methods:{
		showCash:function(value){
			this.cash=value
		}
	},
	components:{
		'cash-change':{
			template:`
				<div>
					<button @click="increaseCash">+1000</button>
					<button @click="decreaseCash">-1000</button>
				</div>
			`,
			data:function(){
				return {
					cashRemain:2000
				}
			},
			methods:{
				increaseCash:function(){
					this.cashRemain+=1000
					this.$emit("changecash",this.cashRemain)
				},
				decreaseCash:function(){
					this.cashRemain-=1000
					this.$emit("changecash",this.cashRemain)
				}
			}
		}
	}
})
12.在组件中使用v-model
v-model实际上是一个语法糖，它背后做了两件事，通过v-bind给元素绑定一个
value属性，在value属性发生改变的时候出发input事件。
如果在组件上直接用v-model绑定一个父组件value属性，那么父组件会监听这个
子组件的input事件，在子组件中通过$emit主动出发input事件，并且传递一个
参数，那么绑定的父组件的value属性就会同步更新。
13.非父子组件之间的通信
通过一个bus中介来实现。
代码实例：
<div id="app">
	<a-component></a-component>
	<b-component></b-component>
</div>

//注册一个A全局组件
Vue.component('a-component',{
	template:`
		<button @click="passData">我向B组件传递数据</button>
	`,
	data:function(){
		return {
			numA:0
		}
	},
	methods:{
		passData:function(){
			this.numA++;
			this.$root.bus.$emit('aToB',this.numA)
		}
	}
})
//注册一个B全局组件
Vue.component('b-component',{
	template:'<div>{{numB}}</div>',
	data:function(){
		return {
			numB:0
		}
	},
	created:function(){
		var _this=this
		this.$root.bus.$on('aToB',function(value){
			_this.numB=value
		})
	}
})
//由于实例声明解析之后马上进行挂载，其中的组件必须在实例声明之前，
//否则挂载之后找不到组件会报错
var app=new Vue({
	el:"#app",
	data:{
		bus:new Vue() //所谓的bus中介实际上是一个空实例
	}
})
14.父子组件之间的通信
父链：在子组件中使用this.$parent可以获取父组件的实例对象
子链：在父组件中使用this.$children可以获取子组件的集合，可以
通过索引来操作某个具体的子组件对象。
由于一个父组件中一般存在多个子组件，可以对每个子组件添加ref属性
作为标记，在父组件中通过this.$refs.tag可以获取某个特定的子组件对象。
<a-component ref="tag"></a-component>
父组件实例中：
this.$refs.tag获取该子组件对象。
15.使用slot分发内容
- 什么是slot(插槽)？
为了让组件可以组合，我们需要一种方式来混合父组件内容与子组件自己的模板。
这个过程称为内容分发，vue实现了一个内容分发API，使用特殊的”slot“元素
作为原始内容的插槽。
- 插槽的用法
父组件的内容与子组件相混合，从而弥补了视图的不足。
<div id="app">
	<a-component>
		<p>我是父组件的内容</p>
	</a-component>
	<b-component>
		<h1 slot="head">我是标题</h1>
		<main>我是中间主要内容</main>
		<footer slot="foot">我是结尾</footer>
	</b-component>
</div>
Vue.component("a-component",{
	template:`
		<div>
			//不具名插槽
			<slot>
				如果父组件没有插入内容，这句话作为默认出现
			</slot>
		</div>
	`
})
Vue.component("b-component",{
	template:`
		<div>
			<div>
				//具名插槽
				<slot name="head"></slot>
			</div>
			<slot>
				所有不指定插槽的内容放进这里
			</slot>
			<div>
			    //具名插槽
				<slot name="foot"></slot>
			</div>
		</div>
	`
})
- 作用域插槽
作用域插槽是一种特殊的slot，适应一个可以复用的模板来替换
已经渲染的元素，主要是为了从子组件中获取数据。
在vue2.5.0之前，只能使用template标签作为分发内容的根元素，
在这之后的版本中就可以随意使用了。
<a-component>
    // vue2.5.0之前示例：
	<template slot-scope="prop" slot="abc">
		{{prop.text}} //可以拿到除了name属性之外的定义在具名插槽abc上的所有属性值
		{{prop.name}} //拿不到
	</template>
	// vue2.5.0之后示例：
	<p slot-scope="prop" slot="abc">
		{{prop.text}}
	</p>
<a-component>		

Vue.component("a-component",{
	template:`
		<div>
			//想要拿到text中的数据
			<slot name="abc" text="我是插槽">
				如果父组件没有插入内容，这句话作为默认出现
			</slot>
		</div>
	`
})
- 在子组件中访问插槽的方式
示例：
Vue.component("a-component",{
	template:`
		<div>
			//想要拿到text中的数据
			<slot name="abc" text="我是插槽">
				如果父组件没有插入内容，这句话作为默认出现
			</slot>
		</div>
	`,
	mounted:function(){
		var slot_abc=this.$slots.abc[0] //名称为abc的slot可能不止一个
		console.log(slot_abc.elm.innerHTML)
	}
})
- 组件的高级用法--动态组件
vue给我们提供了一个元素叫component
作用是用来动态的挂载不同的组件
实现：使用is属性来进行动态挂载。
tab切换示例：
<div id="app">
	<component :is="tabNow"></component>
	<button @click="switchTab">点我切换</button>
</div>
var app=new Vue({
	el:"#app",
	components:{
		'a-comp':{
			template:"<div>离离原上草</div>"
		},
		'b-comp':{
			template:"<div>一岁一枯荣</div>"
		},
		'c-comp':{
			template:"<div>野火烧不尽</div>"
		},
		'd-comp':{
			template:"<div>春风吹又生</div>"
		},
	},
	data:{
		tabNow:'a-comp',
		count:1
	},
	methods:{
		switchTab:function(){
      		this.count++
      		switch(this.count%4){
      			case 1: 
      				this.tabNow='a-comp';break;
  				case 2: 
  					this.tabNow='b-comp';break;
  				case 3: 
  					this.tabNow='c-comp';break;
  				case 0: 
  					this.tabNow='d-comp';break;
      		}
		}
	}
})

