import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
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

  useEffect(() => {
    const fetchCruds = async () => {
      const querySnapshot = await getDocs(collection(db, "cruds"));
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
      const newDoc = await addDoc(collection(db, "cruds"), {
        title: "New Document",
        content: "This is the content of a new document",
      });
      setCruds([...cruds, { ...newDoc.data(), id: newDoc.id }]);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const docRef = doc(db, "cruds", id);
      await updateDoc(docRef, {
        title: "Updated Document",
        content: "This is the content of an updated document",
      });
      const updatedCruds = cruds.map((crud) =>
        crud.id === id
          ? {
              ...crud,
              title: "Updated Document",
              content: "This is the content of an updated document",
            }
          : crud
      );
      setCruds(updatedCruds);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "cruds", id));
      const newCruds = cruds.filter((crud) => crud.id !== id);
      setCruds(newCruds);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.scrollView, { marginBottom: 100 }]}>
        <View style={styles.paragraphContainer}>
          <Image
            source={require("../assets/images/img1.jpg")}
            style={styles.image}
          />
          <Text style={styles.paragraph}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </Text>
        </View>
        <View style={styles.crudContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ReadScreen")}
          >
            <Text style={styles.buttonText}>Read</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("UpdateScreen")}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("DeleteScreen")}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AboutScreen")}
        >
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
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
  itemContainer: {
    flex: 1,
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
  button: {
    backgroundColor: "#33cccc",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    width: 100,
  },
  buttonText: {
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
  paragraphContainer: {
    padding: 20,
    backgroundColor: "#996600",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  scrollView: {
    padding: 20,
  },
  crudContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});

export default HomeScreen;
