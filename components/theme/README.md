# Komponen UI PawCare

Semua komponen mengikuti tema dari `providers/ThemeProvider.tsx`.
Warna diatur di `constants/color.ts`. Gunakan komponen ini di dalam halaman:

```tsx
import { AppText, AppView, Button, Card, Screen, Spacer } from '../../components/ui';

export default function ExamplePage() {
  return (
    <Screen>
      <AppText variant="title">Hewan saya</AppText>
      <Spacer size={24} />
      <Card>
        <AppText variant="subtitle">Milo</AppText>
        <AppText color="muted">Jadwal makan pukul 08.00</AppText>
      </Card>
      <Spacer />
      <AppView gap={12}>
        <Button title="Simpan" onPress={() => { /* aksi simpan */ }} />
        <Button title="Batal" variant="outline" onPress={() => { /* aksi batal */ }} />
      </AppView>
    </Screen>
  );
}
```

- `Screen`: halaman yang bisa di-scroll, padding 20, latar tema, dan safe area. Di dalam tab gunakan `edges={['left', 'right']}` karena header dan tab bar sudah menangani atas/bawah.
- `AppView`: pembungkus dengan `padding`, `gap`, `row`, dan `background="surface"` opsional.
- `AppText`: `variant` berupa `title`, `subtitle`, `body`, atau `caption`; `color` berupa `text`, `muted`, atau `accent`.
- `Spacer`: jarak vertikal default 16; gunakan `horizontal` untuk jarak horizontal.
- `Card`: kotak dengan padding, border, dan warna permukaan tema.
- `Button`: `variant` berupa `primary`, `secondary`, atau `outline`. Mendukung `disabled`.

`style` masih bisa digunakan untuk kebutuhan khusus. Font menggunakan font bawaan perangkat.
Pilihan tema ada di Profil: sistem, terang, atau gelap. Pilihan manual belum disimpan
ke penyimpanan perangkat; saat aplikasi dibuka ulang, tema kembali mengikuti sistem.

Routing: `app/index.tsx` adalah pembuka (`/`), `(dashboard)/home.tsx` adalah beranda
(`/home`), dan `(dashboard)/profile.tsx` adalah profil (`/profile`). Folder dalam kurung
hanya mengelompokkan layar. Gunakan `/(dashboard)/home` atau `/(dashboard)/profile`
saat navigasi supaya grup tujuan terlihat jelas di kode.
