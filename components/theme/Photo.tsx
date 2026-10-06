import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { AppText } from "./AppText";
import { AppView } from "./AppView";
import { useTheme } from "../../providers/ThemeProvider";

type PhotoProps = {
  uri: string;
  label: string;
  wide?: boolean;
};

export function Photo(props: PhotoProps) {
  return <PhotoContent key={props.uri} {...props} />;
}

function PhotoContent({
  uri,
  label,
  wide = false,
}: PhotoProps) {
  const [failed, setFailed] = useState(false);
  const { colors } = useTheme();

  return (
    <AppView
      style={[
        wide ? styles.articlePhoto : styles.avatar,
        { backgroundColor: colors.accentSoft },
      ]}
    >
      {failed ? (
        <AppText variant="caption" style={styles.photoFallback}>
          {label}
        </AppText>
      ) : (
        <Image
          source={{ uri }}
          accessibilityLabel={label}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onError={() => setFailed(true)}
        />
      )}
    </AppView>
  );
}

const styles = StyleSheet.create({
  articlePhoto: {
    height: 118,
    overflow: "hidden",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  photoFallback: {
    fontSize: 12,
    textAlign: "center",
  },
});
