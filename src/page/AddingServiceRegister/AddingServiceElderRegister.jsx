import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import * as yup from "yup";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import backArrowWhite from "../../../assets/icon/backArrowWhite.png";
import { useNavigation } from "@react-navigation/native";
import ComElder from "../../Components/ComElder/ComElder";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ComTitlePage from "../../Components/ComTitlePage/ComTitlePage";
import ComInput from "../../Components/ComInput/ComInput";
import ComTitleLink from "../../Components/ComTitleLink/ComTitleLink";
import ComTitle from "../../Components/ComTitle/ComTitle";

export default function AddingServiceElderRegister() {
  const [data, setData] = useState({
    img: "https://upviet.com.vn/uploaded/May%20cong%20nghiep/may%20cong%20cu/tien-co.jpg",
    color: "#8DF7AB",
    text: "Máy tiện cnc",
    context:
      "Máy tiện cnc là một trong những thiết bị không thể thiếu trong ngành công nghiệp cơ khí chế tạo máy. Máy tiện cnc giúp gia công các chi tiết cơ khí chính xác, nhanh chóng và tiết kiệm chi phí.",
    category: "Máy tiện",
    money: 350000,
  });

  const loginSchema = yup.object().shape({
    username: yup.string().trim().required("vui long nhap email"),
    password: yup.string().required("Login?.message?.password"),
    // chon: yup.string().required("vui long nhap mk"),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "user",
      password: "user",
    },
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const [selectedElderId, setSelectedElderId] = useState(null);

  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);

  const route = useRoute();
  const { id } = route.params;

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const formatCurrency = (number) => {
    // Sử dụng hàm toLocaleString() để định dạng số
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleElderPress = (id) => {
    setSelectedElderId(id);
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
          source={{ uri: data?.img }}
          style={{
            height: 200,
            objectFit: "fill",
          }}
        />
      </View>
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}
            numberOfLines={2}
          >
            {data?.text}
          </Text>
          {/* price */}
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold" }}>
              {formatCurrency(data?.money)}
            </Text>
            /{addingPackages?.package?.month}
          </Text>

          {/* category */}
          <Text style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={styles.contentBold}>
              {addingPackages?.package?.category}
            </Text>
            <Text style={{ fontSize: 16 }}>: {data?.category}</Text>
          </Text>

          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            Điền thông tin báo cáo
          </Text>

          <View>
            <FormProvider {...methods}>
              <View style={{ width: "100%", gap: 10 }}>
                <ComInput
                  label={"Tenbaocao"}
                  placeholder={""}
                  name="username"
                  control={control}
                  keyboardType="default" // Set keyboardType for First Name input
                  errors={errors} // Pass errors object
                  required
                />
                <ComInput
                  label={"Noidung"}
                  placeholder={""}
                  name="password"
                  control={control}
                  errors={errors} // Pass errors object
                  required
                />
                {/* <ComSelect
              label="Last name"
              name="chon"
              control={control}
              // keyboardType="visible-password" // Set keyboardType for Last Name input
              errors={errors} // Pass errors object
              options={data}
              required
            /> */}

                {/* <Button title={button.login} style={{ margin: 100 }} /> */}
              </View>
            </FormProvider>
          </View>
          <View style={{ height: 120 }}></View>
        </ScrollView>
        <View style={{ marginVertical: 20 }}>
          <ComSelectButton
          // onPress={() => {
          //   navigation.navigate("AddingServiceCalendarRegister", {
          //     id: data.id,
          //   });
          // }}
          >
            Xác nhận
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
});
