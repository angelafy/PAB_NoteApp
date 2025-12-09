import React, { createContext, useState, useContext } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  // Data catatan awal
  const [userNotes, setUserNotes] = useState([
    { noteId: 1, title: "Note 1", content: "Lorem ipsum...", status: "Active", category: "Work" },
    { noteId: 2, title: "Note 2", content: "Lorem ipsum...", status: "Inactive", category: "Personal" },
    { noteId: 3, title: "Note 3", content: "Lorem ipsum...", status: "Active", category: "Work" },
    { noteId: 4, title: "Note 4", content: "Lorem ipsum...", status: "Active", category: "Study" },
  ]);

  // Data kategori
  const [categories, setCategories] = useState(["Work", "Personal", "Study", "Others"]);

  // Tambah catatan
  const addNote = (note) => {
    const newNote = {
      ...note,
      noteId: userNotes.length > 0 ? Math.max(...userNotes.map(n => n.noteId)) + 1 : 1,
    };

    setUserNotes([newNote, ...userNotes]);
  };

  // Update catatan
  const updateNote = (noteId, updatedNote) => {
    setUserNotes(
      userNotes.map(note =>
        note.noteId === noteId ? { ...note, ...updatedNote } : note
      )
    );
  };

  // Hapus catatan
  const deleteNote = (noteId) => {
    setUserNotes(userNotes.filter(note => note.noteId !== noteId));
  };

  // Tambah kategori baru
  const addCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        userNotes,
        categories,
        addNote,
        updateNote,
        deleteNote,
        addCategory,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

// Hook untuk consumer
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within NotesProvider");
  }
  return context;
};