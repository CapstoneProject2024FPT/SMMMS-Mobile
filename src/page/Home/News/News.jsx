import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import TopicContent from "../TopicContent";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComButton from "./../../../Components/ComButton/ComButton";
import ComSelectButton from "../../../Components/ComButton/ComSelectButton";
import ComNew from "./ComNew";

export default function News() {
  const [data, setData] = useState([{}, {}, {}]);
  const {
    text: { Home },
  } = useContext(LanguageContext);
  const [select, setSelect] = useState(true);
  const [select1, setSelect1] = useState(false);
  const check = () => {
    setSelect(true);
    setSelect1(false);
  };
  const check1 = () => {
    setSelect(false);
    setSelect1(true);
  };
  return (
    <View style={styles?.body}>
      <TopicContent>{"Các hoạt động hôm nay"}</TopicContent>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        
      </ScrollView> */}

      {data.map((value, index) => (
        <ComNew
          id={1}
          key={index}
          url={
            "https://cokhiintech.com/uploads/noidung/images/pif1505373774.png"
          }
          context="Máy tiện cnc"
        >
          Máy tiện cnc là một trong những thiết bị công nghiệp quan trọng, giúp
          gia công các chi tiết kim loại theo yêu cầu.
        </ComNew>
      ))}
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
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
    marginLeft: 16,
    marginBottom: 10,
  },
});
