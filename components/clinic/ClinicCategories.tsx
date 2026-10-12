import { Pressable,ScrollView, StyleSheet } from "react-native";
import { AppText } from "../theme";
import {
  categories,
  type ClinicCategory,
} from "../../constants/clinicData";
import {useTheme} from "../../providers/ThemeProvider";

type Props = {
  category: ClinicCategory;
  onChange: (category: ClinicCategory) => void;
};


export function ClinicCategories({
  category,
  onChange,
}: Props) {
  const {colors} = useTheme()
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categories}
      style={styles.bleed}
    >
      {categories.map((item) => (
        <Pressable
          key={item}
          accessibilityRole="button"
          accessibilityState={{ selected: category === item }}
          onPress={() => onChange(item)}
          style={[
            styles.category,
            {
              backgroundColor:
                category === item ? colors.primary : colors.surfaceRaised,
            },
          ]}
        >
          <AppText
            style={[
              styles.description,
              { color: category === item ? colors.onPrimary : colors.muted },
            ]}
          >
            {item}
          </AppText>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categories: { paddingHorizontal: 18, gap: 8 },
  bleed: { marginHorizontal: -18 },
  category: {
    minHeight: 34,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    justifyContent: "center",
  },
  description: { fontSize: 12, lineHeight: 18 },
})
