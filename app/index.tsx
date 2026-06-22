import { StyleSheet, Text, View, ScrollView } from "react-native";
import CounterDisplay from "../components/CounterDisplay";
import { useState } from "react";

export default function Index() {
  const [count, setCount] = useState(0);

  const addCount = () => setCount((prev) => prev + 1);
  const minusCount = () => setCount((prev) => prev - 1);
  const resetCount = () => setCount(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.parentContainer}>
        <Text style={styles.textParent}>PARENT COMPONENT (index.tsx)</Text>
        <Text style={styles.parentHeader}>This is the parent screen</Text>
        <View style={styles.stateLocker}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>STATE LOCKER</Text>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>count: {count}</Text>
        </View>
        <CounterDisplay count={count} onAdd={addCount} onMinus={minusCount} onReset={resetCount} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 200,
  },
  parentContainer: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 20,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    padding: 20,
  },
  textParent: {
    alignSelf: "center",
    textAlign: "center",
    transform: [{ translateY: -10 }],
    backgroundColor: "orange",
    width: "auto",
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: "#fff",
    fontWeight: "bold",
    borderRadius: 10,
    gap: 10,
    marginTop: -20,
  },
  parentHeader: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  stateLocker: {
    backgroundColor: "limegreen",
    width: 200,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
});
