import React from "react";
import { StyleSheet, View } from "react-native";
import HeaderUser from "./HeaderUser";
import MenuList from "./MenuList";
import bill from "../../../assets/profile_icons/bill.png";
import changePassword from "../../../assets/profile_icons/changePassword.png";
import contract from "../../../assets/profile_icons/contract.png";
import edit from "../../../assets/profile_icons/edit.png";
import feedback from "../../../assets/profile_icons/feedback.png";
import notification from "../../../assets/profile_icons/notification.png";
import serviceHistory from "../../../assets/profile_icons/serviceHistory.png";
import signout from "../../../assets/profile_icons/signout.png";
export default function UserProfile() {
  const data = [
    {
      name: "Hợp đồng",
      link: "Contracts",
    },
    // {
    //   name: "Lịch sử dịch vụ",
    //   link: "ServiceHistory",
    // },
    {
      name: "Đổi mật khẩu",
      link: "ChangePassword",
    },
  ];

  const data2 = [
    {
      name: "Đăng xuất",
      link: "Login",
      icon: signout,
    },
  ];
  return (
    <View style={styles.body}>
      <HeaderUser />
      <MenuList data={data} />
      <MenuList data={data2} colorRed={true} />
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
  imageBody: {
    padding: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: "hidden", // Ẩn phần ảnh nằm ngoài
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "180%",
    height: "180%",
    resizeMode: "cover",
    bottom: -50,
  },
});
