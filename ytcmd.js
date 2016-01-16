var GetThumbs = require("./youtube-image.js").downloadThumbnails;

function CmdThumb(){
  var args = process.argv.slice(2, process.argv.length);
  args.forEach(function(arg) {GetThumbs(arg)});
}
CmdThumb();
