import { useRef, useState } from "react";
import { Tabs } from "expo-router";
import { Host, Icon } from "@expo/ui";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText, Button } from "../../components/theme";
import { TopBarLogo } from "../../components/navigation";
import { useTheme, type ThemeMode } from "../../providers/ThemeProvider";
import { Fonts } from "../../constants/typography";
import { owner, pets } from "../../constants/homeData";
import { showFeature } from "../../utils/feature";

// Semua komponen dan data khusus profil tetap dalam file ini.
const account = {
  ...owner,
  email: "sarah.azzahra@pawcare.id",
  phone: "+62 812–3456–7890",
  photo:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&auto=format&fit=crop&q=80",
};

const icons = {
  bell: Icon.select({
    ios: "bell",
    android: import("@expo/material-symbols/notifications.xml"),
  }),
  mail: Icon.select({
    ios: "envelope",
    android: import("@expo/material-symbols/mail.xml"),
  }),
  phone: Icon.select({
    ios: "phone",
    android: import("@expo/material-symbols/call.xml"),
  }),
  paw: Icon.select({
    ios: "pawprint.fill",
    android: import("@expo/material-symbols/pets.xml"),
  }),
  badge: Icon.select({
    ios: "checkmark.seal",
    android: import("@expo/material-symbols/verified.xml"),
  }),
  shield: Icon.select({
    ios: "cross.case",
    android: import("@expo/material-symbols/health_and_safety.xml"),
  }),
  wallet: Icon.select({
    ios: "wallet.bifold",
    android: import("@expo/material-symbols/account_balance_wallet.xml"),
  }),
  support: Icon.select({
    ios: "headphones",
    android: import("@expo/material-symbols/support_agent.xml"),
  }),
  community: Icon.select({
    ios: "person.3",
    android: import("@expo/material-symbols/groups.xml"),
  }),
  privacy: Icon.select({
    ios: "lock.shield",
    android: import("@expo/material-symbols/lock.xml"),
  }),
  logout: Icon.select({
    ios: "rectangle.portrait.and.arrow.right",
    android: import("@expo/material-symbols/logout.xml"),
  }),
  add: Icon.select({
    ios: "plus.circle",
    android: import("@expo/material-symbols/add_circle.xml"),
  }),
  contact: Icon.select({
    ios: "person.text.rectangle",
    android: import("@expo/material-symbols/contact_emergency.xml"),
  }),
  leaf: Icon.select({
    ios: "leaf",
    android: import("@expo/material-symbols/spa.xml"),
  }),
  star: Icon.select({
    ios: "star",
    android: import("@expo/material-symbols/star.xml"),
  }),
  heart: Icon.select({
    ios: "heart",
    android: import("@expo/material-symbols/favorite.xml"),
  }),
  chevron: Icon.select({
    ios: "chevron.right",
    android: import("@expo/material-symbols/chevron_right.xml"),
  }),
};
type IconName = keyof typeof icons;

function ProfileIcon({
  name,
  size = 22,
  color,
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  const { colors } = useTheme();
  return (
    <Host matchContents>
      <Icon name={icons[name]} size={size} color={color ?? colors.accent} />
    </Host>
  );
}

function Avatar({
  uri,
  label,
  size,
  rounded = true,
}: {
  uri: string;
  label: string;
  size: number;
  rounded?: boolean;
}) {
  const [failedUri, setFailedUri] = useState<string | null>(null);
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: rounded ? size / 2 : 16,
        overflow: "hidden",
        backgroundColor: colors.accentSoft,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {failedUri === uri ? (
        <AppText accessibilityLabel={label}>{label.slice(0, 1)}</AppText>
      ) : (
        <Image
          source={{ uri }}
          accessibilityLabel={label}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onError={() => setFailedUri(uri)}
        />
      )}
    </View>
  );
}

type MenuItem = {
  icon: IconName;
  title: string;
  description?: string;
  badge?: string;
  tone?: "warm" | "danger";
  onPress?: () => void;
};
const settings: MenuItem[] = [
  {
    icon: "contact",
    title: "Informasi Pribadi & Kontak Darurat",
    description: "Kelola data wali & nomor darurat 24 jam",
  },
  {
    icon: "heart",
    title: "Klinik Favorit & Dokter",
    description: "2 klinik & dokter hewan terpercaya",
    badge: "2 tersimpan",
  },
  {
    icon: "wallet",
    title: "Metode Pembayaran & Tagihan",
    description: "GoPay, Mandiri Virtual Account",
  },
  {
    icon: "bell",
    title: "Pengingat & Notifikasi Push",
    description: "Vaksin, Jadwal Makan, Grooming",
  },
  {
    icon: "shield",
    title: "Asuransi & Proteksi PawCare",
    description: "Cover rawat inap & tindakan darurat",
    badge: "Aktif",
    tone: "warm",
  },
];

