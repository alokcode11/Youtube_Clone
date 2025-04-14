import mongoose from "mongoose";
const videoSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  fullTitle: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  channelName: {
    type: String,
  },
  videoOwnerLogo: {
    type: String,
  },
  views: {
    type: String,
  },
  posted: {
    type: String,
  },
  videoLength: {
    type: String,
  },
  likes: {
    type: String,
  },
  dislike: {
    type: String,
  },
  description: {
    type: String,
  },
  commentsCount: {
    type: String,
  },
  comments: {
    type: [Object],
  },
});

export const videoModel = mongoose.model("Video", videoSchema);

// Schema Definitions
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

export const User = mongoose.model("User", userSchema);

const commentSchema = new mongoose.Schema({
  commentData: { type: Object },
});
export const comment = mongoose.model("comment", commentSchema);

// Define Schema for Channel
const channelSchema = new mongoose.Schema({
  username: { type: String },
  userhandle: { type: String },
});

export const channel = mongoose.model("channel", channelSchema);
