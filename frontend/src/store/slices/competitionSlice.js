import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createCompetition,
  getAllCompetitions,
  getCompetitionById,
  updateCompetition,
  deleteCompetition,
  registerForCompetition,
  getCompetitionParticipants,
} from "../../services/competition.service";

// ========================================
// GET ALL COMPETITIONS
// ========================================

export const fetchCompetitions = createAsyncThunk(
  "competition/fetchCompetitions",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCompetitions();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch competitions",
      );
    }
  },
);

// ========================================
// GET COMPETITION BY ID
// ========================================

export const fetchCompetitionById = createAsyncThunk(
  "competition/fetchCompetitionById",
  async (competitionId, { rejectWithValue }) => {
    try {
      return await getCompetitionById(competitionId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch competition",
      );
    }
  },
);

// ========================================
// CREATE COMPETITION
// ========================================

export const addCompetition = createAsyncThunk(
  "competition/addCompetition",
  async (competitionData, { rejectWithValue }) => {
    try {
      return await createCompetition(competitionData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create competition",
      );
    }
  },
);

// ========================================
// UPDATE COMPETITION
// ========================================

export const editCompetition = createAsyncThunk(
  "competition/editCompetition",
  async (
    { competitionId, competitionData },
    { rejectWithValue },
  ) => {
    try {
      return await updateCompetition(
        competitionId,
        competitionData,
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update competition",
      );
    }
  },
);

// ========================================
// DELETE COMPETITION
// ========================================

export const removeCompetition = createAsyncThunk(
  "competition/removeCompetition",
  async (competitionId, { rejectWithValue }) => {
    try {
      await deleteCompetition(competitionId);

      return competitionId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete competition",
      );
    }
  },
);

// ========================================
// REGISTER FOR COMPETITION
// ========================================

export const registerCompetition = createAsyncThunk(
  "competition/registerCompetition",
  async (competitionId, { rejectWithValue }) => {
    try {
      return await registerForCompetition(competitionId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to register",
      );
    }
  },
);

// ========================================
// GET PARTICIPANTS
// ========================================

export const fetchCompetitionParticipants = createAsyncThunk(
  "competition/fetchParticipants",
  async (competitionId, { rejectWithValue }) => {
    try {
      return await getCompetitionParticipants(competitionId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch participants",
      );
    }
  },
);

// ========================================
// INITIAL STATE
// ========================================

const initialState = {
  competitions: [],
  currentCompetition: null,
  participants: [],

  loading: false,
  error: null,

  registrationLoading: false,
  registrationError: null,
};

// ========================================
// SLICE
// ========================================

const competitionSlice = createSlice({
  name: "competition",

  initialState,

  reducers: {
    clearCompetitionError: (state) => {
      state.error = null;
    },

    clearRegistrationError: (state) => {
      state.registrationError = null;
    },

    clearCurrentCompetition: (state) => {
      state.currentCompetition = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ========================================
      // GET ALL COMPETITIONS
      // ========================================

      .addCase(fetchCompetitions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCompetitions.fulfilled, (state, action) => {
        state.loading = false;

        // If backend returns:
        // { success: true, competitions: [...] }
        if (Array.isArray(action.payload?.competitions)) {
          state.competitions = action.payload.competitions;
        } else if (Array.isArray(action.payload)) {
          state.competitions = action.payload;
        } else {
          state.competitions = [];
        }
      })

      .addCase(fetchCompetitions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // GET COMPETITION BY ID
      // ========================================

      .addCase(fetchCompetitionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCompetitionById.fulfilled, (state, action) => {
        state.loading = false;

        // Backend response:
        // {
        //   success: true,
        //   competition: {...}
        // }

        state.currentCompetition =
          action.payload?.competition || null;
      })

      .addCase(fetchCompetitionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // CREATE COMPETITION
      // ========================================

      .addCase(addCompetition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addCompetition.fulfilled, (state, action) => {
        state.loading = false;

        const newCompetition =
          action.payload?.competition ||
          action.payload;

        if (newCompetition) {
          state.competitions.push(newCompetition);
        }
      })

      .addCase(addCompetition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // UPDATE COMPETITION
      // ========================================

      .addCase(editCompetition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(editCompetition.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCompetition =
          action.payload?.competition ||
          action.payload;

        if (!updatedCompetition?._id) {
          return;
        }

        const index = state.competitions.findIndex(
          (competition) =>
            competition._id === updatedCompetition._id,
        );

        if (index !== -1) {
          state.competitions[index] = updatedCompetition;
        }

        if (
          state.currentCompetition?._id ===
          updatedCompetition._id
        ) {
          state.currentCompetition = updatedCompetition;
        }
      })

      .addCase(editCompetition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // DELETE COMPETITION
      // ========================================

      .addCase(removeCompetition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeCompetition.fulfilled, (state, action) => {
        state.loading = false;

        state.competitions =
          state.competitions.filter(
            (competition) =>
              competition._id !== action.payload,
          );

        if (
          state.currentCompetition?._id ===
          action.payload
        ) {
          state.currentCompetition = null;
        }
      })

      .addCase(removeCompetition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========================================
      // REGISTER FOR COMPETITION
      // ========================================

      .addCase(registerCompetition.pending, (state) => {
        state.registrationLoading = true;
        state.registrationError = null;
      })

      .addCase(registerCompetition.fulfilled, (state, action) => {
        state.registrationLoading = false;
        state.registrationError = null;

        /*
          Expected backend response could be:

          {
            success: true,
            competition: {...}
          }

          OR:

          {
            success: true,
            ...
          }
        */

        const updatedCompetition =
          action.payload?.competition;

        if (updatedCompetition?._id) {
          state.currentCompetition =
            updatedCompetition;
        }
      })

      .addCase(registerCompetition.rejected, (state, action) => {
        state.registrationLoading = false;
        state.registrationError = action.payload;
      })

      // ========================================
      // GET PARTICIPANTS
      // ========================================

      .addCase(
        fetchCompetitionParticipants.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )

      .addCase(
        fetchCompetitionParticipants.fulfilled,
        (state, action) => {
          state.loading = false;

          if (
            Array.isArray(action.payload?.participants)
          ) {
            state.participants =
              action.payload.participants;
          } else if (Array.isArray(action.payload)) {
            state.participants = action.payload;
          } else {
            state.participants = [];
          }
        },
      )

      .addCase(
        fetchCompetitionParticipants.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

// ========================================
// ACTIONS
// ========================================

export const {
  clearCompetitionError,
  clearRegistrationError,
  clearCurrentCompetition,
} = competitionSlice.actions;

// ========================================
// REDUCER
// ========================================

export default competitionSlice.reducer;