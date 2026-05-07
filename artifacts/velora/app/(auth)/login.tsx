import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
import { GoldButton } from "@/components/ui/GoldButton";

export default function LoginScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { login } = useAuth();

  const [inviteCode, setInviteCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleLogin = async () => {
    if (!inviteCode.trim()) {
      Alert.alert("Invite Code Required", "Please enter your invite code.");
      return;
    }
    setLoading(true);
    const success = await login(inviteCode, email);
    setLoading(false);
    if (!success) {
      Alert.alert("Invalid Code", "That invite code is not recognized. Please check and try again.\n\nHint: Try VELORA2024");
    } else {
      router.replace("/(tabs)");
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: topPad + 16, paddingBottom: bottomPad + 24 }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back */}
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.textSecondary} />
        </Pressable>

        {/* Logo */}
        <View style={styles.logoRow}>
          <View style={[styles.logoCircle, { backgroundColor: colors.gold + "15", borderColor: colors.gold + "40" }]}>
            <Text style={[styles.logoV, { color: colors.gold }]}>V</Text>
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: colors.foreground }]}>Welcome back</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Sign in with your invite code to access the community.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>INVITE CODE</Text>
            <View style={[styles.inputRow, { backgroundColor: colors.card, borderColor: colors.borderLight }]}>
              <Feather name="key" size={16} color={colors.gold} />
              <TextInput
                style={[styles.input, { color: colors.foreground }]}
                placeholder="e.g. VELORA2024"
                placeholderTextColor={colors.textMuted}
                value={inviteCode}
                onChangeText={setInviteCode}
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>EMAIL (OPTIONAL)</Text>
            <View style={[styles.inputRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Feather name="mail" size={16} color={colors.textMuted} />
              <TextInput
                style={[styles.input, { color: colors.foreground }]}
                placeholder="your@email.com"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={[styles.hint, { backgroundColor: colors.gold + "10", borderColor: colors.gold + "30" }]}>
            <Feather name="info" size={13} color={colors.gold} />
            <Text style={[styles.hintText, { color: colors.textSecondary }]}>
              Try: <Text style={{ color: colors.gold }}>VELORA2024</Text> for demo access
            </Text>
          </View>

          <GoldButton label="Enter Velora" onPress={handleLogin} loading={loading} size="lg" fullWidth />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>
            Don't have an invite?{" "}
          </Text>
          <Pressable onPress={() => router.push("/(auth)/apply")}>
            <Text style={[styles.footerLink, { color: colors.gold }]}>Request access</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 24, gap: 28 },
  backBtn: { alignSelf: "flex-start", padding: 4 },
  logoRow: { alignItems: "center" },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoV: { fontFamily: "Inter_700Bold", fontSize: 26, letterSpacing: -0.5 },
  titleSection: { gap: 8 },
  title: { fontFamily: "Inter_700Bold", fontSize: 26, letterSpacing: -0.3 },
  subtitle: { fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 21 },
  form: { gap: 18 },
  fieldGroup: { gap: 8 },
  label: { fontFamily: "Inter_600SemiBold", fontSize: 10, letterSpacing: 1.2 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
  },
  hint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
  },
  hintText: { fontFamily: "Inter_400Regular", fontSize: 13, flex: 1 },
  footer: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  footerText: { fontFamily: "Inter_400Regular", fontSize: 14 },
  footerLink: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
});
