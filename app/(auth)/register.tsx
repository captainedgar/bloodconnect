import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";
import { BloodType, BLOOD_TYPE_LABELS, UserRole, USER_ROLE_LABELS } from "@/types";
import { useAuthStore } from "@/store/auth-store";

const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  bloodType: z.nativeEnum(BloodType, { message: "Selecciona un tipo de sangre" }),
  role: z.nativeEnum(UserRole, { message: "Selecciona un rol" }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bloodType: BloodType.O_POSITIVE,
      role: UserRole.DONOR,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
      router.replace("/(tabs)");
    } catch (error: unknown) {
      const message =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
          : "Error al registrarse";
      Alert.alert("Error", message ?? "Error al registrarse");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>BloodConnect</Text>
        <Text style={styles.subtitle}>Crear Cuenta</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre completo</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Juan Pérez"
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                  autoComplete="name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!isLoading}
                />
              )}
            />
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="tu@email.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!isLoading}
                />
              )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Mínimo 8 caracteres"
                  placeholderTextColor="#999"
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!isLoading}
                />
              )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de sangre</Text>
            <Controller
              control={control}
              name="bloodType"
              render={({ field: { onChange, value } }) => (
                <View style={styles.optionsGrid}>
                  {Object.values(BloodType).map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[styles.option, value === type && styles.optionSelected]}
                      onPress={() => onChange(type)}
                      disabled={isLoading}
                    >
                      <Text
                        style={[styles.optionText, value === type && styles.optionTextSelected]}
                      >
                        {BLOOD_TYPE_LABELS[type]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
            {errors.bloodType && <Text style={styles.error}>{errors.bloodType.message}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Soy...</Text>
            <Controller
              control={control}
              name="role"
              render={({ field: { onChange, value } }) => (
                <View style={styles.optionsGrid}>
                  {Object.values(UserRole).map((role) => (
                    <TouchableOpacity
                      key={role}
                      style={[styles.option, styles.optionWide, value === role && styles.optionSelected]}
                      onPress={() => onChange(role)}
                      disabled={isLoading}
                    >
                      <Text
                        style={[styles.optionText, value === role && styles.optionTextSelected]}
                      >
                        {USER_ROLE_LABELS[role]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
            {errors.role && <Text style={styles.error}>{errors.role.message}</Text>}
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Registrarse</Text>
            )}
          </TouchableOpacity>

          <Link href="/(auth)/login" style={styles.link}>
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  content: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24, paddingTop: 60 },
  title: { fontSize: 36, fontWeight: "bold", color: "#E53935", marginBottom: 8 },
  subtitle: { fontSize: 20, marginBottom: 32, opacity: 0.7 },
  form: { width: "100%", maxWidth: 400 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  optionsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#F9F9F9",
  },
  optionWide: { flex: 1, alignItems: "center", minWidth: "45%" },
  optionSelected: { backgroundColor: "#E53935", borderColor: "#E53935" },
  optionText: { fontSize: 14, fontWeight: "500", color: "#333" },
  optionTextSelected: { color: "#FFF" },
  error: { color: "#E53935", fontSize: 12, marginTop: 4 },
  button: {
    backgroundColor: "#E53935",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "600" },
  link: { color: "#0a7ea4", fontSize: 14, textAlign: "center" },
});
