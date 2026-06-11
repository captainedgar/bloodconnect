import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors, Spacing, BorderRadius, FontSizes, Shadows } from "@/constants/theme";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BloodType, BLOOD_TYPE_LABELS } from "@/types";
import { useAuthStore } from "@/store/auth-store";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [selectedBloodType, setSelectedBloodType] = useState<BloodType | null>(
    user?.bloodType || null
  );

  const bloodTypes = Object.values(BloodType);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons name="water" size={32} color={Colors.primary} />
          </View>
          <View>
            <Text style={styles.logoText}>BloodConnect</Text>
            <Text style={styles.slogan}>Every Drop Makes a Difference</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Your Blood Type</Text>
        <View style={styles.bloodTypeGrid}>
          {bloodTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.bloodTypeButton,
                selectedBloodType === type && styles.bloodTypeButtonSelected,
              ]}
              onPress={() => setSelectedBloodType(type)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.bloodTypeText,
                  selectedBloodType === type && styles.bloodTypeTextSelected,
                ]}
              >
                {BLOOD_TYPE_LABELS[type]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.profileCard}
        onPress={() => router.push("/(tabs)/profile")}
        activeOpacity={0.8}
      >
        <View style={styles.profileIcon}>
          <Ionicons name="person" size={24} color={Colors.primary} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileTitle}>Complete Your Profile</Text>
          <Text style={styles.profileSubtitle}>
            Help us find the best matches for you
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.light.icon} />
      </TouchableOpacity>

      <View style={styles.statsSection}>
        <Card style={styles.statCard}>
          <Ionicons name="water" size={28} color={Colors.primary} />
          <Text style={styles.statNumber}>1,234</Text>
          <Text style={styles.statLabel}>Donations This Month</Text>
        </Card>
        <Card style={styles.statCard}>
          <Ionicons name="people" size={28} color={Colors.success} />
          <Text style={styles.statNumber}>567</Text>
          <Text style={styles.statLabel}>Active Donors</Text>
        </Card>
      </View>

      <View style={styles.ctaSection}>
        <Button
          title="Ready to Save Lives"
          onPress={() => router.push("/(tabs)/map")}
          size="lg"
          fullWidth
          icon={<Ionicons name="arrow-forward" size={20} color="#FFFFFF" />}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    backgroundColor: "#FDECEC",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    color: Colors.light.text,
  },
  slogan: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  bloodTypeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  bloodTypeButton: {
    flex: 1,
    minWidth: "22%",
    aspectRatio: 1,
    backgroundColor: Colors.light.surface,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  bloodTypeButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  bloodTypeText: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    color: Colors.light.text,
  },
  bloodTypeTextSelected: {
    color: "#FFFFFF",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surfaceElevated,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    ...Shadows.md,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: "#FDECEC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileTitle: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.light.text,
  },
  profileSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  statsSection: {
    flexDirection: "row",
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.lg,
  },
  statNumber: {
    fontSize: FontSizes.xxl,
    fontWeight: "800",
    color: Colors.light.text,
    marginTop: Spacing.sm,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
    marginTop: Spacing.xs,
    textAlign: "center",
  },
  ctaSection: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
});
