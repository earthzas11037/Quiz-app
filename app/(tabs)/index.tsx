import QuizQuestion from "@/app/(tabs)/models/QuizQuestion";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import quizQuestions from "./mockdata/quiz.json";
import QuestionView from "@/components/ui/QuestionView";
import SummaryScore from "@/components/ui/SummaryScore";

export default function TabOneScreen() {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    setLoading(true);
    const result = getRandomQuizQuestions();
    setQuiz(result);
    setSelectedAnswers(Array(result.length).fill(-1));
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadQuiz();
    setRefreshing(false);
  }, []);

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getRandomQuizQuestions(): QuizQuestion[] {
    const shuffledQuestions = shuffleArray([...quizQuestions]);
    return shuffledQuestions.map((question) => {
      const shuffledAnswers = shuffleArray([...question.answers]);
      const correctAnswerIndex = shuffledAnswers.indexOf(
        question.answers[question.correctIndex]
      );
      return {
        ...question,
        answers: shuffledAnswers,
        correctAnswerIndex: correctAnswerIndex,
      };
    });
  }

  const onPress = (index: number) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[quizIndex] = index;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const onPressBack = () => {
    setQuizIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  const onPressNext = () => {
    setQuizIndex((prev) => prev + 1);
  };

  const onPressSubmit = () => {
    let score = selectedAnswers.reduce((total, value, index) =>
      quiz[index].correctIndex == value ? total + 1 : total
    );
    setQuizScore(score);
    setIsFinish(true);
  };

  const disabledSubmit = () => selectedAnswers.some((x) => x < 0);

  const onPressSave = () => {
    clear();
    loadQuiz();
  };

  const clear = () => {
    setQuiz([]);
    setQuizIndex(0);
    setSelectedAnswers([]);
    setQuizScore(0);
    setIsFinish(false);
  };

  if (loading && !refreshing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const data = quiz[quizIndex];
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        {isFinish ? (
          <SummaryScore
            quizScore={quizScore}
            quizTotal={quiz.length}
            onPressSave={onPressSave}
          />
        ) : data ? (
          <QuestionView
            data={data}
            quizIndex={quizIndex}
            quizTotal={quiz.length}
            selectIndex={selectedAnswers[quizIndex]}
            disabledSubmit={disabledSubmit()}
            onPress={onPress}
            onPressBack={onPressBack}
            onPressNext={onPressNext}
            onPressSubmit={onPressSubmit}
          />
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // alignItems: "center",
    // justifyContent: "center",
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
});
