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
import { VeloraAvatar } from "@/components/ui/VeloraAvatar";
import { TierBadge, LabelBadge } from "@/components/ui/VeloraBadge";
import { GlassCard } from "@/components/ui/GlassCard";
import { PostCard } from "@/components/feed/PostCard";
import { MEMBERS, POSTS } from "@/constants/mockData";

export default function MemberProfileScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const member = MEMBERS.find((m) => m.id === id) ?? MEMBERS[0];
  const memberPosts = POSTS.filter((p) => p.authorId === member.id);

  const [following, setFollowing] = useState(member.isFollowing);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleFollow = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setFollowing((p) => !p);
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.textSecondary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>Profile</Text>
        <Pressable style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="more-horizontal" size={18} color={colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 24 }]}
      >
        {/* Profile header */}
        <View style={styles.profileHeader}>
          <VeloraAvatar
            initials={member.initials}
            color={member.avatarColor}
            size={80}
            showOnline
            isOnline={member.isOnline}
          />
          <Text style={[styles.name, { color: colors.foreground }]}>{member.name}</Text>
          <Text style={[styles.username, { color: colors.textMuted }]}>@{member.username}</Text>

          <View style={styles.tierRow}>
            <TierBadge tier={member.tier} size="md" />
            <View style={[styles.repTag, { backgroundColor: colors.gold + "15", borderColor: colors.gold + "30" }]}>
              <Feather name="zap" size={11} color={colors.gold} />
              <Text style={[styles.repText, { color: colors.gold }]}>
                {member.reputation >= 1000 ? `${(member.reputation / 1000).toFixed(1)}k` : member.reputation} rep
              </Text>
            </View>
          </View>

          <Text style={[styles.bio, { color: colors.textSecondary }]}>{member.bio}</Text>

          <View style={styles.locationRow}>
            <Feather name="map-pin" size={13} color={colors.textMuted} />
            <Text style={[styles.location, { color: colors.textMuted }]}>{member.location}</Text>
            <View style={[styles.dot, { backgroundColor: colors.border }]} />
            <Feather name="calendar" size={13} color={colors.textMuted} />
            <Text style={[styles.location, { color: colors.textMuted }]}>Joined {member.joinedAt}</Text>
          </View>

          {/* Action buttons */}
          <View style={styles.actionRow}>
            <Pressable
              onPress={handleFollow}
              style={[
                styles.followBtn,
                {
                  backgroundColor: following ? colors.border : colors.gold,
                  borderColor: following ? colors.borderLight : colors.gold,
                },
              ]}
            >
              <Feather name={following ? "user-check" : "user-plus"} size={14} color={following ? colors.textSecondary : "#0A0A0F"} />
              <Text style={[styles.followBtnText, { color: following ? colors.textSecondary : "#0A0A0F" }]}>
                {following ? "Following" : "Follow"}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/(modal)/chat/c1")}
              style={[styles.msgBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <Feather name="message-circle" size={16} color={colors.textSecondary} />
              <Text style={[styles.msgBtnText, { color: colors.textSecondary }]}>Message</Text>
            </Pressable>
          </View>
        </View>

        {/* Stats */}
        <GlassCard style={styles.statsCard} padding={0}>
          {[
            { label: "Posts", value: member.posts },
            { label: "Followers", value: member.followers >= 1000 ? `${(member.followers / 1000).toFixed(1)}k` : member.followers },
            { label: "Following", value: member.following },
          ].map((s, i) => (
            <View
              key={s.label}
              style={[styles.statItem, i < 2 && { borderRightColor: colors.border, borderRightWidth: 1 }]}
            >
              <Text style={[styles.statVal, { color: colors.foreground }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>{s.label}</Text>
            </View>
          ))}
        </GlassCard>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>INTERESTS</Text>
          <View style={styles.interestsRow}>
            {member.interests.map((i) => (
              <LabelBadge key={i} label={i} />
            ))}
          </View>
        </View>

        {/* Badges */}
        {member.badges.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>BADGES</Text>
            <View style={styles.badgesRow}>
              {member.badges.map((b) => (
                <View key={b} style={[styles.badge, { backgroundColor: colors.gold + "15", borderColor: colors.gold + "40" }]}>
                  <Feather name="award" size={12} color={colors.gold} />
                  <Text style={[styles.badgeText, { color: colors.gold }]}>{b}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Posts */}
        {memberPosts.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>POSTS</Text>
            {memberPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </View>
        )}

        {memberPosts.length === 0 && (
          <View style={styles.emptyPosts}>
            <Feather name="edit-2" size={24} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No posts yet</Text>
          </View>
        )}
      </ScrollView>
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
  scroll: { padding: 20, gap: 24 },
  profileHeader: { alignItems: "center", gap: 8 },
  name: { fontFamily: "Inter_700Bold", fontSize: 22, marginTop: 4 },
  username: { fontFamily: "Inter_400Regular", fontSize: 13 },
  tierRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  repTag: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, borderWidth: 1 },
  repText: { fontFamily: "Inter_600SemiBold", fontSize: 11 },
  bio: { fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 21, textAlign: "center", maxWidth: 320 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 5, flexWrap: "wrap", justifyContent: "center" },
  location: { fontFamily: "Inter_400Regular", fontSize: 12 },
  dot: { width: 3, height: 3, borderRadius: 1.5 },
  actionRow: { flexDirection: "row", gap: 10, marginTop: 6 },
  followBtn: { flexDirection: "row", alignItems: "center", gap: 7, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  followBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  msgBtn: { flexDirection: "row", alignItems: "center", gap: 7, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  msgBtnText: { fontFamily: "Inter_500Medium", fontSize: 14 },
  statsCard: { flexDirection: "row" },
  statItem: { flex: 1, alignItems: "center", paddingVertical: 16, gap: 3 },
  statVal: { fontFamily: "Inter_700Bold", fontSize: 20 },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 11 },
  section: { gap: 10 },
  sectionTitle: { fontFamily: "Inter_600SemiBold", fontSize: 10, letterSpacing: 1.2 },
  interestsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  badgesRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  badge: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1 },
  badgeText: { fontFamily: "Inter_600SemiBold", fontSize: 12 },
  emptyPosts: { alignItems: "center", paddingVertical: 40, gap: 8 },
  emptyText: { fontFamily: "Inter_400Regular", fontSize: 13 },
});