function MenuRow({ item }: { item: MenuItem }) {
  const { colors, isDark } = useTheme();
  const danger = item.tone === "danger";
  const color = danger
    ? isDark
      ? "#FF9696"
      : "#D60000"
    : item.tone === "warm"
      ? colors.warningText
      : colors.accent;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.title}
      onPress={item.onPress ?? (() => showFeature(item.title))}
      style={({ pressed }) => [styles.menuRow, { opacity: pressed ? 0.65 : 1 }]}
    >
      <View
        style={[
          styles.menuIcon,
          {
            backgroundColor: danger
              ? isDark
                ? "#482929"
                : "#FFECE8"
              : item.tone === "warm"
                ? colors.warningSoft
                : isDark
                  ? colors.accentSoft
                  : "#EEF5EC",
          },
        ]}
      >
        <ProfileIcon name={item.icon} color={color} />
      </View>
      <View style={styles.flex}>
        <AppText
          numberOfLines={1}
          style={[styles.menuTitle, danger && { color }]}
        >
          {item.title}
        </AppText>
        {item.description && (
          <AppText numberOfLines={1} color="muted" style={styles.description}>
            {item.description}
          </AppText>
        )}
      </View>
      {item.badge && (
        <View
          style={[
            styles.pill,
            {
              backgroundColor:
                item.tone === "warm"
                  ? isDark
                    ? colors.accentSoft
                    : "#AAF29B"
                  : isDark
                    ? colors.accentSoft
                    : "#EAF0E6",
            },
          ]}
        >
          <AppText style={styles.badgeText}>{item.badge}</AppText>
        </View>
      )}
      <ProfileIcon
        name="chevron"
        size={17}
        color={danger ? color : colors.border}
      />
    </Pressable>
  );
}

