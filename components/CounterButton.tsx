import { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  Animated,
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
  add: "#39ff14",
  minus: "#ff3131",
  reset: "#00ffff",
};

const variantBg: Record<CounterButtonVariant, string> = {
  add: "rgba(57, 255, 20, 0.25)",
  minus: "rgba(255, 49, 49, 0.25)",
  reset: "rgba(0, 255, 255, 0.25)",
};

const variantIcons: Record<
  CounterButtonVariant,
  "plus" | "minus" | "arrow.counterclockwise"
> = {
  add: "plus",
  minus: "minus",
  reset: "arrow.counterclockwise",
};

const REPEAT_DELAY_MS = 250;
const REPEAT_INTERVAL_MS = 120;

export const CounterButton = ({
  label,
  onPress,
  variant = "add",
  style,
}: CounterButtonProps) => {
  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repeatTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const clearTimers = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
    if (repeatTimerRef.current) {
      clearInterval(repeatTimerRef.current);
      repeatTimerRef.current = null;
    }
  };

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.92,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressIn = () => {
    animatePress();
    onPress();
    pressTimerRef.current = setTimeout(() => {
      repeatTimerRef.current = setInterval(() => {
        onPress();
      }, REPEAT_INTERVAL_MS);
    }, REPEAT_DELAY_MS);
  };

  const handlePressOut = () => {
    clearTimers();
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const color = variantColors[variant];
  const bg = variantBg[variant];

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: style ? 1 : 0 }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.button,
          {
            backgroundColor: bg,
            borderColor: color,
          },
          style,
        ]}>
        <IconSymbol
          name={variantIcons[variant]}
          size={label ? 20 : 24}
          color={color}
          style={styles.icon}
        />
        {label ? (
          <Text style={[styles.label, { color }]}>{label}</Text>
        ) : null}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 2,
  },
  icon: {
    marginTop: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
