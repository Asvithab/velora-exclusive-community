import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import { VeloraAvatar } from "@/components/ui/VeloraAvatar";
import { INTERESTS } from "@/constants/mockData";

const QUICK_TAGS = ["Art", "Tech", "Travel", "Food", "Music", "Design", "Finance", "Culture"];

export default function CreatePostScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length < 3 ? [...prev, tag] : prev
    );
  };

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert("Add some content", "Write something before posting.");
      return;
    }
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    Alert.alert("Posted!", "Your post is now live in the feed.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const charLimit = 500;
  const remaining = charLimit - content.length;

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.cancelBtn}>
          <Text style={[styles.cancelText, { color: colors.textSecondary }]}>Cancel</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>New Post</Text>
        <Pressable
          onPress={handlePost}
          disabled={loading || !content.trim()}
          style={[
            styles.postBtn,
            {
              backgroundColor: content.trim() ? colors.gold : colors.card,
              borderColor: content.trim() ? colors.gold : colors.border,
            },
          ]}
        >
          <Text style={[styles.postBtnText, { color: content.trim() ? "#0A0A0F" : colors.textMuted }]}>
            {loading ? "Posting..." : "Post"}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 40 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Author */}
        <View style={styles.authorRow}>
          <VeloraAvatar
            initials={user?.initials ?? "AR"}
            color={user?.avatarColor ?? colors.gold}
            size={44}
          />
          <View>
            <Text style={[styles.authorName, { color: colors.foreground }]}>{user?.name}</Text>
            <Text style={[styles.visibility, { color: colors.textMuted }]}>
              <Feather name="globe" size={11} /> Visible to all members
            </Text>
          </View>
        </View>

        {/* Content input */}
        <TextInput
          style={[styles.contentInput, { color: colors.foreground }]}
          placeholder="What's on your mind? Share something worth saying..."
          placeholderTextColor={colors.textMuted}
          value={content}
          onChangeText={setContent}
          multiline
          maxLength={charLimit}
          autoFocus
          textAlignVertical="top"
        />

        {/* Char count */}
        <Text style={[styles.charCount, { color: remaining < 50 ? colors.rose : colors.textMuted }]}>
          {remaining} characters remaining
        </Text>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Tags */}
        <View style={styles.tagsSection}>
          <Text style={[styles.tagsLabel, { color: colors.textMuted }]}>ADD TAGS (UP TO 3)</Text>
          <View style={styles.tagsGrid}>
            {QUICK_TAGS.map((tag) => {
              const selected = selectedTags.includes(tag);
              return (
                <Pressable
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  style={[
                    styles.tagChip,
                    {
                      backgroundColor: selected ? colors.gold + "20" : colors.card,
                      borderColor: selected ? colors.gold + "60" : colors.border,
                    },
                  ]}
                >
                  {selected && <Feather name="hash" size={11} color={colors.gold} />}
                  <Text style={[styles.tagText, { color: selected ? colors.gold : colors.textSecondary }]}>
                    {tag}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Media options */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.mediaRow}>
          <Text style={[styles.tagsLabel, { color: colors.textMuted }]}>ADD TO POST</Text>
          <View style={styles.mediaOptions}>
            {[
              { icon: "image", label: "Photo" },
              { icon: "link", label: "Link" },
              { icon: "map-pin", label: "Location" },
            ].map((opt) => (
              <Pressable key={opt.label} style={[styles.mediaBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Feather name={opt.icon as any} size={16} color={colors.textSecondary} />
                <Text style={[styles.mediaBtnText, { color: colors.textSecondary }]}>{opt.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Audience note */}
        <View style={[styles.audienceNote, { backgroundColor: colors.gold + "08", borderColor: colors.gold + "20" }]}>
          <Feather name="shield" size={13} color={colors.gold} />
          <Text style={[styles.audienceText, { color: colors.textSecondary }]}>
            Your post is visible only to verified Velora members.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  cancelBtn: { padding: 4 },
  cancelText: { fontFamily: "Inter_500Medium", fontSize: 15 },
  headerTitle: { fontFamily: "Inter_600SemiBold", fontSize: 16 },
  postBtn: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 10, borderWidth: 1 },
  postBtnText: { fontFamily: "Inter_700Bold", fontSize: 14 },
  scroll: { padding: 20, gap: 16 },
  authorRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  authorName: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  visibility: { fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
  contentInput: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    lineHeight: 24,
    minHeight: 140,
  },
  charCount: { fontFamily: "Inter_400Regular", fontSize: 12, textAlign: "right" },
  divider: { height: 1 },
  tagsSection: { gap: 10 },
  tagsLabel: { fontFamily: "Inter_600SemiBold", fontSize: 10, letterSpacing: 1.2 },
  tagsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tagChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
  },
  tagText: { fontFamily: "Inter_500Medium", fontSize: 13 },
  mediaRow: { gap: 10 },
  mediaOptions: { flexDirection: "row", gap: 10 },
  mediaBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  mediaBtnText: { fontFamily: "Inter_500Medium", fontSize: 13 },
  audienceNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
  },
  audienceText: { fontFamily: "Inter_400Regular", fontSize: 12, flex: 1 },
});
