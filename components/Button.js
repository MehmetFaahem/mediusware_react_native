import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Button({ title, OnPress }) {
  return (
    <View>
      <TouchableOpacity onPress={OnPress} style={styles.button}>
        <Text style={styles.text}> {title} </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: "black",
    width: "100%",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    letterSpacing: 0.25,
    color: "white",
  },
});
