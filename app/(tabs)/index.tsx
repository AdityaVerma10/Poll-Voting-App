import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
  Button,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import { supabase } from "../lib/supabase";
import { Database } from "../types/supabase";
import { Entypo } from "@expo/vector-icons";

// export let polls = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
export type pollType = Database["public"]["Tables"]["polls"]["Row"];
export type Vote = Database["public"]["Tables"]["votes"]["Row"];
export default function HomeScreen() {
  const [counter, setCounter] = useState(0);
  const [polls, setPolls] = useState<pollType[]>([]);
  useEffect(() => {
    async function getPolls() {
      try {
        const { data, error } = await supabase.from("polls").select("*");

        if (error) {
          console.error("Error fetching todos:", error.message);
          return;
        }

        if (data && data.length > 0) {
          console.warn(data);
          setPolls(data);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    getPolls();
  }, []);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Polls",
          headerRight: () => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 7,
              }}
            >
              <Link href={"/polls/create"}>
                <Ionicons name="add-circle" size={24} color="black" />
              </Link>
              <Link href={"/profile"}>
                <Entypo name="login" size={24} color="black" />
              </Link>
            </View>
          ),
        }}
      />

      <FlatList
        data={polls}
        contentContainerStyle={styles.titleContainer}
        renderItem={({ item }) => (
          <Link href={`/polls/${item.id}`}>
            <Text
              style={{
                color: "white",
                padding: 6,
                backgroundColor: "green",
              }}
            >
              {item.id} {item.question}
            </Text>
          </Link>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
