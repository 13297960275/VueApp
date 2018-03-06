import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store= new Vuex.Store({
	state:{

           goodsList:[
              {
                id:1,
                url:'',
                title:'waHaHa',
                number:5,
                stock:'henhao',
                price:2.5,
                select:false,
              },
              {
                id:2,
                url:'',
                title:'AD钙奶',
                number:10,
                stock:'henhao',
                price:3,
                select:false,
              },
              {
                id:3,
                title:'小龙人',
                number:5,
                stock:'henhao',
                price:5,
                select:false,
              }
           ]
		// goodsList:localStorage["goodsList"]?JSON.parse(localStorage["goodsList"]): []  
	},
	getters:{
		sum:state=>{
			var total=0;
            state.goodsList.forEach((item)=>{
                if(item.select){
                    total+=item.price*item.number
                }             
            })
            return total
		},
		goddsNumber:state=>{
			return state.goodsList.length
		}
	},
	mutations:{
		addGoods:(state,data)=>{
			state.goodsList.push(data);
			localStorage.setItem("goodsList",JSON.stringify(state.goodsList));						
		},
		deleteGoods(state,index){
			state.goodsList.splice(index,1);		
			localStorage.setItem("goodsList",JSON.stringify(state.goodsList));
		},
		updateGoods(state,data){
			const {index,key,value}=data;
			state.goodsList[index][key]=value;	
			localStorage.setItem("goodsList",JSON.stringify(state.goodsList));
		}
	}
})