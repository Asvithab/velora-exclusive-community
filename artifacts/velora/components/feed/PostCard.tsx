import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import { VeloraAvatar } from "@/components/ui/VeloraAvatar";
import { TierBadge, LabelBadge } from "@/components/ui/VeloraBadge";
import type { Post } from "@/constants/mockData";

interface PostCardProps {
  post: Post;
  onPress?: () => void;
}

export function PostCard({ post, onPress }: PostCardProps) {
  const colors = useColors();
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.97 : 1,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <VeloraAvatar
          initials={post.author.initials}
          color={post.author.avatarColor}
          size={42}
          showOnline
          isOnline={post.author.isOnline}
        />
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={[styles.name, { color: colors.foreground }]}>{post.author.name}</Text>
            <TierBadge tier={post.author.tier} size="sm" />
          </View>
          <Text style={[styles.meta, { color: colors.textMuted }]}>
            @{post.author.username} · {post.timeAgo}
          </Text>
        </View>
        <Pressable style={styles.moreBtn}>
          <Feather name="more-horizontal" size={18} color={colors.textMuted} />
        </Pressable>
      </View>

      {/* Content */}
      <Text style={[styles.content, { color: colors.foreground }]}>{post.content}</Text>

      {/* Tags */}
      {post.tags.length > 0 && (
        <View style={styles.tags}>
          {post.tags.map((tag) => (
            <LabelBadge key={tag} label={`#${tag}`} color={colors.gold} />
          ))}
        </View>
      )}

      {/* Actions */}
      <View style={[styles.actions, { borderTopColor: colors.border }]}>
        <Pressable onPress={handleLike} style={styles.action}>
          <Feather
            name="heart"
            size={17}
            color={liked ? colors.rose : colors.textMuted}
            style={{ opacity: liked ? 1 : 0.7 }}
          />
          <Text style={[styles.actionCount, { color: liked ? colors.rose : colors.textMuted }]}>
            {likeCount}
          </Text>
        </Pressable>
        <Pressable style={styles.action}>
          <Feather name="message-circle" size={17} color={colors.textMuted} style={{ opacity: 0.7 }} />
          <Text style={[styles.actionCount, { color: colors.textMuted }]}>{post.comments}</Text>
        </Pressable>
        <Pressable style={styles.action}>
          <Feather name="share-2" size={17} color={colors.textMuted} style={{ opacity: 0.7 }} />
          <Text style={[styles.actionCount, { color: colors.textMuted }]}>{post.shares}</Text>
        </Pressable>
        <Pressable style={styles.action}>
          <Feather name="bookmark" size={17} color={colors.textMuted} style={{ opacity: 0.7 }} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  headerInfo: {
    flex: 1,
    gap: 3,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  meta: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
  },
  moreBtn: {
    padding: 4,
  },
  content: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 14,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    paddingTop: 12,
    gap: 24,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  actionCount: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
  },
});
