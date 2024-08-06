import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComSelectButton from "../../Components/ComButton/ComSelectButton";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComAddContract from "./ComAddContract";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function Contracts() {
  const {
    text: { contractsPage },
    setLanguage,
  } = useContext(LanguageContext);
  const [data, setData] = useState([
    {
      img: "https://upviet.com.vn/uploaded/May%20cong%20nghiep/may%20cong%20cu/tien-co.jpg",
      color: "#F7E863",
      text: "Máy tiện cnc",
      context:
        "Máy tiện cnc là một trong những thiết bị không thể thiếu trong ngành công nghiệp cơ khí chế tạo máy. Máy tiện cnc giúp gia công các chi tiết cơ khí chính xác, nhanh chóng và tiết kiệm chi phí.",
      category: "12345667",
      representative: "Nguyễn Minh Phúc",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const [select, setSelect] = useState(false);
  const [select1, setSelect1] = useState(true);
  const [select2, setSelect2] = useState(true);
  const [select3, setSelect3] = useState(true);
  const check = () => {
    setSelect(false);
    setSelect1(true);
    setSelect2(true);
    setSelect3(true);
  };
  const check1 = () => {
    setSelect(true);
    setSelect1(false);
    setSelect2(true);
    setSelect3(true);
  };
  const check2 = () => {
    setSelect(true);
    setSelect1(true);
    setSelect3(true);
    setSelect2(false);
  };
  const check3 = () => {
    setSelect(true);
    setSelect1(true);
    setSelect2(true);
    setSelect3(false);
  };

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
  return (
    <>
      <ComHeader
        showBackIcon={true}
        showTitle={true}
        title={contractsPage?.title}
      />
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
        <ScrollView
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
              Còn hạn
            </ComSelectButton>
            <ComSelectButton onPress={check2} check={select2}>
              Sắp hết hạn
            </ComSelectButton>
            <ComSelectButton onPress={check3} check={select3}>
              Hết hạn
            </ComSelectButton>
          </View>
        </ScrollView>

        <ComLoading show={loading}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View>
              {data?.map((value, index) => (
                <ComAddContract key={index} data={value} />
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
