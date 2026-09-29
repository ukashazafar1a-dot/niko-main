var canvas = document.createElement("canvas");
canvas.width = 448;
canvas.height = 322;

var ctx = canvas.getContext('2d');
var img = new Image();
img.crossOrigin="anonymous";
var y = 100;

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
}

export const loadImage = (text_title,color,font,properties,isTabletOrMobile) => new Promise((resolve, reject) => {
    img.addEventListener('load', () => {
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        ctx.textAlign= "center";
        ctx.fillStyle = color;
        ctx.textBaseline = 'middle';
        ctx.font = `${properties.fontSize} ${isTabletOrMobile ? font*1.5 : font*0.65}`;
        const maxWidth = 300;
        const lineHeight = parseInt(properties.lineHeight.replace('px',''));

        wrapText(ctx, text_title, 224, y, maxWidth, lineHeight);
        // ctx.fillText(text_title, 224, 130);
        var image = canvas.toDataURL("image/png");
        resolve(image);
    });
    img.addEventListener('error', (err) => reject(err));
    img.src = 'https://cdn.shopify.com/s/files/1/0561/1234/9364/files/Scene_1.jpg?v=1631077545';
  });