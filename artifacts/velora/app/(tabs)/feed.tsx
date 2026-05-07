import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { PostCard } from "@/components/feed/PostCard";
import { POSTS } from "@/constants/mockData";

const FILTERS = ["All", "Following", "Trending", "Art", "Tech", "Food", "Travel"];

export default function FeedScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 60;

  const filtered = POSTS.filter((p) => {
    if (search) {
      return (
        p.content.toLowerCase().includes(search.toLowerCase()) ||
        p.author.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      );
    }
    if (activeFilter === "Following") return p.author.isFollowing;
    if (activeFilter === "All") return true;
    return p.tags.includes(activeFilter);
  });

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Community Feed</Text>
        <Pressable
          onPress={() => router.push("/(modal)/create-post")}
          style={[styles.composeBtn, { backgroundColor: colors.gold + "20", borderColor: colors.gold + "50" }]}
        >
          <Feather name="edit-2" size={15} color={colors.gold} />
          <Text style={[styles.composeBtnText, { color: colors.gold }]}>Post</Text>
        </Pressable>
      </View>

      {/* Search */}
      <View style={[styles.searchRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Feather name="search" size={16} color={colors.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: colors.foreground }]}
          placeholder="Search posts, members, topics..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")}>
            <Feather name="x" size={15} color={colors.textMuted} />
          </Pressable>
        )}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPad + 20 }]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!!filtered.length}
        ListHeaderComponent={
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
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="inbox" size={32} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No posts found</Text>
          </View>
        }
      />

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
  title: { fontFamily: "Inter_700Bold", fontSize: 20 },
  composeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
  },
  composeBtnText: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  searchInput: { flex: 1, fontFamily: "Inter_400Regular", fontSize: 14 },
  filters: { paddingHorizontal: 20, gap: 8, paddingBottom: 12 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
  },
  filterText: { fontFamily: "Inter_500Medium", fontSize: 13 },
  list: { paddingHorizontal: 20 },
  empty: { alignItems: "center", paddingTop: 60, gap: 10 },
  emptyText: { fontFamily: "Inter_400Regular", fontSize: 14 },
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
