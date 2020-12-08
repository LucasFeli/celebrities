const { Router } = require("express");
const {
  getCelebrities,
  getCelebrity,
  createCelebrity,
  updateCelebrity,
  deleteCelebrity,
} = require("../controllers/celebrity.controllers");
const router = Router();

router
  .get("/", getCelebrities)
  .get("/:celebrityId", getCelebrity)
  .post("/", createCelebrity)
  .patch("/:celebrityId", updateCelebrity)
  .delete("/:celebrityId", deleteCelebrity);

module.exports = router;
