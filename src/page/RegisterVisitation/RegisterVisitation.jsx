import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";
import ComElder from "../../Components/ComElder/ComElder";
import ComButton from "../../Components/ComButton/ComButton";
import ComSelectedOneDate from "./../../Components/ComDate/ComSelectedOneDate";
import ComHeader from "../../Components/ComHeader/ComHeader";

export default function RegisterVisitation() {
  const [elderData, setElderData] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});

  const [selectedElderId, setSelectedElderId] = useState(null);

  const {
    text: { visitationText },

    setLanguage,
  } = useContext(LanguageContext);

  const navigation = useNavigation();
  const handleElderPress = (id) => {
    setSelectedElderId(id);
  };
  const register = () => {
    navigation.navigate("RegisterVisitationSuccess", { date: selectedDate });
  };
  const changeSelectedDate = (data) => {
    setSelectedDate(data);
  };
  return (
    <>
      <View style={styles.body}>
        <ComHeader
          showTitle={true}
          title={visitationText?.titleHeader}
          showBackIcon
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#33B39C",
            }}
          >
            <View style={{ width: "90%" }}>
              <ComSelectedOneDate date={changeSelectedDate} />
            </View>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 24, marginBottom: 10 }}>
            Báo cáo
          </Text>

          <View>
            {elderData?.map((value, index) => (
              <ComElder
                key={index}
                data={value}
                onPress={() => handleElderPress(value?.id)}
                isSelected={selectedElderId === value?.id}
              />
            ))}
          </View>
          <View style={{ height: 20 }}></View>
        </ScrollView>
        <View style={{ marginVertical: 20 }}>
          <ComButton onPress={() => register()}>
            {visitationText?.Confirm}
          </ComButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  header: {
    paddingTop: 50,
  },
  contentBold: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  backIconContainer: {
    position: "absolute",
    zIndex: 100,
    marginTop: 60,
    marginLeft: 10,
    padding: 3,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backIcon: {
    width: 50,
    height: 50,
  },
});
