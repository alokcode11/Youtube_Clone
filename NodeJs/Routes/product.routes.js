import { createVideos } from "../Controller/product.controller.js";

export function routes(app) {
  app.post("/videos", createVideos);
}
