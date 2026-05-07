import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { GlassCard } from "@/components/ui/GlassCard";
import { GoldButton } from "@/components/ui/GoldButton";
import { VeloraAvatar } from "@/components/ui/VeloraAvatar";
import { EVENTS, MEMBERS } from "@/constants/mockData";

const TYPE_ICONS: Record<string, string> = {
  dinner: "coffee",
  rooftop: "sunrise",
  gallery: "image",
  mixer: "users",
  retreat: "map",
};

export default function EventDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const event = EVENTS.find((e) => e.id === id) ?? EVENTS[0];
  const [rsvpd, setRsvpd] = useState(event.isRSVPd);
  const spotsLeft = event.maxAttendees - event.attendees;
  const pct = (event.attendees / event.maxAttendees) * 100;

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleRSVP = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setRsvpd((p) => !p);
  };

  const attendingMembers = MEMBERS.slice(0, 5);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.textSecondary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Event</Text>
        <Pressable style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="share-2" size={16} color={colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 100 }]}
      >
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: colors.card, borderColor: event.isFeatured ? colors.gold + "40" : colors.border }]}>
          <View style={[styles.heroIcon, { backgroundColor: colors.gold + "15" }]}>
            <Feather name={TYPE_ICONS[event.type] as any} size={40} color={colors.gold} />
          </View>
          {event.isFeatured && (
            <View style={[styles.featuredTag, { backgroundColor: colors.gold + "20", borderColor: colors.gold + "50" }]}>
              <Feather name="star" size={10} color={colors.gold} />
              <Text style={[styles.featuredText, { color: colors.gold }]}>FEATURED</Text>
            </View>
          )}
        </View>

        {/* Title & meta */}
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: colors.foreground }]}>{event.title}</Text>
          <Text style={[styles.hostedBy, { color: colors.textMuted }]}>Hosted by {event.hostedBy}</Text>

          <View style={styles.metaGrid}>
            {[
              { icon: "calendar", label: event.date },
              { icon: "clock", label: event.time },
              { icon: "map-pin", label: event.venue },
              { icon: "globe", label: event.location },
              { icon: "tag", label: event.price },
            ].map((m) => (
              <View key={m.label} style={[styles.metaItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Feather name={m.icon as any} size={14} color={colors.gold} />
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>{m.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <GlassCard>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>ABOUT THIS EVENT</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>{event.description}</Text>
        </GlassCard>

        {/* Capacity */}
        <GlassCard>
          <View style={styles.capacityHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>CAPACITY</Text>
            <Text style={[styles.capacityNum, { color: spotsLeft < 5 ? colors.rose : colors.gold }]}>
              {spotsLeft} spots remaining
            </Text>
          </View>
          <View style={[styles.progressBg, { backgroundColor: colors.border }]}>
            <View style={[styles.progressFill, { width: `${pct}%` as any, backgroundColor: colors.gold }]} />
          </View>
          <Text style={[styles.attendeeCount, { color: colors.textMuted }]}>
            {event.attendees} of {event.maxAttendees} attending
          </Text>

          {/* Attending members */}
          <View style={styles.attendeesRow}>
            {attendingMembers.map((m, i) => (
              <View key={m.id} style={[styles.attendeeAvatar, { marginLeft: i > 0 ? -12 : 0, zIndex: 10 - i }]}>
                <VeloraAvatar initials={m.initials} color={m.avatarColor} size={32} />
              </View>
            ))}
            <View style={[styles.moreCount, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.moreCountText, { color: colors.textSecondary }]}>+{event.attendees - 5}</Text>
            </View>
          </View>
        </GlassCard>

        {/* Exclusivity note */}
        <View style={[styles.exclusiveNote, { backgroundColor: colors.gold + "08", borderColor: colors.gold + "25" }]}>
          <Feather name="shield" size={14} color={colors.gold} />
          <Text style={[styles.exclusiveText, { color: colors.textSecondary }]}>
            This is an exclusive Velora event. Only verified members may attend.
          </Text>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={[styles.footer, { paddingBottom: bottomPad + 16, borderTopColor: colors.border, backgroundColor: colors.background }]}>
        <View style={styles.footerContent}>
          <View>
            <Text style={[styles.footerPrice, { color: colors.foreground }]}>{event.price}</Text>
            <Text style={[styles.footerDate, { color: colors.textMuted }]}>{event.date} · {event.time}</Text>
          </View>
          <Pressable
            onPress={handleRSVP}
            style={[
              styles.rsvpBtn,
              { backgroundColor: rsvpd ? colors.border : colors.gold, borderColor: rsvpd ? colors.borderLight : colors.gold },
            ]}
          >
            <Feather name={rsvpd ? "check" : "calendar"} size={16} color={rsvpd ? colors.textSecondary : "#0A0A0F"} />
            <Text style={[styles.rsvpText, { color: rsvpd ? colors.textSecondary : "#0A0A0F" }]}>
              {rsvpd ? "RSVP'd" : "RSVP Now"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontFamily: "Inter_600SemiBold", fontSize: 16 },
  iconBtn: { width: 34, height: 34, borderRadius: 10, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  scroll: { gap: 20, padding: 20 },
  hero: {
    height: 180,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroIcon: { width: 80, height: 80, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  featuredTag: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  featuredText: { fontFamily: "Inter_600SemiBold", fontSize: 9, letterSpacing: 0.8 },
  titleSection: { gap: 12 },
  title: { fontFamily: "Inter_700Bold", fontSize: 22 },
  hostedBy: { fontFamily: "Inter_400Regular", fontSize: 13 },
  metaGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 10, borderWidth: 1 },
  metaText: { fontFamily: "Inter_400Regular", fontSize: 12 },
  sectionTitle: { fontFamily: "Inter_600SemiBold", fontSize: 10, letterSpacing: 1.2, marginBottom: 8 },
  description: { fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 22 },
  capacityHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  capacityNum: { fontFamily: "Inter_600SemiBold", fontSize: 12 },
  progressBg: { height: 4, borderRadius: 2, overflow: "hidden", marginVertical: 10 },
  progressFill: { height: 4, borderRadius: 2 },
  attendeeCount: { fontFamily: "Inter_400Regular", fontSize: 12, marginBottom: 12 },
  attendeesRow: { flexDirection: "row", alignItems: "center" },
  attendeeAvatar: { borderRadius: 18, borderWidth: 2, borderColor: "#09090E" },
  moreCount: { width: 34, height: 34, borderRadius: 17, borderWidth: 1, alignItems: "center", justifyContent: "center", marginLeft: -8 },
  moreCountText: { fontFamily: "Inter_600SemiBold", fontSize: 11 },
  exclusiveNote: { flexDirection: "row", alignItems: "flex-start", gap: 10, borderRadius: 12, borderWidth: 1, padding: 14 },
  exclusiveText: { fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 19, flex: 1 },
  footer: { padding: 20, paddingTop: 14, borderTopWidth: 1 },
  footerContent: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  footerPrice: { fontFamily: "Inter_700Bold", fontSize: 16 },
  footerDate: { fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
  rsvpBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 14, borderWidth: 1 },
  rsvpText: { fontFamily: "Inter_700Bold", fontSize: 15 },
});
