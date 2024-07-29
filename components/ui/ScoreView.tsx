import Score from "@/app/(tabs)/models/Score";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  data: Score[];
}

export default function ScoreView({ data }: Props) {
  return (
    <View style={styles.container}>
      <FontAwesome name="trophy" size={40} color="#fdcb35" />
      <View
        style={{
          display: "flex",
          gap: 6,
          marginTop: 16,
          flexDirection: "column",
          width: "100%",
        }}
      >
        {data.map((item, index) => {
          return (
            <View style={styles.containerScore}>
              {index == 0 && (
                <FontAwesome5 name="medal" size={20} color="#fdcb35" />
              )}
              <Text
                numberOfLines={1}
                style={[
                  styles.name,
                  index == 0
                    ? { fontSize: 20, fontWeight: "bold" }
                    : index == 1
                    ? { fontSize: 18, fontWeight: "500" }
                    : index == 2
                    ? { fontSize: 16, fontWeight: "400" }
                    : {},
                ]}
              >
                {item.name}
              </Text>
              <Text
                style={[
                  styles.score,
                  index == 0
                    ? { fontSize: 20, fontWeight: "bold" }
                    : index == 1
                    ? { fontSize: 18, fontWeight: "500" }
                    : index == 2
                    ? { fontSize: 16, fontWeight: "400" }
                    : {},
                ]}
              >
                {item.score}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    display: "flex",
    // gap: 8,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  containerScore: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    flex: 1,
  },
  score: {
    fontSize: 16,
  },
});
