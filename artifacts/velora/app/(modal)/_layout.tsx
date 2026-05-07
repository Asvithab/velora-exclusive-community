import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "slide_from_bottom" }}>
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="member/[id]" />
      <Stack.Screen name="event/[id]" />
      <Stack.Screen name="create-post" />
      <Stack.Screen name="admin" />
    </Stack>
  );
}
