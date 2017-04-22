// resizetool.js
const Promise = require("bluebird")

/*
 * guessresize
 * 
 * here we already have an image and now we'll guess how we shall resize this thing
 * 
 * @param resize
 *   resize info received from the dude
 * @param width
 *   the actual image width from the image
 * @param height
 *   the actual image height from the image
 * @returns
 *   the new width and new height based on what we figured out
 */
const guessresize = (resize, width, height) => {
  // we'll do our best to figure out how to resize it
  let rwidth = resize
  let rheight = 0
  if (resize.indexOf(",") > -1)
    [rwidth, rheight] = resize.split(",")
  if (rwidth == "")
    throw new Error(`Dude, give something like '20%' or '10%,15%'. 
      Even '100,300'. don't give me ${resize} plz.`)
  if (rwidth.indexOf("%") > -1) {
    // the dude gave us percentage
    rwidth = rwidth.replace("%", "")
    rwidth = parseFloat(rwidth)
    rwidth *= 0.01
    if (rheight) {
      rheight = rheight.replace(/\D/g, "")
      rheight = parseFloat(rheight)
      rheight *= 0.01
      rheight = rheight * height
    } else {
      rheight = rwidth
    }
    width *= rwidth
    height *= rheight
  } else {
    // dude gave us pixels. what? em? pt? nope nope nope
    rwidth = rwidth.replace(/\D/g, "")
    if (rheight) {
      rheight = rheight.replace(/\D/g, "")
    } else {
      let pct = parseFloat(rwidth) / parseFloat(width)
      rheight = height * pct
    }
    width = rwidth
    height = rheight
  }
  return [width, height]
}

/*
 * resize tool
 * here we'll force the friendship and resize the thing based on many naive beliefs.
 * 
 * @param file
 *   the file from form input
 * @param rezie
 *   the resize information we'll need to work on this file
 * @returns
 *   the promise containing the canvas.toBlob() return. kinda trippy.
 * 
 */
exports.resize = (file, resize) => new Promise((resolve, reject) => {

  if (!resize) {
    reject(new Error("dude, where's my resize info?"))
    return
  }

  let img = document.createElement("img")
  img.onload = _ => {
    let cnv = document.createElement("canvas")
    let w = document.createAttribute("width")
    let h = document.createAttribute("height")

    let wh = guessresize(resize, img.width, img.height)
    w.value = wh[0]
    h.value = wh[1]
    cnv.setAttributeNode(w)
    cnv.setAttributeNode(h)
    let ctx = cnv.getContext("2d")
    ctx.drawImage(img, 0, 0, w.value, h.value)
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