import React, { useState, useEffect } from "react";
import {
  Box, FormControl, VStack, Modal, ModalBackdrop, ModalBody,
  Text, InputField, Input as GlueInput, Pressable, Heading,
  ModalHeader, ModalContent, ModalFooter, Alert, AlertText,
  ScrollView,
} from "@gluestack-ui/themed";
import { Button, Input, Pilihan } from "../../components";
import { addNote, getNote } from "../../actions/AuthAction";

const Add = ({ navigation }) => {
  const [form, setForm] = useState({ title: "", content: "", status: "", category: "" });
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [alert, setAlert] = useState("");

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    const fetch = async () => {
      const notes = await getNote();
      setCategories([...new Set(notes.map((n) => n.category))]);
    };
    const unsub = navigation.addListener("focus", fetch);
    return unsub;
  }, [navigation]);

  const save = async () => {
    const ok = Object.values(form).every(Boolean);
    if (!ok) return setAlert("Data tidak lengkap");
    try {
      await addNote(form);
      navigation.replace("MainApp");
    } catch (e) {
      setAlert(e.message);
    }
  };

  const addCategory = () => {
    if (!newCat.trim()) return;
    setCategories((c) => [...c, newCat]);
    setNewCat("");
    setModal(false);
  };

  return (
    <ScrollView>
      <Box flex={1} bg="$white" p="$3">
        <Heading size="2xl">Add New Task!</Heading>
        <Text size="sm" my="$1">Add your new task here!</Text>

        <FormControl>
          <Input label="Title" onChangeText={set("title")} />
          <Input textarea label="Content" height="$32" onChangeText={set("content")} />
          <Pilihan label="Status" selectedValue={form.status} onValueChange={set("status")} />
          <Pilihan label="Category" datas={categories} selectedValue={form.category} onValueChange={set("category")} />
          <Button type="text" title="Add New Category" onPress={() => setModal(true)} />
          <Button type="text" title="Save" onPress={save} />
        </FormControl>

        <Modal isOpen={modal} onClose={() => setModal(false)}>
          <ModalBackdrop />
          <ModalContent bg="$white" p="$2" borderRadius="$lg">
            <ModalHeader>
              <VStack space="sm">
                <Heading size="lg">Add New Category</Heading>
                <Text size="sm">Create a new category</Text>
              </VStack>
            </ModalHeader>
            <ModalBody>
              <GlueInput>
                <InputField placeholder="Category Name" value={newCat} onChangeText={setNewCat} />
              </GlueInput>
            </ModalBody>
            <ModalFooter>
              <Pressable bg="$blue500" p="$2" borderRadius="$sm" onPress={addCategory}>
                <Text color="$white" fontWeight="$bold">Add</Text>
              </Pressable>
              <Pressable bg="$red700" p="$2" mt="$2" borderRadius="$sm" onPress={() => setModal(false)}>
                <Text color="$white" fontWeight="$bold">Cancel</Text>
              </Pressable>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {!!alert && (
          <Modal isOpen onClose={() => setAlert("")}>
            <ModalBackdrop />
            <Alert action="error" variant="solid">
              <AlertText>{alert}</AlertText>
            </Alert>
          </Modal>
        )}
      </Box>
    </ScrollView>
  );
};

export default Add;