import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { supabase } from "../lib/supabase";

type pollType = {
  Title: string;
  Options: Array<string>;
};
export default function () {
  const [question, setQuestion] = useState("");
  const CreatePoll = async () => {
    console.warn("Poll Created :- ", question);
    console.warn(options);
    const res = await supabase.from("polls").insert({
      question,
      options,
    });
    console.log(res);
    router.back();
  };
  const [options, setOpetions] = useState<Array<string>>([]);
  const AddOption = () => {
    setOpetions((prev) => [...prev, ""]);
  };
  const RemoveOption = (index: number) => {
    setOpetions((prev) =>
      prev.filter((_option, currIndex) => currIndex !== index)
    );
  };
  const HandleOptionValue = (index: number, newValue: string) => {
    setOpetions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = newValue;
      return newOptions;
    });
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: 5,
      }}
    >
      <Stack.Screen options={{ title: "Create Poll" }} />
      <Text>Title</Text>
      <TextInput
        placeholder="Enter you Question here"
        style={{
          backgroundColor: "white",
          padding: 2,
        }}
        value={question}
        onChangeText={(val) => setQuestion(val)}
      ></TextInput>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>Options </Text>
        <Ionicons
          name="add-circle"
          size={24}
          color="black"
          onPress={AddOption}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {options.map((option, index) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder={`Option ${index + 1}`}
              key={index}
              style={{
                backgroundColor: "white",
                padding: 2,
                position: "relative",
                width: 380,
              }}
              value={option}
              onChangeText={(val) => HandleOptionValue(index, val)}
            ></TextInput>
            <Ionicons
              name="remove-circle"
              size={24}
              color="black"
              onPress={() => RemoveOption(index)}
              style={{
                position: "absolute",
                right: 2,
              }}
            />
          </View>
        ))}
      </View>

      <Button title="Create Poll" onPress={CreatePoll} />
    </View>
  );
}
