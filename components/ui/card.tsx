import { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Colors, Spacing, BorderRadius, Shadows } from "@/constants/theme";

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
  dark?: boolean;
}

export function Card({ children, style, elevated = true, dark = false }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        elevated && styles.elevated,
        dark && styles.dark,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.surfaceElevated,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  elevated: {
    ...Shadows.md,
  },
  dark: {
    backgroundColor: Colors.sosSurface,
  },
});
