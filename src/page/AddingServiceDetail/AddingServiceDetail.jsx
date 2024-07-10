import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from "@react-navigation/native";
import { getData } from "../../api/api";

export default function AddingServiceDetail({ route }) {
  const [data, setData] = useState({});
  const [warrantyDetail, setWarrantyDetail] = useState([]);

  const {
    text: { addingPackages },
  } = useContext(LanguageContext);

  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(`warranty/${id}`);
      setData(res.data);
      setWarrantyDetail(res.data.warrantyDetail);
    };
    fetchData();
  }, [id]);

  const formatDateTime = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backIconContainer}
        >
          <Image source={backArrowWhite} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <ScrollView>
          <Text
            style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}
            numberOfLines={2}
          >
            {data?.type}
          </Text>
          {/* category */}
          <Text style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={styles.contentBold}>
              {addingPackages?.package?.category}
            </Text>
            <Text style={{ fontSize: 16 }}>: {data?.type}</Text>
          </Text>
          {/* mô tả */}
          <Text style={styles.contentBold}>
            {addingPackages?.package?.description}
          </Text>

          <Text style={{ fontSize: 16 }}>{data?.description}</Text>

          {/* Warranty Details */}
          <Text style={styles.contentBold}>Warranty Details:</Text>
          {warrantyDetail.map((item, index) => (
            <View key={index} style={styles.warrantyDetail}>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>ID</Text>: {item.id}
              </Text>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Status</Text>:{" "}
                {item.status}
              </Text>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Create Date</Text>:{" "}
                {formatDateTime(item.createDate)}
              </Text>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Start Date</Text>:{" "}
                {formatDateTime(item.startDate)}
              </Text>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Description</Text>:{" "}
                {item.description}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={{ marginVertical: 20 }}>
          <ComSelectButton
            onPress={() => {
              navigation.navigate("AddingServiceRegister", { id: data.id });
            }}
          >
            Báo cáo
          </ComSelectButton>
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
  warrantyDetail: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  detailText: {
    fontSize: 16,
  },
});
