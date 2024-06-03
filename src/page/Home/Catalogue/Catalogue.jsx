import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import TopicContent from "../TopicContent";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComCatalogue from "./ComCatalogue";
import { useNavigation } from "@react-navigation/native";

export default function Catalogue() {
  const navigation = useNavigation();
  const {
    text: { Home },
  } = useContext(LanguageContext);

  const goto = (link) => {
    navigation.navigate(link);
  };
  return (
    <View style={styles?.body}>
      <TopicContent>{Home?.catalogue}</TopicContent>
      <View style={styles.comCatalogue}>
        <TouchableOpacity onPress={() => goto("AddingService")}>
          <ComCatalogue
            url={"https://megatechco.vn/wp-content/uploads/bao-tri.jpg"}
          >
            Bảo trì
          </ComCatalogue>
        </TouchableOpacity>
        <TouchableOpacity>
          <ComCatalogue
            url={
              "https://vn-test-11.slatic.net/p/00ecfe3cf218d389c26a65066e16ad37.png"
            }
          >
            Bảo hành
          </ComCatalogue>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 15,
  },
  comCatalogue: {
    flexDirection: "row",
    gap: 30,
    paddingVertical: 10,
  },
});
