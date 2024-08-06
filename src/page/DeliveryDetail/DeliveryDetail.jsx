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
  Modal,
  Alert,
} from "react-native";
import * as yup from "yup";
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import exclamationMark from "../../../assets/icon/exclamationMark.png";
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
  const [modalVisible, setModalVisible] = useState(false);

  const loginSchema = yup
    .object()
    .shape({
      note: yup.string().trim(),
      noteCancel: yup.string().trim(),
    })
    .test(
      "one-of-required",
      "Vui lòng nhập ít nhất một trường",
      function (values) {
        const { note, noteCancel } = values;
        return note || noteCancel;
      }
    );

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      note: "",
      noteCancel: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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
    if (data.note) {
      try {
        const param = { status: "Completed", note: data.note };
        await putData(`orders`, details?.order?.id, param);
        Alert.alert("Thông báo", "Đã giao hàng thành công");
        navigation.navigate("DeliveryService");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateRedelivery = async (data) => {
    if (data.noteCancel) {
      try {
        const param = { status: "ReDelivery", note: data.noteCancel };
        await putData(`orders`, details?.order?.id, param);
        Alert.alert("Thông báo", "Giao hàng thất bại");
        navigation.navigate("DeliveryService");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleExclamationPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    reset();
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
          <TouchableOpacity
            onPress={handleExclamationPress}
            style={styles.markIconContainer}
          >
            {details?.status === "Process" && (
              <Image source={exclamationMark} style={styles.exclamationIcon} />
            )}
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
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={styles.contentBold}>Phân loại</Text>
              <Text style={{ fontSize: 16 }}>
                : {formatType(details?.type)}
              </Text>
            </View>
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { width: 300 }]}>
              <Text style={styles.modalText}>Hủy giao hàng</Text>
              <FormProvider {...methods}>
                <View style={{ width: "100%", marginBottom: 20 }}>
                  <ComTextArea
                    label={"Lý do"}
                    placeholder={""}
                    name="noteCancel"
                    control={control}
                    keyboardType="default"
                    errors={errors}
                    required
                    multiline={true}
                    numberOfLines={4}
                  />
                </View>
              </FormProvider>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={handleSubmit(handleUpdateRedelivery)}
              >
                <Text style={styles.textStyle}>Xác nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={handleCloseModal}
              >
                <Text style={styles.textStyle}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  markIconContainer: {
    position: "absolute",
    zIndex: 100,
    marginTop: 60,
    marginLeft: "90%",
    padding: 3,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  exclamationIcon: {
    width: 30,
    height: 30,
  },
  typeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300, // Fixed width for the modal
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 10,
    width: "100%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
