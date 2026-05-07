import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type ViewStyle,
} from "react-native";
import { useColors } from "@/hooks/useColors";

interface GoldButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "gold" | "outline" | "ghost" | "violet";
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function GoldButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = "gold",
  size = "md",
  style,
  fullWidth = false,
}: GoldButtonProps) {
  const colors = useColors();

  const bgColor =
    variant === "gold"
      ? colors.gold
      : variant === "violet"
      ? colors.violet
      : variant === "outline"
      ? "transparent"
      : "transparent";

  const textColor =
    variant === "gold"
      ? "#0A0A0F"
      : variant === "violet"
      ? "#FFFFFF"
      : variant === "outline"
      ? colors.gold
      : colors.textSecondary;

  const borderColor =
    variant === "outline" ? colors.gold + "80" : "transparent";

  const paddingV = size === "sm" ? 10 : size === "lg" ? 18 : 14;
  const fontSize = size === "sm" ? 13 : size === "lg" ? 17 : 15;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: bgColor,
          borderColor,
          borderWidth: variant === "outline" ? 1 : 0,
          paddingVertical: paddingV,
          opacity: pressed ? 0.8 : disabled ? 0.4 : 1,
          alignSelf: fullWidth ? "stretch" : "auto",
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text
          style={[
            styles.label,
            {
              color: textColor,
              fontSize,
              letterSpacing: variant === "gold" ? 0.8 : 0.3,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  label: {
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
});
