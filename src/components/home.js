import { useEffect, useState, useCallback } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  Linking,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function HomeScreen({ navigation }) {
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

      setQuote(randomQuo);
      setAuthor(quoAuthor);
      setLiked(false);
    } catch (error) {
      console.error("Error fetching quotes:", error.message);
    }
  };

  const saveLikedQuote = useCallback(async () => {
    try {
      const savedQuotes = await AsyncStorage.getItem("likedQuotes");
      const quotesArray = savedQuotes ? JSON.parse(savedQuotes) : [];
      quotesArray.push({ quote, author });
      await AsyncStorage.setItem("likedQuotes", JSON.stringify(quotesArray));
    } catch (error) {
      console.error("Error saving liked quote:", error.message);
    }
  }, [quote, author]);

  const cpyFunction = useCallback(async () => {
    try {
      Clipboard.setStringAsync(quote);
      Alert.alert("Quote copied", "Quote copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error.message);
    }
  }, [quote]);

  const openAuthorInBrowser = useCallback(() => {
    const query = encodeURIComponent(author);
    const url = `https://www.google.com/search?q=${query}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err.message)
    );
  }, [author]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>myQuote</Text>
      <Pressable onPress={cpyFunction}>
        <Text style={styles.quote}>{`"${quote}"`}</Text>
      </Pressable>

      <Pressable onPress={openAuthorInBrowser}>
        <Text style={styles.author}>{`By: ${author}`}</Text>
      </Pressable>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.likeButton}
          onPress={() => {
            if (!liked) {
              setLiked(true);
              saveLikedQuote();
            } else {
              setLiked(false);
            }
          }}
        >
          <AntDesign name={liked ? "like1" : "like2"} size={24} color="black" />
        </Pressable>

        <Pressable style={styles.newButton} onPress={fetchQuoteFunction}>
          <Text style={styles.btnText}>New</Text>
        </Pressable>
      </View>

      <View style={styles.viewLikedButtonContainer}>
        <Pressable onPress={() => navigation.navigate("LikedQuotes")}>
          <Text style={styles.likedText}>View Liked</Text>
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
    position: "absolute",
    top: 40,
  },
  quote: {
    color: "#fff",
    textAlign: "center",
    padding: 20,
    fontSize: 24,
    marginTop: 50,
  },
  author: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
    textDecorationLine: "underline",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "center",
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
  newButton: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 80,
    borderRadius: 10,
  },
  viewLikedButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  likedText: {
    color: "#fff",
    textDecorationLine: "underline",
    fontSize: 15,
  },
});
