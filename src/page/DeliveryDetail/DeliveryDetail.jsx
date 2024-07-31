import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as yup from "yup";
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from "@react-navigation/native";
import { getData, putData } from "../../api/api";
import { FormProvider, useForm } from "react-hook-form";
import ComTextArea from "../../Components/ComInput/ComTextArea";
import { yupResolver } from "@hookform/resolvers/yup";

export default function DeliveryDetail({ route }) {
  const [data, setData] = useState({});
  const [details, setDetails] = useState({});
  const [image, setImage] = useState({
    img: "https://file.hstatic.net/200000472237/article/ung-dung-ship-hang_fed864d839d04fe1b035df0d991a8d0b.png",
  });

  const loginSchema = yup.object().shape({
    note: yup.string().trim().required("Vui lòng nhập chú thích"),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      note: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const {
    text: { addingPackages },
  } = useContext(LanguageContext);

  const navigation = useNavigation();
  const { id, orderId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(`task/${id}`);
      setDetails(res.data);
    };
    fetchData();
  }, [id]);

  const formatStatus = (status) => {
    if (status === "Process") {
      return "Đang xử lý";
    } else if (status === "Completed") {
      return "Hoàn thành";
    }
  };

  const formatType = (type) => {
    if (type === "Delivery") {
      return "Giao hàng";
    }
  };

  const formatAddress = (address) => {
    return `${address?.note}, ${address?.ward?.name}, ${address?.district?.name}, ${address?.city?.name}`;
  };

  const formatDateTime = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const handleUpdate = async (data) => {
    try {
      const param = { status: "Completed", note: data.note };
      const res = await putData(`orders`, details?.order?.id, param);
      console.log(res);
      navigation.navigate("DeliveryService");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
              resizeMode: "cover",
              borderRadius: 5,
              marginBottom: 10,
            }}
          />
        </View>

        <View style={styles.body}>
          <ScrollView>
            <Text style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={styles.contentBold}>Phân loại</Text>
              <Text style={{ fontSize: 16 }}>
                : {formatType(details?.type)}
              </Text>
            </Text>
            <Text style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={styles.contentBold}>Trạng thái</Text>
              <Text style={{ fontSize: 16 }}>
                : {formatStatus(details?.status)}
              </Text>
            </Text>

            <Text style={styles.contentBold}>Chi tiết:</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("OrderDetails", {
                  orderId: orderId,
                });
              }}
            >
              <View style={styles.deliveryDetail}>
                <Text style={styles.detailText}>
                  <Text style={{ fontWeight: "bold" }}>Mã hóa đơn</Text>:{" "}
                  {details?.order?.invoiceCode}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={{ fontWeight: "bold" }}>Ngày tạo</Text>:{" "}
                  {formatDateTime(details?.createDate)}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={{ fontWeight: "bold" }}>Khách hàng</Text>:{" "}
                  {details?.address?.account?.fullName}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={{ fontWeight: "bold" }}>Địa chỉ</Text>:{" "}
                  {formatAddress(details?.address)}
                </Text>
                <Text style={styles.detailText}>
                  <Text style={{ fontWeight: "bold" }}>Ghi chú</Text>:{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>

          <View style={{ marginVertical: 20 }}>
            {details?.status === "Process" && (
              <View>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}
                >
                  Điền thông tin xác nhận
                </Text>
                <FormProvider {...methods}>
                  <View style={{ width: "100%", gap: 10 }}>
                    <ComTextArea
                      label={"Chú thích"}
                      placeholder={""}
                      name="note"
                      control={control}
                      keyboardType="default"
                      errors={errors}
                      required
                      multiline={true}
                      numberOfLines={4}
                    />
                  </View>
                </FormProvider>
              </View>
            )}
          </View>

          <View style={{ marginVertical: 20 }}>
            {details?.status === "Process" && (
              <ComSelectButton
                title={addingPackages}
                onPress={handleSubmit(handleUpdate)}
              >
                Xác nhận
              </ComSelectButton>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    width: 30,
    height: 30,
  },
  deliveryDetail: {
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
