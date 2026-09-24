import mongoose from "mongoose";

const competitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    bannerImage: {
      type: String,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    registrationStart: {
      type: Date,
      required: true,
    },

    registrationEnd: {
      type: Date,
      required: true,
    },

    competitionStart: {
      type: Date,
      required: true,
    },

    competitionEnd: {
      type: Date,
      required: true,
    },

    maxParticipants: {
      type: Number,
    },

    rules: [
      {
        type: String,
      },
    ],

    prizes: [
      {
        position: {
          type: String,
          required: true,
        },

        title: {
          type: String,
          required: true,
        },

        amount: {
          type: Number,
        },
      },
    ],

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    status: {
      type: String,
      enum: ["draft", "upcoming", "live", "completed"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

const competitionModel = mongoose.model(
  "competition",
  competitionSchema
);

export default competitionModel;