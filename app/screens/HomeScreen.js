import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function HomeScreen() {
  const navigation = useNavigation();
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const todosRef = collection(db, "todos");
      const querySnapshot = await getDocs(todosRef);
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  const handleCreate = async () => {
    try {
      const newTodoRef = await addDoc(collection(db, "todos"), {
        content: "",
      });
      setTodos([...todos, { id: newTodoRef.id, content: "" }]);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const todosRef = collection(db, "todos");
      const docRef = doc(todosRef, id);
      await updateDoc(docRef, {
        content: editedContent,
      });
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, content: editedContent } : todo
      );
      setTodos(updatedTodos);
      setEditingId(null);
      setEditedContent("");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const todosRef = collection(db, "todos");
      await deleteDoc(doc(todosRef, id));
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItemContainer}>
      {editingId === item.id ? (
        <TextInput
          style={styles.todoItemInput}
          placeholder="Add List"
          value={editedContent}
          onChangeText={setEditedContent}
        />
      ) : (
        <Text style={styles.todoItem}>{item.content}</Text>
      )}
      <View style={styles.todoItemButtonContainer}>
        {editingId === item.id ? (
          <TouchableOpacity
            style={styles.todoItemButton}
            onPress={() => handleUpdate(item.id)}
          >
            <Text style={styles.todoItemButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.todoItemButton}
            onPress={() => {
              setEditingId(item.id);
              setEditedContent(item.content);
            }}
          >
            <Text style={styles.todoItemButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.todoItemButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.todoItemButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.todoListContainer}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#786c3b",
  },
  todoListContainer: {
    padding: 20,
  },
  todoItemContainer: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  todoItem: {
    fontSize: 18,
    color: "#000",
  },
  todoItemInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  todoItemButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoItemButton: {
    backgroundColor: "#33cccc",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  todoItemButtonText: {
    textAlign: "center",
  },
  button: {
    backgroundColor: "#33cccc",
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: "center",
  },
});

export default HomeScreen;

