let initRotateX = 335;
let initRotateY = 25;
let initRotateZ = 0;

function bindDrag() {
  let changeFlag = 0;
  var drag = document.getElementById("drag");
  drag.style.transform = `rotateY(${initRotateY}deg) rotateX(${initRotateX}deg) rotateZ(${initRotateZ}deg)`;
  // //点击某物体时，用drag对象即可，move和up是全局区域，
  // 也就是整个文档通用，应该使用document对象而不是drag对象(否则，采用drag对象时物体只能往右方或下方移动)
  drag.onmousedown = function (event) {
    var event = event || window.event; //兼容IE浏览器
    var reg = /\-?[0-9]+\.?[0-9]*/g;
    var bf = drag.style.webkitTransform || "0,0";
    var arr = bf.match(reg);
    var bfX = Number(arr[1]);
    var bfY = Number(arr[0]);
    var startX = event.pageX;
    var startY = event.pageY;
    document.onmousemove = function (event) {
      var disX = event.pageX - startX;
      var disY = event.pageY - startY;
      var y = (bfY + disX + 720) % 360;
      var x;
      if (y > 90 && y < 270) {
        if (changeFlag === 0) {
          changeFlag = 1;
          bfX = bfX - disY * 2;
        }
        x = (bfX + disY + 720) % 360;
      } else {
        if (changeFlag === 1) {
          changeFlag = 0;
          bfX = bfX + disY * 2;
        }
        x = (bfX - disY + 720) % 360;
      }
      drag.style.transform = `rotateY(${y}deg) rotateX(${x}deg) rotateZ(${0}deg)`;
    };
    document.onmouseup = function (event) {
      this.onmousemove = null;
      this.onmouseup = null;
      //修复低版本ie bug
      if (typeof drag.releaseCapture != "undefined") {
        drag.releaseCapture();
      }
    };
  };
}
