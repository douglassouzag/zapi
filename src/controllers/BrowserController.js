module.exports = {
  async close(req, res, next) {
    try {
			await req.Zapi.close();
      return res.send({message:'Browser closed',status:1}).status(200)
    } catch(error) {
      next(error)
    }
  },
  async status(req, res, next) {
    try {
			const status = await req.Zapi.evaluate(() =>{
				try{
					return document.querySelector('div[class="aaIq_"]').textContent
				} catch(error) {
					return ''
				}
			});
      return res.send({phoneStatus:status,status:1}).status(200)
    } catch(error) {
      next(error)
    }
	},
	async screenshot(req, res, next) {
    try {
			const Zapi = req.Zapi
			const base64 = await Zapi.screenshot({ encoding: "base64" })

			const img = Buffer.from(base64, 'base64');

			res.writeHead(200, {
				'Content-Type': 'image/png',
				'Content-Length': base64.length
			});
			res.end(img); 


      // return res.send({screenshot:base64,status:1}).status(200)
    } catch(error) {
      next(error)
    }
	},
}
