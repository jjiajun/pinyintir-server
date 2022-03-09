const BaseController = require("./baseCtrl");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { uploadFile, getFileStream } = require("../s3.js");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

class UserController extends BaseController {
  constructor(model, salt) {
    super(model, salt);
  }

  /** get user profile data by id
   * @param {string} id
   */
  async getUserProfileById(req, res) {
    try {
      const { id } = req.body;
      console.log("ID: ", id);
      const userProfile = await this.model
        .findOne({ _id: id })
        .populate("friends");

      if (!userProfile) {
        return res.send("No data");
      }

      res.send({ userProfile });
    } catch (err) {
      this.errorHandler(err, res);
    }
  }

  async uploadImage(req, res) {
    const file = req.file;
    const imagePath = req.file.path;
    const description = req.body.description;
    console.log("req.file: ", req.file);
    console.log("uploadFile: ", uploadFile);
    const result = await uploadFile(file);
    /** result:  {
      ETag: '"76823f128b9a086c136a0f378a35691f"',
      // this location url can be used to directly access images (if we allow public access) (we didnt though)
      Location: 'https://chinese-ar-app.s3.ap-southeast-1.amazonaws.com/16dd64db8c69c194e3b09696d8a6086b',
      key: '16dd64db8c69c194e3b09696d8a6086b',
      // This Key matches the name of the file that is on s3 bucket now (you can check it out!)
      Key: '16dd64db8c69c194e3b09696d8a6086b',
      Bucket: 'chinese-ar-app'
    } */
    // deletes file after it is uploaded
    await unlinkFile(file.path);
    console.log("result: ", result);
    res.send({ imagePath: `/images/${result.Key}` });
  }

  async downloadImage(req, res) {
    const key = req.params.key;
    const readStream = getFileStream(key);
    // pipe the image stream straight back to the client
    readStream.pipe(res);
  }

  /** Returns a token and the userId to the FE if log in is successful
   * @param {string} email
   * @param {string} password
   */
  async logIn(req, res) {
    console.log("logging in");
    const { email, password } = req.body;
    console.log("email", email);
    const user = await this.model.findOne({ email });
    try {
      if (!user) {
        res.send("The email or password is incorrect");
      } else {
        // salts and hashes the first password, then compare with the hashed password from the db to make sure that they are the same. If they are, return true, else return false.
        const logInSuccess = await bcrypt.compare(password, user.password);

        if (logInSuccess) {
          const payload = {
            _id: user._id,
            name: user.name,
            address: user.address,
          };
          const token = jwt.sign(payload, this.salt, { expiresIn: "6h" });
          console.log(user);
          res.send({ token, userId: user._id, success: true });
        } else {
          res.send("The email or password is incorrect");
        }
      }
    } catch (err) {
      this.errorHandler(err, res);
    }
  }

  /** Returns a token to the FE if sign up is successful
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @param {string} address
   */
  async signUp(req, res) {
    console.log("signing up");
    const { name, email, password, address } = req.body;
    try {
      // auto generates a salt > concatentate with password > hash it x no. of salt rounds and return the hash
      // the higher the salt rounds, the more time the hashing algo takes -> good thing
      const hash = await bcrypt.hash(password, 10);
      const newUser = await this.model.create({
        name,
        email,
        password: hash,
        address: address,
      });
      if (!newUser) {
        console.log("not new user");
        res.send("Something went wrong when creating a new user");
      } else {
        console.log("done the do");
        const payload = {
          _id: newUser._id,
          name: newUser.name,
        };
        const token = jwt.sign(payload, this.salt, {
          expiresIn: "6h",
        });
        res.send({ token, userId: newUser._id });
      }
    } catch (err) {
      this.errorHandler(err, res);
    }
  }
}

module.exports = UserController;
