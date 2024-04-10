import { View, Text } from "react-native";
import React from "react";
import { Button } from "@/shared/components";
import { useAuth } from "@/modules/auth";

const Profile = () => {
  const { logoutAction } = useAuth();
  return (
    <View>
      <Text>profile</Text>
      <Button
        style={{ marginVertical: 50, alignSelf: "center", width: 200 }}
        title="Logout"
        onPress={logoutAction}
      />
    </View>
  );
};

export default Profile;
