import QuizQuestion from "@/app/(tabs)/models/QuizQuestion";
import { Button, StyleSheet, Text, View } from "react-native";
import Radio from "@/components/base/Radio";

interface Props {
  data: QuizQuestion;
  quizIndex: number;
  quizTotal: number;
  selectIndex: number;
  disabledSubmit: boolean;
  onPress: (index: number) => void;
  onPressBack: () => void;
  onPressNext: () => void;
  onPressSubmit: () => void;
}

export default function QuestionView({
  data,
  quizIndex,
  quizTotal,
  selectIndex,
  disabledSubmit,
  onPress,
  onPressBack,
  onPressNext,
  onPressSubmit,
}: Props) {
  const quizNo = quizIndex + 1;
  return (
    <View style={styles.containerQiz}>
      <Text style={styles.qizIndex}>{`Quiz ${quizNo}/${quizTotal}`}</Text>
      <Text>
        <Text style={styles.question}>{`${quizNo}. `}</Text>
        <Text style={styles.question}>{data.question}</Text>
      </Text>
      <View style={styles.constainerAnswer}>
        {data.answers.map((item, index) => {
          const isSelected = index == selectIndex;
          return (
            <Radio
              key={"answer" + index}
              value={isSelected}
              onPress={() => {
                onPress(index);
              }}
              text={item}
            />
          );
        })}
      </View>
      <View style={styles.containerButton}>
        {quizIndex > 0 && (
          <Button title="Back" onPress={onPressBack} color={"#2F97FF"} />
        )}
        <View />
        {quizNo == quizTotal ? (
          <Button
            title={"Finish"}
            onPress={onPressSubmit}
            color={"#47C75C"}
            disabled={disabledSubmit}
          />
        ) : (
          <Button title={"Next"} onPress={onPressNext} color={"#2F97FF"} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  qizIndex: {
    fontSize: 14,
    color: "#808182",
    textAlign: "right",
    width: "100%",
  },
  containerQiz: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  constainerAnswer: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    marginTop: 4,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
  },
  answer: {},
  containerButton: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonBack: {},
  buttonNext: {},
});
