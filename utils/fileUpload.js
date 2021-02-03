const fs= require('fs')
const rimraf = require("rimraf");

function saveImage(baseImage) {
    //path of folder where you want to save the image.
    const uploadPath = `${__dirname}/../uploads/`;
    //Find extension of file
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
    const fileType = baseImage.substring("data:".length,baseImage.indexOf("/"));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    const base64Data = baseImage.replace(regex, "");
    const rand = Math.ceil(Math.random()*1000);
    //Random photo name with timeStamp so it will not overide previous images.
    const filename = `Photo_${Date.now()}_${rand}.${ext}`;
    //remove older files
    if (fs.existsSync(uploadPath)) {
        rimraf.sync(uploadPath);
    }
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
    }
    if(fs.existsSync(`${__dirname}/../filter.jpg`)){
        fs.unlinkSync(`${__dirname}/../filter.jpg`)
    }
    fs.writeFileSync(uploadPath+filename, base64Data, 'base64');
    return filename
}

module.exports= { saveImage }