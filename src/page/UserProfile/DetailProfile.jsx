import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";
import ComSelect from "../../Components/ComInput/ComSelect";
import ComDatePicker from "../../Components/ComInput/ComDatePicker";
import { ScrollView } from "react-native";
import { useStorage } from "../../hooks/useLocalStorage";
import { getData } from "../../api/api";

export default function DetailProfile() {
  const [date, setDate] = useState(new Date());
  const [userData, setUserData] = useState({});
  const [user, setData] = useStorage("user", {});

  const navigation = useNavigation();
  const {
    text: {
      EditProfile,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);
  const loginSchema = yup.object().shape({
    fullName: yup.string().trim().required(EditProfile?.message?.fullName),
    username: yup.string().trim().required(EditProfile?.message?.username),
    phoneNumber: yup
      .string()
      .trim()
      .required(EditProfile?.message?.phoneNumber),
    email: yup
      .string()
      .email(EditProfile?.message?.emailInvalid)
      .trim()
      .required(EditProfile?.message?.email),
  });
  const Edit = () => {
    navigation.navigate("EditProfile");
  };
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    values: userData,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = methods;

  const data = [
    {
      value: "2",
      label: "Nam",
    },
    {
      value: "3",
      label: "Nữ",
    },
  ];

  const GetDetailProfile = async () => {
    if (user.id) {
      getData(`/users/${user.id}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        GetDetailProfile();
      }, 10);
      return () => {};
    }, [])
  );

  useEffect(() => {
    GetDetailProfile();
  }, [user]);

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <FormProvider {...methods}>
          <View style={{ width: "100%", gap: 10, flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.avatarContainer}>
                <Image
                  source={{
                    uri: "https://www.shutterstock.com/image-vector/worker-engineer-technician-mechanic-avatar-260nw-1983689702.jpg",
                  }}
                  style={styles.avatar}
                />
              </View>
              <View style={{ gap: 10 }}>
                <ComInput
                  label={EditProfile?.label?.fullName}
                  placeholder={EditProfile?.placeholder?.fullName}
                  name="fullName"
                  control={control}
                  keyboardType="default" // Set keyboardType for First Name input
                  errors={errors} // Pass errors object
                  required
                  edit={false}
                />
                <ComInput
                  label={"Tên tài khoản"}
                  placeholder={"Tên tài khoản"}
                  name="username"
                  control={control}
                  keyboardType="default" // Set keyboardType for First Name input
                  errors={errors} // Pass errors object
                  required
                  edit={false}
                />

                <ComInput
                  label={EditProfile?.label?.phoneNumber}
                  placeholder={EditProfile?.placeholder?.phoneNumber}
                  name="phoneNumber"
                  control={control}
                  keyboardType="default" // Set keyboardType for First Name input
                  errors={errors} // Pass errors object
                  required
                  edit={false}
                />
                <ComInput
                  label={EditProfile?.label?.email}
                  placeholder={EditProfile?.placeholder?.email}
                  name="email"
                  edit={false}
                  control={control}
                  keyboardType="default" // Set keyboardType for First Name input
                  errors={errors} // Pass errors object
                  required
                />
              </View>
              <View style={{ height: 100 }}></View>
            </ScrollView>
          </View>
          <View>
            <ComButton onPress={Edit}>Chỉnh sửa</ComButton>
          </View>
        </FormProvider>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    gap: 10,
  },
  container: {
    flex: 1,
  },
  avatarContainer: {
    position: "relative", // Quan trọng!
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "gray",
  },
});
