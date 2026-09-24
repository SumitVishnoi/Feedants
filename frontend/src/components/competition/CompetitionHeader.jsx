import { Image, StyleSheet, Text, View } from "react-native";

const CompetitionHeader = ({ competition }) => {
  if (!competition) {
    return null;
  }

  return (
    <View style={styles.container}>
      {competition.bannerImage ? (
        <Image
          source={{ uri: competition.bannerImage }}
          style={styles.banner}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.bannerPlaceholder}>
          <Text style={styles.placeholderText}>
            No Banner Image
          </Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.category}>
          {competition.category}
        </Text>

        <Text style={styles.title}>
          {competition.title}
        </Text>

        {competition.status && (
          <View style={styles.statusContainer}>
            <Text style={styles.status}>
              {competition.status.toUpperCase()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },

  banner: {
    width: "100%",
    height: 220,
  },

  bannerPlaceholder: {
    width: "100%",
    height: 220,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderText: {
    color: "#6B7280",
    fontSize: 14,
  },

  content: {
    padding: 16,
  },

  category: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
    textTransform: "capitalize",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  statusContainer: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },

  status: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },
});

export default CompetitionHeader;