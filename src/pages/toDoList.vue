<template>
    <div class="app">
        <button @click="add" class="add-btn">+</button>
        <transition-group name="slide" tag="ul" class="list-wrapper">
            <li class="list" v-for="(item, index) in lists" v-touch:swipeleft="showBtn.bind(this, index)" v-touch:swiperight="hideBtn.bind(this, index)" :key="item">
                <span class="text">{{item.text}}</span>
                <transition name="move">
                    <button class="del-btn" @click="delList(index)" v-show="item.show">删除</button>
                </transition>
            </li>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: 'toDoList',
    data () {
        return {
            lists:[
                {
                    text:'1',
                    show:true
                },
                {
                    text:'2',
                    show:true
                },
                {
                    text:'3',
                    show:true
                },
                {
                    text:'4',
                    show:true
                }
            ]
        }
    },
    computed:{

    },
    methods:{
        add(){
            return lists.push({text:'new todo',show:true});
        },
        delList(index){
            alert(index);
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../base/css/base.scss';
    .list{
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        color: #666;
        font-size: 14px;
        background: #eee;
        transition: all .4s;

        .slide-move{
            transition: transform 1s;
        }
        .slide-enter{
            transform: translate3d(-100%, 0, 0);
        }
        .slide-leave-active{
            position: absolute;
            transform: translate3d(-100%, 0, 0);
        }
        :last-child{
            margin-bottom: 0;
        }
        .del-btn{
            flex: 0 0 60px;
            border: none;
            outline: none;
            color: #fff;
            background: red;
            transition: all .4s;
            .move-enter, &.move-leave-active{
                transform: translate3d(70px, 0, 0);
            }
        }
    }
    .text{
        flex: 1;
        padding-left: 20px;
    }
</style>