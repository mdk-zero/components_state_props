import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

type CounterButtonVariant = "add" | "minus" | "reset";

type CounterButtonProps = {
  label?: string;
  onPress: () => void;
  variant?: CounterButtonVariant;
  style?: StyleProp<ViewStyle>;
};

const variantColors: Record<CounterButtonVariant, string> = {
  add: "#22c55e",
  minus: "#ef4444",
  reset: "#6b7280",
};

const variantIcons: Record<
  CounterButtonVariant,
  "plus" | "minus" | "arrow.counterclockwise"
> = {
  add: "plus",
  minus: "minus",
  reset: "arrow.counterclockwise",
};

export const CounterButton = ({
  label,
  onPress,
  variant = "add",
  style,
}: CounterButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: variantColors[variant] },
        style,
      ]}>
      <IconSymbol
        name={variantIcons[variant]}
        size={label ? 20 : 22}
        color="#fff"
        style={styles.icon}
      />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  icon: {
    marginTop: 1,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
