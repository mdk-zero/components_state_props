import { StyleSheet, Text, View } from "react-native";
import { CounterButton } from "./CounterButton";

type CounterDisplayProps = {
  count: number;
  onAdd: () => void;
  onMinus: () => void;
  onReset: () => void;
};

const CounterDisplay = ({ count, onAdd, onMinus, onReset }: CounterDisplayProps) => {
  return (
    <View style={styles.childContainer}>
      <Text style={styles.textChild}>CHILD COMPONENT (CounterDisplay)</Text>
      <Text style={{ fontSize: 18, color: "gray", marginTop: -10 }}>
        This is the Child Component
      </Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonGroup}>
        <View style={styles.row}>
          <CounterButton onPress={onAdd} variant="add" style={styles.flexButton} />
          <CounterButton onPress={onMinus} variant="minus" style={styles.flexButton} />
        </View>
        <CounterButton label="Reset" onPress={onReset} variant="reset" />
      </View>
    </View>
  );
};

export default CounterDisplay;

const styles = StyleSheet.create({
  childContainer: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingBottom: 20,
  },
  textChild: {
    alignSelf: "center",
    textAlign: "center",
    transform: [{ translateY: -10 }],
    backgroundColor: "blue",
    width: "auto",
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: "#fff",
    fontWeight: "bold",
    borderRadius: 10,
    gap: 10,
  },
  count: {
    fontSize: 90,
    fontWeight: "bold",
    color: "#1f2937",
    marginVertical: 8,
  },
  buttonGroup: {
    width: "80%",
    alignSelf: "center",
    gap: 12,
  },
  row: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
    overflow: "hidden",
  },
  flexButton: {
    flex: 1,
  },
});
