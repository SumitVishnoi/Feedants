import express from "express";

import {
  createCompetition,
  deleteCompetition,
  getAllCompetitions,
  getCompetitionById,
  getCompetitionParticipants,
  registerForCompetition,
  updateCompetition,
} from "../controllers/competition.controller.js";
import { authenticateUser } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/", authenticateUser, createCompetition);

router.get("/", getAllCompetitions);

router.get("/:id", getCompetitionById);

router.put("/:id", authenticateUser, updateCompetition);

router.delete("/:id", authenticateUser, deleteCompetition);

router.post("/:id/register", authenticateUser, registerForCompetition);

router.get("/:id/participants", authenticateUser, getCompetitionParticipants);

export default router;
