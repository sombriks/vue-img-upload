/*
 * resize tool
 * here we'll force the friendship and resize the thing based on many naive beliefs.
 * 
 * @param file
 *   the file from form input
 * @param rezie
 *   the resize information we'll need to work on this file
 * @return
 *   the promise containing the canvas.toBlob() return. kinda trippy.
 * 
 */
const Promise = require("bluebird")

exports.resize = (file, resize) => new Promise((resolve, reject) => {

  if (!resize) {
    reject(new Error("dude, where's my resize info?"))
    return
  }

  let img = document.createElement("img")
  img.onload = _ => {
    let cnv = document.createElement("canvas")
    cnv.width = "200px"
    cnv.height = "200px"
    let ctx = cnv.getContext("2d")
    ctx.drawImage(img, 0, 0)
    cnv.toBlob(blob => {
      resolve(URL.createObjectURL(blob))
    }, 'image/jpeg', 0.95)
  }
  img.src = URL.createObjectURL(file)
})