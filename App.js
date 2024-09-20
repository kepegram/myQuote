import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import Clipboard from "@react-native-clipboard/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchQuoteFunction();
  }, []);
  const fetchQuoteFunction = async () => {
    try {
      const res = await axios.get("https://favqs.com/api/qotd");
      const randomQuo = res.data.quote.body;
      const quoAuthor = res.data.quote.author;
      await AsyncStorage.setItem("lastQuote", randomQuo);
      setQuote(randomQuo);
      setAuthor(quoAuthor);
    } catch (error) {
      console.error("Error fetching quotes:", error.message);
    }
  };
  const newQuoteFunction = () => {
    fetchQuoteFunction();
  };
  const cpyFunction = () => {
    try {
      Clipboard.setString(quote);
      alert("Quote copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>myQuote</Text>
      <Pressable onPress={cpyFunction}>
        <Text style={styles.quote}>{`"${quote}"`}</Text>
      </Pressable>

      <Text style={styles.author}>{`By: ${author}`}</Text>
      <View style={styles.buttonContainer}>
        {liked ? (
          <Pressable
            style={styles.likeButton}
            onPress={() => {
              setLiked(false);
              console.log("liked quote");
            }}
          >
            <AntDesign name="like2" size={24} color="black" />
          </Pressable>
        ) : (
          <Pressable
            style={styles.likedButton}
            onPress={() => {
              setLiked(true);
              console.log("unliked quote");
            }}
          >
            <AntDesign name="like1" size={24} color="black" />
          </Pressable>
        )}
        <Pressable style={styles.newButton} onPress={newQuoteFunction}>
          <Text style={styles.btnText}>New</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 38,
  },
  quote: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    marginTop: 50,
  },
  author: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 50,
  },
  likeButton: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  likedButton: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  newButton: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 80,
    borderRadius: 10,
  },
  btnText: { fontSize: 20 },
});
