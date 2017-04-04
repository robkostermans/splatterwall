
var splatter = splatter || {};

splatter.canvas = document.getElementById('canvas'),
splatter.ctx = canvas.getContext('2d'),
splatter.focused = false,
splatter.clicked = false;

splatter.shadow = document.createElement('canvas'),
splatter.sctx = splatter.shadow.getContext('2d');

splatter.items = [];
splatter.mouse = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    px: 0,
    py: 0
};

splatter.options = {
    scatter: 0.5,
    gravity: 0.2,
    consistency: 0.04,
    size : 1,
    pollock: true,
    burst: true,
    shade: true
}

splatter.canvas.width = splatter.shadow.width = window.innerWidth;
splatter.canvas.height = splatter.shadow.height = window.innerHeight;
splatter.sctx.fillStyle = splatter.ctx.fillStyle = '#aa0707'; // rgba(250,0,0,0.1)'

window.addEventListener('resize',function(){
    splatter.canvas.width = splatter.shadow.width = window.innerWidth;
    splatter.canvas.height = splatter.shadow.height = window.innerHeight;
}, false);

window.addEventListener('load', function(){
    splatter.drawloop();
}, false)

splatter.drawloop = function() {
    requestAnimationFrame(splatter.drawloop);
    splatter.ctx.clearRect(0, 0, splatter.canvas.width, splatter.canvas.height)
    splatter.drawsplat(splatter.items)
}


splatter.splat = function(x, y, arr) {
    //console.log(".splat")
    for (var i = 0; i < 30; i++) {
        var s = Math.random() * Math.PI * splatter.options.size;
        var dirx = (((Math.random() < .5) ? 3 : -3) * (Math.random() * 3)) * splatter.options.scatter;
        var diry = (((Math.random() < .5) ? 3 : -3) * (Math.random() * 3)) * splatter.options.scatter;

        arr.push({
            x: x,
            y: y,
            dx: dirx + splatter.mouse.dx,
            dy: diry + splatter.mouse.dy,
            size: s
        })
    }

}

splatter.drawsplat = function(arr) {

    var i = arr.length
    while (i--) {
        var t = arr[i];
        var x = t.x,
            y = t.y,
            s = t.size;
        splatter.circle(x, y, s, splatter.ctx)

        t.dy -= splatter.options.gravity
        t.x -= t.dx
        t.y -= t.dy
        t.size -= 0.05;

        if (arr[i].size < 0.3 || Math.random() < splatter.options.consistency) {
            splatter.circle(x, y, s, splatter.sctx)
            arr.splice(i, 1)

        }

    }

    splatter.ctx.drawImage(splatter.shadow, 0, 0)    
    //sctx.drawImage(shadow, 0, 0.5)

}

splatter.circle = function(x, y, s, c) {

    c.beginPath()
    c.arc(x, y, s * 5, 0, 2 * Math.PI, false);
    c.fill()
    c.closePath()

}

splatter.receiveSplat = function(e){
        
        splatter.clicked = true;

        if (splatter.options.burst) {
            setTimeout(function () {
                splatter.clicked = false
            }, 100)
        }

        splatter.mouse.x = (Math.random() * (splatter.canvas.width)).toFixed();
        splatter.mouse.y = (Math.random() * (splatter.canvas.height)).toFixed();

        var redtone = (splatter.options.shade) ? 'rgb(' + (130 + (Math.random() * 105 | 0)) + ',0,0)' : '#aa0707';
        var randomtone = '#' + Math.floor(Math.random() * 16777215).toString(16)
        splatter.sctx.fillStyle = splatter.ctx.fillStyle = (splatter.options.pollock) ? randomtone : redtone;

        splatter.splat(splatter.mouse.x, splatter.mouse.y, splatter.items)
        //splatter.drawloop();
}
 
/*
canvas.onmousedown = function (e) {
    console.log(".onmousedown")
    if (!splatter.focused) {
        splatter.focused = true;
        splatter.drawloop();
    } else {
        splatter.clicked = true;

        if (splatter.options.burst) {
            setTimeout(function () {
                splatter.clicked = false
            }, 100)
        }

        splatter.mouse.x = e.pageX
        splatter.mouse.y = e.pageY

        var redtone = (splatter.options.shade) ? 'rgb(' + (130 + (Math.random() * 105 | 0)) + ',0,0)' : '#aa0707';
        var randomtone = '#' + Math.floor(Math.random() * 16777215).toString(16)
        splatter.sctx.fillStyle = splatter.ctx.fillStyle = (splatter.options.pollock) ? randomtone : redtone;

        splatter.splat(splatter.mouse.x, splatter.mouse.y, splatter.items)

    }


}

canvas.onmouseup = function () {

    splatter.clicked = false;
    splatter.mouse.dx = splatter.mouse.dy = 0

}

canvas.onmousemove = function (e) {

    if (splatter.clicked) {
        var distx = (splatter.mouse.px - splatter.mouse.x),
            disty = (splatter.mouse.py - splatter.mouse.y);
        splatter.mouse = {
            x: e.pageX,
            y: e.pageY,
            dx: (Math.abs(distx) > 10) ? -1 : distx,
            dy: (Math.abs(disty) > 10) ? -1 : disty,
            px: splatter.mouse.x,
            py: splatter.mouse.y
        }
        splatter.splat(splatter.mouse.x, splatter.mouse.y, splatter.items)

    }

}

window.onblur = function () {

    splatter.focused = false;

}
*/
/**
 *  RECIPES
 */

/*
CLEAR!!!!!!!!!!!!!!!!!!!!!!!
form.querySelector('.clear').onclick = function () {

    sctx.clearRect(0, 0, canvas.width, canvas.height)

}*/

/*
SAVE!!!!!!!!!!!!!!!
form.querySelector('.save').onclick = function (e) {
    
    download.href = canvas.toDataURL()
    download.style.display = 'inline'
    
}*/