import { StyleSheet, Text, View } from "react-native";

export default function RequestsTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitudes</Text>
      <Text style={styles.subtitle}>
        Aquí se mostrarán las solicitudes de sangre de hospitales y receptores.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.6,
  },
});
