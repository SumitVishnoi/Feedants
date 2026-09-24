import { StyleSheet, Text, View } from "react-native";

const CompetitionPrizes = ({ prizes = [] }) => {
  if (!prizes.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Prizes</Text>

      {prizes.map((prize, index) => (
        <View key={prize._id || index} style={styles.prizeCard}>
          <View style={styles.positionContainer}>
            <Text style={styles.position}>
              {prize.position}
            </Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.title}>
              {prize.title}
            </Text>

            {prize.amount !== undefined && (
              <Text style={styles.amount}>
                ₹{Number(prize.amount).toLocaleString("en-IN")}
              </Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  prizeCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  positionContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E7EB",
  },

  position: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    textAlign: "center",
  },

  details: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  amount: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
  },
});

export default CompetitionPrizes;