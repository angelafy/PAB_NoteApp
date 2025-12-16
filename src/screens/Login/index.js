import React, { useState } from "react";
import {
  Alert,
  Box,
  Text,
  FormControl,
  Heading,
  AlertText,
  Modal,
  ModalBackdrop,
} from "@gluestack-ui/themed";
import { Input, Button } from "../../components";
import { loginUser } from "../../actions/AuthAction";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const toggleAlert = (message = "") => {
    setShowAlert(!showAlert);
    setAlertMessage(message);
  };

  const login = () => {
    if (email && password) {
      loginUser(email, password)
        .then(() => {
          navigation.replace("MainApp");
        })
        .catch((error) => {
          toggleAlert(error.message);
        });
    }
  };

  return (
    <Box flex={1} backgroundColor="$blue400" justifyContent="center">
      <Box
        shadowColor="$black"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity="$25"
        shadowRadius="$3.5"
        elevation="$5"
        backgroundColor="$white"
        borderRadius="$md"
        mt="$10"
        mx="$6"
        p="$5"
      >
        <Heading size="3xl">Welcome</Heading>
        <Text size="sm" my="$1">
          Sign in to continue!
        </Text>

        <FormControl>
          <Input
            label="Email"
            width="$full"
            height="$10"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Password"
            width="$full"
            height="$10"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </FormControl>

        <Box my="$5">
          <Button title="Login" type="text" padding="$3" onPress={login} />
          <Text size="sm" mt="$4">
            Don't have an account?
          </Text>
          <Button
            title="Register"
            type="text"
            padding="$3"
            onPress={() => navigation.navigate("Register")}
          />
        </Box>
      </Box>

      {showAlert && (
        <Modal isOpen={showAlert} onClose={toggleAlert}>
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

export default Login;