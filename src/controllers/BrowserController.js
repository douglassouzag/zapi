const args = require('yargs').argv;
const puppeteer = require('puppeteer');
const port = args.port;
module.exports = {
  async close(req, res, next) {
    try {
			await req.Zapi.close();
      return res.send({message:'Page closed',status:1}).status(200)
    } catch(error) {
      next(error)
    }
  },
  async kill(req, res, next) {
    try {
			await req.Browser.close();
      return res.send({message:'Browser closed',status:1}).status(200)
    } catch(error) {
      next(error)
    }
  },
  async start(req, res, next) {
    try {
		const browser = await puppeteer.launch({ 
			headless: false, 
			executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
			userDataDir: './sessions/' + port
		});
		const page = await browser.newPage();
		await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36');	
		await page.goto('https://web.whatsapp.com/', {waitUntil: 'load'});
		global.Zapi = page;
		global.Browser = browser;
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
