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
// Keep rate inside the documented expo-video range; 0 is avoided because some
// players freeze/crash when playbackRate is set to exactly 0.
const MIN_RATE = 0.05;
const MAX_RATE = 16;

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

  return (
    <View style={styles.childContainer}>
      <Text style={styles.textChild}>CHILD COMPONENT (CounterDisplay)</Text>
      <Text style={{ fontSize: 18, color: "gray", marginTop: -10 }}>
        This is the Child Component
      </Text>
      <View style={styles.videoContainer}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit="contain"
          nativeControls={false}
        />
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
  videoContainer: {
    width: "80%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
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
