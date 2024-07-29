import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function ComSelectButton({ children, onPress, check }) {
  const {
    text: { Home },
  } = useContext(LanguageContext);
  return (
    <View>
      {check ? (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button1} onPress={onPress}>
          <Text style={styles.buttonText1}>{children}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#f2eb18",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333333",
  },
  buttonText: {
    color: "#333333",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
  },
  button1: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  buttonText1: {
    color: "#333333",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
  },
});
