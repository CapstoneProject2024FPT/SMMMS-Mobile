import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { FormProvider, set, useForm } from "react-hook-form";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComInputSearch from "../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ComAddPackage from "./ComAddPackage";
import { LanguageContext } from "../../contexts/LanguageContext";
import { getData } from "../../api/api";
import { useStorage } from "../../hooks/useLocalStorage";
import { useFocusEffect } from "@react-navigation/native";

export default function WarrantyService() {
  const [user, setUserData] = useStorage("user", {});
  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetWarrantyTask();
    setRefreshing(false);
  }, []);

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

  const GetWarrantyTask = async () => {
    const type = "Warranty";
    if (user.id) {
      getData(`task?Type=${type}&AccountId=${user.id}`)
        .then((data) => {
          setData(data.data);
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };

  useEffect(() => {
    GetWarrantyTask();
  }, [user.id]);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        GetWarrantyTask();
      }, 10);
      return () => {};
    }, [])
  );

  return (
    <>
      <ComHeader showBackIcon={true} showTitle={true} title={"Bảo hành"} />
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
        <ComLoading show={loading}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
