const BaseController = require('./baseCtrl.js');

class PhraseController extends BaseController {
  /** Add phrase
    * @param {string} userId
  */
  async uploadPhrase(req, res) {
    try {
      const {
        userId, chinesePhrase, pinyin, definition,
      } = req.body;
      await this.model.updateOne(
        { _id: userId },
        {
          $push: {
            phrases: {
              chinesePhrase,
              pinyin,
              definition,
              category: ['All Phrases'],
            },
          },
        },
      );
      res.send('successfully uploaded phrase!');
    } catch (err) {
      this.errorHandler(err, res);
    }
  }

  /** get phrases by id and category name
   * @param {string} userId
   * @param {string} category
  */
  async getPhrasesByIdAndCategory(req, res) {
    try {
      const { userId, category } = req.body;
      const userProfile = await this.model.findOne({
        _id: userId,
      });
      if (!userProfile) {
        res.send('No data');
        return;
      }
      const filteredPhrases = userProfile.phrases.filter(
        (phrase) => phrase.category.includes(category),
      );
      res.send(filteredPhrases);
    } catch (err) {
      this.errorHandler(err, res);
    }
  }

  /** Delete a phrase
   * @param {string} userId
   * @param {string} phraseId
  */
  async deletePhrase(req, res) {
    try {
      const { userId, phraseId } = req.body;
      console.log('PHRASE ID: ', phraseId);
      await this.model.updateOne(
        // this should contain info to identify the particular data that you want to update
        { _id: userId },
        // pull a particular phrase out of an array
        {
          $pull: {
            phrases: {
              _id: phraseId,
            },
          },
        },
      );
      res.send('Deleted phrase successful!');
    } catch (err) {
      this.errorHandler(err, res);
    }
  }

  /** Create new category
   * @param {string} userId
   * @param {string} newCategory
  */
  async addNewCategory(req, res) {
    try {
      const { userId, newCategory } = req.body;
      await this.model.updateOne(
        // this should contain info to identify the particular data that you want to update
        { _id: userId },
        // push data into a particular array
        {
          $push: {
            categories: {
              name: newCategory,
            },
          },
        },
      );
      res.send('Added new category successfully!');
    } catch (err) {
      this.errorHandler(err, res);
    }
  }

  /** Delete a category
   * @param {string} userId
   * @param {string} categoryToDelete
  */
  async deleteCategory(req, res) {
    try {
      const { userId, categoryToDelete } = req.body;
      await this.model.updateOne(
        // this should contain info to identify the particular data that you want to update
        { _id: userId },
        // remove data from array
        {
          $pull: {
            categories: {
              name: categoryToDelete,
            },
          },
        },
      );
      res.send('Deleted category successful!');
    } catch (err) {
      this.errorHandler(err, res);
    }
  }

  /** Get all categories by userId
    * @param {string} userId
  */
  async getCategories(req, res) {
    try {
      const { userId } = req.body;
      const categories = await this.model.findOne({ _id: userId })
        .select('categories');
      if (!categories) {
        res.send('No data');
        return;
      }
      res.send(categories.categories);
    } catch (err) {
      this.errorHandler(err, res);
    }
  }
}

module.exports = PhraseController;
