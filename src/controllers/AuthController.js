module.exports = {
    async getQRCODE(req, res, next) {
      try {
        const Zapi = req.Zapi

        try{
          await Zapi.click('div[class="_2pf2n"]');
        } catch (error){

        }

        const qrcode = await Zapi.evaluate(() => {
          return document.querySelector('canvas').toDataURL()
        })
        const img = new Buffer.from(qrcode.split(",")[1], 'base64');

        res.writeHead(200, {
          'Content-Type': 'image/png',
          'Content-Length': img.length
        });
        res.end(img); 
      } catch(error) {
        next(error)
      }
    }
  }
  