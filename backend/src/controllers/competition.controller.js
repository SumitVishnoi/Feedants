import competitionModel from "../models/competition.model.js";

export const createCompetition = async (req, res) => {
  try {
    const {
      title,
      description,
      bannerImage,
      category,
      registrationStart,
      registrationEnd,
      competitionStart,
      competitionEnd,
      maxParticipants,
      rules,
      prizes,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !registrationStart ||
      !registrationEnd ||
      !competitionStart ||
      !competitionEnd
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const competition = await competitionModel.create({
      title,
      description,
      bannerImage,
      category,
      organizer: req.user._id,
      registrationStart,
      registrationEnd,
      competitionStart,
      competitionEnd,
      maxParticipants,
      rules,
      prizes,
    });

    return res.status(201).json({
      success: true,
      message: "Competition created successfully",
      competition,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create competition",
    });
  }
};

export const getAllCompetitions = async (req, res) => {
  try {
    const competitions = await competitionModel
      .find()
      .populate("organizer", "name email profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      competitions,
    });
  } catch (error) {
    console.error("Get competitions error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch competitions",
    });
  }
};

export const getCompetitionById = async (req, res) => {
  try {
    const { id } = req.params;

    const competition = await competitionModel
      .findById(id)
      .populate("organizer", "name email profileImage");

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }

    return res.status(200).json({
      success: true,
      competition,
    });
  } catch (error) {
    console.error("Get competition error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch competition",
    });
  }
};

export const updateCompetition = async (req, res) => {
  try {
    const { id } = req.params;

    const competition = await competitionModel.findById(id);

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }

    // Only the organizer can update the competition
    if (competition.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this competition",
      });
    }

    const updatedCompetition = await competitionModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Competition updated successfully",
      competition: updatedCompetition,
    });
  } catch (error) {
    console.error("Update competition error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update competition",
    });
  }
};

export const deleteCompetition = async (req, res) => {
  try {
    const { id } = req.params;

    const competition = await competitionModel.findById(id);

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }

    // Only organizer can delete
    if (competition.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this competition",
      });
    }

    await competitionModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Competition deleted successfully",
    });
  } catch (error) {
    console.error("Delete competition error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete competition",
    });
  }
};

export const registerForCompetition = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const competition = await competitionModel.findById(id);

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }

    // Check if already registered
    const alreadyRegistered = competition.participants.some(
      (participant) => participant.toString() === userId.toString()
    );

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "You are already registered for this competition",
      });
    }

    // Check maximum participants
    if (
      competition.maxParticipants &&
      competition.participants.length >= competition.maxParticipants
    ) {
      return res.status(400).json({
        success: false,
        message: "Competition is full",
      });
    }

    // Check registration period
    const now = new Date();

    if (now < competition.registrationStart) {
      return res.status(400).json({
        success: false,
        message: "Registration has not started yet",
      });
    }

    if (now > competition.registrationEnd) {
      return res.status(400).json({
        success: false,
        message: "Registration has ended",
      });
    }

    competition.participants.push(userId);

    await competition.save();

    return res.status(200).json({
      success: true,
      message: "Successfully registered for the competition",
    });
  } catch (error) {
    console.error("Register competition error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to register for competition",
    });
  }
};

export const getCompetitionParticipants = async (req, res) => {
  try {
    const { id } = req.params;

    const competition = await competitionModel
      .findById(id)
      .populate(
        "participants",
        "name email profileImage"
      );

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }

    return res.status(200).json({
      success: true,
      totalParticipants: competition.participants.length,
      participants: competition.participants,
    });
  } catch (error) {
    console.error("Get participants error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch participants",
    });
  }
};
