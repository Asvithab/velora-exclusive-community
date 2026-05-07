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
import { useAuth, type ApplicationData } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import { GoldButton } from "@/components/ui/GoldButton";
import { INTERESTS } from "@/constants/mockData";

const TOTAL_STEPS = 6;

const STEP_LABELS = [
  "Welcome",
  "About You",
  "Your Story",
  "Interests",
  "Social",
  "Submit",
];

export default function ApplyScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { submitApplication } = useAuth();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<ApplicationData>({
    name: "",
    email: "",
    bio: "",
    interests: [],
    socialLinks: {},
    whyJoin: "",
    inviteCode: "",
  });

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const update = (key: keyof ApplicationData, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleInterest = (interest: string) => {
    const cur = form.interests;
    if (cur.includes(interest)) {
      update("interests", cur.filter((i) => i !== interest));
    } else if (cur.length < 8) {
      update("interests", [...cur, interest]);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: return true;
      case 1: return form.name.trim().length > 1 && form.email.includes("@");
      case 2: return form.bio.trim().length > 20 && form.whyJoin.trim().length > 20;
      case 3: return form.interests.length >= 2;
      case 4: return true;
      case 5: return true;
      default: return true;
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      Alert.alert("Almost there", "Please complete this step before continuing.");
      return;
    }
    if (step < TOTAL_STEPS - 1) {
      setStep((p) => p + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await submitApplication(form);
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <View style={[styles.successContainer, { paddingTop: topPad, paddingBottom: bottomPad }]}>
          <View style={[styles.successIcon, { backgroundColor: colors.gold + "20", borderColor: colors.gold + "50" }]}>
            <Feather name="check" size={36} color={colors.gold} />
          </View>
          <Text style={[styles.successTitle, { color: colors.foreground }]}>
            Application Submitted
          </Text>
          <Text style={[styles.successSub, { color: colors.textSecondary }]}>
            Our team reviews every application personally. You'll hear from us within 48 hours.
          </Text>
          <View style={[styles.successCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Feather name="clock" size={14} color={colors.gold} />
            <Text style={[styles.successCardText, { color: colors.textSecondary }]}>
              Review takes 24–48 hours. We'll notify you by email.
            </Text>
          </View>
          <GoldButton label="Back to Welcome" onPress={() => router.replace("/(auth)/welcome")} fullWidth />
          <GoldButton
            label="I have an invite code"
            onPress={() => router.push("/(auth)/login")}
            variant="outline"
            fullWidth
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => (step > 0 ? setStep((p) => p - 1) : router.back())} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.textSecondary} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerStep, { color: colors.textMuted }]}>
            Step {step + 1} of {TOTAL_STEPS}
          </Text>
          <Text style={[styles.headerLabel, { color: colors.foreground }]}>{STEP_LABELS[step]}</Text>
        </View>
        <View style={{ width: 32 }} />
      </View>

      {/* Progress bar */}
      <View style={[styles.progressBg, { backgroundColor: colors.border }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${((step + 1) / TOTAL_STEPS) * 100}%` as any, backgroundColor: colors.gold },
          ]}
        />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 100 }]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Step 0: Welcome */}
        {step === 0 && (
          <View style={styles.stepContent}>
            <View style={[styles.stepIcon, { backgroundColor: colors.gold + "15", borderColor: colors.gold + "40" }]}>
              <Text style={[styles.stepIconText, { color: colors.gold }]}>V</Text>
            </View>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>Apply to Join Velora</Text>
            <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>
              We review every application carefully. Tell us about yourself and why you'd be a great fit for our community.
            </Text>
            <View style={styles.welcomePoints}>
              {["Founders & CEOs", "Artists & Creators", "Investors & Advisors", "Journalists & Editors"].map((r) => (
                <View key={r} style={[styles.roleItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <Feather name="check-circle" size={14} color={colors.gold} />
                  <Text style={[styles.roleText, { color: colors.textSecondary }]}>{r}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Step 1: About you */}
        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>About You</Text>
            <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>The basics, so we know who we're talking to.</Text>
            <Field label="FULL NAME" colors={colors}>
              <TextInput
                style={[styles.input, { color: colors.foreground }]}
                placeholder="Your full name"
                placeholderTextColor={colors.textMuted}
                value={form.name}
                onChangeText={(v) => update("name", v)}
              />
            </Field>
            <Field label="EMAIL ADDRESS" colors={colors}>
              <TextInput
                style={[styles.input, { color: colors.foreground }]}
                placeholder="your@email.com"
                placeholderTextColor={colors.textMuted}
                value={form.email}
                onChangeText={(v) => update("email", v)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Field>
            <Field label="INVITE CODE (OPTIONAL)" colors={colors}>
              <TextInput
                style={[styles.input, { color: colors.foreground }]}
                placeholder="If you have one"
                placeholderTextColor={colors.textMuted}
                value={form.inviteCode}
                onChangeText={(v) => update("inviteCode", v)}
                autoCapitalize="characters"
              />
            </Field>
          </View>
        )}

        {/* Step 2: Your story */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>Your Story</Text>
            <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>Tell us about yourself and why Velora is right for you.</Text>
            <Field label="BIO" colors={colors}>
              <TextInput
                style={[styles.input, styles.textarea, { color: colors.foreground }]}
                placeholder="Tell us who you are, what you do, and what drives you..."
                placeholderTextColor={colors.textMuted}
                value={form.bio}
                onChangeText={(v) => update("bio", v)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </Field>
            <Field label="WHY VELORA?" colors={colors}>
              <TextInput
                style={[styles.input, styles.textarea, { color: colors.foreground }]}
                placeholder="What would you contribute? What are you hoping to find?"
                placeholderTextColor={colors.textMuted}
                value={form.whyJoin}
                onChangeText={(v) => update("whyJoin", v)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </Field>
          </View>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>Your Interests</Text>
            <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>
              Select 2–8 areas that define you. This helps us connect you with the right people.
            </Text>
            <View style={styles.interestGrid}>
              {INTERESTS.map((interest) => {
                const selected = form.interests.includes(interest);
                return (
                  <Pressable
                    key={interest}
                    onPress={() => toggleInterest(interest)}
                    style={[
                      styles.interestChip,
                      {
                        backgroundColor: selected ? colors.gold + "20" : colors.card,
                        borderColor: selected ? colors.gold + "70" : colors.border,
                      },
                    ]}
                  >
                    <Text style={[styles.interestText, { color: selected ? colors.gold : colors.textSecondary }]}>
                      {interest}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Text style={[styles.interestCount, { color: colors.textMuted }]}>
              {form.interests.length}/8 selected
            </Text>
          </View>
        )}

        {/* Step 4: Social */}
        {step === 4 && (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>Social Presence</Text>
            <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>
              Optional, but it helps us understand your work and reach.
            </Text>
            <Field label="INSTAGRAM" colors={colors} icon="instagram">
              <TextInput
                style={[styles.input, { color: colors.foreground }]}
                placeholder="@yourusername"
                placeholderTextColor={colors.textMuted}
                value={form.socialLinks.instagram ?? ""}
                onChangeText={(v) => update("socialLinks", { ...form.socialLinks, instagram: v })}
                autoCapitalize="none"
              />
            </Field>
            <Field label="TWITTER / X" colors={colors} icon="twitter">
              <TextInput
                style={[styles.input, { color: colors.foreground }]}
                placeholder="@yourusername"
                placeholderTextColor={colors.textMuted}
                value={form.socialLinks.twitter ?? ""}
                onChangeText={(v) => update("socialLinks", { ...form.socialLinks, twitter: v })}
                autoCapitalize="none"
              />
            </Field>
            <Field label="LINKEDIN" colors={colors} icon="linkedin">
              <TextInput
                style={[styles.input, { color: colors.foreground }]}
                placeholder="linkedin.com/in/you"
                placeholderTextColor={colors.textMuted}
                value={form.socialLinks.linkedin ?? ""}
                onChangeText={(v) => update("socialLinks", { ...form.socialLinks, linkedin: v })}
                autoCapitalize="none"
              />
            </Field>
          </View>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: colors.foreground }]}>Review & Submit</Text>
            <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>
              Everything looks good? Submit your application and we'll be in touch.
            </Text>
            <View style={[styles.reviewCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <ReviewRow label="Name" value={form.name || "—"} colors={colors} />
              <ReviewRow label="Email" value={form.email || "—"} colors={colors} />
              <ReviewRow label="Interests" value={form.interests.join(", ") || "—"} colors={colors} />
              <ReviewRow label="Bio" value={form.bio ? form.bio.substring(0, 60) + "..." : "—"} colors={colors} />
            </View>
            <View style={[styles.privacyNote, { backgroundColor: colors.gold + "08", borderColor: colors.gold + "20" }]}>
              <Feather name="lock" size={13} color={colors.gold} />
              <Text style={[styles.privacyText, { color: colors.textSecondary }]}>
                Your application is reviewed by humans. We never share your data.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer CTA */}
      <View style={[styles.footer, { paddingBottom: bottomPad + 16, backgroundColor: colors.background, borderTopColor: colors.border }]}>
        {step < TOTAL_STEPS - 1 ? (
          <GoldButton label="Continue" onPress={handleNext} size="lg" fullWidth />
        ) : (
          <GoldButton label="Submit Application" onPress={handleSubmit} loading={loading} size="lg" fullWidth />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

function Field({ label, children, colors, icon }: { label: string; children: React.ReactNode; colors: any; icon?: string }) {
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 10, letterSpacing: 1.2, color: colors.textSecondary }}>
        {label}
      </Text>
      <View style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {icon && <Feather name={icon as any} size={15} color={colors.textMuted} />}
        {children}
      </View>
    </View>
  );
}

function ReviewRow({ label, value, colors }: { label: string; value: string; colors: any }) {
  return (
    <View style={{ flexDirection: "row", gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.textMuted, width: 70 }}>{label}</Text>
      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: colors.foreground, flex: 1 }} numberOfLines={2}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  backBtn: { padding: 4 },
  headerCenter: { flex: 1, alignItems: "center", gap: 2 },
  headerStep: { fontFamily: "Inter_400Regular", fontSize: 11, letterSpacing: 0.5 },
  headerLabel: { fontFamily: "Inter_600SemiBold", fontSize: 14 },
  progressBg: { height: 2 },
  progressFill: { height: 2 },
  scroll: { padding: 24, gap: 20 },
  stepContent: { gap: 20 },
  stepIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  stepIconText: { fontFamily: "Inter_700Bold", fontSize: 30 },
  stepTitle: { fontFamily: "Inter_700Bold", fontSize: 24, letterSpacing: -0.3 },
  stepDesc: { fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 21 },
  welcomePoints: { gap: 10 },
  roleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  roleText: { fontFamily: "Inter_500Medium", fontSize: 14 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: { flex: 1, fontFamily: "Inter_400Regular", fontSize: 15 },
  textarea: { minHeight: 90, paddingTop: 4 },
  interestGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  interestChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  interestText: { fontFamily: "Inter_500Medium", fontSize: 13 },
  interestCount: { fontFamily: "Inter_400Regular", fontSize: 12, textAlign: "center" },
  reviewCard: { borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, paddingTop: 4, paddingBottom: 4 },
  privacyNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
  },
  privacyText: { fontFamily: "Inter_400Regular", fontSize: 12, flex: 1, lineHeight: 18 },
  footer: { padding: 20, paddingTop: 12, borderTopWidth: 1 },
  successContainer: { flex: 1, padding: 32, alignItems: "center", justifyContent: "center", gap: 20 },
  successIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: { fontFamily: "Inter_700Bold", fontSize: 24, textAlign: "center" },
  successSub: { fontFamily: "Inter_400Regular", fontSize: 15, lineHeight: 23, textAlign: "center" },
  successCard: {
    flexDirection: "row",
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    alignItems: "flex-start",
    width: "100%",
  },
  successCardText: { fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 19, flex: 1 },
});
