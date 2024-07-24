import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComInput from "../../../Components/ComInput/ComInput";
import ComButton from "../../../Components/ComButton/ComButton";
import ComSelect from "../../../Components/ComInput/ComSelect";
import Avatar from "./Avatar";
import ComDatePicker from "../../../Components/ComInput/ComDatePicker";
import { ScrollView } from "react-native";
import { firebaseImg } from "../../../api/firebaseImg";
import { useStorage } from "../../../hooks/useLocalStorage";
import { getData, putData } from "../../../api/api";

export default function EditProfile() {
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);
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
    gender: yup.string().trim().required(EditProfile?.message?.gender),
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

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    values: userData,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const handleEdit = (data) => {
    putData(`/users`, user.id, data)
      .then((res) => {
        console.log(res);
        navigation.navigate("DetailProfile");
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  const data = [
    {
      value: "1",
      label: "Nam",
    },
    {
      value: "2",
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
      GetDetailProfile();
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
              <Avatar image={image} />
              <View style={{ gap: 10 }}>
                <ComInput
                  label={EditProfile?.label?.fullName}
                  placeholder={EditProfile?.placeholder?.fullName}
                  name="fullName"
                  control={control}
                  keyboardType="default" // Set keyboardType for First Name input
                  errors={errors} // Pass errors object
                  required
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
                />
                <ComInput
                  label={EditProfile?.label?.email}
                  placeholder={EditProfile?.placeholder?.email}
                  name="email"
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
            <ComButton onPress={handleSubmit(handleEdit)}>
              {EditProfile?.button?.EditProfile}
            </ComButton>
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
});
