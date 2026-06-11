import { ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors, Spacing, BorderRadius, FontSizes, Shadows } from "@/constants/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle => {
    const base: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: BorderRadius.full,
      opacity: disabled ? 0.5 : 1,
    };

    const sizes: Record<string, ViewStyle> = {
      sm: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, minHeight: 40 },
      md: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, minHeight: 48 },
      lg: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg, minHeight: 56 },
    };

    const variants: Record<string, ViewStyle> = {
      primary: { backgroundColor: Colors.primary, ...Shadows.md },
      secondary: { backgroundColor: Colors.light.surface, borderWidth: 1, borderColor: Colors.light.border },
      outline: { backgroundColor: "transparent", borderWidth: 2, borderColor: Colors.primary },
      ghost: { backgroundColor: "transparent" },
    };

    return {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...(fullWidth && { width: "100%" }),
    };
  };

  const getTextStyle = (): TextStyle => {
    const base: TextStyle = {
      fontWeight: "600",
      textAlign: "center",
    };

    const sizes: Record<string, TextStyle> = {
      sm: { fontSize: FontSizes.sm },
      md: { fontSize: FontSizes.md },
      lg: { fontSize: FontSizes.lg },
    };

    const variants: Record<string, TextStyle> = {
      primary: { color: "#FFFFFF" },
      secondary: { color: Colors.light.text },
      outline: { color: Colors.primary },
      ghost: { color: Colors.primary },
    };

    return { ...base, ...sizes[size], ...variants[variant] };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "#FFFFFF" : Colors.primary}
        />
      ) : (
        <>
          {icon}
          <Text style={[getTextStyle(), icon ? { marginLeft: Spacing.sm } : undefined, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
