
const args = require('yargs').argv;
const puppeteer = require('puppeteer');
const express = require('express');

const app = express();

const cors = require('cors');
const routes = require('./routes');
const port = args.port;

(async () => {
	const browser = await puppeteer.launch({ 
		headless: false, 
		executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
		userDataDir: '../sessions/' + port
	});
	const page = await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36');	
	await page.goto('https://web.whatsapp.com/', {waitUntil: 'load'});
  	global.Zapi = page;
})();

app.use(cors())
app.use(express.json())
app.use('/api/v1', routes);

app.use((error,req,res,next) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
})

app.listen(port, ()=> console.log('Server running on port '+port))

