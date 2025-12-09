import React from "react";
import {
  Box,
  Text,
  Image,
  VStack,
  ScrollView,
} from "@gluestack-ui/themed";
import { Button } from "../../components";

const Profile = ({ navigation }) => {
  return (
    <Box flex={1} backgroundColor="$blueGray100" mt="$20" mx="$5">
      <ScrollView>
        <VStack width="$full" mb="$10">
          <Image
            source={require("../../assets/images/avatar.png")}
            size="2xl"
            borderRadius="$full"
            alignSelf="center"
            alt="Foto Profil"
          />

          <Text
            fontSize="$xl"
            fontWeight="$bold"
            alignSelf="center"
            mt="$5"
          >
            Nama User
          </Text>
        </VStack>

        <Box
          bgColor="$white"
          shadowColor="$black"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity="$25"
          shadowRadius="$3.5"
          p="$5"
          borderRadius="$xl"
        >
          <Text color="$black" fontWeight="$bold" fontSize="$xl">
            Data Diri
          </Text>

          <Box mt="$5">
            <Text color="$black" fontSize="$sm">
              Email
            </Text>
            <Text color="$black" fontSize="$xl" mt="$2">
              Lorem Ipsum
            </Text>
          </Box>

          <Box mt="$5">
            <Text color="$black" fontSize="$sm">
              Nomor Ponsel
            </Text>
            <Text color="$black" fontSize="$xl" mt="$2">
              Lorem Ipsum
            </Text>
          </Box>
        </Box>

        <Button
          title="Login"
          type="text"
          padding="$3"
          onPress={() => navigation.navigate("Login")}
        />
      </ScrollView>
    </Box>
  );
};

export default Profile;