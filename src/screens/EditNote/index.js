import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Heading,
  Text,
  FormControl,
  Modal,
  ModalBackdrop,
  AlertText,
} from "@gluestack-ui/themed";

import { Button, Input, Pilihan } from "../../components";
import { editNote, getNote } from "../../actions/AuthAction";
import BackFAB from "../../components/kecil/back_fab";

const EditNote = ({ route, navigation }) => {
  const [title, setTitle] = useState(route.params.judul);
  const [content, setContent] = useState(route.params.isi);
  const [category, setCategory] = useState(route.params.category);
  const [status, setStatus] = useState(route.params.status);
  const [noteId] = useState(route.params.noteId);

  const [categoryUser, setCategoryUser] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const ubahStatus = (value) => {
    setStatus(value);
  };

  const toggleAlert = (message = "") => {
    setShowAlert(!showAlert);
    setAlertMessage(message);
  };

  // Ambil kategori dari catatan yang ada
  useEffect(() => {
    const fetchData = async () => {
      const notes = await getNote();
      const categories = notes.map((note) => note.category);
      const uniqueCategories = [...new Set(categories)];
      setCategoryUser(uniqueCategories);
    };

    const unsubscribe = navigation.addListener("focus", fetchData);
    return unsubscribe;
  }, [navigation]);

  // Proses edit catatan
  const onEditNote = async () => {
    if (title && content && status && category) {
      const data = {
        title,
        content,
        status,
        category,
      };

      try {
        await editNote(noteId, data);
        navigation.replace("MainApp");
      } catch (error) {
        toggleAlert(error.message);
      }
    } else {
      toggleAlert("Data tidak lengkap");
    }
  };

  return (
    <Box flex={1} backgroundColor="$white">
      <BackFAB />

      <Box
        shadowColor="$black"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity="$25"
        shadowRadius="$3.5"
        elevation="$5"
        backgroundColor="$white"
        borderRadius="$md"
        mt="$8"
        mx="$3"
        px="$3"
        pt="$2"
      >
        <Heading size="2xl">Edit Your Task!</Heading>
        <Text size="sm" my="$1">
          Having a mistake? An edit got you covered!
        </Text>

        <FormControl>
          <Input
            label="Title"
            width="$full"
            height="$10"
            value={title}
            onChangeText={setTitle}
          />

          <Input
            textarea
            label="Content"
            width="$full"
            height="$32"
            value={content}
            onChangeText={setContent}
          />

          <Pilihan
            label="Status"
            selectedValue={status}
            onValueChange={ubahStatus}
          />

          <Pilihan
            label="Category"
            selectedValue={category}
            datas={categoryUser}
            onValueChange={setCategory}
          />

          <Button title="Update" padding={10} onPress={onEditNote} />
        </FormControl>
      </Box>

      {/* Alert */}
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

export default EditNote;