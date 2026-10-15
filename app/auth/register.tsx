import { useState } from "react";
import { StyleSheet, type TextInputProps } from "react-native";
import { useRouter } from "expo-router";
import {
  AppIcon,
  AppText,
  AppView,
  AppInput,
  Button,
  Card,
  Photo,
  Screen,
} from "../../components/theme";
import { type AppIconName } from "../../components/theme/AppIcon";
import { TopBarLogo } from "../../components/navigation/TopBarLogo";
import { Fonts } from "../../constants/typography";
import { useTheme } from "../../providers/ThemeProvider";
import { authApi } from "../../features/auth/api/authApi";

const pets = [
  { id: "cat", emoji: "🐱", name: "Kucing", detail: "Feline baby" },
  { id: "dog", emoji: "🐶", name: "Anjing", detail: "Canine pal" },
  {
    id: "rabbit",
    emoji: "🐰",
    name: "Kelinci / Eksotik",
    detail: "Hamster, burung",
  },
  { id: "other", emoji: "🐾", name: "Lainnya", detail: "Reptil & ikan" },
];

// Kept in this file so each auth page remains self-contained.
function Field({
  label,
  icon,
  trailing,
  ...props
}: TextInputProps & {
  label: string;
  icon: AppIconName;
  trailing?: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <AppView style={styles.field}>
      <AppText style={styles.label}>{label}</AppText>
      <AppView
        style={[styles.inputRow, { backgroundColor: colors.surfaceRaised }]}
      >
        <AppIcon name={icon} size={21} color={colors.muted} />
        {icon === "phone" && <AppText>+62</AppText>}
        <AppInput
          {...props}
          accessibilityLabel={label}
          placeholderTextColor={colors.muted}
          style={[styles.input, { color: colors.text }]}
        />
        {trailing}
      </AppView>
    </AppView>
  );
}

