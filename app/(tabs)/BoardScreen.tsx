import Score from "@/app/(tabs)/models/Score";
import ScoreView from "@/components/ui/ScoreView";
import { SCORE_BOARD_KEY } from "@/constants/Keys";
import { getData } from "@/utils/StorageUtil";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function BoardScreen() {
  const [score, setScore] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    loadScore();
  }, []);

  const loadScore = async () => {
    setLoading(true);
    let data = await getData(SCORE_BOARD_KEY);
    if (data && Array.isArray(data)) {
      let scoreData: Score[] = [...data];
      scoreData.sort((a, b) => b.score - a.score);
      setScore(scoreData);
    } else {
      setScore([]);
    }
    setLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadScore();
    setRefreshing(false);
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ScoreView data={score} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
