import videoModel from "../Model/product.model.js";

export function createVideos(req, res) {
  const {
    id,
    title,
    fullTitle,
    videoUrl,
    category,
    thumbnail,
    channelName,
    videoOwnerLogo,
    views,
    posted,
    videoLength,
    likes,
    dislike,
    description,
    commentsCount,
    comments,
  } = req.body;

  if (
    !id ||
    !title ||
    !fullTitle ||
    !videoUrl ||
    !category ||
    !thumbnail ||
    !channelName ||
    !videoOwnerLogo ||
    !views ||
    !posted ||
    !videoLength ||
    !likes ||
    !dislike ||
    !description ||
    !commentsCount ||
    !comments
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newVideos = new videoModel({
    id,
    title,
    fullTitle,
    videoUrl,
    category,
    thumbnail,
    channelName,
    videoOwnerLogo,
    views,
    posted,
    videoLength,
    likes,
    dislike,
    description,
    commentsCount,
    comments,
  });
  newVideos
    .save()
    .then((data) => {
      if (!data) {
        // Return a 400 Bad Request response if saving fails without a specific error
        return res.status(400).json({ message: "Something went wrong" });
      }
      // Send the saved product data in the response
      res.send(data);
    })
    .catch((error) => {
      // Handle any errors that occur while saving the product
      res
        .status(500)
        .json({ message: "Error saving Video", error: error.message });
    });
}
