import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import type { Event } from "@/constants/mockData";

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

const TYPE_ICONS: Record<string, string> = {
  dinner: "coffee",
  rooftop: "sunrise",
  gallery: "image",
  mixer: "users",
  retreat: "map",
};

export function EventCard({ event, compact = false }: EventCardProps) {
  const colors = useColors();
  const router = useRouter();
  const [rsvpd, setRsvpd] = useState(event.isRSVPd);
  const spotsLeft = event.maxAttendees - event.attendees;
  const pct = (event.attendees / event.maxAttendees) * 100;

  const handleRSVP = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setRsvpd((p) => !p);
  };

  return (
    <Pressable
      onPress={() => router.push(`/(modal)/event/${event.id}`)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: event.isFeatured ? colors.gold + "40" : colors.border,
          opacity: pressed ? 0.95 : 1,
        },
      ]}
    >
      {event.isFeatured && (
        <View style={[styles.featuredTag, { backgroundColor: colors.gold + "20", borderColor: colors.gold + "40" }]}>
          <Feather name="star" size={10} color={colors.gold} />
          <Text style={[styles.featuredText, { color: colors.gold }]}>FEATURED</Text>
        </View>
      )}

      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: colors.gold + "15", borderColor: colors.gold + "30" }]}>
          <Feather name={TYPE_ICONS[event.type] as any} size={18} color={colors.gold} />
        </View>
        <View style={styles.info}>
          <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={1}>{event.title}</Text>
          <Text style={[styles.venue, { color: colors.textSecondary }]} numberOfLines={1}>{event.venue}</Text>
        </View>
        <Pressable
          onPress={handleRSVP}
          style={[
            styles.rsvpBtn,
            {
              backgroundColor: rsvpd ? colors.gold : colors.gold + "15",
              borderColor: rsvpd ? colors.gold : colors.gold + "40",
            },
          ]}
        >
          <Text style={[styles.rsvpText, { color: rsvpd ? "#0A0A0F" : colors.gold }]}>
            {rsvpd ? "Going" : "RSVP"}
          </Text>
        </Pressable>
      </View>

      {!compact && (
        <Text style={[styles.desc, { color: colors.textSecondary }]} numberOfLines={2}>
          {event.description}
        </Text>
      )}

      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <Feather name="calendar" size={12} color={colors.textMuted} />
          <Text style={[styles.metaText, { color: colors.textMuted }]}>{event.date}</Text>
        </View>
        <View style={styles.metaItem}>
          <Feather name="clock" size={12} color={colors.textMuted} />
          <Text style={[styles.metaText, { color: colors.textMuted }]}>{event.time}</Text>
        </View>
        <View style={styles.metaItem}>
          <Feather name="map-pin" size={12} color={colors.textMuted} />
          <Text style={[styles.metaText, { color: colors.textMuted }]}>{event.location}</Text>
        </View>
      </View>

      {!compact && (
        <>
          <View style={[styles.progressBg, { backgroundColor: colors.border }]}>
            <View style={[styles.progressFill, { width: `${pct}%` as any, backgroundColor: colors.gold }]} />
          </View>
          <View style={styles.capacityRow}>
            <Text style={[styles.capacityText, { color: colors.textMuted }]}>
              {event.attendees} attending
            </Text>
            <Text style={[styles.spotsText, { color: spotsLeft < 5 ? colors.rose : colors.textSecondary }]}>
              {spotsLeft} spots left
            </Text>
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  featuredTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  featuredText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    letterSpacing: 0.8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  venue: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  rsvpBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
  },
  rsvpText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
  },
  desc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
  },
  meta: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
  },
  progressBg: {
    height: 3,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
  },
  capacityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  capacityText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
  },
  spotsText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
  },
});
