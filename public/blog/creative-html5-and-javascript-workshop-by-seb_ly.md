# Creative HTML5 and JavaScript workshop by @seb_ly

This week I had the pleasure of attending Seb Lee-Delisle's [Creative HTML5 and JavaScript workshop](http://sebleedelisle.com/training/#creativejs) and even as someone who classes themselves as an expert JavaScripter (I hope!), I still learnt tons.  

<!--more-->

To me, Seb has gone through it all when he was developing for Flash years ago. Things like building 3D in a 2D environment, optimising methods and getting to know the faking techniques and tricks to make something appear awesome without turning your computer in to a smouldering wreck after the CPU melted the thing to the ground!

In my humble opinion, the "open web" community are now going through the same process with canvas and other HTML5-esque technologies.  So why not learn from what Seb and others have already been through?  This is why I wanted to attend Seb's workshop, and if he runs it again, I'd recommend you do the same if you're not familiar with visual programming techniques.

## What we built

The two day workshop broke in to segments around drawing, vectors, particles, simple 3D and using [Three.js](https://github.com/mrdoob/three.js/ "mrdoob/three.js - GitHub"). 

By the end of day one we had all the components to build a working Asteroids game. Which I glued together that evening by myself (note that most of these components are Seb's with a few of my own tweaks and glueing) - [full screen/iPad version also working online](http://rem.im/asteroid.html):

<canvas tabindex="-1" id="asteroids" height="300" width="612"></canvas>
<script src="http://remysharp.com/demo/asteroids.js"></script>

<small>Click the canvas above to focus it and control the ship to play and double click to respawn your ship.</small>

The second day we upgraded from 2D to 3D and to close the day, we asked Seb to build a 3D version of Asteroids.  Clearly he wasn't going to completely finish developing the game, but it was fun (and impressive) to see the building blocks being put together.  He got to the point where there we asteroids flying towards him, the ship was controlled by the mouse and had some eased effects to give it a more tactile feel, and he had bullets/laser beams firing at the asteroids - all very cool, and not far off a ready game:

![Seb's 3D asteroids](http://remysharp.com/images/seb-asteroids.jpg)

## Notes from the day

By way of brain dump, and so that I've got a record of the stuff I need to remember *somewhere*, here's just list of bits that I picked up throughout the day. Obviously there was tons more, but when you're coding, listening, learning and wrapping your head around trig (something that I'm quite useless at) - less notes are taken ;-)

### Canvas

- When using colours: HSL's where it's at! Here's some help: http://mothereffinghsl.com
- Remember subpixels drawing, by default you draw between pixels, Mark Pilgrim explains: http://diveintohtml5.org/canvas.html#pixel-madness
- When using `beginPath`, unless you do `moveTo` the first use of `lineTo` will actually move, and *not* draw a line, i.e. if you do a lineTo without a start, it only moves (in fact because there's no starting point).
- Rotating a canvas rotates around the origin, which by default is top, left. To move the origin of the canvas, use `translate`.
- `save`/`restore` state the drawing style *and* affects coordinate system - this useful for rotating the canvas drawing, and then resetting the rotation.

For an animation the (pseudo) code looks like this:

    var mouseX = 0, mouseY = 0, mouseDown = false, keys = {};
    setup(); // initalisation
    setInterval(loop, 1000 / 60); // 60 fps
    
    function loop() {
      // 1. handle key or mouse states
      // 2. update position of animated objects: particles, etc
      object.update();
      // 3. draw each object
      object.draw();
    }
    
    // capture events, but don't do anything with them
    document.addEventListener('mousemove', function (e) {
      mouseX = e.pageX;
      mouseY = e.pageY;
    }, false);

### Vectors

- Pythagoras can be used to determine whether a point (like a click) is inside an circle drawn on a canvas. However, it requires `Math.sqrt` which is costly, so instead of using Pythagoras to workout hit testing (for length of vector) - compare the distanced squared:

Instead of: 

    var distance = Math.sqrt((this.diff.x * this.diff.x) + (this.diff.y*this.diff.y));
    return (distance<this.radius);

Use:

    var distanceSq = (this.diff.x * this.diff.x) + (this.diff.y*this.diff.y);
    return (distanceSq < this.radius * this.radius)

### 3D

Collision detection in 3D:

    var distanceSq3D = (this.diff.x * this.diff.x) + (this.diff.y*this.diff.y) + (this.diff.z * this.diff.z)
    return (distanceSq3D < this.radius * this.radius)

- To calculate the new x and y in a 3D space, you need to multiply them by a scale which is worked out from: f/(f+z) = newscale (note that f the field of view - like the zoom on a camera)
- To scale the 3D system properly, the origin must be in the centre of the canvas, this is key to getting the perspective correct: `ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2)`
- To rotate the y (the *yaw*), you rotate the y and z axis, which is exactly the same as the distribution code (below in the optimisation tricks), using sin and cos

To get the z-order correct (painters algorithm), you need to sort by the z axis, where points is an array of objects with xyz:

    points = points.sort(function (a, b) {
      return a.z >= b.z ? -1 : 1;
    });
    
- If the z is less than -fov (f, i.e. if f=250, and z=-250) it means the z position is behind you - so it should be removed
  
### Optimisation tricks

- When removing an item (or deleted) - like bullets or asteroids, recycle the item: disable it when it's finished with, and add it to an array. Then when you want a new object, try to get it from the pool of spares first, otherwise create a new item.
- Instead of having the keyboard interactivity interrupt the code and update values, track the key presses and check these in the render cycle process.
- `(Math.random() * 0xff) <<16` generates a random blue colour (`0xff` == `0x0000ff` == blue), then shift 16 bits and we've now got a random red colour. We could equally get a random green using `<<8`.
- When placing objects at a random position, if you use `x = Math.random() * width` (and similarly with y axis) the distribution creates a *square* shape, which looks odd. This is easy to fix, you create a circular distribution.

To get a circular distribution, rotate around a circle using: 

    x = Math.sin(angle) * speed; // sin for X
    y = Math.cos(angle) * speed; // cos for Y
