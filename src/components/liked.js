import { useEffect, useState, useCallback } from "react";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LikedQuotesScreen() {
  const [likedQuotes, setLikedQuotes] = useState([]);

  useEffect(() => {
    const loadLikedQuotes = async () => {
      try {
        const savedQuotes = await AsyncStorage.getItem("likedQuotes");
        setLikedQuotes(savedQuotes ? JSON.parse(savedQuotes) : []);
      } catch (error) {
        console.error("Error loading liked quotes:", error.message);
      }
    };

    loadLikedQuotes();
  }, []);

  const deleteQuote = useCallback(
    async (indexToRemove) => {
      try {
        const updatedQuotes = likedQuotes.filter(
          (_, index) => index !== indexToRemove
        );
        setLikedQuotes(updatedQuotes);
        await AsyncStorage.setItem(
          "likedQuotes",
          JSON.stringify(updatedQuotes)
        );
      } catch (error) {
        console.error("Error deleting liked quote:", error.message);
      }
    },
    [likedQuotes]
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Liked Quotes</Text>
      {likedQuotes.length > 0 ? (
        likedQuotes.map((item, index) => (
          <View key={index} style={styles.likedQuoteContainer}>
            <Text style={styles.likedQuote}>{`"${item.quote}"`}</Text>
            <Text style={styles.likedAuthor}>{`- ${item.author}`}</Text>
            <Pressable onPress={() => deleteQuote(index)}>
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        ))
      ) : (
        <Text style={styles.noQuotesText}>No liked quotes yet.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 38,
    textAlign: "center",
    marginVertical: 40,
  },
  likedQuoteContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#000",
    borderColor: "#fff",
    borderWidth: 1,
  },
  likedQuote: {
    fontSize: 18,
    color: "#fff",
  },
  likedAuthor: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
    textAlign: "left",
  },
  deleteText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: "underline",
    textAlign: "right",
  },
  noQuotesText: {
    color: "#555",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});