export default function ProfilePage() {
  const { colors, isDark, mode, setMode } = useTheme();
  const insets = useSafeAreaInsets();
  const scroll = useRef<ScrollView>(null);
  const [showAppearance, setShowAppearance] = useState(false);
  const background = isDark ? colors.background : "#F4FBF2";
  const surface = { backgroundColor: colors.surfaceRaised };
  const soft = { backgroundColor: isDark ? colors.accentSoft : "#EEF5EC" };
  const support: MenuItem[] = [
    { icon: "support", title: "Pusat Bantuan & Tanya CS" },
    { icon: "community", title: "Komunitas Pet Lovers Terdekat" },
    {
      icon: "privacy",
      title: "Pengaturan Privasi & Keamanan",
      onPress: () =>
        Alert.alert("Pengaturan akun", "Pilih pengaturan yang ingin dibuka.", [
          { text: "Tampilan aplikasi", onPress: () => setShowAppearance(true) },
          {
            text: "Privasi & keamanan",
            onPress: () => showFeature("Privasi & keamanan"),
          },
          { text: "Batal", style: "cancel" },
        ]),
    },
    {
      icon: "logout",
      title: "Keluar Akun",
      tone: "danger",
      onPress: () => showFeature("Keluar akun"),
    },
  ];
  return (
    <>
      <Tabs.Screen
        options={{
          headerStyle: { height: insets.top + 60, backgroundColor: background },
          headerShadowVisible: false,
          headerLeft: () => <TopBarLogo subtitle="Akun" />,
          headerRight: () => (
            <View
              style={[
                styles.headerActions,
                { paddingRight: Math.max(insets.right, 20) },
              ]}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Notifikasi, ada pemberitahuan baru"
                onPress={() => showFeature("Notifikasi")}
                style={styles.headerButton}
              >
                <ProfileIcon name="bell" color={colors.text} size={23} />
                <View style={styles.notificationDot} />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Lihat akun Sarah"
                onPress={() =>
                  scroll.current?.scrollTo({ y: 0, animated: true })
                }
                style={styles.headerButton}
              >
                <Avatar uri={account.photo} label={account.name} size={32} />
              </Pressable>
            </View>
          ),
        }}
      />
      <ScrollView
        ref={scroll}
        style={{ backgroundColor: background }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingLeft: Math.max(insets.left, 20),
            paddingRight: Math.max(insets.right, 20),
            paddingBottom: insets.bottom + 115,
          },
        ]}
      >
        <View style={[styles.identityCard, surface]}>
          <View pointerEvents="none" style={styles.leaf}>
            <ProfileIcon
              name="leaf"
              size={85}
              color={isDark ? "#304D32" : "#D9EFD5"}
            />
          </View>
          <View style={styles.identityRow}>
            <View>
              <View style={[styles.avatarRing, soft]}>
                <Avatar uri={account.photo} label={account.name} size={74} />
              </View>
              <View
                style={[styles.verified, { borderColor: colors.surfaceRaised }]}
              >
                <ProfileIcon name="badge" size={14} color="#FFFFFF" />
              </View>
            </View>
            <View style={styles.flex}>
              <AppText style={styles.accountName}>{account.name}</AppText>
              <View
                style={[
                  styles.membership,
                  { backgroundColor: colors.warningSoft },
                ]}
              >
                <ProfileIcon name="star" size={13} color={colors.warningText} />
                <AppText
                  style={[styles.badgeText, { color: colors.warningText }]}
                >
                  PawCare VIP Member
                </AppText>
              </View>
              <View style={styles.parentLine}>
                <ProfileIcon name="paw" size={14} />
                <AppText style={styles.description}>
                  Pet Parent of {pets.length} (
                  {pets.map((pet) => pet.name).join(" & ")})
                </AppText>
              </View>
            </View>
          </View>
          <View style={[styles.contactBox, soft]}>
            <View style={styles.contactLine}>
              <ProfileIcon name="mail" size={15} />
              <AppText selectable style={styles.description}>
                {account.email}
              </AppText>
            </View>
            <View style={styles.contactLine}>
              <ProfileIcon name="phone" size={15} />
              <AppText selectable style={styles.description}>
                {account.phone}
              </AppText>
            </View>
          </View>
        </View>

        <View style={styles.dedication}>
          <View style={styles.between}>
            <View style={styles.inline}>
              <ProfileIcon name="badge" size={20} color="#BCF3AD" />
              <AppText style={styles.dedicationTitle}>
                DEDIKASI PERAWATAN
              </AppText>
            </View>
            <AppText style={styles.year}>Tahun 2024</AppText>
          </View>
          <View style={styles.stats}>
            {[
              { value: "342", label: "Hari Bersama\nPawCare" },
              { value: "14", label: "Pemeriksaan\nSukses" },
              { value: "100%", label: "Jadwal Tepat\nWaktu" },
            ].map((stat, index) => (
              <View
                key={stat.label}
                style={[styles.stat, index > 0 && styles.statDivider]}
              >
                <AppText
                  style={[
                    styles.statValue,
                    index === 2 && { color: "#FFE2A4" },
                  ]}
                >
                  {stat.value}
                </AppText>
                <AppText style={styles.statLabel}>{stat.label}</AppText>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.between}>
          <AppText style={styles.sectionTitle}>Anabul Saya</AppText>
          <AppText color="accent" style={styles.badgeText}>
            {pets.length} Terdaftar
          </AppText>
        </View>
        <View style={styles.petList}>
          {pets.map((pet) => (
            <View key={pet.id} style={[styles.petCard, surface]}>
              <View>
                <Avatar
                  uri={pet.photo}
                  label={pet.name}
                  size={56}
                  rounded={false}
                />
                <View
                  style={[
                    styles.activeDot,
                    { borderColor: colors.surfaceRaised },
                  ]}
                />
              </View>
              <View style={styles.flex}>
                <View style={styles.inline}>
                  <AppText style={styles.petName}>{pet.name}</AppText>
                  <View style={[styles.pill, soft]}>
                    <AppText color="accent" style={styles.badgeText}>
                      Aktif
                    </AppText>
                  </View>
                </View>
                <AppText style={styles.description} color="muted">
                  {pet.breed} • {pet.age}
                </AppText>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Kelola ${pet.name}`}
                onPress={() => showFeature(`Kelola ${pet.name}`)}
                style={({ pressed }) => [
                  styles.manage,
                  soft,
                  { opacity: pressed ? 0.65 : 1 },
                ]}
              >
                <AppText color="accent" style={styles.badgeText}>
                  Kelola
                </AppText>
                <ProfileIcon name="chevron" size={14} />
              </Pressable>
            </View>
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => showFeature("Daftarkan hewan peliharaan baru")}
          style={({ pressed }) => [
            styles.addPet,
            soft,
            { opacity: pressed ? 0.65 : 1 },
          ]}
        >
          <ProfileIcon name="add" size={20} />
          <AppText color="accent" style={styles.menuTitle}>
            Daftarkan Hewan Peliharaan Baru
          </AppText>
        </Pressable>

        <AppText style={styles.groupLabel}>PENGATURAN AKUN & LAYANAN</AppText>
        <View style={[styles.menuGroup, surface]}>
          {settings.map((item) => (
            <MenuRow key={item.title} item={item} />
          ))}
        </View>
        <AppText style={styles.groupLabel}>BANTUAN & KEAMANAN</AppText>
        <View style={[styles.menuGroup, surface]}>
          {support.map((item) => (
            <MenuRow key={item.title} item={item} />
          ))}
        </View>
        {showAppearance && (
          <View style={[styles.appearance, surface]}>
            <AppText style={styles.sectionTitle}>Tampilan aplikasi</AppText>
            {(
              [
                { title: "Ikuti sistem", value: "system" },
                { title: "Terang", value: "light" },
                { title: "Gelap", value: "dark" },
              ] satisfies { title: string; value: ThemeMode }[]
            ).map((option) => (
              <Button
                key={option.value}
                title={option.title}
                variant={mode === option.value ? "primary" : "outline"}
                accessibilityState={{ selected: mode === option.value }}
                onPress={() => setMode(option.value)}
              />
            ))}
            <Button
              title="Tutup"
              variant="outline"
              onPress={() => setShowAppearance(false)}
            />
          </View>
        )}
        <View style={styles.footer}>
          <AppText color="muted" style={styles.footerText}>
            PawCare App v3.4.1 (Build 2024)
          </AppText>
          <AppText style={[styles.footerText, { color: colors.border }]}>
            Sahabat Sehat Peliharaan Indonesia
          </AppText>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 4 },
  flex: { flex: 1, minWidth: 0 },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    flexWrap: "wrap",
  },
  between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    flexWrap: "wrap",
  },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFA000",
  },
  identityCard: {
    borderRadius: 20,
    padding: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  leaf: { position: "absolute", right: 13, top: 19, opacity: 0.7 },
  identityRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarRing: { padding: 4, borderRadius: 45 },
  verified: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#167525",
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  accountName: { fontFamily: Fonts.bold, fontSize: 20, lineHeight: 26 },
  membership: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
    borderRadius: 12,
    paddingHorizontal: 8,
    marginVertical: 3,
  },
  badgeText: { fontSize: 12, lineHeight: 18 },
  parentLine: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    flexWrap: "wrap",
  },
  contactBox: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 14,
    marginTop: 14,
    gap: 5,
  },
  contactLine: { flexDirection: "row", gap: 10, alignItems: "center" },
  description: { fontSize: 12, lineHeight: 18, flexShrink: 1 },
  dedication: {
    backgroundColor: "#226C29",
    borderColor: "#126019",
    borderWidth: 1,
    borderRadius: 17,
    padding: 16,
    marginBottom: 24,
  },
  dedicationTitle: {
    fontSize: 12,
    color: "#F1FFE8",
    fontFamily: Fonts.semiBold,
  },
  year: {
    backgroundColor: "#216225",
    color: "#F1FFE8",
    fontFamily: Fonts.bold,
    fontSize: 11,
    lineHeight: 18,
    borderRadius: 9,
    paddingHorizontal: 8,
  },
  stats: { flexDirection: "row", marginTop: 12 },
  stat: { flex: 1, alignItems: "center", paddingHorizontal: 5 },
  statDivider: { borderLeftWidth: 1, borderLeftColor: "#438449" },
  statValue: {
    fontSize: 23,
    lineHeight: 28,
    fontFamily: Fonts.bold,
    color: "#F4FFDC",
  },
  statLabel: {
    fontSize: 11,
    lineHeight: 14,
    color: "#F4FFDC",
    textAlign: "center",
    fontFamily: Fonts.bold,
  },
  sectionTitle: { fontFamily: Fonts.semiBold, fontSize: 18, lineHeight: 26 },
  petList: { gap: 9, marginTop: 8 },
  petCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 20,
  },
  activeDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 2,
    backgroundColor: "#25862A",
  },
  petName: { fontFamily: Fonts.bold, fontSize: 15 },
  pill: { borderRadius: 12, paddingHorizontal: 8 },
  manage: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 20,
    paddingHorizontal: 12,
    minHeight: 44,
  },
  addPet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 18,
    minHeight: 46,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  groupLabel: {
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.8,
    marginTop: 23,
    marginBottom: 5,
    marginLeft: 4,
    fontFamily: Fonts.semiBold,
  },
  menuGroup: { borderRadius: 19, paddingVertical: 1, overflow: "hidden" },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    minHeight: 71,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.semiBold,
    flexShrink: 1,
  },
  appearance: { padding: 16, borderRadius: 18, gap: 10, marginTop: 16 },
  footer: { alignItems: "center", paddingTop: 28, paddingBottom: 32 },
  footerText: { fontSize: 12, lineHeight: 18, textAlign: "center" },
});
