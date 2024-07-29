import React from "react";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

interface Props {
  value: boolean;
  onPress: () => void;
  text?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Radio = (props: Props) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
        <View
          style={[
            styles.radio,
            props.disabled && styles.btnDisable,
            props.value && styles.btnActive,
            props.style,
          ]}
        >
          {props.value && <View style={styles.innerActive} />}
        </View>
      </TouchableOpacity>
      {!!props.text && (
        <Text
          style={[
            styles.text,
            props.disabled && styles.textDisable,
            props.textStyle,
          ]}
        >
          {props.text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  radio: {
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: "#2F97FF",
    justifyContent: "center",
    alignItems: "center",
  },
  btnDisable: {
    backgroundColor: "#F2F4F8",
    borderColor: "#ACBCC8",
  },
  btnActive: {
    backgroundColor: "white",
    borderColor: "#47C75C",
  },
  innerActive: {
    width: 12,
    height: 12,
    backgroundColor: "#47C75C",
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    color: "black",
    marginLeft: 4,
    lineHeight: 18,
  },
  textDisable: {
    color: "#F2F4F8",
  },
});

export default Radio;
