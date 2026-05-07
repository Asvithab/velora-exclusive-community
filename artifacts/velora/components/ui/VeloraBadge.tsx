import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";

interface VeloraBadgeProps {
  tier: "founder" | "elite" | "member";
  size?: "sm" | "md";
}

export function TierBadge({ tier, size = "sm" }: VeloraBadgeProps) {
  const colors = useColors();

  const config = {
    founder: { label: "FOUNDER", bg: colors.gold + "20", text: colors.gold, border: colors.gold + "50" },
    elite: { label: "ELITE", bg: colors.violet + "20", text: colors.accentLight, border: colors.violet + "50" },
    member: { label: "MEMBER", bg: colors.border, text: colors.textSecondary, border: colors.borderLight },
  };

  const { label, bg, text, border } = config[tier];
  const px = size === "sm" ? 7 : 10;
  const py = size === "sm" ? 3 : 5;
  const fs = size === "sm" ? 9 : 11;

  return (
    <View style={[styles.badge, { backgroundColor: bg, borderColor: border, paddingHorizontal: px, paddingVertical: py }]}>
      <Text style={[styles.label, { color: text, fontSize: fs }]}>{label}</Text>
    </View>
  );
}

interface LabelBadgeProps {
  label: string;
  color?: string;
}

export function LabelBadge({ label, color }: LabelBadgeProps) {
  const colors = useColors();
  const bg = color ? color + "20" : colors.border;
  const text = color ?? colors.textSecondary;
  const border = color ? color + "40" : colors.borderLight;
  return (
    <View style={[styles.badge, { backgroundColor: bg, borderColor: border, paddingHorizontal: 8, paddingVertical: 3 }]}>
      <Text style={[styles.label, { color: text, fontSize: 10 }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  label: {
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.8,
  },
});
