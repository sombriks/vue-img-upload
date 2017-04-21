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

  // we'll do our best to figure out how to resize it

  let img = document.createElement("img")
  img.onload = _ => {
    let cnv = document.createElement("canvas")
    let w = document.createAttribute("width")
    let h = document.createAttribute("height")
    w.value = "100px"
    h.value = "100px"
    cnv.setAttributeNode(w)
    cnv.setAttributeNode(h)
    let ctx = cnv.getContext("2d")
    ctx.drawImage(img, 0, 0, 100, 100)
    console.log(ctx)
    console.log(cnv)
    // dammit safari!
    // cnv.toBlob(blob => {
    //   resolve(URL.createObjectURL(blob))
    // }, 'image/jpeg', 0.95)
    resolve(cnv.toDataURL("image/jpeg", 0.9))
  }
  img.src = URL.createObjectURL(file)
})