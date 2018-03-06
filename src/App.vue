<template>
    <div id="app">
    	<keep-alive exclude="classify">
    	<!-- 
    	keep-alive:Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM
			include: 字符串或正则表达式。只有匹配的组件会被缓存。
			exclude: 字符串或正则表达式。任何匹配的组件都不会被缓存。 
    	-->
    		 <router-view></router-view>
    	</keep-alive>    
    </div>
</template>

<script>

</script>


<style lang="scss">

@import './base/css/normalize.scss';
@import url('//at.alicdn.com/t/font_342152_sf25eoela9f9lik9.css');
body{
	background: #f1f8f7;
	#app{
		background: #fff;
		height:100%;
		font-family: Microsoft YaHei;
	}	

	.swiper-pagination-bullet{
		width:8px;
		height:8px;
		[data-dpr="2"] & {
	    	width:16px;
			height:16px;
	    }
	    [data-dpr="3"] & {
         	width:24px;
     		height:24px;
	    }
	}
}


</style>
