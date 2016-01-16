// Downloads thumbnails from YouTube videos

var request = require("sync-request"),
    fs = require("fs"),
    path = require("path");

var DIR = "YtThumbs",
    VALIDSTATUS = [200, 304],

    URLS = {
  // Small auto-generated
  1: "http://img.youtube.com/vi/*/1.jpg",
  2: "http://img.youtube.com/vi/*/2.jpg",
  3: "http://img.youtube.com/vi/*/3.jpg",
  // Custom
  Small: "http://img.youtube.com/vi/*/mqdefault.jpg",
  Medium: "http://img.youtube.com/vi/*/0.jpg",
  Large: "http://img.youtube.com/vi/*/maxresdefault.jpg"
},
    KEYS = Object.keys(URLS);

function makeDirectory(dir){
  try{
    fs.mkdirSync(dir);
  }
  catch(e){
    if (e.code == "EEXIST") console.warn(e.message);
    else throw e;
  }
}

function downloadThumbnails(vidId){
  makeDirectory(DIR);
  for (var i=0; i<KEYS.length; i++){
    makeDirectory(path.join(DIR, KEYS[i]));
    url = URLS[KEYS[i]].replace("*", vidId);
    var res = request("GET", url);

    if (!~VALIDSTATUS.indexOf(res.statusCode))
      throw new Error("Invalid status code received for image class:", KEYS[i]);

    else{
      console.log("Type:", res.headers["content-type"]);
      console.log("Length:", res.headers["content-length"], "\n");
      var fileOut = "Auto_" + vidId + i + ".jpg";
      var finalFile = path.join(DIR, KEYS[i], fileOut);
      fs.writeFileSync(finalFile, res.body, "binary");
    }
  }
  console.log("Done!");
}

exports.downloadThumbnails = downloadThumbnails;
