module.exports = {
    async getQRCODE(req, res, next) {
      try {
        const Zapi = req.Zapi
        const qrcode = await Zapi.evaluate(() => {
          return document.querySelector('canvas').toDataURL()
        })
        // const img = Buffer.from(qrcode, 'base64');

        // res.writeHead(200, {
        //   'Content-Type': 'image/png',
        //   'Content-Length': img.length
        // });
        // res.end(img); 
        return res.json({base64:qrcode}).status(200)
      } catch(error) {
        next(error)
      }
    }
  }
  