import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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
import { VeloraAvatar } from "@/components/ui/VeloraAvatar";
import { CONVERSATIONS } from "@/constants/mockData";

export default function MessagesScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : insets.bottom + 60;
  const totalUnread = CONVERSATIONS.reduce((acc, c) => acc + c.unread, 0);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border }]}>
        <View>
          <Text style={[styles.title, { color: colors.foreground }]}>Messages</Text>
          {totalUnread > 0 && (
            <Text style={[styles.subtitle, { color: colors.textMuted }]}>{totalUnread} unread</Text>
          )}
        </View>
        <Pressable style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="edit" size={17} color={colors.textSecondary} />
        </Pressable>
      </View>

      <FlatList
        data={CONVERSATIONS}
        keyExtractor={(c) => c.id}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPad + 20 }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: conv }) => (
          <Pressable
            onPress={() => router.push(`/(modal)/chat/${conv.id}`)}
            style={({ pressed }) => [
              styles.convRow,
              { borderBottomColor: colors.border, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <VeloraAvatar
              initials={conv.member.initials}
              color={conv.member.avatarColor}
              size={50}
              showOnline
              isOnline={conv.member.isOnline}
            />
            <View style={styles.convInfo}>
              <View style={styles.convTopRow}>
                <Text style={[styles.convName, { color: colors.foreground }]}>{conv.member.name}</Text>
                <Text style={[styles.convTime, { color: conv.unread > 0 ? colors.gold : colors.textMuted }]}>
                  {conv.lastMessageAt}
                </Text>
              </View>
              <View style={styles.convBottomRow}>
                {conv.isTyping ? (
                  <Text style={[styles.typingText, { color: colors.gold }]}>typing...</Text>
                ) : (
                  <Text
                    style={[
                      styles.convLast,
                      { color: conv.unread > 0 ? colors.textSecondary : colors.textMuted, fontFamily: conv.unread > 0 ? "Inter_500Medium" : "Inter_400Regular" },
                    ]}
                    numberOfLines={1}
                  >
                    {conv.lastMessage}
                  </Text>
                )}
                {conv.unread > 0 && (
                  <View style={[styles.unreadBadge, { backgroundColor: colors.gold }]}>
                    <Text style={styles.unreadText}>{conv.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="message-circle" size={32} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>No messages yet</Text>
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
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: { paddingTop: 8 },
  convRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  convInfo: { flex: 1, gap: 5 },
  convTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  convName: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  convTime: { fontFamily: "Inter_400Regular", fontSize: 11 },
  convBottomRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  convLast: { fontSize: 13, flex: 1, marginRight: 8 },
  typingText: { fontFamily: "Inter_400Regular", fontSize: 13, fontStyle: "italic" },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  unreadText: { fontFamily: "Inter_700Bold", fontSize: 10, color: "#0A0A0F" },
  empty: { alignItems: "center", paddingTop: 80, gap: 10 },
  emptyText: { fontFamily: "Inter_400Regular", fontSize: 14 },
});
