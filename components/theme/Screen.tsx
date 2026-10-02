import {
  ScrollView,
  StyleSheet,
  type ScrollViewProps,
} from "react-native";

import {
  SafeAreaView,
  type Edge,
} from "react-native-safe-area-context";

import { useTheme } from "../../providers/ThemeProvider";
import { ThemedStatusBar } from "./ThemedStatusBar";

type Props = ScrollViewProps & {
  edges?: Edge[];
};

export function Screen({
  edges = ["left", "right", "bottom"],
  style,
  contentContainerStyle,
  ...props
}: Props) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      edges={edges}
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <ThemedStatusBar />
      <ScrollView
        {...props}
        keyboardShouldPersistTaps="handled"
        style={[
          styles.scrollView,
          style,
        ]}
        contentContainerStyle={[
          styles.content,
          contentContainerStyle,
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    padding: 20,
  },
});
