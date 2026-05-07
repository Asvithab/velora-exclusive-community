# VELORA – Exclusive Members Community

An invite-only luxury social community mobile app for founders, creators, and tastemakers.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/velora run dev` — run the Expo mobile app
- `pnpm run typecheck` — full typecheck across all packages
- Required env: `SESSION_SECRET` — session secret for API

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Mobile: Expo ~54, Expo Router ~6, React Native 0.81
- UI: @expo/vector-icons (Feather), expo-blur, expo-linear-gradient, expo-haptics, expo-glass-effect
- Fonts: @expo-google-fonts/inter (400/500/600/700)
- State: React Context (AuthContext), @tanstack/react-query
- Storage: @react-native-async-storage/async-storage (local, no backend yet)
- API: Express 5 (api-server artifact, not yet wired to mobile)

## Where things live

```
artifacts/velora/
  app/
    index.tsx              — auth redirect guard
    _layout.tsx            — root layout (fonts, providers, Stack nav)
    (auth)/                — welcome, login, apply (6-step onboarding)
    (tabs)/                — index (home), feed, events, messages, profile
    (modal)/               — chat/[id], member/[id], event/[id], create-post, admin
  components/
    ui/                    — GlassCard, GoldButton, VeloraAvatar, VeloraBadge
    feed/                  — PostCard
    members/               — MemberCard
    events/                — EventCard
    stories/               — StoryRow
  constants/
    colors.ts              — design tokens (gold #C9A96E, background #09090E)
    mockData.ts            — members, posts, events, conversations, applications
  context/
    AuthContext.tsx         — invite-code auth + AsyncStorage persistence
  hooks/
    useColors.ts           — typed color access hook
```

## Architecture decisions

- **Invite-code auth**: codes VELORA2024, VIP001, FOUNDER, ELITE2024 → member; ADMIN999 → admin. No backend needed for first build.
- **Dark-only**: `userInterfaceStyle: dark` in app.json — both color scheme branches return the same dark palette to guarantee consistency.
- **Modal group for full-screen overlays**: chat, member profile, event detail, create post, admin all live in `(modal)` with `presentation: "modal"` to animate up from bottom.
- **Expo Router file-based nav**: group folders `(auth)`, `(tabs)`, `(modal)` map cleanly to three navigation states; root `index.tsx` redirects based on auth.
- **All mock data**: rich 8-member roster, 6 posts, 5 events, 5 conversations, 3 pending applications — ready to swap for real API calls.

## Product

- **Welcome / onboarding**: animated hero, feature highlights, testimonials, CTA
- **Invite-code login**: enter code → instant access or admin access
- **6-step application flow**: name/profession, about, interests, why Velora, referral, review
- **Home dashboard**: stories row, curated events, members directory scroll, trending feed
- **Community feed**: posts with likes/comments/bookmarks, create post modal with tags
- **Events**: list with RSVP, featured hero, detail modal with capacity bar
- **Direct messages**: conversation list with unread badges, full chat view with reactions
- **Member profiles**: stats, tier badge, interests, badges, posts
- **User profile**: edit mode, settings, tier card, reputation, badges, logout
- **Admin panel**: application review (approve/reject), members list, analytics grid, invite code management

## User preferences

- Dark luxury aesthetic throughout — gold (#C9A96E) + violet (#8B5CF6) accents on near-black (#09090E)
- Lox Club-inspired: exclusive, invite-only, high-taste

## Gotchas

- `useNativeDriver` warnings in web preview are normal — Expo web doesn't support native animations; JS fallback works fine
- Admin access: use code `ADMIN999` at login screen
- To wire real backend: replace AsyncStorage reads in `AuthContext.tsx` and mock data imports with API calls from `@workspace/api-client-react`

## Pointers

- Expo skill: `.local/skills/expo/SKILL.md`
- pnpm workspace conventions: `.local/skills/pnpm-workspace/SKILL.md`
