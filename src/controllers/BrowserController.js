const args = require('yargs').argv;
module.exports = {
  async close(req, res, next) {
    try {
      const Zapi = req.Zapi

      await Zapi.closePage()
      return res.send({message:'Page closed',status:1}).status(200)
    } catch(error) {
      next(error)
    }
  },
  async kill(req, res, next) {
    try {
      const Zapi = req.Zapi
    
      await Zapi.closeBrowser()
      return res.send({message:'Browser closed',status:1}).status(200)
    } catch(error) {
      next(error)
    }
  },
  async start(req, res, next) {
    try {
		  const Zapi = req.Zapi 
      await Zapi.launch()
      return res.send({message:'Browser started',status:1}).status(200)
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
			const base64 = await Zapi.screenShot()

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
