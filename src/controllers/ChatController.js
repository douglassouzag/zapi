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
  
      return res.send().status(200)
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

      await Zapi.click('div[class="_2kHpK"]')

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
      return res.send({messages:messages}).status(200)
      
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
      
      await Zapi.click('div[class="_2kHpK"]')
      
      await Zapi.waitForSelector('div[class="_3uMse"]',{
        visible:true
      })
      await Zapi.type('div[class="_3uMse"]',message)
      
      await Zapi.keyboard.press('Enter')
      
      return res.send({message:'Mensagem enviada!'}).status(200)
      
    } catch(error){
      next(error)
    }
  }
}
