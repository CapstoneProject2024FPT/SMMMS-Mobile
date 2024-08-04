import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useNavigation } from "@react-navigation/native";

export default function ComAddPackage({ data }) {
  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);

  const formatStatus = (status) => {
    if (status === "Process") {
      return "Đang xử lý";
    } else if (status === "Completed") {
      return "Hoàn thành";
    }
  };

  const formatType = (type) => {
    if (type === "Warranty") {
      return "Bảo hành";
    }
  };

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.body}
      onPress={() => {
        navigation.navigate("WarrantyServiceDetail", {
          id: data.warrantyDetail.warrantyId,
          warrantyId: data.warrantyDetail.id,
        });
      }}
    >
      <View style={styles?.container}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {formatType(data?.type)}
        </Text>
        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>Trạng thái</Text>
          <Text>: {formatStatus(data?.status)}</Text>
        </Text>

        <Text style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {addingPackages?.package?.category}
          </Text>
          <Text>: {formatType(data?.type)}</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>Mô tả</Text>
          <Text>: {data?.warrantyDetail?.description}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
