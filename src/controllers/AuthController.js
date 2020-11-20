module.exports = {
    async getQRCODE(req, res, next) {
      try {
        const Zapi = req.Zapi

        const qrcode = await Zapi.getQRCodeBase64()
        await Zapi.logQRCode()
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
  