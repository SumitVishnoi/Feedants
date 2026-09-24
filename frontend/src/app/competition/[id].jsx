import { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import useCompetition from "@/hooks/useCompetition";

import CompetitionHeader from "@/components/competition/CompetitionHeader";
import CompetitionInfo from "@/components/competition/CompetitionInfo";
import CompetitionPrizes from "@/components/competition/CompetitionPrizes";
import CompetitionRules from "@/components/competition/CompetitionRules";
import RegisterButton from "@/components/competition/RegisterButton";

export default function CompetitionDetailsScreen() {
  const { id } = useLocalSearchParams();

  const {
    currentCompetition,
    loading,
    error,
    getCompetition,
    register,
    registrationLoading,
    registrationError,
  } = useCompetition();

  const handleRegister = async (competitionId) => {
  console.log("HANDLE REGISTER CALLED");
  console.log("Competition ID:", competitionId);

  try {
    const result = await register(competitionId);

    console.log("REGISTRATION RESULT:", result);

    Alert.alert(
      "Success",
      "You have successfully registered for this competition."
    );
  } catch (error) {
    console.log("REGISTRATION ERROR:", error);
  }
};

  useEffect(() => {
    if (id) {
      getCompetition(id);
    }
  }, [id]);

  useEffect(() => {
    if (registrationError) {
      Alert.alert("Registration Failed", registrationError);
    }
  }, [registrationError]);

  if (loading && !currentCompetition) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#111827" />
        <Text style={styles.loadingText}>
          Loading competition...
        </Text>
      </View>
    );
  }

  if (error && !currentCompetition) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!currentCompetition) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Competition not found.
        </Text>
      </View>
    );
  }

  console.log("CURRENT COMPETITION:", currentCompetition);
console.log("CURRENT COMPETITION ID:", currentCompetition?._id);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <CompetitionHeader competition={currentCompetition} />

      <CompetitionInfo competition={currentCompetition} />

      <CompetitionPrizes prizes={currentCompetition.prizes} />

      <CompetitionRules rules={currentCompetition.rules} />

      

      <RegisterButton
        competitionId={currentCompetition._id}
        onRegister={handleRegister}
        loading={registrationLoading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#6B7280",
  },

  errorText: {
    fontSize: 16,
    color: "#DC2626",
    textAlign: "center",
  },
});