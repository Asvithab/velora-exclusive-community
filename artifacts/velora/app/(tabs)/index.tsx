import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import { GlassCard } from "@/components/ui/GlassCard";
import { StoryRow } from "@/components/home/StoryRow";
import { PostCard } from "@/components/feed/PostCard";
import { EventCard } from "@/components/events/EventCard";
import { VeloraAvatar } from "@/components/ui/VeloraAvatar";
import { TierBadge } from "@/components/ui/VeloraBadge";
import { POSTS, EVENTS, STATS, MEMBERS } from "@/constants/mockData";

const ACTIVITY = [
  { id: "a1", member: MEMBERS[0], action: "shared a post", timeAgo: "5m ago" },
  { id: "a2", member: MEMBERS[1], action: "RSVP'd to Founders Dinner", timeAgo: "12m ago" },
  { id: "a3", member: MEMBERS[2], action: "joined the community", timeAgo: "1h ago" },
  { id: "a4", member: MEMBERS[3], action: "dropped new content", timeAgo: "2h ago" },
];

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, isAdmin } = useAuth();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 60;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.brandMark, { color: colors.gold }]}>V</Text>
          <Text style={[styles.brandName, { color: colors.foreground }]}>VELORA</Text>
        </View>
        <View style={styles.headerRight}>
          {isAdmin && (
            <Pressable
              onPress={() => router.push("/(modal)/admin")}
              style={[styles.iconBtn, { backgroundColor: colors.gold + "20", borderColor: colors.gold + "40" }]}
            >
              <Feather name="shield" size={16} color={colors.gold} />
            </Pressable>
          )}
          <Pressable style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Feather name="bell" size={17} color={colors.textSecondary} />
          </Pressable>
          <Pressable onPress={() => router.push("/(tabs)/profile")}>
            <VeloraAvatar initials={user?.initials ?? "AR"} color={user?.avatarColor ?? colors.gold} size={36} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 20 }]}
      >
        {/* Welcome */}
        <View style={styles.welcome}>
          <Text style={[styles.welcomeText, { color: colors.textMuted }]}>Good evening,</Text>
          <View style={styles.welcomeNameRow}>
            <Text style={[styles.welcomeName, { color: colors.foreground }]}>{user?.name ?? "Alex"} </Text>
            <TierBadge tier={user?.tier ?? "founder"} size="sm" />
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { label: "Members", value: STATS.totalMembers.toLocaleString(), icon: "users" as const },
            { label: "Active Now", value: STATS.activeToday.toLocaleString(), icon: "activity" as const },
            { label: "Events", value: STATS.eventsThisMonth, icon: "calendar" as const },
          ].map((s) => (
            <GlassCard key={s.label} style={styles.statCard} bordered goldBorder padding={14}>
              <Feather name={s.icon} size={14} color={colors.gold} />
              <Text style={[styles.statVal, { color: colors.foreground }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>{s.label}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Stories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Stories</Text>
          </View>
          <StoryRow />
        </View>

        {/* Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Live Activity</Text>
            <View style={[styles.liveTag, { backgroundColor: colors.success + "20", borderColor: colors.success + "50" }]}>
              <View style={[styles.liveDot, { backgroundColor: colors.success }]} />
              <Text style={[styles.liveText, { color: colors.success }]}>LIVE</Text>
            </View>
          </View>
          <GlassCard padding={0}>
            {ACTIVITY.map((item, idx) => (
              <View
                key={item.id}
                style={[
                  styles.activityItem,
                  { borderBottomColor: colors.border, borderBottomWidth: idx < ACTIVITY.length - 1 ? 1 : 0 },
                ]}
              >
                <VeloraAvatar initials={item.member.initials} color={item.member.avatarColor} size={36} showOnline isOnline={item.member.isOnline} />
                <View style={styles.activityText}>
                  <Text style={[styles.activityName, { color: colors.foreground }]}>{item.member.name}</Text>
                  <Text style={[styles.activityAction, { color: colors.textMuted }]}>{item.action}</Text>
                </View>
                <Text style={[styles.activityTime, { color: colors.textMuted }]}>{item.timeAgo}</Text>
              </View>
            ))}
          </GlassCard>
        </View>

        {/* Trending post */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Trending</Text>
            <Pressable onPress={() => router.push("/(tabs)/feed")}>
              <Text style={[styles.seeAll, { color: colors.gold }]}>See all</Text>
            </Pressable>
          </View>
          <PostCard post={POSTS[0]} />
          <PostCard post={POSTS[3]} />
        </View>

        {/* Featured event */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Featured Event</Text>
            <Pressable onPress={() => router.push("/(tabs)/events")}>
              <Text style={[styles.seeAll, { color: colors.gold }]}>See all</Text>
            </Pressable>
          </View>
          <EventCard event={EVENTS[0]} />
        </View>

        {/* Suggested members */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Connect With</Text>
            <Pressable onPress={() => router.push("/(modal)/member/1")}>
              <Text style={[styles.seeAll, { color: colors.gold }]}>See all</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
            {MEMBERS.filter((m) => !m.isFollowing).slice(0, 4).map((m) => (
              <Pressable
                key={m.id}
                onPress={() => router.push(`/(modal)/member/${m.id}`)}
                style={[styles.suggestCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <VeloraAvatar initials={m.initials} color={m.avatarColor} size={44} showOnline isOnline={m.isOnline} />
                <Text style={[styles.suggestName, { color: colors.foreground }]} numberOfLines={1}>{m.name.split(" ")[0]}</Text>
                <Text style={[styles.suggestRole, { color: colors.textMuted }]} numberOfLines={1}>{m.location}</Text>
                <TierBadge tier={m.tier} size="sm" />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* FAB */}
      <Pressable
        onPress={() => router.push("/(modal)/create-post")}
        style={[styles.fab, { backgroundColor: colors.gold, bottom: bottomPad + 16 }]}
      >
        <Feather name="edit-2" size={20} color="#0A0A0F" />
      </Pressable>
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
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  brandMark: { fontFamily: "Inter_700Bold", fontSize: 20 },
  brandName: { fontFamily: "Inter_700Bold", fontSize: 14, letterSpacing: 3 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: { paddingTop: 20 },
  welcome: { paddingHorizontal: 20, gap: 2, marginBottom: 16 },
  welcomeText: { fontFamily: "Inter_400Regular", fontSize: 13 },
  welcomeNameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  welcomeName: { fontFamily: "Inter_700Bold", fontSize: 22 },
  statsRow: { flexDirection: "row", gap: 10, paddingHorizontal: 20, marginBottom: 24 },
  statCard: { flex: 1, alignItems: "center", gap: 4 },
  statVal: { fontFamily: "Inter_700Bold", fontSize: 18 },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 10 },
  section: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: { fontFamily: "Inter_600SemiBold", fontSize: 16 },
  seeAll: { fontFamily: "Inter_500Medium", fontSize: 13 },
  liveTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
  },
  liveDot: { width: 5, height: 5, borderRadius: 3 },
  liveText: { fontFamily: "Inter_600SemiBold", fontSize: 9, letterSpacing: 0.8 },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  activityText: { flex: 1, gap: 2 },
  activityName: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  activityAction: { fontFamily: "Inter_400Regular", fontSize: 12 },
  activityTime: { fontFamily: "Inter_400Regular", fontSize: 11 },
  suggestCard: {
    width: 120,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    alignItems: "center",
    gap: 6,
    marginLeft: 0,
  },
  suggestName: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  suggestRole: { fontFamily: "Inter_400Regular", fontSize: 11 },
  fab: {
    position: "absolute",
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#C9A96E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
