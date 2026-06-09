import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "@/store/auth-store";
import { BLOOD_TYPE_LABELS, USER_ROLE_LABELS } from "@/types";

export default function ProfileTab() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: () => logout(),
      },
    ]);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>No hay usuario autenticado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tipo de sangre</Text>
            <Text style={styles.infoValue}>
              {BLOOD_TYPE_LABELS[user.bloodType]}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Rol</Text>
            <Text style={styles.infoValue}>
              {USER_ROLE_LABELS[user.role]}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: { color: "#FFF", fontSize: 32, fontWeight: "bold" },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  email: { fontSize: 14, color: "#666", marginBottom: 24 },
  infoRow: { flexDirection: "row", gap: 24 },
  infoItem: { alignItems: "center", flex: 1 },
  infoLabel: { fontSize: 12, color: "#999", marginBottom: 4 },
  infoValue: { fontSize: 18, fontWeight: "600", color: "#E53935" },
  logoutButton: {
    marginTop: 32,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E53935",
  },
  logoutText: { color: "#E53935", fontSize: 16, fontWeight: "600" },
  subtitle: { fontSize: 16, textAlign: "center", opacity: 0.6 },
});
