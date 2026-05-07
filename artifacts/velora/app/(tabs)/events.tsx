import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { EventCard } from "@/components/events/EventCard";
import { EVENTS } from "@/constants/mockData";

const FILTERS = ["All", "Upcoming", "RSVP'd", "Dinner", "Mixer", "Retreat"];

export default function EventsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState("All");

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 60;

  const filtered = EVENTS.filter((e) => {
    if (activeFilter === "RSVP'd") return e.isRSVPd;
    if (activeFilter === "Dinner") return e.type === "dinner";
    if (activeFilter === "Mixer") return e.type === "mixer";
    if (activeFilter === "Retreat") return e.type === "retreat";
    return true;
  });

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border }]}>
        <View>
          <Text style={[styles.title, { color: colors.foreground }]}>Events</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            {EVENTS.filter((e) => e.isRSVPd).length} upcoming · {EVENTS.length} this month
          </Text>
        </View>
        <View style={[styles.badge, { backgroundColor: colors.gold + "20", borderColor: colors.gold + "40" }]}>
          <Feather name="star" size={11} color={colors.gold} />
          <Text style={[styles.badgeText, { color: colors.gold }]}>Members Only</Text>
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPad + 20 }]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!!filtered.length}
        ListHeaderComponent={
          <>
            {/* Stats */}
            <View style={styles.statsRow}>
              {[
                { label: "Total Events", value: EVENTS.length, color: colors.foreground },
                { label: "RSVP'd", value: EVENTS.filter((e) => e.isRSVPd).length, color: colors.gold },
                { label: "Cities", value: "4", color: colors.accentLight },
              ].map((s) => (
                <View key={s.label} style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Text style={[styles.statVal, { color: s.color }]}>{s.value}</Text>
                  <Text style={[styles.statLabel, { color: colors.textMuted }]}>{s.label}</Text>
                </View>
              ))}
            </View>

            {/* Filters */}
            <FlatList
              data={FILTERS}
              horizontal
              keyExtractor={(f) => f}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
              renderItem={({ item: f }) => (
                <Pressable
                  onPress={() => setActiveFilter(f)}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor: activeFilter === f ? colors.gold + "20" : colors.card,
                      borderColor: activeFilter === f ? colors.gold + "60" : colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.filterText, { color: activeFilter === f ? colors.gold : colors.textSecondary }]}>
                    {f}
                  </Text>
                </Pressable>
              )}
            />

            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
              {filtered.length} event{filtered.length !== 1 ? "s" : ""}
            </Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="calendar" size={32} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No events found</Text>
          </View>
        }
      />
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
  title: { fontFamily: "Inter_700Bold", fontSize: 20 },
  subtitle: { fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  badgeText: { fontFamily: "Inter_600SemiBold", fontSize: 11 },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  statBox: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    alignItems: "center",
    gap: 3,
  },
  statVal: { fontFamily: "Inter_700Bold", fontSize: 18 },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 10 },
  filters: { gap: 8, paddingBottom: 14 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10, borderWidth: 1 },
  filterText: { fontFamily: "Inter_500Medium", fontSize: 13 },
  sectionLabel: { fontFamily: "Inter_400Regular", fontSize: 12, marginBottom: 10 },
  list: { paddingHorizontal: 20, paddingTop: 16 },
  empty: { alignItems: "center", paddingTop: 60, gap: 10 },
  emptyText: { fontFamily: "Inter_400Regular", fontSize: 14 },
});
