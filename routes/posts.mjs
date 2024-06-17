import { getPostAndIndex } from "../middelware/getPostId.mjs";
import { checkSchema } from "express-validator";
import {createPostValidationSchema } from "../validationSchemas/createPostValidationSchema.mjs";
import { getTodaysDate } from "../middelware/getTodaysDate.mjs";
import express from "express";

// controllers
import { deletePost, getPost, patchPost, postPost, putPost } from "../controllers/postController.mjs";

const router = express.Router();
router.use(express.urlencoded({ extended: true}))

// Validation för denna, kolla att bodyn är korrekt formaterad.
router.post("/", checkSchema(createPostValidationSchema), getTodaysDate, postPost);

router.get("/:index", getPostAndIndex, getPost);

// validation för korrekt format behövs
router.put("/:index", getPostAndIndex, putPost);

router.patch("/:index", getPostAndIndex, patchPost);

router.delete("/:index", getPostAndIndex, deletePost);

export { router as postRouter };