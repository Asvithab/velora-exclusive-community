import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { VeloraAvatar } from "@/components/ui/VeloraAvatar";
import { CONVERSATIONS } from "@/constants/mockData";

interface ChatMessage {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
  read: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: "m1", text: "Hey! Great connecting at the Founders event last week.", fromMe: false, time: "2:14 PM", read: true },
  { id: "m2", text: "Absolutely! That conversation about creative direction was inspiring.", fromMe: true, time: "2:16 PM", read: true },
  { id: "m3", text: "Would love to continue it. Are you coming to the Basel rooftop?", fromMe: false, time: "2:17 PM", read: true },
  { id: "m4", text: "Definitely planning on it — I just RSVP'd.", fromMe: true, time: "2:19 PM", read: true },
  { id: "m5", text: "Would love to connect at the Basel event!", fromMe: false, time: "2:45 PM", read: false },
];

export default function ChatScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const conversation = CONVERSATIONS.find((c) => c.id === id) ?? CONVERSATIONS[0];
  const member = conversation.member;

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const flatRef = useRef<FlatList>(null);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const sendMessage = () => {
    if (!input.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const msg: ChatMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      fromMe: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setMessages((prev) => [msg, ...prev]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.textSecondary} />
        </Pressable>
        <Pressable style={styles.headerInfo}>
          <VeloraAvatar initials={member.initials} color={member.avatarColor} size={36} showOnline isOnline={member.isOnline} />
          <View>
            <Text style={[styles.headerName, { color: colors.foreground }]}>{member.name}</Text>
            <Text style={[styles.headerStatus, { color: member.isOnline ? colors.online : colors.textMuted }]}>
              {member.isOnline ? "Online" : "Offline"}
            </Text>
          </View>
        </Pressable>
        <Pressable style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="more-horizontal" size={18} color={colors.textSecondary} />
        </Pressable>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatRef}
        data={messages}
        keyExtractor={(m) => m.id}
        inverted
        contentContainerStyle={[styles.messageList, { paddingBottom: 16 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item: msg }) => (
          <View style={[styles.msgRow, msg.fromMe && styles.msgRowMe]}>
            {!msg.fromMe && (
              <VeloraAvatar initials={member.initials} color={member.avatarColor} size={30} />
            )}
            <View
              style={[
                styles.bubble,
                msg.fromMe
                  ? { backgroundColor: colors.gold + "25", borderColor: colors.gold + "40" }
                  : { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.bubbleText, { color: colors.foreground }]}>{msg.text}</Text>
              <View style={styles.bubbleMeta}>
                <Text style={[styles.bubbleTime, { color: colors.textMuted }]}>{msg.time}</Text>
                {msg.fromMe && (
                  <Feather
                    name={msg.read ? "check-circle" : "check"}
                    size={10}
                    color={msg.read ? colors.gold : colors.textMuted}
                  />
                )}
              </View>
            </View>
          </View>
        )}
      />

      {/* Input */}
      <View style={[styles.inputBar, { borderTopColor: colors.border, paddingBottom: bottomPad + 8 }]}>
        <Pressable style={[styles.attachBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="paperclip" size={16} color={colors.textMuted} />
        </Pressable>
        <View style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: colors.borderLight }]}>
          <TextInput
            style={[styles.input, { color: colors.foreground }]}
            placeholder="Type a message..."
            placeholderTextColor={colors.textMuted}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
          />
        </View>
        <Pressable
          onPress={sendMessage}
          style={[
            styles.sendBtn,
            { backgroundColor: input.trim() ? colors.gold : colors.card, borderColor: input.trim() ? colors.gold : colors.border },
          ]}
        >
          <Feather name="send" size={16} color={input.trim() ? "#0A0A0F" : colors.textMuted} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backBtn: { padding: 4 },
  headerInfo: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
  headerName: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
  headerStatus: { fontFamily: "Inter_400Regular", fontSize: 11, marginTop: 1 },
  iconBtn: { width: 34, height: 34, borderRadius: 10, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  messageList: { paddingHorizontal: 16, gap: 10, paddingTop: 16 },
  msgRow: { flexDirection: "row", alignItems: "flex-end", gap: 8 },
  msgRowMe: { flexDirection: "row-reverse" },
  bubble: {
    maxWidth: "75%",
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 4,
  },
  bubbleText: { fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 20 },
  bubbleMeta: { flexDirection: "row", alignItems: "center", gap: 4, justifyContent: "flex-end" },
  bubbleTime: { fontFamily: "Inter_400Regular", fontSize: 10 },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  attachBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: 40,
  },
  input: { fontFamily: "Inter_400Regular", fontSize: 14, maxHeight: 100 },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
