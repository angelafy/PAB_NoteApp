import React, { useEffect, useState } from "react";
import { Box, Text, Image, VStack, ScrollView } from "@gluestack-ui/themed";
import { Button } from "../../components";
import { clearStorage, getData } from "../../utils";
import FIREBASE from "../../config/FIREBASE";

const Profile = ({ navigation }) => {
  const [profile, setProfile] = useState(null);

  const getUserData = async () => {
    const data = await getData("user");
    if (data) {
      setProfile(data);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", getUserData);
    return unsubscribe;
  }, [navigation]);

  const onSubmit = () => {
    if (profile) {
      FIREBASE.auth()
        .signOut()
        .then(() => {
          clearStorage();
          navigation.replace("MainApp");
        })
        .catch((error) => alert(error));
    } else {
      navigation.replace("Login");
    }
  };

  return (
    <Box
      flex={1}
      mt={"$20"}
      mx={"$5"}
      bg="$blueGray100"
    >
      <ScrollView>
        <VStack mb={"$10"} alignItems="center">
          <Image
            source={require("../../assets/images/avatar.png")}
            size="2xl"
            borderRadius="$full"
            alt="Foto Profil"
          />
          <Text fontSize="$xl" fontWeight="$bold" mt="$5">
            {profile?.nama}
          </Text>
        </VStack>

        <Box
          bg="$white"
          p="$5"
          borderRadius="$xl"
          shadowColor="$black"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity="$25"
          shadowRadius="$3.5"
        >
          <Text fontWeight="$bold" fontSize="$xl">Data Diri</Text>

          <Box mt="$5">
            <Text fontSize="$sm">Email</Text>
            <Text fontSize="$xl" mt="$2">{profile?.email}</Text>
          </Box>

          <Box mt="$5">
            <Text fontSize="$sm">Nomor Ponsel</Text>
            <Text fontSize="$xl" mt="$2">{profile?.nohp}</Text>
          </Box>
        </Box>

        <Button
          type="text"
          title={profile ? "Logout" : "Login"}
          padding="$3"
          onPress={onSubmit}
        />
      </ScrollView>
    </Box>
  );
};

export default Profile;