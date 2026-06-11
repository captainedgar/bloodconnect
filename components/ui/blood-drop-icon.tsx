import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Colors, BorderRadius, FontSizes } from "@/constants/theme";

interface BloodDropIconProps {
  label: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  selected?: boolean;
  style?: ViewStyle;
}

export function BloodDropIcon({
  label,
  size = "md",
  color,
  selected = false,
  style,
}: BloodDropIconProps) {
  const sizes = {
    sm: { container: 32, text: FontSizes.xs },
    md: { container: 44, text: FontSizes.sm },
    lg: { container: 56, text: FontSizes.md },
  };

  const currentSize = sizes[size];
  const bgColor = selected ? Colors.primary : color || Colors.light.surface;
  const textColor = selected || color ? "#FFFFFF" : Colors.light.text;

  return (
    <View
      style={[
        styles.container,
        {
          width: currentSize.container,
          height: currentSize.container * 1.3,
          backgroundColor: bgColor,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { fontSize: currentSize.text, color: textColor }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: BorderRadius.full,
    borderTopRightRadius: BorderRadius.full,
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
    transform: [{ rotate: "180deg" }],
  },
  text: {
    fontWeight: "700",
    transform: [{ rotate: "180deg" }],
  },
});
