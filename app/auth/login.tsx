import { useState } from "react";
import { StyleSheet } from "react-native";
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
import { Fonts } from "../../constants/typography";
import { useTheme } from "../../providers/ThemeProvider";
import { authApi } from "../../features/auth/api/authApi";
import { tokenStorage } from "../../features/auth/utils/tokenStorage";
import { useAuth } from "../../providers/AuthProvider";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const green = isDark ? colors.accent : "#09651A";
  const soft = isDark ? colors.surface : "#EEF4EB";
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const unavailable = (feature: string) =>
    setMessage(
      `${feature} belum tersedia. Layanan autentikasi belum terhubung.`,
    );

  const handleLogin = async () => {
    if (loading) return;

    if (!identity.trim() || !password) {
      setMessage("Email dan password wajib diisi.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await authApi.login({
        email: identity.trim().toLowerCase(),
        password,
      });

      await signIn(response.token, response.user);

      console.log("Login berhasil:", response.user);

      setMessage(`Selamat datang, ${response.user.name}!`);
    } catch (error) {
      console.error("Login gagal:", error);
      setMessage("Login gagal. Periksa email dan password.");
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
      <Card style={[styles.hero, { backgroundColor: soft }]}>
        <AppView
          style={[styles.logoTile, { backgroundColor: colors.surfaceRaised }]}
        >
          <Photo
            source={require("../../assets/images/logo.png")}
            label="Logo PawCare"
            size={64}
            rounded={false}
            resizeMode="contain"
          />
        </AppView>
        <AppView style={styles.heroText}>
          <AppView
            style={[styles.pill, { backgroundColor: colors.accentSoft }]}
          >
            <AppIcon name="paw" size={14} color={green} />
            <AppText style={[styles.pillText, { color: green }]}>
              Sahabat Sehat Peliharaan
            </AppText>
          </AppView>
          <AppText style={styles.welcomeTitle}>Selamat Datang Kembali!</AppText>
          <AppText color="muted" variant="caption" numberOfLines={2}>
            Masuk untuk memantau kesehatan dan jadwal perawatan anabul
            tersayang.
          </AppText>
        </AppView>
      </Card>

      <Card style={[styles.form, { backgroundColor: colors.surfaceRaised }]}>
        <AppView style={styles.field}>
          <AppText style={styles.label}>Email atau Nomor Ponsel</AppText>
          <AppView style={[styles.inputRow, { backgroundColor: soft }]}>
            <AppIcon name="mail" size={22} color={colors.muted} />
            <AppInput
              accessibilityLabel="Email atau Nomor Ponsel"
              value={identity}
              onChangeText={setIdentity}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="username"
              placeholder="nama@email.com atau 0812..."
              placeholderTextColor={colors.muted}
              style={[styles.input, { color: colors.text }]}
            />
          </AppView>
        </AppView>

        <AppView style={styles.field}>
          <AppView style={styles.row}>
            <AppText style={styles.label}>Kata Sandi</AppText>
            <Button
              variant="plain"
              accessibilityRole="button"
              onPress={() => unavailable("Pemulihan kata sandi")}
            >
              <AppText style={{ color: green }}>Lupa Kata Sandi?</AppText>
            </Button>
          </AppView>
          <AppView style={[styles.inputRow, { backgroundColor: soft }]}>
            <AppIcon name="privacy" size={22} color={colors.muted} />
            <AppInput
              accessibilityLabel="Kata Sandi"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!visible}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="current-password"
              placeholder="Masukkan kata sandi akun"
              placeholderTextColor={colors.muted}
              style={[styles.input, { color: colors.text }]}
            />
            <Button
              variant="plain"
              accessibilityRole="button"
              accessibilityLabel={
                visible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
              }
              hitSlop={8}
              onPress={() => setVisible(!visible)}
            >
              <AppText style={{ color: green, fontSize: 12 }}>
                {visible ? "Tutup" : "Lihat"}
              </AppText>
            </Button>
          </AppView>
        </AppView>

        <AppView style={styles.row}>
          <Button
            variant="plain"
            accessibilityRole="checkbox"
            accessibilityState={{ checked: remember }}
            onPress={() => setRemember(!remember)}
            style={styles.checkRow}
          >
            <AppView
              style={[
                styles.checkbox,
                {
                  backgroundColor: remember ? green : soft,
                  borderColor: green,
                },
              ]}
            >
              {remember && (
                <AppIcon name="check" size={18} color={colors.background} />
              )}
            </AppView>
            <AppText color="muted">Ingat Saya</AppText>
          </Button>
          <AppText
            style={[
              styles.activeBadge,
              { color: green, backgroundColor: colors.accentSoft },
            ]}
          >
            ● Klinik Aktif
          </AppText>
        </AppView>

        <Button
          title={loading ? "Sedang masuk..." : "Masuk Sekarang   →"}
          style={[styles.submit, { backgroundColor: green }]}
          onPress={handleLogin}
          disabled={loading}
        />
      </Card>

      {message ? (
        <AppText
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          style={styles.center}
        >
          {message}
        </AppText>
      ) : null}

      <AppView style={styles.alt}>
        <Button
          title="◎  Masuk Cepat dengan Sidik Jari / Face ID"
          variant="outline"
          style={[styles.biometric, { backgroundColor: soft }]}
          onPress={() => unavailable("Masuk dengan biometrik")}
        />
        <AppView style={styles.divider}>
          <AppView style={[styles.line, { backgroundColor: colors.border }]} />
          <AppText color="muted">atau masuk dengan</AppText>
          <AppView style={[styles.line, { backgroundColor: colors.border }]} />
        </AppView>
        <AppView style={styles.socialRow}>
          <Button
            title="G   Google"
            variant="outline"
            style={[styles.social, { backgroundColor: colors.surfaceRaised }]}
            onPress={() => unavailable("Masuk dengan Google")}
          />
          <Button
            title="Apple ID"
            variant="outline"
            style={[styles.social, { backgroundColor: colors.surfaceRaised }]}
            onPress={() => unavailable("Masuk dengan Apple ID")}
          />
        </AppView>
      </AppView>

      <AppView style={styles.footer}>
        <AppText color="muted">Belum punya akun PawCare?</AppText>
        <Button
          variant="plain"
          accessibilityRole="link"
          onPress={() => router.replace("/auth/register")}
        >
          <AppText style={[styles.link, { color: green }]}>
            Daftar Sekarang ›
          </AppText>
        </Button>
      </AppView>

      <Card style={[styles.privacy, { backgroundColor: soft }]}>
        <AppView
          style={[styles.shield, { backgroundColor: colors.accentSoft }]}
        >
          <AppIcon name="shield" size={25} color={green} />
        </AppView>
        <AppView style={styles.flex}>
          <AppText style={styles.smallBold}>
            Privasi & Rekam Medis Terjamin
          </AppText>
          <AppText color="muted" variant="caption">
            Data medis & privasi peliharaan Anda terlindungi dengan enkripsi
            standar veteriner internasional.
          </AppText>
        </AppView>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  page: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 32,
    gap: 20,
  },
  hero: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 24,
    padding: 16,
    gap: 16,
  },
  logoTile: {
    width: 88,
    height: 88,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  heroText: { flex: 1, minWidth: 0, gap: 6, alignItems: "flex-start" },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pillText: { fontFamily: Fonts.bold, fontSize: 12 },
  welcomeTitle: { fontFamily: Fonts.bold, fontSize: 20, lineHeight: 26 },
  center: { textAlign: "center" },
  form: { borderWidth: 0, borderRadius: 24, padding: 20, gap: 18 },
  field: { gap: 8 },
  label: { fontFamily: Fonts.bold, fontSize: 16 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 15,
    gap: 10,
    minHeight: 58,
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 16,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    minHeight: 44,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeBadge: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    overflow: "hidden",
    fontFamily: Fonts.bold,
    fontSize: 12,
  },
  submit: { borderRadius: 32, minHeight: 58, borderWidth: 0 },
  alt: { gap: 16 },
  biometric: { borderWidth: 0, borderRadius: 16, minHeight: 54 },
  divider: { flexDirection: "row", alignItems: "center", gap: 14 },
  line: { height: 1, flex: 1, opacity: 0.5 },
  socialRow: { flexDirection: "row", gap: 12 },
  social: { flex: 1, borderWidth: 0, borderRadius: 30, minHeight: 56 },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  link: { fontFamily: Fonts.bold, paddingVertical: 8 },
  privacy: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 22,
    padding: 16,
    gap: 14,
  },
  shield: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  smallBold: { fontFamily: Fonts.bold, fontSize: 14 },
});
