import axios from "axios";

// Android Emulator
const API_BASE_URL = "http://:3000/api";

// Physical Android device:
// const API_BASE_URL = "http://YOUR_PC_IP:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// ========================================
// CREATE COMPETITION
// ========================================

export const createCompetition = async (competitionData) => {
  try {
    const response = await api.post(
      "/competitions",
      competitionData
    );

    return response.data;
  } catch (error) {
    console.error(
      "Create Competition Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ========================================
// GET ALL COMPETITIONS
// ========================================

export const getAllCompetitions = async () => {
  try {
    const response = await api.get("/competitions");

    return response.data;
  } catch (error) {
    console.error(
      "Get All Competitions Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ========================================
// GET COMPETITION BY ID
// ========================================

export const getCompetitionById = async (competitionId) => {
  try {
    const response = await api.get(
      `/competitions/${competitionId}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Get Competition Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ========================================
// UPDATE COMPETITION
// ========================================

export const updateCompetition = async (
  competitionId,
  competitionData
) => {
  try {
    const response = await api.put(
      `/competitions/${competitionId}`,
      competitionData
    );

    return response.data;
  } catch (error) {
    console.error(
      "Update Competition Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ========================================
// DELETE COMPETITION
// ========================================

export const deleteCompetition = async (competitionId) => {
  try {
    const response = await api.delete(
      `/competitions/${competitionId}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Delete Competition Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ========================================
// REGISTER FOR COMPETITION
// ========================================

export const registerForCompetition = async (competitionId) => {
  try {
    const response = await api.post(
      `/competitions/${competitionId}/register`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Register Competition Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// ========================================
// GET COMPETITION PARTICIPANTS
// ========================================

export const getCompetitionParticipants = async (competitionId) => {
  try {
    const response = await api.get(
      `/competitions/${competitionId}/participants`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Get Participants Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};