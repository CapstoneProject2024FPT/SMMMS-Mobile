import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";

export default function ComButton({ children, onPress, check }) {
  return (
    <>
      {check ? (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonCheck} onPress={onPress}>
          <Text style={styles.buttonTextCheck}>{children}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderColor: "#33B39C",
    borderWidth: 1,
  },
  buttonText: {
    color: "#33B39C",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  buttonCheck: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#dbd523",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonTextCheck: {
    color: "#333333",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
