import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const RegisterButton = ({
  competitionId,
  onRegister,
  loading = false,
  disabled = false,
}) => {
  const handleRegister = () => {
    console.log("REGISTER BUTTON PRESSED");
    console.log("Competition ID:", competitionId);

    if (!competitionId || loading || disabled) {
      return;
    }

    onRegister(competitionId);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        (loading || disabled) && styles.disabledButton,
      ]}
      onPress={handleRegister}
      disabled={loading || disabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.buttonText}>Register Now</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 30,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default RegisterButton;