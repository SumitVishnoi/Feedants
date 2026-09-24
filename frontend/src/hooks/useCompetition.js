import { useDispatch, useSelector } from "react-redux";

import {
  fetchCompetitions,
  fetchCompetitionById,
  addCompetition,
  editCompetition,
  removeCompetition,
  registerCompetition,
  fetchCompetitionParticipants,
  clearCompetitionError,
  clearRegistrationError,
  clearCurrentCompetition,
} from "../store/slices/competitionSlice";

const useCompetition = () => {
  const dispatch = useDispatch();

  // Redux state
  const {
    competitions,
    currentCompetition,
    participants,
    loading,
    error,
    registrationLoading,
    registrationError,
  } = useSelector((state) => state.competition);

  // ========================================
  // GET ALL COMPETITIONS
  // ========================================

  const getCompetitions = () => {
    return dispatch(fetchCompetitions());
  };

  // ========================================
  // GET COMPETITION BY ID
  // ========================================

  const getCompetition = (competitionId) => {
    return dispatch(fetchCompetitionById(competitionId));
  };

  // ========================================
  // CREATE COMPETITION
  // ========================================

  const createNewCompetition = (competitionData) => {
    return dispatch(addCompetition(competitionData));
  };

  // ========================================
  // UPDATE COMPETITION
  // ========================================

  const updateExistingCompetition = (
    competitionId,
    competitionData
  ) => {
    return dispatch(
      editCompetition({
        competitionId,
        competitionData,
      })
    );
  };

  // ========================================
  // DELETE COMPETITION
  // ========================================

  const deleteExistingCompetition = (competitionId) => {
    return dispatch(removeCompetition(competitionId));
  };

  // ========================================
  // REGISTER
  // ========================================

  const register = (competitionId) => {
    return dispatch(registerCompetition(competitionId));
  };

  // ========================================
  // GET PARTICIPANTS
  // ========================================

  const getParticipants = (competitionId) => {
    return dispatch(
      fetchCompetitionParticipants(competitionId)
    );
  };

  // ========================================
  // CLEAR ERRORS
  // ========================================

  const clearError = () => {
    dispatch(clearCompetitionError());
  };

  const clearRegisterError = () => {
    dispatch(clearRegistrationError());
  };

  // ========================================
  // CLEAR CURRENT COMPETITION
  // ========================================

  const clearCompetition = () => {
    dispatch(clearCurrentCompetition());
  };

  return {
    // State
    competitions,
    currentCompetition,
    participants,

    loading,
    error,

    registrationLoading,
    registrationError,

    // Actions
    getCompetitions,
    getCompetition,

    createNewCompetition,
    updateExistingCompetition,
    deleteExistingCompetition,

    register,
    getParticipants,

    clearError,
    clearRegisterError,
    clearCompetition,
  };
};

export default useCompetition;