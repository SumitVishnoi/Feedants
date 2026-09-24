import { StyleSheet, Text, View } from "react-native";

const CompetitionRules = ({ rules = [] }) => {
  if (!rules.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Rules & Guidelines</Text>

      {rules.map((rule, index) => (
        <View key={index} style={styles.ruleRow}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>
              {index + 1}
            </Text>
          </View>

          <Text style={styles.rule}>
            {rule}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  ruleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  numberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  number: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
  },

  rule: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#4B5563",
  },
});

export default CompetitionRules;
