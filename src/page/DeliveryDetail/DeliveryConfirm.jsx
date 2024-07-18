import React, { useContext, useEffect, useState } from "react";
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
import { putData } from "../../api/api";

export default function DeliveryConfirm() {
  const [data, setData] = useState({});

  const loginSchema = yup.object().shape({
    note: yup.string().trim().required("Vui lòng nhập chú thích"),
    // chon: yup.string().required("vui long nhap mk"),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      note: "Chú thích",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);

  const route = useRoute();
  const { id } = route.params;

  const navigation = useNavigation();

  const handleUpdate = async (data) => {
    try {
      const param = { status: "Completed", note: data.note };
      const res = await putData(`orders`, id, param);
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
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backIconContainer}
        >
          <Image source={backArrowWhite} style={styles.backIcon} />
        </TouchableOpacity>
        {/* <Image
          source={{ uri: data?.img }}
          style={{
            height: 200,
            objectFit: "fill",
          }}
        /> */}
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

          {/* category */}
          <Text style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={styles.contentBold}></Text>
          </Text>

          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            Điền thông tin xác nhận
          </Text>

          <View>
            <FormProvider {...methods}>
              <View style={{ width: "100%", gap: 10 }}>
                <ComInput
                  label={"Chú thích"}
                  placeholder={""}
                  name="note"
                  control={control}
                  keyboardType="default" // Set keyboardType for First Name input
                  errors={errors} // Pass errors object
                  required
                />
              </View>
            </FormProvider>
          </View>
        </ScrollView>
        <View style={{ marginVertical: 20 }}>
          <ComSelectButton
            title={addingPackages}
            onPress={handleSubmit(handleUpdate)}
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
    zIndex: 50,
    marginTop: 60,
    marginLeft: 10,
    padding: 3,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backIcon: {
    width: 30,
    height: 30,
  },
});
