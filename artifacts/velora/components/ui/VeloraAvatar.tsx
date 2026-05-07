import React from "react";
import { StyleSheet, Text, View, type ViewStyle } from "react-native";
import { useColors } from "@/hooks/useColors";

interface VeloraAvatarProps {
  initials: string;
  color: string;
  size?: number;
  showOnline?: boolean;
  isOnline?: boolean;
  style?: ViewStyle;
}

export function VeloraAvatar({
  initials,
  color,
  size = 44,
  showOnline = false,
  isOnline = false,
  style,
}: VeloraAvatarProps) {
  const colors = useColors();
  const fontSize = size * 0.35;
  const dotSize = size * 0.28;

  return (
    <View style={[{ width: size, height: size }, style]}>
      <View
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color + "30",
            borderColor: color + "60",
          },
        ]}
      >
        <Text style={[styles.initials, { fontSize, color }]}>{initials}</Text>
      </View>
      {showOnline && (
        <View
          style={[
            styles.onlineDot,
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: isOnline ? colors.online : colors.textMuted,
              borderColor: colors.background,
              bottom: 0,
              right: 0,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  initials: {
    fontFamily: "Inter_600SemiBold",
  },
  onlineDot: {
    position: "absolute",
    borderWidth: 2,
  },
});
