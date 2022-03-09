class BaseController {
  constructor(model, salt) {
    this.model = model;
    this.salt = salt;
  }

  errorHandler = (err, res) => {
    console.log("\x1b[36m%s\x1b[0m", "Error bro");
    console.error("\x1b[31m%s\x1b[0m", err);
    res.send(err);
  };
}

module.exports = BaseController;
