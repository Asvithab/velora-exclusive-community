import React from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { useColors } from "@/hooks/useColors";

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
  bordered?: boolean;
  goldBorder?: boolean;
  padding?: number;
}

export function GlassCard({
  children,
  style,
  elevated = false,
  bordered = true,
  goldBorder = false,
  padding = 16,
}: GlassCardProps) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: elevated ? colors.cardElevated : colors.card,
          borderColor: goldBorder
            ? colors.gold + "40"
            : bordered
            ? colors.border
            : "transparent",
          borderWidth: bordered ? 1 : 0,
          padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
  },
});
