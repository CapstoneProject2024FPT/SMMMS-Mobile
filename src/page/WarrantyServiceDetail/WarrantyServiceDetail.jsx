import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import * as yup from "yup";
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import { LanguageContext } from "../../contexts/LanguageContext";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from "@react-navigation/native";
import { getData, putData } from "../../api/api"; // Make sure to import putData if it's used
import ComTextArea from "../../Components/ComInput/ComTextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

export default function WarrantyServiceDetail({ route }) {
  const [data, setData] = useState({});
  const [warrantyDetail, setWarrantyDetail] = useState({});
  const [image, setImage] = useState({
    img: "https://halivina.vn/upload/images/11(1).jpg",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const loginSchema = yup.object().shape({
    note: yup.string().required("Vui lòng nhập thông tin"),
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
    reset,
  } = methods;

  const {
    text: { addingPackages },
  } = useContext(LanguageContext);

  const formatStatus = (status) => {
    if (status === "Process") {
      return "Đang xử lý";
    } else if (status === "Completed") {
      return "Hoàn thành";
    }
  };

  const formatType = (type) => {
    if (type === "CustomerRequest") {
      return "Yêu cầu bảo hành";
    } else if (type === "Periodic") {
      return "Bảo hành định kỳ";
    }
  };

  const navigation = useNavigation();
  const { id, warrantyId } = route.params;
  useEffect(() => {
    const WarranttData = async () => {
      const res = await getData(`warranty/${id}`);
      setData(res.data);
    };

    const WarranttDetailData = async () => {
      const res = await getData(`warrantyDetail/${warrantyId}`);
      setWarrantyDetail(res.data);
    };

    WarranttData();
    WarranttDetailData();
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

  const handleUpdate = async (data) => {
    try {
      const param = { status: "Completed", description: data.note };
      await putData(`warrantyDetail`, warrantyDetail?.id, param);
      Alert.alert("Thông báo", "Đã bảo hành xong");
      navigation.navigate("WarrantyService");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    reset();
  };

  const openModal = () => {
    setModalVisible(true);
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
            {formatType(data?.type)}
          </Text>
          {/* category */}
          <Text style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={styles.contentBold}>
              {addingPackages?.package?.category}
            </Text>
            <Text style={{ fontSize: 16 }}>: {formatType(data?.type)}</Text>
          </Text>
          {/* mô tả */}
          <Text style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={styles.contentBold}>Mô tả</Text>:{" "}
            <Text style={{ fontSize: 16 }}>{data?.description}</Text>
          </Text>

          {/* Warranty Details */}
          <Text style={styles.contentBold}>Thông tin bảo hành:</Text>
          <TouchableOpacity
            onPress={() => {
              if (warrantyDetail?.status !== "Completed") {
                navigation.navigate("WarrantyComponentConfirm", {
                  id: data.inventory.machinery.id,
                  inventoryId: data.inventory.id,
                  warrantyId: warrantyId,
                });
              }
            }}
            disabled={warrantyDetail?.status === "Completed"}
          >
            <View style={styles.warrantyDetail}>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Số serial</Text>:{" "}
                {data?.inventory?.serialNumber}
              </Text>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Tên máy</Text>:{" "}
                {data?.inventory?.machinery?.name}
              </Text>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Ngày tạo</Text>:{" "}
                {formatDateTime(data?.createDate)}
              </Text>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Ngày bắt đầu</Text>:{" "}
                {formatDateTime(data?.startDate)}
              </Text>
              <Text style={styles.detailText}>
                <Text style={{ fontWeight: "bold" }}>Địa chỉ</Text>:{" "}
                {formatAddress(data?.address)}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Warranty Detail */}
          <Text style={styles.contentBold}>Bộ phận sửa:</Text>
          <View style={styles.warrantyDetail}>
            {warrantyDetail?.inventoryChanges?.length ? (
              warrantyDetail.inventoryChanges.map((item, index) => (
                <View key={index}>
                  <Text style={styles.detailText}>
                    <Text style={{ fontWeight: "bold" }}>Số serial</Text>:{" "}
                    {item.newInventory.serialNumber}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={{ fontWeight: "bold" }}>
                      Tên bộ phận thay thế
                    </Text>
                    : {}
                    {item.newInventory.componentName}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.detailText}>
                Hiện không có bộ phận cần thay thế
              </Text>
            )}
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { width: 300 }]}>
              <Text style={styles.modalText}>Báo cáo bảo hành</Text>
              <FormProvider {...methods}>
                <View style={{ width: "100%", marginBottom: 20 }}>
                  <ComTextArea
                    label={"Báo cáo"}
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
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={handleSubmit(handleUpdate)}
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

        <View style={{ marginVertical: 20 }}>
          {warrantyDetail?.status !== "Completed" && (
            <ComSelectButton onPress={openModal}>Báo cáo</ComSelectButton>
          )}
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
  },
});
