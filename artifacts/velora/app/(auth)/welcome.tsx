import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { GoldButton } from "@/components/ui/GoldButton";

const { width, height } = Dimensions.get("window");

const TESTIMONIALS = [
  { name: "Isabelle F.", role: "Creative Director", text: "Velora changed how I connect with people who actually matter." },
  { name: "Marcus V.", role: "VC Partner", text: "The highest signal community I've been part of. Period." },
  { name: "Chiara R.", role: "Fashion Editor", text: "An extraordinary curation of minds. I'm honored to be here." },
];

const FEATURES = [
  { icon: "shield", label: "Invite Only", desc: "Every member is carefully vetted" },
  { icon: "zap", label: "High Signal", desc: "No noise. Just meaningful connections" },
  { icon: "globe", label: "Global", desc: "Members in 40+ cities worldwide" },
];

export default function WelcomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 6, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
      ]),
    ]).start();

    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 2000, useNativeDriver: true }),
      ])
    );
    glow.start();
    return () => glow.stop();
  }, []);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: topPad, paddingBottom: bottomPad + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Subtle background gradient circle */}
        <Animated.View style={[styles.glowCircle, { opacity: glowAnim }]} pointerEvents="none">
          <LinearGradient
            colors={["#C9A96E22", "#8B5CF610", "transparent"]}
            style={{ flex: 1, borderRadius: 300 }}
          />
        </Animated.View>

        {/* Logo */}
        <Animated.View
          style={[
            styles.logoSection,
            { opacity: fadeAnim, transform: [{ scale: logoScale }] },
          ]}
        >
          <View style={[styles.logoRing, { borderColor: colors.gold + "40" }]}>
            <View style={[styles.logoBg, { backgroundColor: colors.gold + "15" }]}>
              <Text style={[styles.logoV, { color: colors.gold }]}>V</Text>
            </View>
          </View>
          <Text style={[styles.brandName, { color: colors.foreground }]}>VELORA</Text>
          <Text style={[styles.tagline, { color: colors.textMuted }]}>
            Exclusive Members Community
          </Text>
        </Animated.View>

        {/* Hero text */}
        <Animated.View
          style={[styles.heroSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <Text style={[styles.heroTitle, { color: colors.foreground }]}>
            Where exceptional{"\n"}
            <Text style={{ color: colors.gold }}>people connect.</Text>
          </Text>
          <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
            An invite-only community for founders, creators, and tastemakers who are building what's next.
          </Text>
        </Animated.View>

        {/* Features */}
        <Animated.View style={[styles.features, { opacity: fadeAnim }]}>
          {FEATURES.map((f) => (
            <View key={f.label} style={[styles.featureItem, { borderColor: colors.border, backgroundColor: colors.card }]}>
              <View style={[styles.featureIcon, { backgroundColor: colors.gold + "15", borderColor: colors.gold + "30" }]}>
                <Feather name={f.icon as any} size={16} color={colors.gold} />
              </View>
              <View style={styles.featureText}>
                <Text style={[styles.featureLabel, { color: colors.foreground }]}>{f.label}</Text>
                <Text style={[styles.featureDesc, { color: colors.textMuted }]}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Testimonials */}
        <Animated.View style={[styles.testimonials, { opacity: fadeAnim }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 2 }}>
            {TESTIMONIALS.map((t) => (
              <View key={t.name} style={[styles.testimonialCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Feather name="message-square" size={14} color={colors.gold} style={{ marginBottom: 8 }} />
                <Text style={[styles.testimonialText, { color: colors.textSecondary }]}>"{t.text}"</Text>
                <View style={{ marginTop: 10, gap: 2 }}>
                  <Text style={[styles.testimonialName, { color: colors.foreground }]}>{t.name}</Text>
                  <Text style={[styles.testimonialRole, { color: colors.textMuted }]}>{t.role}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Member count */}
        <Animated.View style={[styles.statRow, { opacity: fadeAnim }]}>
          <View style={[styles.statItem, { borderColor: colors.gold + "30", backgroundColor: colors.gold + "08" }]}>
            <Text style={[styles.statNum, { color: colors.gold }]}>847</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>members</Text>
          </View>
          <View style={[styles.statItem, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Text style={[styles.statNum, { color: colors.foreground }]}>40+</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>cities</Text>
          </View>
          <View style={[styles.statItem, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Text style={[styles.statNum, { color: colors.foreground }]}>$0</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>hype</Text>
          </View>
        </Animated.View>

        {/* CTA Buttons */}
        <Animated.View style={[styles.cta, { opacity: fadeAnim }]}>
          <GoldButton label="Request an Invitation" onPress={() => router.push("/(auth)/apply")} size="lg" fullWidth />
          <GoldButton label="I have an invite code" onPress={() => router.push("/(auth)/login")} variant="outline" fullWidth />
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <Text style={[styles.signInLink, { color: colors.textMuted }]}>
              Already a member?{" "}
              <Text style={{ color: colors.gold }}>Sign in</Text>
            </Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 24, gap: 32 },
  glowCircle: {
    position: "absolute",
    top: -100,
    left: -100,
    width: width + 200,
    height: 600,
    pointerEvents: "none",
  },
  logoSection: { alignItems: "center", gap: 12, marginTop: 20 },
  logoRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  logoV: {
    fontFamily: "Inter_700Bold",
    fontSize: 36,
    letterSpacing: -1,
  },
  brandName: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    letterSpacing: 6,
  },
  tagline: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  heroSection: { alignItems: "center", gap: 14 },
  heroTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 32,
    lineHeight: 40,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  heroSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    maxWidth: 300,
  },
  features: { gap: 10 },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: { flex: 1, gap: 2 },
  featureLabel: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  featureDesc: { fontFamily: "Inter_400Regular", fontSize: 12 },
  testimonials: {},
  testimonialCard: {
    width: 220,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  testimonialText: { fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 19 },
  testimonialName: { fontFamily: "Inter_600SemiBold", fontSize: 13 },
  testimonialRole: { fontFamily: "Inter_400Regular", fontSize: 11 },
  statRow: { flexDirection: "row", gap: 10 },
  statItem: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    alignItems: "center",
    gap: 4,
  },
  statNum: { fontFamily: "Inter_700Bold", fontSize: 20 },
  statLabel: { fontFamily: "Inter_400Regular", fontSize: 11 },
  cta: { gap: 12, alignItems: "center" },
  signInLink: { fontFamily: "Inter_400Regular", fontSize: 14, marginTop: 4 },
});
