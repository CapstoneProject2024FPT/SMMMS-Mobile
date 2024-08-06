import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ComTitle from "./../../../Components/ComTitle/ComTitle";
import { useNavigation } from "@react-navigation/native";

export default function ComNotification({ tile, data }) {
  const navigation = useNavigation();

  const formatStatus = (status) => {
    if (status === "Completed") {
      return "Đã hoàn thành";
    }
    return status; // Return the original status if not "Completed"
  };

  return (
    <View style={styles.main}>
      <ComTitle style={{ fontSize: 24, marginBottom: 10 }}>{tile}</ComTitle>
      <View style={styles.contex}>
        {data?.length > 0 ? (
          data.map((value, index) => (
            <View
              key={index}
              style={[index !== data.length - 1 && styles.bodySeparator]}
            >
              <TouchableOpacity
                style={[styles.body]}
                onPress={() => {
                  navigation.navigate("DeliveryDetail", {
                    id: value.id,
                    orderId: value.order.id,
                  });
                }}
              >
                <View style={styles?.container}>
                  <Text
                    numberOfLines={1}
                    style={{ fontWeight: "bold", fontSize: 14 }}
                  >
                    Mã đơn hàng: {value?.order?.invoiceCode}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ fontWeight: "bold", fontSize: 14 }}
                  >
                    Tên khách hàng: {value?.address?.account?.fullName}
                  </Text>
                  <Text numberOfLines={1}>
                    Ngày giao:{" "}
                    {new Date(value?.createDate).toLocaleDateString()}
                  </Text>
                  <Text numberOfLines={1}>
                    Trạng thái: {formatStatus(value?.status)}
                  </Text>
                  <Text style={{ color: "#0d6bde" }}>Xem chi tiết</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noTaskText}>Chưa có nhiệm vụ hoàn thành</Text>
        )}
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
    padding: 10,
  },
  noTaskText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginVertical: 20,
  },
});
