import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ComTitle from "../../../Components/ComTitle/ComTitle";
import { useNavigation } from "@react-navigation/native";

export default function ComNotificationWarranty({ tile, data }) {
  const navigation = useNavigation();
  const formatStatus = (status) => {
    if (status === "Completed") {
      return "Đã hoàn thành";
    }
  };
  return (
    <View style={styles.main}>
      <ComTitle style={{ fontSize: 24, marginBottom: 10 }}>{tile}</ComTitle>
      <View style={styles.contex}>
        {data?.map((value, index) => (
          <View
            key={index}
            style={[index !== data.length - 1 && styles.bodySeparator]}
          >
            <TouchableOpacity
              style={[styles.body]}
              onPress={() => {
                navigation.navigate("WarrantyServiceDetail", {
                  id: value.warrantyDetail.warrantyId,
                  warrantyId: value.warrantyDetail.id,
                });
              }}
            >
              <View style={styles?.container}>
                <Text
                  numberOfLines={1}
                  style={{ fontWeight: "bold", fontSize: 14 }}
                >
                  Mã bảo hành: {value?.warrantyDetail?.id}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ fontWeight: "bold", fontSize: 14 }}
                >
                  Tên khách hàng: {value?.address?.account?.fullName}
                </Text>
                <Text numberOfLines={1}>
                  Ngày giao: {new Date(value?.createDate).toLocaleDateString()}
                </Text>
                <Text numberOfLines={1}>
                  Trạng thái: {formatStatus(value?.status)}
                </Text>
                <Text style={{ color: "#0d6bde" }}>Xem chi tiết</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  body: {
    flexDirection: "row",
    gap: 20,
    padding: 15,
    borderRadius: 10,
  },
  bodySeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  contex: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
});
