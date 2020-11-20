
const args = require('yargs').argv;
const Zapi = require('zapi-automate');
const express = require('express');

const app = express();

const cors = require('cors');
const routes = require('./routes');
const port = args.port;

(async () => {
	const WPP = new Zapi({ 
		defaultViewport: null,
		headless: false, 
		executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
		userDataDir: './sessions/' + port
	})
	
	await WPP.launch()
  	global.Zapi = WPP;
})();

app.use(cors())
app.use(express.json())
app.use('/api/v1', routes);

app.use((error,req,res,next) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
})

app.listen(port, ()=> console.log('Server running on port '+port))

