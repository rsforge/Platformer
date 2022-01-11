var killAll = false;
class Game {
  constructor() {
    // all this is for FPS and DeltaTime
    this.ticks = 0; // records how many times the game loop has been called
    this.oldDeltaTime = 0;
    this.DeltaTime = 0;
    this.SafeDeltaTime = 0
    this.FPS = 0;
  }
  StartLoop(callback) {
    // starts the looping function
    window.requestAnimationFrame(callback);
  }
  Update(timeStamp) {
    // calculates the FPS and Delta Time
    this.ticks++; // change the game ticks by one
    this.DeltaTime = (timeStamp - this.oldDeltaTime) / 1000; // calculate the Delta Time
    this.SafeDeltaTime = clamp(this.DeltaTime, 0.0000001, 1)
    this.oldDeltaTime = timeStamp; // sets oldDeltaTime to current timeStamp
    this.FPS = Math.round(1 / this.DeltaTime); // calculates the FPS by using Delta Time
  }
  Loop(callback) {
    // recalls the looping function
    window.requestAnimationFrame(callback);
  }
}
class Canvas {
  constructor(id, width, height) {
    // add the canvas element in ad dic called #AllCanvs
    this.CreateCanvas(id, '#AllCanvs'); // CreateCanvas() takes in a ID and a Location for the canvas to be created
    
    // saves the id of the canvas
    this.id = `#${id}`; // the id must have a # before the id
    
    // gets the canvas 2D rendering SetRenderStuff
    // ctx is short for context
    this.ctx = document.querySelector(this.id).getContext('2d'); // gets the canvas element by using the canvas ID
    
    this.isScale = true;
    this.isScaleKey = Keys.shift;
    
    // this is just all the rendering stuff like Line Width or Fill Color
    this.Render = {
      scale: 1.5, // scale changes how stuff will be drawn
      lineWidth: 1, // lineWidth changes the Line Width
      lineCap: 'round', // lineCap is how a line will look like at the ends
      lineJoin: 'round', // lineJoin is how a two lines will look together
      Fill: { // just saves the fill color
        r: 0, // red
        g: 0, // green
        b: 0, // blue
        a: 1, // alpha in other words Transparency
      },
      Stroke: { // just saves the stroke color
        r: 0, // red
        g: 0, // green
        b: 0, // blue
        a: 1, // alpha in other words Transparency
      }
    }
    
    // saves the canvas width, height
    this.Width = width; // the width of the canvas
    this.Height = height; // the height of the canvas
    
    // all Setup does is sets the canvas width, height to the users desired width, height
    this.Setup(width, height);
  }
  Update(game) {
    if(this.isScale) {
      if(GetKeyState(this.isScaleKey)) {
        if(GetKeyState(Keys.add)) {
          console.log("hello");
          this.Render.scale += 1 * game.SafeDeltaTime;
        }
        else if(GetKeyState(Keys.subtract)) {
          this.Render.scale -= 1 * game.SafeDeltaTime;
        }
        else if(GetKeyState(Keys.period)) {
          this.Render.scale += 10 * game.SafeDeltaTime;
        }
        else if(GetKeyState(Keys.comma)) {
          this.Render.scale -= 10 * game.SafeDeltaTime;
        }
        else if(GetKeyState(Keys.backspace)) {
          this.Render.scale = 1;
        }
      }
    }
    this.Render.scale = clamp(this.Render.scale, 0.1, Infinity)
  }
  SetScaleKey(key) {
    this.isScaleKey = key;
  }
  // returns the max window width
  GetWindowWidth() {
    return window.innerWidth;
  }
  // returns the max window height
  GetWindowHeight() {
    return window.innerHeight;
  }
  // returns the fill color
  GetFill() {
    return `rgba(${this.Render.Fill.r}, ${this.Render.Fill.g}, ${this.Render.Fill.b}, ${this.Render.Fill.a})`; // returns a string like this "rgba(red, greem, blue, alpha)"
  }
  // returns the stroke color
  GetStroke() {
    return `rgba(${this.Render.Stroke.r}, ${this.Render.Stroke.g}, ${this.Render.Stroke.b}, ${this.Render.Stroke.a})`; // returns a string like this "rgba(red, greem, blue, alpha)"
  }
  // sets the fill color
  SetFill(r, g, b, a) {
    this.Render.Fill.r = r; // red
    this.Render.Fill.g = g; // green
    this.Render.Fill.b = b; // blue
    if(a) { // only sets the alpha if the user provides it
      this.Render.Fill.a = a; // alpha
    }
  }
  // sets the stroke color
  SetStroke(r, g, b, a) {
    this.Render.Stroke.r = r; // red
    this.Render.Stroke.g = g; // green
    this.Render.Stroke.b = b; // blue
    if(a) { // only sets the alpha if the user provides it
      this.Render.Stroke.a = a; // alpha
    }
  }
  // resets both the fill and stroke the color to black
  ResetColor() {
    // sets red, green, blue, alpha of both fill and stroke to its defult value
    this.Render.Fill.r = 0;
    this.Render.Fill.g = 0;
    this.Render.Fill.b = 0;
    this.Render.Fill.a = 1;
    this.Render.Stroke.r = 0;
    this.Render.Stroke.g = 0;
    this.Render.Stroke.b = 0;
    this.Render.Stroke.a = 1;
  }
  // sets the scale of drawn stuff
  SetScale(scale) {
    this.Render.scale = scale; // just a easy way to set the canvas scale
  }
  // set Line Width for everthing
  SetLineWidth(lineWidth) {
    this.Render.lineWidth = lineWidth // just a easy way to set the canvas Line Width
  }
  // sets the line width, fill color, etc
  SetRenderStuff(lineWidth, lineCap, lineJoin, fill, stroke, scale) {
    // only sets Renders stuff if the user provides it
    if(scale) {
      this.Render.scale = scale;
    }
    if(lineWidth) {
      this.Render.lineWidth = lineWidth;
    }
    if(lineCap) {
      this.Render.lineCap = lineCap;
    }
    if(lineJoin) {
      this.Render.lineJoin = lineJoin;
    }
    if(fill) {
      this.Render.Fill.r = fill.r;
      this.Render.Fill.g = fill.g;
      this.Render.Fill.b = fill.b;
      if(fill.a) {
        this.Render.Fill.a = fill.a;
      }
    }
    if(stroke) {
      this.Render.Fill.r = stroke.r;
      this.Render.Fill.g = stroke.g;
      this.Render.Fill.b = stroke.b;
      if(stroke.a) {
        this.Render.Fill.a = stroke.a;
      }
    }
  }
  // just gets the canvas width, height ready
  Setup(width, height) {
    this.ctx.canvas.width = width; // sets canvas width
    this.ctx.canvas.height = height; // set canvas height
  }
  // creates the canvas element
  CreateCanvas(id, path) {
    const parent = document.querySelector(path); // gets the canvas path
    const el = document.createElement('canvas'); // creates the element
    el.setAttribute('id', id); // gives the element a id
    parent.appendChild(el); // adds the element to the element path
  }
  // adds some css styles to the canvas
  StyleCanvas(styles) {
    this.CSS(this.id, styles);
  }
  // sets the canvas width, height
  SetCanvasSize(width, height) {
    this.Width = width; // set Width variable to width
    this.Height = height; // set Height variable to height
    
    this.ctx.canvas.width = this.Width; // set canvas width to Width variable
    this.ctx.canvas.height = this.Height; // set canvas height to Height variable
  }
  // changes the canvas width, height
  ChangeCanvasSize(width, height) {
    this.Width += width; // changes Width variable by width
    this.Height += height; // changes Height variable by width
    
    this.ctx.canvas.width = this.Width; // set canvas width to Width variable
    this.ctx.canvas.height = this.Height; // set canvas height to Height variable
  }
  // sets the canvas width, height to the max window size
  Fullscreen() {
    this.Width = window.innerWidth; // sets Width variable to the max Width
    this.Height = window.innerHeight; // sets Height variable to the max Height
    
    this.ctx.canvas.width = this.Width; // set canvas width to Width variable
    this.ctx.canvas.height = this.Height; // set canvas height to Height variable
  }
  // fills the canvas with the desired color
  FillScreen() {
    this.ctx.fillStyle = this.GetFill();
    this.ctx.fillRect(0, 0, this.Width, this.Height); // draw a rect from (0,0) to (canvas width, canvas height)
  }
  // adds styles to a element
  CSS(id, styles) {
    let e = document.querySelector(id); // gets the element that you want to style
    for(const property in styles) // loops through all the styles
      e.style[property] = styles[property] // applys the styles
  }
  // draws a rect made up of lines
  DrawRect(x1, y1, x2, y2) {
    this.ctx.strokeStyle = this.GetStroke(); // sets stroke color
    this.ctx.lineWidth = this.Render.lineWidth / this.Render.scale; // sets line width
    this.ctx.lineCap = this.Render.lineCap; // sets line cap
    this.ctx.lineJoin = this.Render.lineJoin; // sets line join
    this.ctx.beginPath(); // starts drawing lines
    this.ctx.moveTo(x1 / this.Render.scale, y1 / this.Render.scale); // move to (x1, y1) / by the scale
    this.ctx.lineTo(x1 / this.Render.scale, y2 / this.Render.scale); // draws a line to (x1, y2) / by the scale
    this.ctx.lineTo(x2 / this.Render.scale, y2 / this.Render.scale); // draws a line to (x2, y2) / by the scale
    this.ctx.lineTo(x2 / this.Render.scale, y1 / this.Render.scale); // draws a line to (x2, y1) / by the scale
    this.ctx.closePath(); // closePath just draws a line back to the start
    this.ctx.stroke(); // draws te lines
  }
  // draws a rect with fill and stroke
  DrawFillRect(x1, y1, x2, y2) {
    this.ctx.strokeStyle = this.GetStroke(); // sets stroke color
    this.ctx.fillStyle = this.GetFill(); // sets fill color
    this.ctx.lineWidth = this.Render.lineWidth / this.Render.scale; // sets line width
    this.ctx.lineCap = this.Render.lineCap; // sets line cap
    this.ctx.lineJoin = this.Render.lineJoin; // sets line join
    this.ctx.beginPath(); // starts drawing lines
    this.ctx.moveTo(x1 / this.Render.scale, y1 / this.Render.scale); // move to (x1, y1) / by the scale
    this.ctx.lineTo(x1 / this.Render.scale, y2 / this.Render.scale); // draws a line to (x1, y2) / by the scale
    this.ctx.lineTo(x2 / this.Render.scale, y2 / this.Render.scale); // draws a line to (x2, y2) / by the scale
    this.ctx.lineTo(x2 / this.Render.scale, y1 / this.Render.scale); // draws a line to (x2, y1) / by the scale
    this.ctx.closePath(); // closePath just draws a line back to the start
    this.ctx.stroke(); // draws te lines
    this.ctx.fill(); // fills the rect
  }
  DrawRotatedLine(x, y, length, dir) {
      this.ctx.strokeStyle = this.GetStroke();
      this.ctx.lineCap = this.Render.lineCap;
      this.ctx.lineWidth = this.Render.lineWidth / this.Render.scale;
      this.ctx.beginPath();
      this.ctx.moveTo(
          (Math.sin(DegreesToRadians(dir)) * length / this.Render.scale) + x / this.Render.scale,
          (Math.cos(DegreesToRadians(dir)) * length / this.Render.scale) + y / this.Render.scale
          );
      this.ctx.lineTo(
          (Math.sin(DegreesToRadians(dir + 180)) * length / this.Render.scale) + x / this.Render.scale,
          (Math.cos(DegreesToRadians(dir + 180)) * length / this.Render.scale) + y / this.Render.scale
          );
      this.ctx.stroke();
  }
  DrawCircle(x, y, radius) {
    this.ctx.strokeStyle = this.GetStroke();
    this.ctx.lineWidth = this.Render.lineWidth / this.Render.scale;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
  DrawFillCircle(x, y, radius) {
    this.ctx.fillStyle = this.GetFill();
    this.ctx.lineWidth = this.Render.lineWidth / this.Render.scale;
    this.ctx.beginPath();
    this.ctx.arc(x / this.Render.scale, y / this.Render.scale, radius / this.Render.scale, 0, 2 * Math.PI);
    this.ctx.fill();
  }
  DrawEllipse(x, y, radiusX, radiusY) {
    this.ctx.strokeStyle = this.GetStroke();
    this.ctx.lineWidth = this.Render.lineWidth / this.Render.scale;
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, radiusX, radiusY, Math.PI, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
  DrawFillEllipse(x, y, radiusX, radiusY) {
    this.ctx.fillStyle = this.GetFill();
    this.ctx.lineWidth = this.Render.lineWidth / this.Render.scale;
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, radiusX, radiusY, Math.PI, 0, 2 * Math.PI);
    this.ctx.fill();
  }
  DrawText(text, x, y, cam) {
    var pixels = 30;
    this.ctx.fillStyle = this.GetFill();
    this.ctx.font = `${pixels / this.Render.scale}px Arial`;
    this.ctx.fillText(text, ((x - ((text.length/2) * pixels)/2) + cam.x) / this.Render.scale, (y + cam.y) / this.Render.scale);
  }
}
class Camera {
  constructor(x, y, canv) {
    this.x = x + canv.Width/2;// corrects for the canvas width
    this.y = y + canv.Height/2;// corrects for the canvas height
    this.friction = 1; // sets to a default of 1
    
    this.panLeft = Keys.a;
    this.panRight = Keys.d;
    this.panUp = Keys.w;
    this.panDown = Keys.s;
    this.panRange = 40;
  }
  // move to a position
  MoveTo(x, y, canv) {
    this.x = -x + canv.Width/2 * canv.Render.scale;
    this.y = -y + canv.Height/2 * canv.Render.scale;
  }
  // moves to a position slowly
  MoveTo_SOFT(x, y, canv, game) {
    this.x += (((-x + canv.Width/2 * canv.Render.scale) - this.x) / 16) * 60 * game.SafeDeltaTime;
    this.y += (((-y + canv.Height/2 * canv.Render.scale) - this.y) / 16) * 60 * game.SafeDeltaTime;
  }
  // moves to a position at a medium speed
  MoveTo_MEDIUM(x, y, canv, game) {
    this.x += (((-x + canv.Width/2 * canv.Render.scale) - this.x) / 8) * 60 * game.SafeDeltaTime;
    this.y += (((-y + canv.Height/2 * canv.Render.scale) - this.y) / 8) * 60 * game.SafeDeltaTime;
  }
  // moves to a position vary fast
  MoveTo_HARD(x, y, canv, game) {
    this.x += (((-x + canv.Width/2 * canv.Render.scale) - this.x) / 4) * 60 * game.SafeDeltaTime;
    this.y += (((-y + canv.Height/2 * canv.Render.scale) - this.y) / 4) * 60 * game.SafeDeltaTime;
  }
  // moves to a position with a user defined value
  MoveTo_CUSTOM(x, y, canv, game) {
    this.x += (((-x + canv.Width/2 * canv.Render.scale) - this.x) / this.friction) * 60 * game.SafeDeltaTime;
    this.y += (((-y + canv.Height/2 * canv.Render.scale) - this.y) / this.friction) * 60 * game.SafeDeltaTime;
  }
  Pan() {
    if(GetKeyState(this.panRight)) {
      this.x -= this.panRange;
    }
    if(GetKeyState(this.panLeft)) {
      this.x += this.panRange;
    }
    if(GetKeyState(this.panUp)) {
      this.y += this.panRange;
    }
    if(GetKeyState(this.panDown)) {
      this.y -= this.panRange;
    }
  }
  // sets the friction of the camera
  SetFriction(friction) {
    this.friction = friction;
  }
}
class Player {
  constructor(x, y, size) {
    // player position
    this.x = x;
    this.y = y;
    
    // all player velocitys
    this.xv = 0;
    this.yv = 0;
    
    // the size picked will be half the size of the player
    this.size = size;
    this.savedSize = size;
    
    // player info
    this.JumpHeight = -15;
    this.MovementSpeed = 1;
    this.Friction = 1.1;
    this.Gravity = 0.8;
    this.canPlay = true;
    
    // respawn
    this.dead = false;
    this.respawnX = x;
    this.respawnY = y;
    this.savedRespawnX = x;
    this.savedRespawnY = x;
    
    // double jump
    this.doubleJump = false;
    this.doubleJumpTime = 0;
    this.doubleJumpHeight = -15;
    
    // triple jump
    this.bouce = true;
    
    // keys
    this.leftKey = Keys.left_arrow;
    this.upKey = Keys.up_arrow;
    this.rightKey = Keys.right_arrow;
    this.downKey = Keys.down_arrow;
    
    //Cheats
    this.cheats = {
      fly: false,
      followSpec: false
    };
    
    // Bouce Pad
    this.pad = new BoucePad(x, y);
  }
  EnableCheats() {
    this.cheats.fly = true;
    this.cheats.followSpec = true;
  }
  DisableCheats() {
    this.cheats.fly = false;
    this.cheats.followSpec = false;
  }
  Update(platforms, canv, game) {
    if(killAll > 0) {
      this.dead = true;
    }
    this.pad.Update(this.x, this.y, this.size + canv.Render.lineWidth/1.5, game, this.cheats);
    if(!this.dead) {
      if(this.EndPull(platforms, canv)) {
        return;
      }
      if(this.Respawners(platforms, canv)) {
        return;
      }
      if(this.PullPush(platforms, canv)) {
        return;
      }
      if(this.SizeChangers(platforms, canv)) {
        return;
      }
      // X collision
      if(GetKeyState(this.leftKey) && !GetKeyState(Keys.shift)) {
        this.xv -= this.MovementSpeed;
      }
      if(GetKeyState(this.rightKey) && !GetKeyState(Keys.shift)) {
        this.xv += this.MovementSpeed;
      }
      this.xv /= this.Friction;
      this.x += (this.xv*60) * game.SafeDeltaTime;
      if(this.BlockCollision(platforms, canv)) {
        this.x -= (this.xv*60) * game.SafeDeltaTime;
        this.xv = 0;
      }
      
      // Y collision
      this.yv += this.Gravity;
      this.y += (this.yv*60) * game.SafeDeltaTime;
      if(this.BlockCollision(platforms, canv)) {
        this.doubleJump = false;
        this.y -= (this.yv*60) * game.SafeDeltaTime;
        this.yv = 0;
      }
      
      // jump
      this.y ++;
      if(GetKeyState(this.upKey) && !GetKeyState(Keys.shift)) {
        if(this.BlockCollision(platforms, canv)) {
          this.yv = this.JumpHeight;
          this.doubleJump = true;
          this.doubleJumpTime = tick;
        }  
      }
      // double jump
      if(GetKeyState(this.upKey) && this.doubleJump) {
        if(tick > this.doubleJumpTime + 20) {
          this.doubleJump = false;
          this.yv = this.doubleJumpHeight;
        }
      }
      if(this.Collision(platforms, canv).includes(2)) {
        this.yv = this.JumpHeight*2.5;
      }
      if((this.pad.dir % 360) > 240 && (this.pad.dir % 360) < 300 && GetKeyState(this.downKey) && !GetKeyState(Keys.shift)) {
          if(this.bounce) {
              this.yv = this.JumpHeight*2; 
              this.bounce = false;
          }
      }  
      if(this.Collision(platforms, canv).includes(3)) {
        this.dead = true;
      }
      this.y--;
      
      if(Math.abs(this.x) > 10000 || Math.abs(this.y) > 10000) {
        this.dead = true;
      }
      if((this.pad.dir % 360) > 120 && (this.pad.dir % 360) < 240) {
          this.bounce = true;
      }
    }
    else {
      this.size = this.savedSize;
      this.x += (this.respawnX - this.x) / 10;
      this.y += (this.respawnY - this.y) / 10;
      if(Math.round(this.x) == Math.round(this.respawnX) && Math.round(this.y) == Math.round(this.respawnY)) {
        this.size = this.savedSize;
        this.dead = false;
        this.x = this.respawnX;
        this.y = this.respawnY;
        this.xv = 0;
        this.yv = 0;
      }
    }
  }
  Draw(cam, canv, game) {
    canv.SetStroke(255, 255, 255, 1);
    canv.DrawRect((this.x - this.size) + cam.x, (this.y - this.size) + cam.y, (this.x + this.size) + cam.x, (this.y + this.size) + cam.y);
    this.pad.Draw(cam, canv);
  }
  EndPull(platforms, canv) {
    for(var i in platforms.levelEnds) {
      if(Dist(this.x, this.y, platforms.levelEnds[i].x, platforms.levelEnds[i].y) < (platforms.levelEnds[i].CalcRingSize(platforms.levelEnds[i].radius + 150) + 200)) {
        this.xv += (platforms.levelEnds[i].x - this.x) / clamp((Dist(this.x, this.y, platforms.levelEnds[i].x, platforms.levelEnds[i].y) / 2), 0.001, Infinity);
        this.yv += (platforms.levelEnds[i].y - this.y) / clamp((Dist(this.x, this.y, platforms.levelEnds[i].x, platforms.levelEnds[i].y) / 2), 0.001, Infinity);
        var nextX = (platforms.levelEnds[i].x - this.x) / clamp((Dist(this.x, this.y, platforms.levelEnds[i].x, platforms.levelEnds[i].y)), 0.001, Infinity);
        var nextY = (platforms.levelEnds[i].y - this.y) / clamp((Dist(this.x, this.y, platforms.levelEnds[i].x, platforms.levelEnds[i].y)), 0.001, Infinity);
        this.x += nextX;
        this.y += nextY;
        var cols = this.Collision(platforms, canv);
        if(cols.includes(1) || cols.includes(2)) {
          this.x -= nextX;
          this.y -= nextY;
        }
        if(round(this.x) == round(platforms.levelEnds[i].x) && round(this.y) == round(platforms.levelEnds[i].y)) {
          LoadLevel(platforms.levelEnds[i].level);
          this.respawnX = this.savedRespawnX;
          this.respawnY = this.savedRespawnY;
          killAll = 3;
          this.dead = true;
          return true;
        }
      }
    }
  }
  Respawners(platforms, canv) {
    for(var i in platforms.respawns) {
      if(Dist(this.x, this.y, platforms.respawns[i].x, platforms.respawns[i].y) < (platforms.respawns[i].CalcRingSize(platforms.respawns[i].radius + 150) + 200)) {
        this.xv += (platforms.respawns[i].x - this.x) / clamp((Dist(this.x, this.y, platforms.respawns[i].x, platforms.respawns[i].y) * 2), 0.001, Infinity);
        this.yv += (platforms.respawns[i].y - this.y) / clamp((Dist(this.x, this.y, platforms.respawns[i].x, platforms.respawns[i].y) * 2), 0.001, Infinity);
        if(Dist(this.x, this.y, platforms.respawns[i].x, platforms.respawns[i].y) < platforms.respawns[i].CalcRingSize(platforms.respawns[i].radius + 150)) {
          this.respawnX = platforms.respawns[i].x;
          this.respawnY = platforms.respawns[i].y;
          return false;
        }
      }
    }
  }
  PullPush(platforms, canv) {
    for(var i in platforms.PullPush) {
      if(Dist(this.x, this.y, platforms.PullPush[i].x, platforms.PullPush[i].y) < (platforms.PullPush[i].CalcRingSize(platforms.PullPush[i].radius + 150) + platforms.PullPush[i].pullRadius)) {
        platforms.PullPush[i].CalcPull(this.x, this.y, platforms.PullPush[i].x, platforms.PullPush[i].y);
        this.xv += (platforms.PullPush[i].x - this.x) / platforms.PullPush[i].CalcPull(this.x, this.y).xDist;
        this.yv += (platforms.PullPush[i].y - this.y) / platforms.PullPush[i].CalcPull(this.x, this.y).yDist;
        if(Dist(this.x, this.y, platforms.PullPush[i].x, platforms.PullPush[i].y) < platforms.PullPush[i].CalcRingSize(platforms.PullPush[i].radius + 150)) {
          this.xv += (platforms.PullPush[i].x - this.x) / platforms.PullPush[i].CalcPull(this.x, this.y).xDist;
          this.yv += (platforms.PullPush[i].y - this.y) / platforms.PullPush[i].CalcPull(this.x, this.y).yDist;
          return false;
        }
      }
    }
  }
  SizeChangers(platforms, canv) {
    for(var i in platforms.sizeChanger) {
      if(Dist(this.x, this.y, platforms.sizeChanger[i].x, platforms.sizeChanger[i].y) < (platforms.sizeChanger[i].CalcRingSize(platforms.sizeChanger[i].radius + 150) + platforms.sizeChanger[i].pullRadius)) {
        platforms.sizeChanger[i].CalcPull(this.x, this.y, platforms.sizeChanger[i].x, platforms.sizeChanger[i].y);
        this.xv += (platforms.sizeChanger[i].x - this.x) / platforms.sizeChanger[i].CalcPull(this.x, this.y).xDist;
        this.yv += (platforms.sizeChanger[i].y - this.y) / platforms.sizeChanger[i].CalcPull(this.x, this.y).yDist;
        if(Dist(this.x, this.y, platforms.sizeChanger[i].x, platforms.sizeChanger[i].y) < platforms.sizeChanger[i].CalcRingSize(platforms.sizeChanger[i].radius + 150)) {
          this.size = platforms.sizeChanger[i].size;
          return false;
        }
      }
    }
  }
  SpectatorSpawn(Spectator) {
    if(this.cheats.followSpec) {
      if(GetKeyState(Keys.shift) && GetKeyState(Keys.k)) {
        this.x = Spectator.x;
        this.y = Spectator.y;
        this.xv = 0;
        this.yv = 0;
      }
    }
  }
  SortedCollision(platforms, canv) {
    var rCols = [];
    for(var i in platforms.platforms) {
      var plat = platforms.platforms[i];
      if(this.x - (this.size + canv.Render.lineWidth/2) < plat.x2 + canv.Render.lineWidth/2 && this.x + (this.size + canv.Render.lineWidth/2) > plat.x1 - canv.Render.lineWidth/2 && this.y - (this.size + canv.Render.lineWidth/2) < plat.y2 + canv.Render.lineWidth/2 && this.y + (this.size + canv.Render.lineWidth/2) > plat.y1 - canv.Render.lineWidth/2) {
        rCols.push(plat.type);
      }
    }
    return this.Touch(rCols);
  }
  Collision(platforms, canv) {
    var rCols = [];
    for(var i in platforms.platforms) {
      var plat = platforms.platforms[i];
      if(this.x - (this.size + canv.Render.lineWidth/2) < plat.x2 + canv.Render.lineWidth/2 && this.x + (this.size + canv.Render.lineWidth/2) > plat.x1 - canv.Render.lineWidth/2 && this.y - (this.size + canv.Render.lineWidth/2) < plat.y2 + canv.Render.lineWidth/2 && this.y + (this.size + canv.Render.lineWidth/2) > plat.y1 - canv.Render.lineWidth/2) {
        rCols.push(plat.type);
      }
    }
    return rCols;
  }
  BlockCollision(platforms, canv) {
    for(var i in platforms.platforms) {
      var plat = platforms.platforms[i];
      if(plat.type == 1 || plat.type == 2) {
        if(this.x - (this.size + canv.Render.lineWidth/2) < plat.x2 + canv.Render.lineWidth/2 && this.x + (this.size + canv.Render.lineWidth/2) > plat.x1 - canv.Render.lineWidth/2 && this.y - (this.size + canv.Render.lineWidth/2) < plat.y2 + canv.Render.lineWidth/2 && this.y + (this.size + canv.Render.lineWidth/2) > plat.y1 - canv.Render.lineWidth/2) {
          return true;
        }
      }
    }
  }
  Touch(collisions) {
    if(collisions.includes(1)) {
      return 1;
    }
    else if(collisions.includes(2)) {
      return 2;
    }
    else if(collisions.includes(3)) {
      return 3;
    }
  }
  SetKeys(right, left, up, down) {
    this.rightKey = right;
    this.leftKey = left;
    this.upKey = up;
    this.downKey = down;
  }
}
class LevelEnd {
  constructor(x, y, radius, level) {
    this.x = x;
    this.y = y;
    
    this.level = level;
    this.radius = clamp(radius, 50, Infinity);
  }
  Draw(cam, canv) {
    canv.SetFill(0, 0, 255, 0.1);
    canv.SetStroke(0, 0, 255, 0.1);
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius+150));
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius+100));
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius+50));
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius));
  }
  CalcRingSize(size) {
    return (size + (Math.sin((tick / 15) + (size / 100)) * 30)) / 2;
  }
}
class Respawner {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    
    this.radius = clamp(radius, 50, Infinity);
  }
  Draw(cam, canv) {
    canv.SetFill(155, 0, 155, 0.1);
    canv.SetStroke(0, 0, 255, 0.1);
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius+150));
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius+100));
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius+50));
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius));
  }
  CalcRingSize(size) {
    return (size + (Math.sin((tick / 15) + (size / 100)) * 30)) / 2;
  }
}
class Pull {
  constructor(x, y, radius, xPull, yPull, pullRadius) {
    this.x = x;
    this.y = y;
    
    this.xPull = xPull;
    this.yPull = yPull;
    
    this.pullRadius = pullRadius;
    
    this.radius = clamp(radius, 50, Infinity);
  }
  Draw(cam, canv, game) {
    var color = {r: 0, g: 0, b: 0};
    color.r = (Math.sin(tick / 60) * 255);
    color.g = (Math.sin(((tick / 60) + 255)) * 255);
    color.b = (Math.sin(((tick / 60) + 510)) * 255);
    canv.SetFill(color.r, color.g, color.b, 0.1);
    canv.SetStroke(0, 0, 255, 0.1);
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius+150));
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius+100));
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius+50));
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius));
  }
  CalcRingSize(size) {
    return (size + (Math.sin((tick / 15) + (size / 100)) * 30)) / 2;
  }
  CalcPull(x, y) {
    var dist = { xDist: 0, yDist: 0 };
    dist.xDist = (Dist(x, y, this.x, this.y) / this.xPull);
    dist.yDist = (Dist(x, y, this.x, this.y) / this.yPull);
    
    if(dist.xDist == 0) dist.xDist = (this.xPull < 0)? -1 : 1; 
    if(dist.yDist == 0) dist.yDist = (this.yPull < 0)? -1 : 1; 
    return dist;
  }
}
class SizeChanger {
  constructor(x, y, radius, xPull, yPull, pullRadius, size) {
    this.x = x;
    this.y = y;
    
    this.size = size;
    
    this.xPull = xPull;
    this.yPull = yPull;
    
    this.pullRadius = pullRadius;
    
    this.radius = clamp(radius, 50, Infinity);
  }
  Draw(cam, canv) {
    canv.SetFill(0, 100, 255, 0.1);
    canv.SetStroke(0, 0, 255, 0.1);
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius+150));
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius+100));
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius+50));
    canv.DrawFillCircle(this.x + cam.x, this.y + cam.y, this.CalcRingSize(this.radius));
  }
  CalcRingSize(size) {
    return (size + (Math.sin((tick / 15) + (size / 100)) * 30)) / 2;
  }
  CalcPull(x, y) {
    var dist = { xDist: 0, yDist: 0 };
    dist.xDist = (Dist(x, y, this.x, this.y) / this.xPull);
    dist.yDist = (Dist(x, y, this.x, this.y) / this.yPull);
    
    if(dist.xDist == 0) dist.xDist = (this.xPull < 0)? -1 : 1; 
    if(dist.yDist == 0) dist.yDist = (this.yPull < 0)? -1 : 1; 
    return dist;
  }
}
class Platform {
  constructor(x1, y1, x2, y2, type) {
    // first sort values so that x1 is always less then x2 and same for the y1 and y2
    var sortedValues = SortValues(x1, y1, x2, y2);
    
    // set position
    this.x1 = sortedValues.x1;
    this.y1 = sortedValues.y1;
    this.x2 = sortedValues.x2;
    this.y2 = sortedValues.y2;
    
    this.type = type;
  }
  Draw(cam, canv) {
    if(this.type == 1) {
      canv.SetStroke(50, 50, 50, 1);
    }
    else if(this.type == 2){
      canv.SetStroke(255, 255, 0), 1;
    }
    else if(this.type == 3){
      canv.SetStroke(255, 0, 0), 1;
    }
    else if(this.type == 4){
      canv.SetStroke(0, 0, 255), 1;
    }
    else if(this.type == 5){
      canv.SetStroke(255, 0, 255), 1;
    }
    else {
      canv.SetStroke(255, 255, 255), 1;
    }
    canv.DrawRect(this.x1 + cam.x, this.y1 + cam.y, this.x2 + cam.x, this.y2 + cam.y);
  }
}
class PlatformArray {
  constructor(platformArray) {
    this.platforms = [];
    this.levelEnds = [];
    this.respawns = [];
    this.PullPush = [];
    this.sizeChanger = [];
    this.Count = 0;
    this.Scale = 1;
    this.inverted = false;
    this.level;
    
    if(platformArray) {
      this.platforms = platformArray.platforms;
      this.Count = platformArray.Count;
    }
  }
  Add(x1, y1, x2, y2, type) {
    if(this.inverted) {
      this.platforms.push(new Platform(x1 * this.Scale, y1 * this.Scale * -1, x2 * this.Scale, y2 * this.Scale * -1, type));
    }
    else {
      this.platforms.push(new Platform(x1 * this.Scale, y1 * this.Scale, x2 * this.Scale, y2 * this.Scale, type));
    }
    this.Count ++;
  }
  AddEnd(x, y, radius, level) {
    if(this.inverted) { 
      this.levelEnds.push(new LevelEnd(x * this.Scale, y * this.Scale * -1, radius, level));
    }
    else {
      this.levelEnds.push(new LevelEnd(x * this.Scale, y * this.Scale, radius, level));
    }
  }
  AddRespawner(x, y, radius) {
    if(this.inverted) { 
      this.respawns.push(new Respawner(x * this.Scale, y * this.Scale * -1, radius));
    }
    else {
      this.respawns.push(new Respawner(x * this.Scale, y * this.Scale, radius));
    }
  }
  AddPull(x, y, radius, xPull, yPull, pullRadius) {
    if(this.inverted) { 
      this.PullPush.push(new Pull(x * this.Scale, y * this.Scale * -1, radius, xPull, yPull, pullRadius));
    }
    else {
      this.PullPush.push(new Pull(x * this.Scale, y * this.Scale, radius, xPull, yPull, pullRadius));
    }
  }
  AddSizeChanger(x, y, radius, xPull, yPull, pullRadius, size) {
    if(this.inverted) { 
      this.sizeChanger.push(new SizeChanger(x * this.Scale, y * this.Scale * -1, radius, xPull, yPull, pullRadius, size));
    }
    else {
      this.sizeChanger.push(new SizeChanger(x * this.Scale, y * this.Scale, radius, xPull, yPull, pullRadius, size));
    }
  }
  Delete(index) {
    this.platforms.splice(index);
    this.Count --;
  }
  Clear() {
    this.platforms = [];
    this.levelEnds = [];
    this.respawns = [];
    this.PullPush = [];
    this.sizeChanger = [];
    this.Count = 0;
  }
  Draw(cam, canv, game) {
    for(var i in this.platforms) {
      this.platforms[i].Draw(cam, canv);
    }
    for(var j in this.levelEnds) {
      this.levelEnds[j].Draw(cam, canv);
    }
    for(var k in this.respawns) {
      this.respawns[k].Draw(cam, canv);
    }
    for(var q in this.PullPush) {
      this.PullPush[q].Draw(cam, canv, game);
    }
    for(var e in this.sizeChanger) {
      this.sizeChanger[e].Draw(cam, canv);
    }
  }
  SetScale(scale) {
    this.Scale = scale;
  }
  Inverted(inverted) {
    this.inverted = inverted;
  }
}
class BoucePad {
  constructor(x, y) {
      this.x = x;
      this.y = y;

      this.xv = 0;
      this.yv = 0;

      this.dir = 0;
  }
  Update(x, y, size, game, cheats) {
      this.xv += (MoveInDir(x, y, this.dir, size).x - this.x) / 2;
      this.yv += (MoveInDir(x, y, this.dir, size).y - this.y) / 2;
      this.xv *= 0.85;
      this.yv *= 0.85;
      this.x += this.xv / (1000 / 60);
      this.y += this.yv / (1000 / 60);
      if(GetKeyState(Keys.space)) {
          this.x = MoveInDir(this.x, this.y, this.dir, 5).x;
          this.y = MoveInDir(this.x, this.y, this.dir, 5).y;
      }
      if(cheats.fly) {
        this.dir += 70;
      }
      else {
        this.dir += 120 * game.DeltaTime;
      }
  }
  Draw(cam, canv) {
      canv.SetStroke(0, 255, 0);
      canv.DrawRotatedLine(this.x + cam.x, this.y + cam.y, 20, this.dir);
  }
}
class Spectator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xv = 0;
    this.yv = 0;
    
    this.offsetX = 200;
    this.offsetY = 200;
    
    this.friction = 1.1;
    this.followFriction = 16;
    this.movementSpeed = 4;
    
    this.leftKey = Keys.left_arrow;
    this.upKey = Keys.up_arrow;
    this.rightKey = Keys.right_arrow;
    this.downKey = Keys.down_arrow;
  }
  Update() {
    if(GetKeyState(this.rightKey)) {
      this.xv += this.movementSpeed;
    }
    if(GetKeyState(this.leftKey)) {
      this.xv -= this.movementSpeed;
    }
    if(GetKeyState(this.upKey)) {
      this.yv -= this.movementSpeed;
    }
    if(GetKeyState(this.downKey)) {
      this.yv += this.movementSpeed;
    }
    this.xv /= this.friction;
    this.yv /= this.friction;
    this.x += this.xv;
    this.y += this.yv;
  }
  FollowPlayer_SOFT(player) {
    if(!GetKeyState(Keys.shift)) {
      this.x += (player.x - (this.x + this.offsetX)) / 16;
      this.y += (player.y - (this.y + this.offsetY)) / 16;  
    } 
  }
  FollowPlayer_MEDIUM(player) {
    if(!GetKeyState(Keys.shift)) {
      this.x += (player.x - this.x) / 8;
      this.y += (player.y - this.y) / 8;
    }
  }
  FollowPlayer_HARD(player) {
    if(!GetKeyState(Keys.shift)) {
      this.x += (player.x - this.x) / 4;
      this.y += (player.y - this.y) / 4;
    }
  }
  FollowPlayer_CUSTOM(player) {
    if(!GetKeyState(Keys.shift)) {
      this.x += (player.x - this.x) / this.friction;
      this.y += (player.y - this.y) / this.friction;
    }
  }
  FollowPlayer(player) {
    if(!GetKeyState(Keys.shift)) {
      this.x = player.x;
      this.y = player.y;
    }
  }
  SetFriction(friction) {
    this.followFriction = friction;
  }
  Draw(cam, canv) {
    canv.SetFill(0, 255, 0, 0.05);
    canv.SetStroke(0, 255, 0, 0.1);
    canv.DrawFillRect((this.x - 15) + cam.x, (this.y - 15) + cam.y, (this.x + 15) + cam.x, (this.y + 15) + cam.y)
  }
  SetKeys(right, left, up, down) {
    this.rightKey = right;
    this.leftKey = left;
    this.upKey = up;
    this.downKey = down;
  }
}
function DegreesToRadians(degrees) {
    return degrees / 180 * Math.PI;
}
function RadiansToDegrees(radians) {
    return radians * 180 / Math.PI;
}
function MoveInDir(x, y, dir, speed) {
    let pos = {x: x, y: y};
    pos.x += (Math.cos(DegreesToRadians(dir + 45)) + Math.sin(DegreesToRadians(dir + 45))) * speed;
    pos.y += (Math.cos(DegreesToRadians(dir + 45)) - Math.sin(DegreesToRadians(dir + 45))) * speed;
    return pos;
}
function GetDir(x1, y1, x2, y2) {
  var x = x2 - x1;
  var y = y2 - y1;
  var dir;
  if(y == 0) {
    if(x > 0) {
      dir = DegreesToRadians(90);
    }
    else {
      dir = DegreesToRadians(-90);
    }
  }
  else {
    dir = Math.atan(x / y);
    if(y < 0) {
      if(x > 0) {
        dir += DegreesToRadians(180);
      }
      else if(x < 0) {
        dir -= DegreesToRadians(180);
      }
      else {
        dir = DegreesToRadians(180);
      }
    }
  }
  return dir;
}
function SortValues(x1, y1, x2, y2) {
  var rValues = {x1: x1, y1: y1, x2: x2, y2: y2};
  if(y1 > y2) {
    if(x1 > x2) {
      rValues.x1 = x2;
      rValues.y1 = y2;
      rValues.x2 = x1;
      rValues.y2 = y1;
    }
    else {
      rValues.y1 = y2;
      rValues.y2 = y1;
    }
  }
  else if(x1 > x2){
    rValues.x1 = x2;
    rValues.x2 = x1;
  }
  return rValues;
}
function clamp(value, min, max) {
  if(value > max) return max;
  if(value < min) return min;
  return value;
}
function doc(string) {
  console.log(string);
}
function Dist(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  var dist = Math.sqrt((dx*dx)+(dy*dy));
  return dist;
}
function round(float) {
  return Math.round(float);
}
// for ticks
var tick = 0;
setInterval(gameTick, 1000/ 60);
function gameTick() {
  killAll --;
  killAll = clamp(killAll, 0, 10);
  tick++;
}
// Keyboard stuff
var Keys = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  pause_break: 19,
  caps_lock: 20,
  escape: 27,
  space: 32,
  page_up: 33,
  page_down: 34,
  end: 35,
  home: 36,
  left_arrow: 37,
  up_arrow: 38,
  right_arrow: 39,
  down_arrow: 40,
  insert: 45,
  delete: 46,
  zero: 48,
  one: 49,
  two: 50,
  three: 51,
  four: 52,
  five: 53,
  six: 54,
  seven: 55,
  eight: 56,
  nine: 57,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  left_window_key: 91,
  right_window_key: 92,
  select_key: 93,
  numpad_zero: 96,
  numpad_one: 97,
  numpad_two: 98,
  numpad_three: 99,
  numpad_four: 100,
  numpad_five: 101,
  numpad_six: 102,
  numpad_seven: 103,
  numpad_eight: 104,
  numpad_nine: 105,
  multiply: 106,
  add: 107,
  subtract: 109,
  decimal_point: 110,
  divide: 111,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  num_lock: 144,
  scroll_lock: 145,
  semi_colon: 186,
  equal_sign: 187,
  comma: 188,
  dash: 189,
  period: 190,
  forward_slash: 191,
  grave_accent: 192,
  open_bracket: 219,
  back_slash: 220,
  close_braket: 221,
  single_quote: 222,
}
var Keys_state = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];
function GetKeyState(key) {
  return Keys_state[((key - 8) * 2) + 1];
}
var Keyboard = {
  event: function(e) {
    var key_state = (e.type === "keydown")? true : false;
    Keys_state[((e.keyCode - 8)*2)+1] = key_state;
  }
}
document.addEventListener("keydown", Keyboard.event);
document.addEventListener("keyup", Keyboard.event);