export default function RegisterScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const green = isDark ? colors.accent : "#09651A";
  const soft = isDark ? colors.surface : "#EEF4EB";
  const [selected, setSelected] = useState<string[]>(["cat"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const strength = password
    ? [
        password.length >= 8,
        /[a-z]/i.test(password),
        /\d/.test(password),
        /[^a-z0-9]/i.test(password),
      ].filter(Boolean).length
    : 0;
  const unavailable = (feature: string) =>
    setMessage(
      `${feature} belum tersedia. Layanan autentikasi belum terhubung.`,
    );
  const submit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const user = await authApi.register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.replace(/[\s-]/g, ""),
        password,
      });

      console.log("Register berhasil:", user.id);

      router.replace("/auth/login");
    } catch (error) {
      console.error("Register gagal:", error);

      setMessage("Pendaftaran gagal. Periksa data atau koneksi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen
      avoidKeyboard
      edges={["top", "left", "right", "bottom"]}
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={styles.page}
    >
      <AppView style={styles.header}>
        <Button
          variant="plain"
          accessibilityRole="button"
          accessibilityLabel="Kembali ke login"
          onPress={() => router.replace("/auth/login")}
          style={styles.back}
        >
          <AppIcon
            name="arrow"
            size={25}
            color={colors.text}
            style={styles.reverse}
          />
        </Button>
        <AppView style={styles.flex}>
          <TopBarLogo subtitle="" />
        </AppView>
        <AppView style={[styles.avatar, { backgroundColor: green }]}>
          <AppIcon name="profile" size={23} color={colors.background} />
        </AppView>
      </AppView>
      <Card style={[styles.hero, { backgroundColor: soft }]}>
        <Photo
          source={require("../../assets/images/logo.png")}
          label="Logo PawCare"
          size={62}
          rounded={false}
          resizeMode="contain"
        />
        <AppView style={styles.flex}>
          <AppView
            style={[styles.badge, { backgroundColor: colors.accentSoft }]}
          >
            <AppIcon name="paw" size={12} color={green} />
            <AppText style={[styles.badgeText, { color: green }]}>
              Sahabat Sehat Peliharaan
            </AppText>
          </AppView>
          <AppText style={styles.title}>Buat Akun PawCare ✨</AppText>
          <AppText color="muted" variant="caption">
            Mulai perjalanan terbaik merawat kesehatan dan kebahagiaan anabul
            Anda.
          </AppText>
        </AppView>
      </Card>
      <AppView style={styles.petSection}>
        <AppView style={styles.sectionHeading}>
          <AppView style={styles.inline}>
            <AppIcon name="heart" size={21} color={green} />
            <AppText style={styles.label}>Saya memelihara:</AppText>
          </AppView>
          <AppText variant="caption">Bisa pilih lebih dari 1</AppText>
        </AppView>
        <AppView style={styles.petGrid}>
          {pets.map((pet) => {
            const checked = selected.includes(pet.id);
            return (
              <Button
                variant="plain"
                key={pet.id}
                accessibilityRole="checkbox"
                accessibilityLabel={pet.name}
                accessibilityState={{ checked }}
                onPress={() =>
                  setSelected((current) =>
                    checked
                      ? current.filter((id) => id !== pet.id)
                      : [...current, pet.id],
                  )
                }
                style={[
                  styles.pet,
                  {
                    backgroundColor: checked ? soft : colors.surfaceRaised,
                    borderColor: checked
                      ? colors.accentSoft
                      : colors.surfaceRaised,
                  },
                ]}
              >
                <AppText style={styles.emoji}>{pet.emoji}</AppText>
                <AppView style={styles.flex}>
                  <AppText
                    style={[
                      styles.petName,
                      { color: checked ? green : colors.text },
                    ]}
                  >
                    {pet.name}
                  </AppText>
                  <AppText color="muted" style={styles.petDetail}>
                    {pet.detail}
                  </AppText>
                </AppView>
                <AppView
                  style={[
                    styles.radio,
                    { borderColor: checked ? green : colors.border },
                  ]}
                >
                  {checked && <AppIcon name="check" size={12} color={green} />}
                </AppView>
              </Button>
            );
          })}
        </AppView>
      </AppView>
      <Field
        label="Nama Lengkap Pemilik"
        icon="contact"
        value={name}
        onChangeText={setName}
        placeholder="cth. Sarah Azzahra"
        autoComplete="name"
        autoCapitalize="words"
      />
      <Field
        label="Email Aktif"
        icon="mail"
        value={email}
        onChangeText={setEmail}
        placeholder="nama@email.com"
        keyboardType="email-address"
        autoComplete="email"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <AppView style={styles.field}>
        <Field
          label="Nomor WhatsApp / HP"
          icon="phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="812–3456–7890"
          keyboardType="phone-pad"
          autoComplete="tel-national"
        />
        <AppText variant="caption" style={{ color: green }}>
          ♧ Pengingat Vaksin & Janji
        </AppText>
      </AppView>
      <AppView style={styles.field}>
        <Field
          label="Buat Kata Sandi"
          icon="privacy"
          value={password}
          onChangeText={setPassword}
          placeholder="Minimal 8 karakter"
          secureTextEntry={!visible}
          autoComplete="new-password"
          autoCapitalize="none"
          autoCorrect={false}
          trailing={
            <Button
              variant="plain"
              accessibilityRole="button"
              accessibilityLabel={
                visible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
              }
              hitSlop={8}
              onPress={() => setVisible(!visible)}
            >
              <AppText style={[styles.toggle, { color: green }]}>
                {visible ? "Tutup" : "Lihat"}
              </AppText>
            </Button>
          }
        />
        <AppView style={styles.strength}>
          {[1, 2, 3, 4].map((level) => (
            <AppView
              key={level}
              style={[
                styles.bar,
                {
                  backgroundColor: strength >= level ? green : colors.border,
                  opacity: strength >= level ? 1 : 0.4,
                },
              ]}
            />
          ))}
        </AppView>
        <AppView style={styles.sectionHeading}>
          <AppText variant="caption" style={{ color: green }}>
            {
              [
                "Gunakan huruf, angka & simbol",
                "Lemah",
                "Cukup",
                "Baik",
                "Kuat — huruf, angka & simbol",
              ][strength]
            }
          </AppText>
          <AppText variant="caption">Min. 8 char</AppText>
        </AppView>
      </AppView>
      <Field
        label="Konfirmasi Kata Sandi"
        icon="privacy"
        value={confirmation}
        onChangeText={setConfirmation}
        placeholder="Ulangi kata sandi"
        secureTextEntry={!confirmVisible}
        autoComplete="new-password"
        autoCapitalize="none"
        autoCorrect={false}
        trailing={
          <Button
            variant="plain"
            accessibilityRole="button"
            accessibilityLabel={
              confirmVisible
                ? "Sembunyikan konfirmasi kata sandi"
                : "Tampilkan konfirmasi kata sandi"
            }
            hitSlop={8}
            onPress={() => setConfirmVisible(!confirmVisible)}
          >
            <AppText style={[styles.toggle, { color: green }]}>
              {confirmVisible ? "Tutup" : "Lihat"}
            </AppText>
          </Button>
        }
      />
      <AppView style={[styles.consent, { backgroundColor: soft }]}>
        <Button
          variant="plain"
          accessibilityRole="checkbox"
          accessibilityLabel="Saya menyetujui Syarat & Ketentuan serta Kebijakan Privasi"
          accessibilityState={{ checked: agreed }}
          onPress={() => setAgreed(!agreed)}
          style={styles.checkTarget}
        >
          <AppView
            style={[
              styles.checkbox,
              {
                borderColor: green,
                backgroundColor: agreed ? green : colors.surfaceRaised,
              },
            ]}
          >
            {agreed && (
              <AppIcon name="check" size={19} color={colors.background} />
            )}
          </AppView>
        </Button>
        <AppText variant="caption" color="muted" style={styles.flex}>
          Saya menyetujui{" "}
          <AppText
            variant="caption"
            accessibilityRole="link"
            style={[styles.legalLink, { color: green }]}
            onPress={() =>
              setMessage("Dokumen Syarat & Ketentuan belum tersedia.")
            }
          >
            Syarat & Ketentuan
          </AppText>{" "}
          serta{" "}
          <AppText
            variant="caption"
            accessibilityRole="link"
            style={[styles.legalLink, { color: green }]}
            onPress={() =>
              setMessage("Dokumen Kebijakan Privasi belum tersedia.")
            }
          >
            Kebijakan Privasi
          </AppText>{" "}
          PawCare Indonesia.
        </AppText>
      </AppView>
      {message ? (
        <AppText accessibilityRole="alert" accessibilityLiveRegion="polite">
          {message}
        </AppText>
      ) : null}

      <Button
        title={loading ? "Mendaftarkan akun..." : "Daftar Akun Baru   🐾"}
        style={[styles.submit, { backgroundColor: green }]}
        onPress={() => {
          if (!loading) {
            submit();
          }
        }}
        disabled={loading}
      />

      <AppView style={styles.divider}>
        <AppView style={[styles.line, { backgroundColor: colors.border }]} />
        <AppText variant="caption">atau daftar lebih cepat dengan</AppText>
        <AppView style={[styles.line, { backgroundColor: colors.border }]} />
      </AppView>
      <AppView style={styles.socialRow}>
        <Button
          title="G   Google"
          variant="outline"
          style={[styles.social, { backgroundColor: colors.surfaceRaised }]}
          onPress={() => unavailable("Daftar dengan Google")}
        />
        <Button
          title="Apple ID"
          variant="outline"
          style={[styles.social, { backgroundColor: colors.surfaceRaised }]}
          onPress={() => unavailable("Daftar dengan Apple ID")}
        />
      </AppView>
      <AppView style={styles.security}>
        <AppIcon name="shield" size={17} color={green} />
        <AppText variant="caption" color="muted" style={styles.securityText}>
          Data kesehatan hewan Anda terenkripsi aman
        </AppText>
      </AppView>
      <AppView style={styles.footer}>
        <AppText>Sudah memiliki akun?</AppText>
        <Button
          variant="plain"
          accessibilityRole="link"
          onPress={() => router.replace("/auth/login")}
        >
          <AppText style={[styles.loginLink, { color: green }]}>
            Masuk di sini
          </AppText>
        </Button>
      </AppView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  page: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    padding: 20,
    paddingBottom: 32,
    gap: 22,
  },
  header: { flexDirection: "row", alignItems: "center", gap: 10 },
  back: { minWidth: 40, minHeight: 44, justifyContent: "center" },
  reverse: { transform: [{ rotate: "180deg" }] },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 20,
    padding: 17,
    gap: 16,
  },
  badge: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: { fontFamily: Fonts.bold, fontSize: 10, lineHeight: 17 },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 26,
    lineHeight: 32,
    marginVertical: 7,
  },
  petSection: { gap: 10 },
  sectionHeading: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  inline: { flexDirection: "row", alignItems: "center", gap: 7 },
  petGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  pet: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "48%",
    flexGrow: 1,
    padding: 10,
    minHeight: 70,
    borderRadius: 15,
    borderWidth: 1,
  },
  emoji: { fontSize: 23, lineHeight: 32 },
  petName: { fontFamily: Fonts.semiBold, fontSize: 14, lineHeight: 18 },
  petDetail: { fontSize: 11, lineHeight: 16 },
  radio: {
    width: 17,
    height: 17,
    borderWidth: 1.5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  field: { gap: 8 },
  label: { fontFamily: Fonts.semiBold, fontSize: 15 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 58,
    borderRadius: 16,
    gap: 10,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    minWidth: 0,
    fontFamily: Fonts.regular,
    fontSize: 16,
    paddingVertical: 16,
  },
  toggle: { fontSize: 12 },
  strength: { flexDirection: "row", gap: 6, marginTop: 3 },
  bar: { flex: 1, height: 6, borderRadius: 3 },
  consent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderRadius: 16,
  },
  checkTarget: {
    width: 36,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  legalLink: { textDecorationLine: "underline", fontFamily: Fonts.semiBold },
  submit: { minHeight: 58, borderWidth: 0, borderRadius: 15, marginTop: 3 },
  divider: { flexDirection: "row", alignItems: "center", gap: 12 },
  line: { flex: 1, height: 1, opacity: 0.5 },
  socialRow: { flexDirection: "row", gap: 10 },
  social: { flex: 1, minHeight: 48, borderRadius: 15, borderWidth: 0 },
  security: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  securityText: { flexShrink: 1, fontFamily: Fonts.semiBold },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  loginLink: {
    textDecorationLine: "underline",
    fontFamily: Fonts.bold,
    paddingVertical: 10,
  },
});
