module.exports = {
    async isConnected(req, res, next) {
        try{

            const Zapi = req.Zapi
           
            await Zapi.isConnected(30000)
            
            next()
            
        } catch (error){
            return res.send({error:'Whatsapp is not connected',status:0}).status(500)
        }   
    },
    async isAuthPage(req, res, next) {
        try{
            
            const Zapi = req.Zapi
            
            await Zapi.isInAuthPage(30000)
    
            next()
            
        } catch (error){
            return res.send({error:'QRCode is not attached to the page',status:0}).status(500)
        }   
    }
}