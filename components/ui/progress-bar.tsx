import { View, StyleSheet, ViewStyle } from "react-native";
import { Colors, BorderRadius } from "@/constants/theme";

interface ProgressBarProps {
  value: number;
  maxValue?: number;
  color?: string;
  height?: number;
  style?: ViewStyle;
}

export function ProgressBar({
  value,
  maxValue = 100,
  color,
  height = 8,
  style,
}: ProgressBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  const getAutoColor = () => {
    if (percentage >= 60) return Colors.success;
    if (percentage >= 30) return Colors.warning;
    return Colors.danger;
  };

  const barColor = color || getAutoColor();

  return (
    <View style={[styles.container, { height }, style]}>
      <View
        style={[
          styles.fill,
          {
            width: `${percentage}%`,
            backgroundColor: barColor,
            height,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.full,
    overflow: "hidden",
  },
  fill: {
    borderRadius: BorderRadius.full,
  },
});
