import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from "@react-navigation/native";
import { getData } from "../../api/api";

export default function OrderDetails() {
  const [data, setData] = useState({});

  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);

  const route = useRoute();
  const { orderId } = route.params;

  const navigation = useNavigation();

  const getOrderDetail = async () => {
    getData(`orders/${orderId}`).then((res) => {
      setData(res.data);
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const formatCurrency = (number) => {
    if (number === undefined || number === null) {
      return "N/A";
    }
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    getOrderDetail();
  }, [orderId]);

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text style={styles.title}>Thông tin đơn hàng</Text>
          <Text style={styles.contentBold}>Thông tin khách hàng:</Text>
          <Text style={styles.detailText}>
            <Text style={{ fontWeight: "bold" }}>Tên</Text>:{" "}
            {data.userInfo?.fullName}
          </Text>
          <Text style={styles.detailText}>
            <Text style={{ fontWeight: "bold" }}>Địa chỉ</Text>:{" "}
            {data.address?.note}, {data.address?.ward?.name},{" "}
            {data.address?.district?.name}, {data.address?.city?.name}
          </Text>
          <Text style={styles.contentBold}>Danh sách sản phẩm:</Text>
          <Text style={styles.detailText}>
            <Text style={{ fontWeight: "bold" }}>Tổng tiền:</Text>:{" "}
            {formatCurrency(data.totalAmount)}
          </Text>
          {data.productList?.map((item, index) => (
            <View key={index} style={styles.orderDetail}>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Tên máy</Text>:{" "}
                {item.productName}
              </Text>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Số lượng</Text>:{" "}
                {item.quantity}
              </Text>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Giá tiền</Text>:{" "}
                {formatCurrency(item.sellingPrice)}
              </Text>
            </View>
          ))}

          <View style={{ height: 120 }}></View>
        </ScrollView>
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
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  contentBold: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
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
  orderDetail: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
});
