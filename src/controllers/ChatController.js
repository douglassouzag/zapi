module.exports = {
  async openChat(req, res, next) {
    const Zapi = req.Zapi
    try {
      await Zapi.goto('https://web.whatsapp.com/')
      return res.send().status(200)
    } catch(error) {
      next(error)
    }
  }
}
