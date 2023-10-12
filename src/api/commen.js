export default {
    install(Vue,options){
  　　Vue.prototype.getFoot=function(){
        console.log(window.innerHeight)
        
      }
    }
}