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

export default function WarrantyServiceDetail({ route }) {
  const [data, setData] = useState({});
  const [warrantyDetail, setWarrantyDetail] = useState({});
  const [image, setImage] = useState({
    img: "https://halivina.vn/upload/images/11(1).jpg",
  });

  const {
    text: { addingPackages },
  } = useContext(LanguageContext);

  const navigation = useNavigation();
  const { id } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(`warranty/${id}`);
      setData(res.data);
    };
    fetchData();
  }, [id]);

  const formatDateTime = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const formatAddress = (address) => {
    if (!address) {
      return "Địa chỉ không xác định";
    }
    return ` ${address?.note}, ${address?.ward?.name}, ${address?.district?.name}, ${address?.city?.name}`;
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
        <Image
          source={{ uri: image.img }}
          style={{
            width: "100%",
            height: 200,
            resizeMode: "stretch",
            borderRadius: 5,
            marginBottom: 10,
          }}
        />
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
          <Text>
            <Text style={styles.contentBold}>Mô tả</Text>:{" "}
            <Text style={{ fontSize: 16 }}>{data?.description}</Text>
          </Text>

          {/* Warranty Details */}
          <Text style={styles.contentBold}>Warranty Details:</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddingServiceRegister", { id: data.id });
            }}
          >
            <View style={styles.warrantyDetail}>
              {/* <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>ID</Text>:{" "}
                {data?.warrantyDetail?.id}
              </Text> */}
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Ngày tạo</Text>:{" "}
                {formatDateTime(data?.warrantyDetail?.createDate)}
              </Text>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Ngày bắt đầu</Text>:{" "}
                {formatDateTime(data?.warrantyDetail?.startDate)}
              </Text>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Địa chỉ</Text>:{" "}
                {formatAddress(data?.address)}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={{ marginVertical: 20 }}>
          <ComSelectButton
            onPress={() => {
              navigation.navigate("DeliveryConfirm", { id: data.id });
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
