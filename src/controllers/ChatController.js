module.exports = {
  async openChat(req, res, next) {
    try {
      const Zapi = req.Zapi

      const phoneNumber = req.query.phone

      await Zapi.openChat(phoneNumber) 
     
  
      return res.send({message:'Chat opened',status:1}).status(200)
    } catch(error) {
      next(error)
    }
  },
  async getMessages(req, res, next) {
    try {
      const Zapi = req.Zapi
      
      const phoneNumber = req.query.phone

      const messages = await Zapi.getMessages(phoneNumber)
      
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

      await Zapi.sendMessage(phoneNumber,message)
      
      return res.send({message:'Message sent',status:1}).status(200)
      
      
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
                  console.log('New message from:',document.querySelectorAll('span[class="_1X4JR"]')[3].textContent)
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
