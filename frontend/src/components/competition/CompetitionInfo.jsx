import { StyleSheet, Text, View } from "react-native";

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CompetitionInfo = ({ competition }) => {
  if (!competition) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Competition</Text>

        <Text style={styles.description}>
          {competition.description || "No description available."}
        </Text>
      </View>

      {/* Organizer */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Organizer</Text>

        <Text style={styles.value}>
          {competition.organizer?.name || "Unknown Organizer"}
        </Text>

        {competition.organizer?.email && (
          <Text style={styles.subValue}>
            {competition.organizer.email}
          </Text>
        )}
      </View>

      {/* Registration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Registration Period
        </Text>

        <View style={styles.row}>
          <View style={styles.dateBox}>
            <Text style={styles.label}>Starts</Text>
            <Text style={styles.value}>
              {formatDate(competition.registrationStart)}
            </Text>
          </View>

          <View style={styles.dateBox}>
            <Text style={styles.label}>Ends</Text>
            <Text style={styles.value}>
              {formatDate(competition.registrationEnd)}
            </Text>
          </View>
        </View>
      </View>

      {/* Competition Dates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Competition Period
        </Text>

        <View style={styles.row}>
          <View style={styles.dateBox}>
            <Text style={styles.label}>Starts</Text>
            <Text style={styles.value}>
              {formatDate(competition.competitionStart)}
            </Text>
          </View>

          <View style={styles.dateBox}>
            <Text style={styles.label}>Ends</Text>
            <Text style={styles.value}>
              {formatDate(competition.competitionEnd)}
            </Text>
          </View>
        </View>
      </View>

      {/* Maximum Participants */}
      {competition.maxParticipants && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Maximum Participants
          </Text>

          <Text style={styles.value}>
            {competition.maxParticipants}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#4B5563",
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  dateBox: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  subValue: {
    marginTop: 3,
    fontSize: 13,
    color: "#6B7280",
  },
});

export default CompetitionInfo;