import React, { useState, useEffect } from "react";
import { Box, FlatList } from "@gluestack-ui/themed";
import { CategoryTab, ListNote } from "../../components";
import { useNotes } from "../../context/NotesContext";

const Home = ({ navigation }) => {
  const { userNotes, categories } = useNotes();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onCategoryPress = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const filteredNotes = selectedCategory
    ? userNotes.filter((note) => note.category === selectedCategory)
    : userNotes;

  return (
    <Box py="$3" px="$2" marginTop="$10" pb="$24">
      {/* Category List */}
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryTab
            title={item}
            padding="$2"
            margin="$2"
            onPress={() => onCategoryPress(item)}
          />
        )}
        horizontal
        mb="$4"
        showsHorizontalScrollIndicator={false}
      />

      {/* Notes List */}
      <FlatList
        data={filteredNotes}
        renderItem={({ item }) => (
          <ListNote
            judul={item.title}
            isi={item.content}
            tanggal="tanggal"
            status={item.status}
            category={item.category}
            noteId={item.noteId}
          />
        )}
        keyExtractor={(item) => item.noteId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Box>
  );
};

export default Home;