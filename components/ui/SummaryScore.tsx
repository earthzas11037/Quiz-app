import Score from "@/app/(tabs)/models/Score";
import { SCORE_BOARD_KEY } from "@/constants/Keys";
import { getData, saveData } from "@/utils/StorageUtil";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  quizScore: number;
  quizTotal: number;
  onPressSave: () => void;
}

export default function SummaryScore({
  quizScore,
  quizTotal,
  onPressSave,
}: Props) {
  const [name, setName] = useState("");

  const onSave = async () => {
    let data = await getData(SCORE_BOARD_KEY);
    let newData: Score[] = data ? [...data] : [];
    newData.push({
      name: name,
      score: quizScore,
    });
    await saveData(SCORE_BOARD_KEY, newData);
    onPressSave();
  };

  return (
    <>
      <View style={styles.container}>
        <FontAwesome5 name="medal" size={40} color="#fdcb35" />
        <View style={styles.containerScore}>
          <Text>{`Your Score`}</Text>
          <Text style={styles.score}>{`${quizScore} / ${quizTotal}`}</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginTop: 16,
        }}
      >
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            onChangeText={(value: string) => {
              setName(value);
            }}
            value={name}
            placeholder="Youe Name"
          />
          <Button
            title={"Save"}
            onPress={onSave}
            color={"#2F97FF"}
            disabled={!name}
          />
        </View>
      </View>
    </>
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
    alignItems: "center",
    display: "flex",
    marginTop: 16,
    gap: 4,
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ACBCC8",
    // width: "100%",
    flex: 1,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
  },
});
