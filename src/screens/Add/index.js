import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  HStack,
  VStack,
  Modal,
  ModalBackdrop,
  ModalBody,
  FormControlLabel,
  Text,
  InputField,
  Input as GlueInput,
  Pressable,
  Heading,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Alert,
  AlertIcon,
  AlertText,
  Center,
  ScrollView,
} from "@gluestack-ui/themed";
import { Alert as RNAlert } from "react-native";
import { Button, Input, Pilihan } from "../../components";
import { useNotes } from "../../context/NotesContext";

const Add = ({ navigation }) => {
  const { categories, addNote, addCategory } = useNotes();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory);
      setNewCategory("");
      toggleModal();
      RNAlert.alert("Success", "Category added successfully!");
    } else {
      RNAlert.alert("Error", "Please enter a category name");
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      RNAlert.alert("Error", "Please enter a title");
      return;
    }
    if (!content.trim()) {
      RNAlert.alert("Error", "Please enter content");
      return;
    }
    if (!status) {
      RNAlert.alert("Error", "Please select a status");
      return;
    }
    if (!category) {
      RNAlert.alert("Error", "Please select a category");
      return;
    }

    // Save note to context
    addNote({ title, content, status, category });
    console.log({ title, content, status, category });

    // Reset form
    setTitle("");
    setContent("");
    setStatus("");
    setCategory("");

    // Navigate back to home
    navigation.navigate("Home");

    RNAlert.alert("Success", "Task saved successfully!");
  };

  return (
    <ScrollView>
      <Box flex={1} backgroundColor="$white" pb={"$24"}>
        <Box
          shadowColor="$black"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={"$25"}
          shadowRadius={"$3.5"}
          elevation={"$5"}
          backgroundColor="$white"
          borderRadius={"$md"}
          mt={"$8"}
          mx={"$3"}
          px={"$3"}
          pt={"$2"}
        >
          <Heading size="2xl" color="$black">
            Add New Task!
          </Heading>
          <Text size="sm" color="$black" my={"$1"}>
            Add your new task here!
          </Text>
          <FormControl>
            <Input
              label={"Title"}
              width={"$full"}
              height={"$10"}
              onChangeText={(value) => setTitle(value)}
            />
            <Input
              textarea={true}
              label="Content"
              width={"$full"}
              height={"$32"}
              onChangeText={(value) => setContent(value)}
            />
            <Pilihan
              label="Status"
              datas={["Active", "Inactive"]}
              selectedValue={status}
              onValueChange={(value) => setStatus(value)}
            />
            <Pilihan
              label="Category"
              datas={categories}
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}
            />
            <Button
              type="text"
              title="Add New Category"
              onPress={toggleModal}
              padding={10}
            />
            <Button
              type="text"
              title="Save"
              padding={10}
              onPress={handleSave}
            />
          </FormControl>
        </Box>

        <Modal isOpen={isModalVisible} onClose={toggleModal}>
          <ModalBackdrop />
          <ModalContent
            backgroundColor="$white"
            padding={"$2"}
            borderRadius={"$lg"}
          >
            <ModalHeader>
              <VStack space="sm">
                <Heading size="lg">Add New Category</Heading>
                <Text size="sm">
                  Having a lot of task must be needing categories too!
                </Text>
              </VStack>
            </ModalHeader>
            <ModalBody>
              <GlueInput>
                <InputField
                  role="form"
                  placeholder="Category Name"
                  value={newCategory}
                  onChangeText={(value) => setNewCategory(value)}
                />
              </GlueInput>
            </ModalBody>
            <ModalFooter>
              <Box
                flex={1}
                flexDirection="column"
                justifyContent="space-evenly"
              >
                <Pressable
                  backgroundColor="$blue500"
                  p={"$2"}
                  borderRadius={"$sm"}
                  alignItems="center"
                  onPress={handleAddCategory}
                >
                  <Text color="$white" fontWeight="$bold">
                    Add
                  </Text>
                </Pressable>

                <Pressable
                  backgroundColor="$red700"
                  p={"$2"}
                  mt={"$2"}
                  borderRadius={"$sm"}
                  alignItems="center"
                  onPress={toggleModal} // Close modal
                >
                  <Text color="$white" fontWeight="$bold">
                    Cancel
                  </Text>
                </Pressable>
              </Box>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ScrollView>
  );
};

export default Add;