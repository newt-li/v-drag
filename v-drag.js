export default {
  install(Vue) {
    // Test via a getter in the options object to see
    // if the passive property is accessed
    var supportsPassive = false;
    try {
      var opts = Object.defineProperty({}, "passive", {
        get: function() {
          supportsPassive = true;
          return supportsPassive;
        }
      });
      window.addEventListener("test", null, opts);
    } catch (e) {
      console.log(e);
    }

    const drag = (el, dir) => {
      let touch, disX, disY;
      el.addEventListener(
        "touchstart",
        e => {
          if (e.touches) {
            //有可能对象在e上也有可能对象在e.touches[0]上
            touch = e.touches[0];
          } else {
            touch = e;
          }
          disX = dir == "y" ? el.offsetLeft : touch.clientX - el.offsetLeft; //鼠标位置X减去元素距离左边距离（鼠标到元素左边的距离）
          disY = dir == "x" ? el.offsetTop : touch.clientY - el.offsetTop; //鼠标位置Y减去距离顶部距离（鼠标到元素顶部的高度）
        },
        { passive: false }
      );

      el.addEventListener(
        "touchmove",
        e => {
          if (e.touches) {
            //有可能对象在e上也有可能对象在e.touches[0]上
            touch = e.touches[0];
          } else {
            touch = e;
          }
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = dir == "y" ? disX : touch.clientX - disX;
          let top = dir == "x" ? disY : touch.clientY - disY;
          if (top < 1) {
            top = 1;
          } else if (top > window.innerHeight - 120) {
            top = window.innerHeight - 120;
          }
          if (left < 1) {
            left = 1;
          } else if (left > window.innerWidth) {
            left = window.innerWidth;
          }
          //移动当前元素
          el.style.left = left + "px";
          el.style.top = top + "px";
          e.preventDefault(); // 阻止页面的滑动默认事件
        },
        { passive: false }
      );
      el.addEventListener("touchend", () => {});
    };
    Vue.directive("drag", {
      // 添加全局资源：指令/过滤器/过渡等，如 vue-touch
      inserted(el, binding) {
        /** el可以获取当前dom节点，并且进行编译，也可以操作事件 **/
        /** binding指的是一个对象，一般不用 **/
        let arg = binding.arg;
        let dir = typeof arg == "undefined" || arg == null || arg == "" ? false : arg;
        drag(el, dir);
      }
    });
    Vue.directive("drag-x", {
      inserted(el) {
        drag(el, "x");
      }
    });
    Vue.directive("drag-y", {
      inserted(el) {
        drag(el, "y");
      }
    });
  }
};
