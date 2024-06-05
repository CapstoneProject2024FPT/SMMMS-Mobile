import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ComNotification from "./ComNotification/ComNotifications";
import ComSelectButton from "../../Components/ComButton/ComSelectButton";

export default function Notification({}) {
  const [select, setSelect] = useState(false);
  const [select1, setSelect1] = useState(true);
  const [select2, setSelect2] = useState(true);
  const [select3, setSelect3] = useState(true);
  const data = [
    {
      img: "https://thietbithanhphat.vn/data/news/6049/may-tien-hong-ky-hk-t16.jpg",
      name: "Bảo dưỡng máy tiện cnc ",
      day: "10:00 - 14/05/2024 ",
    },
    {
      img: "https://thietbithanhphat.vn/data/news/6049/may-tien-hong-ky-hk-t16.jpg",
      name: "Bảo dưỡng máy tiện cnc ",
      day: "10:00 - 14/05/2024 ",
    },
    {
      img: "https://thietbithanhphat.vn/data/news/6049/may-tien-hong-ky-hk-t16.jpg",
      name: "Bảo dưỡng máy tiện cnc ",
      day: "10:00 - 14/05/2024 ",
    },
    {
      img: "https://thietbithanhphat.vn/data/news/6049/may-tien-hong-ky-hk-t16.jpg",
      name: "Bảo dưỡng máy tiện cnc ",
      day: "10:00 - 14/05/2024 ",
    },
  ];
  const check = () => {
    setSelect(false);
    setSelect1(true);
    setSelect2(true);
    setSelect3(true);
  };
  const check1 = () => {
    setSelect(true);
    setSelect1(false);
    setSelect3(true);
    setSelect2(true);
  };
  const check2 = () => {
    setSelect(true);
    setSelect1(true);
    setSelect3(true);
    setSelect2(false);
  };
  const check3 = () => {
    setSelect(true);
    setSelect1(true);
    setSelect3(false);
    setSelect2(true);
  };
  return (
    <View style={styles.body}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles?.scrollView}
      >
        <View style={styles?.buttonContainer}>
          <ComSelectButton onPress={check} check={select}>
            Tất cả
          </ComSelectButton>
          <ComSelectButton onPress={check1} check={select1}>
            Máy khoan
          </ComSelectButton>
          <ComSelectButton onPress={check2} check={select2}>
            Máy tiện
          </ComSelectButton>
          <ComSelectButton onPress={check3} check={select3}>
            Máy xung điện
          </ComSelectButton>
          <View style={{ width: 20 }}></View>
        </View>
      </ScrollView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles?.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        <ComNotification tile={"Hôm nay"} data={data} />

        <ComNotification tile={"Trước đó"} data={data} />
        <ComNotification tile={"Trước đó"} data={data} />
        <ComNotification tile={"Trước đó"} data={data} />

        <View style={{ height: 190 }}></View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
  },
});
