module.exports = (req, res, next) => {
    try{
        if (global.Zapi._closed) {
            return res.send({message:"Browser is closed",status:0}).status(200)
        } else {
            req.Zapi = global.Zapi
            next()
        }
    } catch (error){
        return res.send({error:'Could not check the browser'}).status(500)
    }   
}