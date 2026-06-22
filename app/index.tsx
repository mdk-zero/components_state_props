import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CounterDisplay from "../components/CounterDisplay";
import { useState } from "react";

const NEON_PINK = "#ff00ff";

export default function Index() {
  const [count, setCount] = useState(0);

  const MAX_COUNT_FOR_3X_SPEED = 200;
  const addCount = () => setCount((prev) => Math.min(prev + 1, MAX_COUNT_FOR_3X_SPEED));
  const minusCount = () => setCount((prev) => prev - 1);
  const resetCount = () => setCount(0);

  return (
    <LinearGradient colors={["#0f0c29", "#302b63", "#24243e"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.parentContainer}>
          <View style={styles.labelBadge}>
            <Text style={styles.labelText}>PARENT COMPONENT (index.tsx)</Text>
          </View>

          <Text style={styles.title}>RICK ROLL COUNTER</Text>
          <Text style={styles.subtitle}>Never gonna count you down</Text>

          <View style={styles.stateLocker}>
            <Text style={styles.stateLockerTitle}>STATE LOCKER</Text>
            <Text style={styles.stateLockerCount}>count: {count}</Text>
          </View>

          <CounterDisplay
            count={count}
            onAdd={addCount}
            onMinus={minusCount}
            onReset={resetCount}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 120,
  },
  parentContainer: {
    width: "100%",
    borderWidth: 2,
    borderColor: NEON_PINK,
    borderRadius: 32,
    backgroundColor: "rgba(255, 0, 255, 0.12)",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    padding: 24,
  },
  labelBadge: {
    alignSelf: "center",
    backgroundColor: NEON_PINK,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: -36,
  },
  labelText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginTop: -10,
    fontStyle: "italic",
  },
  stateLocker: {
    width: "100%",
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    borderWidth: 2,
    borderColor: "#22c55e",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  stateLockerTitle: {
    color: "#22c55e",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1,
  },
  stateLockerCount: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 2,
  },
});
