import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import { VeloraAvatar } from "@/components/ui/VeloraAvatar";
import { TierBadge } from "@/components/ui/VeloraBadge";
import type { Member } from "@/constants/mockData";

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  const colors = useColors();
  const router = useRouter();
  const [following, setFollowing] = useState(member.isFollowing);

  const handleFollow = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFollowing((p) => !p);
  };

  return (
    <Pressable
      onPress={() => router.push(`/(modal)/member/${member.id}`)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.95 : 1 },
      ]}
    >
      <View style={styles.top}>
        <VeloraAvatar
          initials={member.initials}
          color={member.avatarColor}
          size={52}
          showOnline
          isOnline={member.isOnline}
        />
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.foreground }]} numberOfLines={1}>{member.name}</Text>
          <Text style={[styles.username, { color: colors.textMuted }]}>@{member.username}</Text>
          <TierBadge tier={member.tier} size="sm" />
        </View>
        <Pressable
          onPress={handleFollow}
          style={[
            styles.followBtn,
            {
              backgroundColor: following ? colors.border : colors.gold + "20",
              borderColor: following ? colors.borderLight : colors.gold + "60",
            },
          ]}
        >
          <Feather
            name={following ? "user-check" : "user-plus"}
            size={14}
            color={following ? colors.textSecondary : colors.gold}
          />
        </Pressable>
      </View>
      <Text style={[styles.bio, { color: colors.textSecondary }]} numberOfLines={2}>{member.bio}</Text>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={[styles.statVal, { color: colors.foreground }]}>
            {member.followers >= 1000 ? `${(member.followers / 1000).toFixed(1)}k` : member.followers}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>followers</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.stat}>
          <Text style={[styles.statVal, { color: colors.foreground }]}>{member.posts}</Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>posts</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.stat}>
          <Text style={[styles.statVal, { color: colors.gold }]}>
            {member.reputation >= 1000 ? `${(member.reputation / 1000).toFixed(1)}k` : member.reputation}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>rep</Text>
        </View>
      </View>
      {member.interests.slice(0, 3).length > 0 && (
        <View style={styles.interests}>
          {member.interests.slice(0, 3).map((i) => (
            <View key={i} style={[styles.tag, { backgroundColor: colors.border }]}>
              <Text style={[styles.tagText, { color: colors.textSecondary }]}>{i}</Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  username: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  followBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bio: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 19,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stat: {
    alignItems: "center",
    gap: 1,
  },
  statVal: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
  },
  statLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
  },
  divider: {
    width: 1,
    height: 20,
  },
  interests: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
  },
});
