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
  const [cruds, setCruds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const fetchCruds = async () => {
      const crudsRef = collection(db, "cruds");
      const querySnapshot = await getDocs(crudsRef);
      const cruds = [];
      querySnapshot.forEach((doc) => {
        cruds.push({ ...doc.data(), id: doc.id });
      });
      setCruds(cruds);
    };
    fetchCruds();
  }, []);

  const handleCreate = async () => {
    try {
      const newDocRef = await addDoc(collection(db, "cruds"), {
        content: "",
      });
      setCruds([...cruds, { id: newDocRef.id, content: "" }]);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const crudsRef = collection(db, "cruds");
      const docRef = doc(crudsRef, id);
      await updateDoc(docRef, {
        content: editedContent,
      });
      const updatedCruds = cruds.map((crud) =>
        crud.id === id ? { ...crud, content: editedContent } : crud
      );
      setCruds(updatedCruds);
      setEditingId(null);
      setEditedContent("");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const crudsRef = collection(db, "cruds");
      await deleteDoc(doc(crudsRef, id));
      setCruds(cruds.filter((crud) => crud.id !== id));
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
        data={cruds}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.todoListContainer}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("AboutScreen")}
        >
          <Text style={styles.buttonText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  button2: {
    backgroundColor: "#33cccc",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    width: 100,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#2c786c",
  },
  buttonText: {
    textAlign: "center",
  },
});

export default HomeScreen;
