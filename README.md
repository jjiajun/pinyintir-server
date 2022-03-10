# Chinese-AR-App

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

- Helper functions to upload and download images from S3 is stored in s3.js
- Controller functions for upload/download is stored in userCtrl.js

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
