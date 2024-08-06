import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

const RadioButton = ({ selected, onPress }) => (
  <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
    <View
      style={[styles.radioButton, selected && styles.radioButtonSelected]}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 8,
  },
  radioButtonSelected: {
    backgroundColor: "#dbd523",
  },
});

export default RadioButton;
