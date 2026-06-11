import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Colors, Spacing, BorderRadius, FontSizes } from "@/constants/theme";

interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "danger" | "info" | "default";
  size?: "sm" | "md";
  style?: ViewStyle;
}

export function Badge({ label, variant = "default", size = "sm", style }: BadgeProps) {
  const getColor = () => {
    switch (variant) {
      case "success":
        return { bg: "#E6F9EE", text: Colors.success };
      case "warning":
        return { bg: "#FFF3E0", text: Colors.warning };
      case "danger":
        return { bg: "#FDECEC", text: Colors.danger };
      case "info":
        return { bg: "#E3F2FD", text: "#1976D2" };
      default:
        return { bg: Colors.light.surface, text: Colors.light.textSecondary };
    }
  };

  const colors = getColor();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.bg },
        size === "md" && styles.badgeMd,
        style,
      ]}
    >
      <Text style={[styles.text, { color: colors.text }, size === "md" && styles.textMd]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  badgeMd: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  text: {
    fontSize: FontSizes.xs,
    fontWeight: "600",
  },
  textMd: {
    fontSize: FontSizes.sm,
  },
});
