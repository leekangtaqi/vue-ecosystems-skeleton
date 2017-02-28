<template>
  <div class="hello">
    <canvas width="800" height="600" style="border: 1px solid #dadada"></canvas>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Todo from './Todo'
import Rx from 'rxjs/Rx'

export default {
  name: 'draw',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.$nextTick(function(){
      const canvas = document.querySelector('canvas')
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      const move$ = Rx.Observable
        .fromEvent(canvas, 'mousemove')
        .map(e => ({ x: e.offsetX, y: e.offsetY }))
        .bufferCount(2, 1)

      const down$ = Rx.Observable.fromEvent(canvas, 'mousedown')  
        .map(() => 'down')
      const up$ = Rx.Observable.fromEvent(canvas, 'mouseup')  
        .map(() => 'up')

      const upAndDown$ = up$.merge(down$)  

      upAndDown$
        .switchMap(action => action === 'down' ? move$ : Rx.Observable.empty())
        .subscribe(draw)
      
      function draw ([first, sec]) {
        ctx.moveTo(first.x, first.y)
        ctx.lineTo(sec.x, sec.y)
        ctx.stroke()
      }
    })
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.filter li{
  display: inline-block;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
