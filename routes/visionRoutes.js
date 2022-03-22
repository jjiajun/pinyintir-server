const express = require('express');
const vision = require('@google-cloud/vision');
const { Translate } = require('@google-cloud/translate').v2;
const { pinyinify } = require('hanzi-tools');

const client = new vision.ImageAnnotatorClient();
const translate = new Translate();

const checkChinese = async (req, res) => {
  try {
    const [result] = await client.annotateImage(req.body.requests[0]);
    const text = result.fullTextAnnotation?.text;
    const annotations = result.textAnnotations;
    annotations.shift();

    if (!text) {
      res.json({ status: 'Text not found', chinese: [] });
      return;
    }

    const lines = text.split('\n');
    let chinese = [];
    const toTranslate = [];
    let count = 0;

    for (let i = 0; i < lines.length; i += 1) {
      const characters = lines[i];
      // const characters = lines[i].match(/[\u3000\u3400-\u4DBF\u4E00-\u9FFF]|[0-9]+/g)?.join('');
      const regex = /[\u3000\u3400-\u4DBF\u4E00-\u9FFF]/g;
      if (regex.test(characters)) {
        // console.log('chars',characters)
        // const firstWord = characters[0]
        // console.log('firstword',firstWord)
        // const firstIndex = annotations.findIndex(({description})=>description[0] === firstWord)
        // console.log('firstIndex',firstIndex)
        // console.log('annote',annotations[firstIndex])

        let wordCounter = 0;
        console.log('chars', characters);
        let firstIndex = -1;
        while (firstIndex < 0) {
          let firstWord = characters[wordCounter];
          console.log('before regex first word',firstWord,'test',regex.test(firstWord))
          while (!regex.test(firstWord)){
            wordCounter += 1
            firstWord = characters[wordCounter];
            console.log('regex first word',firstWord)
            if (wordCounter >= characters.length) {
            break;
          }
          }
          console.log('firstword', firstWord);
          firstIndex = annotations.findIndex(({ description }) => description[0] === firstWord);
          wordCounter += 1;
          if (wordCounter >= characters.length) {
            break;
          }
        }
        console.log('annote', annotations[firstIndex]);
        let vertices;

        if (firstIndex === -1) {
          vertices = [{ x: 0, y: 0 }];
        } else {
          vertices = annotations[firstIndex].boundingPoly.vertices;
          let indexDifference = 0;
          for (let j = 0; j < characters.length; j += 1) {
            console.log('counter j:', j);
            if (firstIndex + j > annotations.length - 1) {
              break;
            }
            if (characters[j] === annotations[firstIndex + j].description[0]) {
              indexDifference += annotations[firstIndex + j].description.length;
              j += annotations[firstIndex + j].description.length - 1;
            }
          }
          annotations.splice(firstIndex, indexDifference);
          console.log('length', annotations.length)
        }
        const pinyin = pinyinify(characters);
        toTranslate.push(translate.translate(characters, 'en'));
        count += 1;
        chinese.push({
          id: count, characters, pinyin, vertices,
        });
      }
    }

    if (toTranslate.length > 0) {
      const allTranslations = await Promise.all(toTranslate);
      chinese = chinese.map((obj, i) => {
        // each element in allTranslations will be an array, we want the first element of that array
        // this first element is possibly an array also depending on the data
        // thats why we do another check
        const [translations] = allTranslations[i];
        const translation = Array.isArray(translations) ? translations[0] : translations;
        return { ...obj, translation };
      });
    }

    res.json({ chinese });
  } catch (error) {
    res.status(503).send({ error });
    console.log(error);
  }
};

const visionRouter = express.Router();

module.exports = (verifyToken) => {
  visionRouter.post('/', checkChinese);
  return visionRouter;
};
