let Canv = new Canvas('GameCanvas', 900, 900);
let Cam = new Camera(0, 0, Canv);

let Canv2 = new Canvas('GameCanvas2', 900, 900);
let Cam2 = new Camera(0, 0, Canv2);
//let player2 = new Player(-30, 0, 15);
let player2 = new Spectator(0, 0);
Canv.SetScaleKey(-1);
Canv2.SetScaleKey(Keys.shift);
let player = new Player(30, 0, 15);
player2.SetKeys(Keys.d, Keys.a, Keys.w, Keys.s); 

Canv.SetLineWidth(10);
Canv2.SetLineWidth(10);

// Create Platform Array
let Level = new PlatformArray();
Level.SetScale(100);
Level.Inverted(true);
LoadLevel(1); 

// Create Game
player.cheats.followSpec = true;
let game = new Game();

// Start Game Loop
game.StartLoop(loop);
function loop(timeStamp) {
  game.Update(timeStamp);
  Canv.Update(game);
  player.Update(Level, Canv, game);

  Cam.MoveTo_SOFT(player.x, player.y, Canv, game);
  Cam.Pan();

  Canv.SetCanvasSize(Canv.GetWindowWidth(), Canv.GetWindowHeight());
  Canv.ResetColor();
  Canv.FillScreen();

  player.Draw(Cam, Canv, game);
  Level.Draw(Cam, Canv, game);
  Canv.SetFill(255, 255, 255, 255);
  if(Level.level == 1) {
    Canv.DrawText("Use Arrow Keys To Move", 0, -500, Cam);
    Canv.DrawText("Use W,A,S,D Keys To Pan Camera", 0, -450, Cam);
    Canv.DrawText("Up Arrow To Jump And To Double Jump While In Air", 0, -400, Cam);
    Canv.DrawText("Down Arrow To Super Jump When Green Pad Is Below You", 0, -350, Cam);
    Canv.DrawText("------------------------------------------------------------------------------", 200, -300, Cam);
    Canv.DrawText("Yellow Platforms Are Bouncy", 0, -250, Cam);
    Canv.DrawText("Blue Portals Take You To The Next Level", 0, -200, Cam);
    Canv.DrawText("Pink Portals Set Your Respawn Point", 0, -150, Cam);
    Canv.DrawText("Changing Color Portals Push Or Pull You", 0, -100, Cam);
    Canv.DrawText("Light Blue Portals Change Your Size", 0, -50, Cam);
  }
  game.Loop(loop);
}
// function loop(timeStamp) {
//   game.Update(timeStamp);
//   Canv.Update(game);
//   Canv2.Update(game);
//   player.Update(Level, Canv, game);
//   player2.Update(player, game/*Level, Canv2, game*/);
//   player.SpectatorSpawn(player2);
// 
//   Cam.MoveTo_SOFT(player.x, player.y, Canv, game);
//   Cam.Pan();
//   Cam2.MoveTo_MEDIUM(player2.x, player2.y, Canv2, game);
// 
//   Canv.SetCanvasSize(Canv.GetWindowWidth()/2, Canv.GetWindowHeight());
//   Canv2.SetCanvasSize(Canv2.GetWindowWidth()/2, Canv2.GetWindowHeight());
//   Canv.ResetColor();
//   Canv2.ResetColor();
//   Canv.FillScreen();
//   Canv2.FillScreen();
// 
//   player.Draw(Cam, Canv, game);
//   player2.Draw(Cam2, Canv2, game);
//   player.Draw(Cam2, Canv2, game);
//   player2.Draw(Cam, Canv, game);
//   Level.Draw(Cam, Canv, game);
//   Level.Draw(Cam2, Canv2, game);
//   Canv2.SetFill(255, 255, 255, 255);
//   Canv2.DrawText("Use Arrow Keys To Move", 0, -250, Cam2)
//   Canv.SetFill(255, 255, 255, 255);
//   Canv.DrawText("Use W,A,S,D Keys To Move", 0, -250, Cam)
//   game.Loop(loop);
// 
// }
