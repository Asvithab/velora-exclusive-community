import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
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
import { useColors } from "@/hooks/useColors";
import { VeloraAvatar } from "@/components/ui/VeloraAvatar";
import { GlassCard } from "@/components/ui/GlassCard";
import { PENDING_APPLICATIONS, STATS, MEMBERS, type Application } from "@/constants/mockData";

export default function AdminScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [applications, setApplications] = useState<Application[]>(PENDING_APPLICATIONS);
  const [activeTab, setActiveTab] = useState<"applications" | "members" | "analytics">("applications");

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleApprove = (id: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "approved" as const } : a))
    );
  };

  const handleReject = (id: string) => {
    Alert.alert("Reject Application", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reject",
        style: "destructive",
        onPress: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          setApplications((prev) =>
            prev.map((a) => (a.id === id ? { ...a, status: "rejected" as const } : a))
          );
        },
      },
    ]);
  };

  const pending = applications.filter((a) => a.status === "pending");
  const approved = applications.filter((a) => a.status === "approved");
  const rejected = applications.filter((a) => a.status === "rejected");

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.textSecondary} />
        </Pressable>
        <View style={styles.headerTitle}>
          <Text style={[styles.title, { color: colors.foreground }]}>Admin Panel</Text>
          <View style={[styles.adminBadge, { backgroundColor: colors.gold + "20", borderColor: colors.gold + "50" }]}>
            <Feather name="shield" size={10} color={colors.gold} />
            <Text style={[styles.adminBadgeText, { color: colors.gold }]}>ADMIN</Text>
          </View>
        </View>
        <View style={{ width: 28 }} />
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { borderBottomColor: colors.border }]}>
        {(["applications", "members", "analytics"] as const).map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              { borderBottomColor: activeTab === tab ? colors.gold : "transparent" },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? colors.gold : colors.textMuted },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === "applications" && pending.length > 0 && (
                <Text style={{ color: colors.rose }}> ({pending.length})</Text>
              )}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 32 }]}
      >
        {/* Applications Tab */}
        {activeTab === "applications" && (
          <View style={styles.section}>
            <View style={styles.statusRow}>
              {[
                { label: "Pending", value: pending.length, color: colors.warning },
                { label: "Approved", value: approved.length, color: colors.success },
                { label: "Rejected", value: rejected.length, color: colors.error },
              ].map((s) => (
                <View key={s.label} style={[styles.statusCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Text style={[styles.statusVal, { color: s.color }]}>{s.value}</Text>
                  <Text style={[styles.statusLabel, { color: colors.textMuted }]}>{s.label}</Text>
                </View>
              ))}
            </View>

            {applications.map((app) => (
              <GlassCard key={app.id} style={styles.appCard} goldBorder={app.status === "pending"} padding={16}>
                <View style={styles.appHeader}>
                  <VeloraAvatar initials={app.initials} color={app.avatarColor} size={44} />
                  <View style={styles.appInfo}>
                    <Text style={[styles.appName, { color: colors.foreground }]}>{app.name}</Text>
                    <Text style={[styles.appEmail, { color: colors.textMuted }]}>{app.email}</Text>
                    <Text style={[styles.appTime, { color: colors.textMuted }]}>Submitted {app.submittedAt}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusTag,
                      {
                        backgroundColor:
                          app.status === "pending"
                            ? colors.warning + "20"
                            : app.status === "approved"
                            ? colors.success + "20"
                            : colors.error + "20",
                        borderColor:
                          app.status === "pending"
                            ? colors.warning + "50"
                            : app.status === "approved"
                            ? colors.success + "50"
                            : colors.error + "50",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusTagText,
                        {
                          color:
                            app.status === "pending"
                              ? colors.warning
                              : app.status === "approved"
                              ? colors.success
                              : colors.error,
                        },
                      ]}
                    >
                      {app.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.appBio, { color: colors.textSecondary }]} numberOfLines={2}>
                  {app.bio}
                </Text>

                <View style={[styles.whySection, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
                  <Text style={[styles.whyLabel, { color: colors.textMuted }]}>WHY VELORA?</Text>
                  <Text style={[styles.whyText, { color: colors.textSecondary }]} numberOfLines={3}>
                    {app.whyJoin}
                  </Text>
                </View>

                <View style={styles.interestsRow}>
                  {app.interests.map((i) => (
                    <View key={i} style={[styles.interestTag, { backgroundColor: colors.border }]}>
                      <Text style={[styles.interestTagText, { color: colors.textSecondary }]}>{i}</Text>
                    </View>
                  ))}
                </View>

                {app.status === "pending" && (
                  <View style={styles.actionButtons}>
                    <Pressable
                      onPress={() => handleApprove(app.id)}
                      style={[styles.approveBtn, { backgroundColor: colors.success + "20", borderColor: colors.success + "50" }]}
                    >
                      <Feather name="check" size={14} color={colors.success} />
                      <Text style={[styles.actionBtnText, { color: colors.success }]}>Approve</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleReject(app.id)}
                      style={[styles.rejectBtn, { backgroundColor: colors.error + "15", borderColor: colors.error + "40" }]}
                    >
                      <Feather name="x" size={14} color={colors.error} />
                      <Text style={[styles.actionBtnText, { color: colors.error }]}>Reject</Text>
                    </Pressable>
                  </View>
                )}
              </GlassCard>
            ))}
          </View>
        )}

        {/* Members Tab */}
        {activeTab === "members" && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>{MEMBERS.length} ACTIVE MEMBERS</Text>
            {MEMBERS.map((m) => (
              <GlassCard key={m.id} padding={14} style={styles.memberRow}>
                <VeloraAvatar initials={m.initials} color={m.avatarColor} size={40} showOnline isOnline={m.isOnline} />
                <View style={styles.memberInfo}>
                  <Text style={[styles.memberName, { color: colors.foreground }]}>{m.name}</Text>
                  <Text style={[styles.memberMeta, { color: colors.textMuted }]}>@{m.username} · {m.tier}</Text>
                </View>
                <View style={styles.memberActions}>
                  <View style={[styles.repBadge, { backgroundColor: colors.gold + "15", borderColor: colors.gold + "30" }]}>
                    <Text style={[styles.repText, { color: colors.gold }]}>
                      {m.reputation >= 1000 ? `${(m.reputation / 1000).toFixed(1)}k` : m.reputation}
                    </Text>
                  </View>
                </View>
              </GlassCard>
            ))}
          </View>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>COMMUNITY OVERVIEW</Text>
            <View style={styles.analyticsGrid}>
              {[
                { label: "Total Members", value: STATS.totalMembers, icon: "users", color: colors.gold },
                { label: "Active Today", value: STATS.activeToday, icon: "activity", color: colors.success },
                { label: "Posts This Week", value: STATS.postsThisWeek, icon: "file-text", color: colors.accentLight },
                { label: "Events This Month", value: STATS.eventsThisMonth, icon: "calendar", color: colors.warning },
                { label: "Pending Applications", value: pending.length, icon: "clock", color: colors.rose },
                { label: "Approval Rate", value: "84%", icon: "trending-up", color: colors.success },
              ].map((s) => (
                <GlassCard key={s.label} style={styles.analyticsCard} padding={16}>
                  <View style={[styles.analyticsIcon, { backgroundColor: s.color + "20" }]}>
                    <Feather name={s.icon as any} size={18} color={s.color} />
                  </View>
                  <Text style={[styles.analyticsVal, { color: colors.foreground }]}>{s.value}</Text>
                  <Text style={[styles.analyticsLabel, { color: colors.textMuted }]}>{s.label}</Text>
                </GlassCard>
              ))}
            </View>

            <GlassCard goldBorder padding={16}>
              <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>INVITE CODE MANAGEMENT</Text>
              {["VELORA2024", "VIP001", "FOUNDER", "ELITE2024"].map((code) => (
                <View key={code} style={[styles.codeRow, { borderBottomColor: colors.border }]}>
                  <Feather name="key" size={13} color={colors.gold} />
                  <Text style={[styles.codeText, { color: colors.foreground }]}>{code}</Text>
                  <Text style={[styles.codeStatus, { color: colors.success }]}>Active</Text>
                </View>
              ))}
              <Pressable style={[styles.generateBtn, { backgroundColor: colors.gold + "15", borderColor: colors.gold + "40" }]}>
                <Feather name="plus" size={14} color={colors.gold} />
                <Text style={[styles.generateBtnText, { color: colors.gold }]}>Generate New Code</Text>
              </Pressable>
            </GlassCard>
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
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  title: { fontFamily: "Inter_700Bold", fontSize: 18 },
  adminBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  adminBadgeText: { fontFamily: "Inter_700Bold", fontSize: 9, letterSpacing: 0.8 },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
  },
  tabText: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  scroll: { padding: 20, gap: 16 },
  section: { gap: 14 },
  statusRow: { flexDirection: "row", gap: 10 },
  statusCard: { flex: 1, borderRadius: 12, borderWidth: 1, padding: 12, alignItems: "center", gap: 3 },
  statusVal: { fontFamily: "Inter_700Bold", fontSize: 22 },
  statusLabel: { fontFamily: "Inter_400Regular", fontSize: 11 },
  appCard: { gap: 12 },
  appHeader: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  appInfo: { flex: 1, gap: 2 },
  appName: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  appEmail: { fontFamily: "Inter_400Regular", fontSize: 12 },
  appTime: { fontFamily: "Inter_400Regular", fontSize: 11, marginTop: 2 },
  statusTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1 },
  statusTagText: { fontFamily: "Inter_700Bold", fontSize: 9, letterSpacing: 0.8 },
  appBio: { fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 19 },
  whySection: { borderRadius: 10, borderWidth: 1, padding: 12, gap: 5 },
  whyLabel: { fontFamily: "Inter_600SemiBold", fontSize: 9, letterSpacing: 1 },
  whyText: { fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 19 },
  interestsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  interestTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  interestTagText: { fontFamily: "Inter_500Medium", fontSize: 11 },
  actionButtons: { flexDirection: "row", gap: 10 },
  approveBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  rejectBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  actionBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  sectionLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, letterSpacing: 1.2 },
  memberRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  memberInfo: { flex: 1, gap: 2 },
  memberName: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  memberMeta: { fontFamily: "Inter_400Regular", fontSize: 12 },
  memberActions: {},
  repBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, borderWidth: 1 },
  repText: { fontFamily: "Inter_700Bold", fontSize: 12 },
  analyticsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  analyticsCard: { width: "47%", alignItems: "center", gap: 8 },
  analyticsIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  analyticsVal: { fontFamily: "Inter_700Bold", fontSize: 22 },
  analyticsLabel: { fontFamily: "Inter_400Regular", fontSize: 11, textAlign: "center" },
  codeRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 11, borderBottomWidth: 1 },
  codeText: { flex: 1, fontFamily: "Inter_600SemiBold", fontSize: 14, letterSpacing: 1 },
  codeStatus: { fontFamily: "Inter_400Regular", fontSize: 12 },
  generateBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 12, borderRadius: 12, borderWidth: 1, marginTop: 8 },
  generateBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
});
