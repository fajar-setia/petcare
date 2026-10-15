import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  type ScrollViewProps,
} from "react-native";

import {
  SafeAreaView,
  type Edge,
} from "react-native-safe-area-context";

import { useTheme } from "../../providers/ThemeProvider";

type Props = ScrollViewProps & {
  edges?: Edge[];
  avoidKeyboard?: boolean;
};

export function Screen({
  edges = ["left", "right", "bottom"],
  avoidKeyboard = false,
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
      <KeyboardAvoidingView
        style={styles.scrollView}
        enabled={avoidKeyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
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
      </KeyboardAvoidingView>
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
