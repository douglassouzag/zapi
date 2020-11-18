module.exports = {
  async openChat(req, res, next) {
    try {
      const Zapi = req.Zapi

      const phoneNumber = req.query.phone

      await Zapi.evaluate(() => {
        try {
          return document.querySelector('button[class="MfAhJ"]').click()
        } catch (error){
          return
        }
      })
      
      await Zapi.type('div[class="_3FRCZ copyable-text selectable-text"]',phoneNumber)

      await Zapi.waitForSelector('button[class="MfAhJ"] span[data-icon="x-alt"]',{
        visible: true
      })

      await Zapi.click('div[class="_2kHpK"]')
  
      return res.send({message:'Chat opened',status:1}).status(200)
    } catch(error) {
      next(error)
    }
  },
  async getMessages(req, res, next) {
    try {
      const Zapi = req.Zapi
      
      const phoneNumber = req.query.phone

      await Zapi.evaluate(() => {
        try {
          return document.querySelector('button[class="MfAhJ"]').click()
        } catch (error){
          return
        }
      })
      
      await Zapi.type('div[class="_3FRCZ copyable-text selectable-text"]',phoneNumber)

      await Zapi.waitForSelector('button[class="MfAhJ"] span[data-icon="x-alt"]',{
        visible: true
      })

      try{
        await Zapi.click('div[class="_2kHpK"]')
      } catch (error) {
        return res.send({error:'Chat not found',status:0}).status(200)
      }

      const messages = await Zapi.evaluate(() => {
        var arrayMessages = [];
        
        document.querySelectorAll('div[class="_3sKvP wQZ0F"]').forEach(message =>{
          
          try{
            messageObj = {
              type: message.parentElement.querySelector('span[data-icon]').getAttribute('data-icon').replace('tail-',''),
              author: message.querySelector('span[aria-label]').getAttribute('aria-label').replace(':',''),
              date: message.querySelector('span[class="_18lLQ"]').textContent,
              content: {
                message: message.querySelector('div[class="eRacY"]').textContent
              }
            };
            arrayMessages.push(messageObj);
          }
          catch(error){
          }
        });
        return arrayMessages;
      })
      return res.send({messages:messages,status:1}).status(200)
      
    } catch(error){
      next(error)
    }
  },
  async sendMessage(req, res, next) {
    try {
      const Zapi = req.Zapi
      
      const phoneNumber = req.query.phone
      const message = req.query.message

      await Zapi.evaluate(() => {
        try {
          return document.querySelector('button[class="MfAhJ"]').click()
        } catch (error){
          return
        }
      })
      
      await Zapi.type('div[class="_3FRCZ copyable-text selectable-text"]',phoneNumber)

      await Zapi.waitForSelector('button[class="MfAhJ"] span[data-icon="x-alt"]',{
        visible: true
      })
      
      try{
        await Zapi.click('div[class="_2kHpK"]')
        await Zapi.waitForSelector('div[class="_3uMse"]',{
          visible:true
        })
        await Zapi.type('div[class="_3uMse"]',message)
        
        await Zapi.keyboard.press('Enter')
        
        return res.send({message:'Message sent',status:1}).status(200)
      } catch (error){
        const newChatlink = 'https://api.whatsapp.com/send?phone='+phoneNumber+'&text='+message
        
        await Zapi.goto(newChatlink,{
          waitUntil: 'load'
        })
        await Zapi.waitForSelector('#action-button')
        await Zapi.click('#action-button')
        
        await Zapi.waitForSelector('div[class="_8ibw"] a[class="_36or"]')
        
        await Zapi.evaluate(() => {
          document.querySelector('div[class="_8ibw"] a[class="_36or"]').click();
        })
        await Zapi.waitForSelector('div[class="_3uMse"]',{
          visible:true
        })
        await Zapi.keyboard.press('Enter')
        return res.send({message:'Message sent',status:1}).status(200)
      }
      
      
    } catch(error){
      next(error)
    }
  },
  async watchForNewMessages(req, res, next) {
    try {
      const Zapi = req.Zapi

      await Zapi.evaluate(() => {
        function getNewMessages(){

          try{
              const clickEvent = new MouseEvent('mousedown', {
                  view: window,
                  bubbles: true,
                  cancelable: true
              });
          
              const notificationArray = document.querySelectorAll('._31gEB')
              notificationArray.forEach(n=>{
                  n.dispatchEvent(clickEvent);
              })
              return
          } catch(error){
              return
          }
      }
      messageLoop = setInterval(getNewMessages,100);
      })
      
    return res.send({message:'Watching for new messages',status:1}).status(200)
      
      
    } catch(error){
      next(error)
    }
  },
  async stopWatchingForNewMessages(req, res, next) {
    try {
      const Zapi = req.Zapi

      await Zapi.evaluate(() => {
        clearInterval(messageLoop);
      })
      
    return res.send({message:'Stopping watch for new messages',status:1}).status(200)
      
      
    } catch(error){
      next(error)
    }
  }
}
