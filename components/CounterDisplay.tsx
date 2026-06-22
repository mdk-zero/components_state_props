import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useEventListener } from "expo";
import { useVideoPlayer, VideoView, VideoPlayerStatus, PlayerError } from "expo-video";
import { CounterButton } from "./CounterButton";

type CounterDisplayProps = {
  count: number;
  onAdd: () => void;
  onMinus: () => void;
  onReset: () => void;
};

const SPEED_FACTOR = 0.01;
const MIN_RATE = 0.05;
const MAX_RATE = 3;

const NEON_PINK = "#ff00ff";
const NEON_CYAN = "#00ffff";
const NEON_GOLD = "#fbbf24";

const CounterDisplay = ({ count, onAdd, onMinus, onReset }: CounterDisplayProps) => {
  const targetRate = Math.min(Math.max(1 + count * SPEED_FACTOR, MIN_RATE), MAX_RATE);
  const [isReady, setIsReady] = useState(false);

  const handleReset = () => {
    onReset();
    if (isReady) {
      player.replay();
    }
  };

  const player = useVideoPlayer(require("@/assets/videos/rickroll.mp4"), (player) => {
    player.loop = true;
    player.muted = false;
    player.volume = 1;
    player.play();
  });

  useEventListener(
    player,
    "statusChange",
    (payload: { status: VideoPlayerStatus; error?: PlayerError }) => {
      if (payload.status === "readyToPlay") {
        setIsReady(true);
      } else if (payload.status === "error" && payload.error) {
        console.error("Rick Roll player error:", payload.error.message);
      }
    },
  );

  useEffect(() => {
    if (!isReady) return;
    player.playbackRate = targetRate;
  }, [targetRate, player, isReady]);

  const speedLabel =
    targetRate >= 2.5
      ? "🔥 MAXIMUM RICK"
      : targetRate >= 1.75
        ? "⚡ HYPE RICK"
        : targetRate >= 1.25
          ? "💨 FAST RICK"
          : "🕺 CHILL RICK";

  return (
    <View style={styles.childContainer}>
      <View style={styles.labelBadge}>
        <Text style={styles.labelText}>CHILD COMPONENT (CounterDisplay)</Text>
      </View>

      <View style={styles.videoFrame}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit="contain"
          nativeControls={false}
        />
      </View>

      <View style={styles.speedometer}>
        <Text style={styles.speedValue}>{targetRate.toFixed(2)}×</Text>
        <Text style={styles.speedLabel}>RICK VELOCITY</Text>
        <View style={styles.speedBarTrack}>
          <View
            style={[
              styles.speedBarFill,
              { width: `${Math.min((targetRate / MAX_RATE) * 100, 100)}%` },
            ]}
          />
        </View>
        <Text style={styles.hypeLabel}>{speedLabel}</Text>
      </View>

      <View style={styles.buttonGroup}>
        <View style={styles.row}>
          <CounterButton onPress={onAdd} variant="add" style={styles.flexButton} />
          <CounterButton onPress={onMinus} variant="minus" style={styles.flexButton} />
        </View>
        <CounterButton label="Reset" onPress={handleReset} variant="reset" />
      </View>
    </View>
  );
};

export default CounterDisplay;

const styles = StyleSheet.create({
  childContainer: {
    width: "100%",
    borderWidth: 2,
    borderColor: NEON_CYAN,
    borderRadius: 28,
    backgroundColor: "rgba(0, 255, 255, 0.10)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    padding: 20,
    paddingBottom: 24,
  },
  labelBadge: {
    alignSelf: "center",
    backgroundColor: NEON_CYAN,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: -32,
  },
  labelText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 0.5,
  },
  videoFrame: {
    width: "90%",
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: NEON_PINK,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  speedometer: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: NEON_CYAN,
  },
  speedValue: {
    fontSize: 40,
    fontWeight: "900",
    color: NEON_GOLD,
  },
  speedLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: -4,
  },
  speedBarTrack: {
    width: "100%",
    height: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 5,
    marginTop: 10,
    overflow: "hidden",
  },
  speedBarFill: {
    height: "100%",
    backgroundColor: NEON_CYAN,
  },
  hypeLabel: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "900",
    color: NEON_PINK,
    letterSpacing: 0.5,
  },
  buttonGroup: {
    width: "90%",
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
