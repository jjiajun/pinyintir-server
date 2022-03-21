const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BaseController = require('./baseCtrl.js');

class UserController extends BaseController {
  /** Returns a token and the userId to the FE if log in is successful
   * @param {string} email
   * @param {string} password
   */
  async logIn(req, res) {
    console.log('logging in');
    const { email, password } = req.body;
    console.log('email', email);
    const user = await this.model.findOne({ email });
    try {
      if (!user) {
        res.send('The email or password is incorrect');
      } else {
        // salts and hashes the first password,
        // then compare with the hashed password from the db to make sure that they are the same.
        // If they are, return true, else return false.
        const logInSuccess = await bcrypt.compare(password, user.password);

        if (!logInSuccess) {
          res.send('The email or password is incorrect');
          return;
        }
        const payload = {
          _id: user.id,
          name: user.name,
          address: user.address,
        };
        const token = jwt.sign(payload, this.salt, { expiresIn: '6h' });
        console.log(user);
        res.send({ token, userId: user._id, success: true });
      }
    } catch (err) {
      this.errorHandler(err, res);
    }
  }

  /** Returns a token to the FE if sign up is successful
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} password
   */
  async signUp(req, res) {
    console.log('signing up');
    const {
      firstName, lastName, email, password,
    } = req.body;
    try {
      // auto generates a salt > concatentate with password >
      // hash it x no. of salt rounds and return the hash
      // the higher the salt rounds, the more time the hashing algo takes -> good thing
      const hash = await bcrypt.hash(password, 10);
      const newUser = await this.model.create({
        firstName,
        lastName,
        email,
        password: hash,
      });
      if (!newUser) {
        console.log('not new user');
        res.send('Something went wrong when creating a new user');
      } else {
        console.log('done the do');
        const payload = {
          _id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        };
        const token = jwt.sign(payload, this.salt, {
          expiresIn: '6h',
        });
        res.send({ token, userId: newUser.id });
      }
    } catch (err) {
      this.errorHandler(err, res);
    }
  }

  /** get user profile data by id
   * @param {string} id
   */
  async getUserDataById(req, res) {
    try {
      const { userId } = req.body;
      const userProfile = await this.model.findOne({ _id: userId });
      if (!userProfile) {
        res.send('No data');
        return;
      }
      res.send({ userProfile });
    } catch (err) {
      this.errorHandler(err, res);
    }
  }
}

module.exports = UserController;
