const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      match: /.+\@.+\..+/,
    },
    password: { type: String, required: true },
    phrases: [
      {
        chinesePhrase: String,
        pinyin: String,
        definition: String,
      },
    ],
    images: [
      {
        imagePath: String,
        description: String,
      },
    ],
  },
  /**
   * The { timestamps: true } tells Mongoose to automatically add createdAt and updatedAt properties to the schema. By default, createdAt and updatedAt are of type "Date".
   * When you update a document, Mongoose automatically increments updatedAt.
   * */
  { timestamps: true }
);

module.exports = model("User", userSchema);
