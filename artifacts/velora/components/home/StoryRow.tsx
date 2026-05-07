import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import { MEMBERS, CURRENT_USER } from "@/constants/mockData";

export function StoryRow() {
  const colors = useColors();

  const stories = [
    { id: "you", member: CURRENT_USER, isYou: true, hasStory: false },
    ...MEMBERS.slice(0, 6).map((m) => ({ id: m.id, member: m, isYou: false, hasStory: true })),
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {stories.map((story) => (
        <Pressable key={story.id} style={styles.item}>
          <View
            style={[
              styles.ring,
              {
                borderColor: story.hasStory ? colors.gold : colors.border,
                backgroundColor: story.member.avatarColor + "20",
              },
            ]}
          >
            {story.isYou ? (
              <View style={[styles.addBtn, { backgroundColor: colors.gold }]}>
                <Feather name="plus" size={14} color="#0A0A0F" />
              </View>
            ) : null}
            <Text style={[styles.initials, { color: story.member.avatarColor }]}>
              {story.member.initials}
            </Text>
          </View>
          <Text style={[styles.name, { color: colors.textSecondary }]} numberOfLines={1}>
            {story.isYou ? "Your Story" : story.member.name.split(" ")[0]}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 14,
    paddingVertical: 4,
  },
  item: {
    alignItems: "center",
    gap: 6,
    width: 62,
  },
  ring: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  initials: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
  },
  addBtn: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  name: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    textAlign: "center",
  },
});
