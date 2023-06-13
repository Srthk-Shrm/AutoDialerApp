import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AppTextInput from "./AppTextInput";

function DialerScreen(props) {
  const [jsonData, setJsonData] = useState("");
  const [callGap, setCallGap] = useState(0);
  const [dialingNumbers, setDialingNumbers] = useState([]);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const [currentPriority, setCurrentPriority] = useState("");

  const handleStartAutoDialer = () => {
    setIsPaused(false);
    setCurrentNumberIndex(0);
  };

  const handlePauseAutoDialer = () => {
    setIsPaused(true);
  };
  const handleStopAutoDialer = () => {
    setIsPaused(false);
    setJsonData("");
    setCallGap(0);
    setDialingNumbers([]);
    setCurrentNumberIndex(0);
  };

  const handleCallDisconnected = () => {
    if (!isPaused) {
      setTimeout(dialNextNumber, callGap * 1000);
    }
  };

  const dialNextNumber = () => {
    setCurrentNumberIndex((prevIndex) => prevIndex + 1);
  };
  useEffect(() => {
    if (!jsonData) return;

    try {
      const parsedData = JSON.parse(jsonData);
      setDialingNumbers(parsedData);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  }, [jsonData]);
  useEffect(() => {
    if (currentNumberIndex >= dialingNumbers.length) return;

    const { Number, Priority, status } = dialingNumbers[currentNumberIndex];

    if (status !== "skip") {
      setCurrentNumber(Number);
      setCurrentPriority(Priority);

      // Perform the dialing operation here
      console.log(`Dialing number: {Number}, Priority: {Priority}`);
      // You can use third-party libraries to handle phone calls

      // Simulate a call disconnect
      setTimeout(handleCallDisconnected, 2000);
    } else {
      dialNextNumber();
    }
  }, [currentNumberIndex, dialingNumbers]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text style={{ fontSize: 36 }}>Call Gap</Text>
          <Text style={{ fontSize: 20 }}>(in seconds)</Text>
        </View>
        <View style={{ paddingLeft: 70, width: "100%" }}>
          <AppTextInput
            placeholder="Type Here"
            keyboardType="numeric"
            value={callGap.toString()}
            onChangeText={(text) => setCallGap(parseInt(text))}
          />
        </View>
        <View></View>
      </View>
      <Text style={{ paddingTop: 40, fontSize: 20 }}>
        Insert JSON Phone Data
      </Text>
      <AppTextInput
        placeholder="Type Here"
        style={{ paddingBottom: 150 }}
        multiline
        value={jsonData}
        onChangeText={setJsonData}
      />
      <View
        style={{
          paddingBottom: 5,
          width: "50%",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Button title="Start Auto Dialer" onPress={handleStartAutoDialer} />
      </View>
      <View
        style={{
          paddingBottom: 5,
          width: "50%",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Button title="Pause Auto Dialer" onPress={handlePauseAutoDialer} />
      </View>
      <View
        style={{
          paddingBottom: 5,
          width: "50%",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Button title="Stop Auto Dialer" onPress={handleStopAutoDialer} />
      </View>
      <View style={{ paddingLeft: 20, paddingTop: 50 }}>
        <Text style={{ fontSize: 20, paddingBottom: 5 }}>Current Status:</Text>
        <Text>Phone Number: {currentNumber}</Text>
        <Text>Priority: {currentPriority}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    padding: 20,
  },
});

export default DialerScreen;
