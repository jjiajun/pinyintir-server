# Chinese-AR-App

<div id="top"></div>

## PinYinTir
Learning Chinese has never been easier. With **PinYinTir**, you can scan an image of Chinese text and understand it immediately!

This is the backend repo. Frontend repo can be found [here](https://github.com/jjiajun/pinyintir-frontend-mobile).


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#usage--features">Usage / Features</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
  <img src="https://user-images.githubusercontent.com/40411953/160347715-d4f57c90-615a-4913-9891-1b178f84c85e.png" />
</div>

Mandarin Chinese is one of the most widely spoken languages in the world, with over 900 million native speakers and close to 200 million second language speakers, as per the 2022 Edition of Ethnologue.

The problem with languages like Chinese is that it is not a phonetic language. Hanyu Pinyin, often abbreviated to pinyin, is the official romanization system for Standard Mandarin Chinese. It is often used to teach Mandarin Chinese, which is written using the standard Chinese characters and the pronounciations of these characters are demonstrated through their according pinyin romanization. 

A problem then arises: how does one go about learning or pronouncing a new character that one encounters without pinyin?

Traditional means like dictionaries are not a viable option as they require one to know either the pinyin or the radicals (i.e. the different strokes of the character) to be able to look up the character. 

Newer means like Google Translate provide some help in this regard but are lacking also, as the pinyin and pronounciation are not the main focus. Rather, the focus is on the translation and it is really only helpful if you want to know just the meaning of the words in another language. 

We present _**PinYinTir**_. A mobile app that provides the pinyin, translation, and pronounciation of any Chinese text scanned via the camera through the use of optical character recognition. These are overlaid on the original image for easy reference and users can save phrases and/or images for future reference. Look no further for your solution to learning Chinese easily!

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage / Features

<!-- <div align="center"><img src="https://user-images.githubusercontent.com/40411953/158035858-782bd724-4abb-4458-892e-d9b78ca57667.png" /></div> -->

<br />1. Once the app loads, you should be brought to the Scan page and be greeted with a camera view. Scan an image that includes Chinese text. The pinyin of any detected Chinese text will be shown as an overlay on the image. You can tap on each individual phrase to see the English translation and text-to-speech functionality.<br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163386842-1e7c3fe3-de1c-454b-bf4c-69710b47748d.gif" />
</div>

<br/>

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163414200-377e6320-aaaf-477e-9c9a-3d986a00d5de.gif" />
</div>


</div>

<!-- <div align="center"><img src="https://user-images.githubusercontent.com/40411953/158035913-071aa70f-b4a7-4b51-9b43-aaba9aa6cb2b.png" /></div> -->

<br />2. Although this application can be used without any sign up needed, signing up for an account will unlock the other features - mainly to save phrases and images. Click on Log In on the nav bar to log in or sign up.<br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163386890-f919ca9d-6778-482a-9fcc-9a66c18711d3.gif" />
</div>

<!-- <div align="center"><img src="https://user-images.githubusercontent.com/40411953/158035981-89829d69-e8db-43a6-903a-c9855962714d.png" /></div> -->

<br />3. Upon log in, you will be brought back to the Scan page. This time, the nav bar should be updated with additional pages - Images, Phrases, and Settings.<br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163386900-09572407-7b3b-4087-8304-cdbdca264f64.gif" />
</div>

<!-- <div align="center"><img src="https://user-images.githubusercontent.com/40411953/158036032-78fd3a16-3461-4937-81a2-e432f4de9e55.png" /></div> -->

<br />4. Now, when any image is scanned and the results shown, there is an option to save this image. Also, when viewing individual phrases, there is also an option to save just this phrase alone.<br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163386928-3094a7e9-af7f-49ad-913c-ede91cb6557e.gif" />
</div>

</br>

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163387004-62ff436c-0a6b-4c1b-9af4-b3eee938c843.gif" />
</div>

<!-- <div align="center"><img src="https://user-images.githubusercontent.com/40411953/158036333-dfe02ea2-7aae-4b55-8720-4fd163a0ffdc.png" /></div> -->

<br />5. Go to the Images page to view all your past saved images.<br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163387130-295a70cb-e977-493b-8bb6-ee1ef7cea99f.jpg" width="320px"/>
</div>

<br />6. Go to the Phrases page to view all your past saved phrases. Here, you can create categories for these phrases and sort them accordingly. <br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163387028-f0ff72bc-7e18-4fe0-b387-51661601ffa3.gif" />
</div>

<br />7. Go to the Settings page to adjust the pitch and speed of the text-to-speech voice. You can also log out here.<br /><br />

<div align="center">
  <img src="https://user-images.githubusercontent.com/90031266/163387074-ac04a570-1455-4e13-85c6-10cb2146a733.gif" />
</div>

<p align="right">(<a href="#top">back to top</a>)</p>

## Built With

<strong>Frontend</strong>
* [React Native](https://reactnative.dev/)

<strong>Backend</strong>
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)

<strong>Functionality</strong>
* [Google Cloud Vision](https://cloud.google.com/vision)
* [Google Cloud Translate](https://cloud.google.com/translate)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* Install Expo Go on your mobile device from either App Store (Apple) or Play Store (Android

### To run

Backend

The backend is hosted on Heroku already and no setup is necessary. Please contact the developers if you wish to get a local copy of the backend repo running. 

Frontend

1. Clone the repo
2. Create .env file
  ```sh
  REACT_APP_BACKEND=https://chinese-ar-backend.herokuapp.com
  ```
3. Install NPM packages
   ```sh
   npm i
   ```
4. Run frontend
   ```sh
   npm start
   ```
5. Scan generated QR code with camera (iOS) or Expo Go app (Android)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Jia Hao: [GitHub](https://github.com/lim-jiahao/) - lim.jiahaoo@gmail.com

Dominique: [GitHub](https://github.com/dominiqueyeo) - dominiqueyeo@hotmail.com

Tristan: [GitHub](https://github.com/jjiajun) - teo.jia.jun.29@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>


## Guide

To start the backend:

```
"npm run devStart"
```

To seed the db:

```
Run "npm run seed"
```

## Database Details

- Mongoose hosted on MongoDB Atlas

## Multer set-up

### Basic Info

- Helper functions to upload and download images from S3 are stored in s3.js
- Controller functions for upload/download are stored in userCtrl.js

### How to upload/download images to/from S3 from frontend

- To upload images (frontend > express > AWS S3 bucket):

```
const result = await axios.post(
  `localhost:3008/api/images`,
  formData,
  {
    headers: { "Content-Type": "multipart/form-data" },
  }
);
```

- To download and read image data (AWS S3 bucket > express > frontend):

```
<img src={`${REACT_APP_BACKEND}/images/05e735782f00bba93f01df9335ecde0a`} ></img>
```
