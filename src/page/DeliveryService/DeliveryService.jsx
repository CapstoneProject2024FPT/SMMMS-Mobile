import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FormProvider, set, useForm } from "react-hook-form";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComAddPackage from "./ComAddPackage";
import { LanguageContext } from "../../contexts/LanguageContext";
import { getData } from "../../api/api";

export default function DeliveryService() {
  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchSchema = yup.object().shape({
    search: yup.string(),
  });
  const methods = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    setLoading(!loading);
  };

  useEffect(() => {
    const type = "Delivery"; // Define the type here
    getData(`task?Type=${type}`).then((data) => {
      setData(data.data);
    });
  }, []);

  return (
    <>
      <ComHeader showBackIcon={true} showTitle={true} title={"Giao hàng"} />
      <View style={styles.container}>
        <FormProvider {...methods}>
          <ComInputSearch
            placeholder="Tìm kiếm"
            keyboardType="default"
            name="search"
            control={control}
            onSubmitEditing={handleSubmit(onSubmit)}
            errors={errors}
          />
        </FormProvider>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles?.scrollView}
        >
          <View style={styles?.buttonContainer}>
            <ComSelectButton onPress={check} check={select}>
              Tất cả
            </ComSelectButton>
            <ComSelectButton onPress={check1} check={select1}>
              Định kỳ
            </ComSelectButton>
            <ComSelectButton onPress={check2} check={select2}>
              Yêu cầu
            </ComSelectButton>
          </View>
        </ScrollView> */}

        <ComLoading show={loading}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ marginTop: "2%" }}>
              {data?.map((value, index) => (
                <ComAddPackage key={index} data={value} />
              ))}
            </View>
            <View style={{ height: 120 }}></View>
          </ScrollView>
        </ComLoading>
      </View>
      {/* <View style={{ height: 100, backgroundColor: "#fff" }}></View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
  },
});
