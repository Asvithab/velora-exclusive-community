import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
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
import { VeloraAvatar } from "@/components/ui/VeloraAvatar";
import { TierBadge } from "@/components/ui/VeloraBadge";

export default function ProfileScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, logout, isAdmin } = useAuth();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 60;

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/welcome");
        },
      },
    ]);
  };

  const MENU_ITEMS = [
    { icon: "edit-2", label: "Edit Profile", onPress: () => {} },
    { icon: "settings", label: "Preferences", onPress: () => {} },
    { icon: "bell", label: "Notifications", onPress: () => {} },
    { icon: "shield", label: "Privacy & Security", onPress: () => {} },
    ...(isAdmin
      ? [{ icon: "users", label: "Admin Panel", onPress: () => router.push("/(modal)/admin") }]
      : []),
    { icon: "help-circle", label: "Help & Support", onPress: () => {} },
    { icon: "log-out", label: "Sign Out", onPress: handleLogout, danger: true },
  ] as { icon: string; label: string; onPress: () => void; danger?: boolean }[];

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Profile</Text>
        <Pressable style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="settings" size={17} color={colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 20 }]}
      >
        {/* Profile card */}
        <GlassCard style={styles.profileCard} goldBorder padding={20}>
          <View style={styles.profileTop}>
            <VeloraAvatar
              initials={user?.initials ?? "AR"}
              color={user?.avatarColor ?? colors.gold}
              size={72}
              showOnline
              isOnline={true}
            />
            <Pressable style={[styles.editAvatarBtn, { backgroundColor: colors.gold, borderColor: colors.background }]}>
              <Feather name="camera" size={12} color="#0A0A0F" />
            </Pressable>
          </View>

          <Text style={[styles.profileName, { color: colors.foreground }]}>{user?.name}</Text>
          <Text style={[styles.profileUsername, { color: colors.textMuted }]}>@{user?.username}</Text>

          <View style={styles.tierRow}>
            <TierBadge tier={user?.tier ?? "founder"} size="md" />
            <View style={[styles.repTag, { backgroundColor: colors.gold + "15", borderColor: colors.gold + "30" }]}>
              <Feather name="zap" size={11} color={colors.gold} />
              <Text style={[styles.repText, { color: colors.gold }]}>
                {user?.reputation?.toLocaleString()} rep
              </Text>
            </View>
          </View>

          <Text style={[styles.bio, { color: colors.textSecondary }]}>{user?.bio}</Text>

          <View style={styles.profileMeta}>
            <View style={styles.metaItem}>
              <Feather name="map-pin" size={12} color={colors.textMuted} />
              <Text style={[styles.metaText, { color: colors.textMuted }]}>{user?.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="calendar" size={12} color={colors.textMuted} />
              <Text style={[styles.metaText, { color: colors.textMuted }]}>Joined {user?.joinedAt}</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={[styles.statsRow, { borderTopColor: colors.border }]}>
            {[
              { label: "Posts", value: user?.posts ?? 0 },
              { label: "Followers", value: user?.followers ?? 0 },
              { label: "Following", value: user?.following ?? 0 },
            ].map((s, i) => (
              <View key={s.label} style={[styles.statItem, i < 2 && { borderRightColor: colors.border, borderRightWidth: 1 }]}>
                <Text style={[styles.statVal, { color: colors.foreground }]}>{s.value}</Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>{s.label}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Interests */}
        {user?.interests && user.interests.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>INTERESTS</Text>
            <View style={styles.interestsGrid}>
              {user.interests.map((interest) => (
                <View key={interest} style={[styles.interestChip, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Text style={[styles.interestText, { color: colors.textSecondary }]}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Badges */}
        {user?.badges && user.badges.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>BADGES</Text>
            <View style={styles.badgesRow}>
              {user.badges.map((badge) => (
                <View key={badge} style={[styles.badge, { backgroundColor: colors.gold + "15", borderColor: colors.gold + "40" }]}>
                  <Feather name="award" size={12} color={colors.gold} />
                  <Text style={[styles.badgeText, { color: colors.gold }]}>{badge}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Menu */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>ACCOUNT</Text>
          <GlassCard padding={0}>
            {MENU_ITEMS.map((item, idx) => (
              <Pressable
                key={item.label}
                onPress={item.onPress}
                style={({ pressed }) => [
                  styles.menuItem,
                  { borderBottomColor: colors.border, borderBottomWidth: idx < MENU_ITEMS.length - 1 ? 1 : 0, opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <View style={[styles.menuIcon, { backgroundColor: item.danger ? colors.error + "15" : colors.border }]}>
                  <Feather name={item.icon as any} size={15} color={item.danger ? colors.error : colors.textSecondary} />
                </View>
                <Text style={[styles.menuLabel, { color: item.danger ? colors.error : colors.foreground }]}>
                  {item.label}
                </Text>
                <Feather name="chevron-right" size={16} color={colors.textMuted} />
              </Pressable>
            ))}
          </GlassCard>
        </View>

        <Text style={[styles.versionText, { color: colors.textMuted }]}>VELORA v1.0 — Members Only</Text>
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
  title: { fontFamily: "Inter_700Bold", fontSize: 20 },
  iconBtn: { width: 36, height: 36, borderRadius: 10, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  scroll: { padding: 20, gap: 20 },
  profileCard: { alignItems: "center", gap: 8 },
  profileTop: { position: "relative", marginBottom: 4 },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: -4,
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: { fontFamily: "Inter_700Bold", fontSize: 20 },
  profileUsername: { fontFamily: "Inter_400Regular", fontSize: 13 },
  tierRow: { flexDirection: "row", gap: 8, alignItems: "center", marginTop: 2 },
  repTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  repText: { fontFamily: "Inter_600SemiBold", fontSize: 11 },
  bio: { fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 20, textAlign: "center" },
  profileMeta: { flexDirection: "row", gap: 16, flexWrap: "wrap", justifyContent: "center" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontFamily: "Inter_400Regular", fontSize: 12 },
  statsRow: { flexDirection: "row", borderTopWidth: 1, paddingTop: 14, width: "100%", marginTop: 6 },
  statItem: { flex: 1, alignItems: "center", gap: 2 },
  statVal: { fontFamily: "Inter_700Bold", fontSize: 18 },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 11 },
  section: { gap: 10 },
  sectionTitle: { fontFamily: "Inter_600SemiBold", fontSize: 10, letterSpacing: 1.2 },
  interestsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  interestChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1 },
  interestText: { fontFamily: "Inter_500Medium", fontSize: 13 },
  badgesRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  badge: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1 },
  badgeText: { fontFamily: "Inter_600SemiBold", fontSize: 12 },
  menuItem: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 14 },
  menuIcon: { width: 32, height: 32, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  menuLabel: { flex: 1, fontFamily: "Inter_500Medium", fontSize: 14 },
  versionText: { fontFamily: "Inter_400Regular", fontSize: 11, textAlign: "center", marginTop: 8 },
});
