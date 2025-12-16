import React, { useState } from "react";
import {
  Box,
  Alert,
  FormControl,
  Text,
  Modal,
  ModalBackdrop,
  AlertText,
} from "@gluestack-ui/themed";

import { Input, Button } from "../../components";
import { registerUser } from "../../actions/AuthAction";
import BackFAB from "../../components/kecil/back_fab";

const Register = ({ navigation }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nohp, setNohp] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const toggleAlert = (message = "") => {
    setAlertMessage(message);
    setShowAlert(!showAlert);
  };

  const onRegister = async () => {
    if (nama && email && nohp && password) {
      const data = {
        nama,
        email,
        nohp,
        status: "user",
      };

      try {
        await registerUser(data, password);
        navigation.replace("MainApp");
      } catch (error) {
        toggleAlert(error.message);
      }
    } else {
      toggleAlert("Data tidak lengkap");
    }
  };

  return (
    <Box flex={1} backgroundColor="$blue400" justifyContent="center">
      <BackFAB />

      <Box
        backgroundColor="$white"
        borderRadius="$md"
        marginTop="$10"
        marginHorizontal="$6"
        p="$5"
        shadowColor="$black"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity="$25"
        shadowRadius="$3.5"
        elevation="$5"
      >
        <Text size="3xl" color="$black" fontWeight="bold">
          Hello~
        </Text>
        <Text size="sm" color="$black" my="$1">
          Sign up to continue!
        </Text>

        <FormControl>
          <Input
            label="Nama"
            value={nama}
            onChangeText={setNama}
            height="$10"
          />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            height="$10"
          />
          <Input
            label="No. Handphone"
            keyboardType="phone-pad"
            value={nohp}
            onChangeText={setNohp}
            height="$10"
          />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            height="$10"
          />
        </FormControl>

        <Box my="$5">
          <Button
            title="Register"
            type="text"
            padding="$3"
            onPress={onRegister}
          />
        </Box>
      </Box>

      {showAlert && (
        <Modal isOpen={showAlert} onClose={() => toggleAlert()}>
          <ModalBackdrop />
          <Alert mx="$4" action="error" variant="solid">
            <AlertText fontWeight="$bold">Error!</AlertText>
            <AlertText>{alertMessage}</AlertText>
          </Alert>
        </Modal>
      )}
    </Box>
  );
};

export default Register;