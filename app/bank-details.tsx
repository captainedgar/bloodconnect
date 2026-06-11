import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors, Spacing, BorderRadius, FontSizes } from "@/constants/theme";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { BloodType, BLOOD_TYPE_LABELS } from "@/types";
import { useNearbyBloodBanks } from "@/hooks/use-blood-banks";
import { useLocation } from "@/hooks/use-location";

export default function BankDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { location } = useLocation();

  const { data: bloodBanks } = useNearbyBloodBanks(
    location
      ? {
          latitude: location.latitude,
          longitude: location.longitude,
          radius: 50,
        }
      : null
  );

  const bank = bloodBanks?.find((b) => b.id === id);

  if (!bank) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const getStockInfo = (units: number) => {
    if (units >= 20) return { label: "Good", color: Colors.success, percentage: 100 };
    if (units >= 10) return { label: "Low", color: Colors.warning, percentage: 50 };
    return { label: "Critical", color: Colors.danger, percentage: 25 };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bank Details</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.hospitalCard}>
          <View style={styles.hospitalImage}>
            <Ionicons name="business" size={48} color={Colors.light.icon} />
          </View>
          <Text style={styles.hospitalName}>{bank.name}</Text>
          <Text style={styles.hospitalAddress}>{bank.address}</Text>
          <View style={styles.hospitalMeta}>
            <Text style={styles.distance}>{bank.distance.toFixed(1)} km away</Text>
            <Badge label="Open Now" variant="success" />
          </View>
          <Text style={styles.hours}>Mon-Sat: 8:00 AM - 6:00 PM</Text>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Real-Time Inventory</Text>
          <Card style={styles.inventoryCard}>
            {Object.values(BloodType).map((type) => {
              const inventory = bank.inventory.find((inv) => inv.bloodType === type);
              const units = inventory?.units || 0;
              const { label, color, percentage } = getStockInfo(units);

              return (
                <View key={type} style={styles.inventoryRow}>
                  <View style={styles.inventoryLabel}>
                    <View style={[styles.bloodDot, { backgroundColor: color }]} />
                    <Text style={styles.bloodType}>{BLOOD_TYPE_LABELS[type]}</Text>
                  </View>
                  <View style={styles.progressContainer}>
                    <ProgressBar value={percentage} color={color} height={8} />
                  </View>
                  <Text style={styles.units}>{units} Units</Text>
                  <Text style={[styles.statusLabel, { color }]}>{label}</Text>
                </View>
              );
            })}
          </Card>
        </View>

        <View style={styles.actions}>
          <Button
            title="Get Directions"
            onPress={() => {}}
            size="lg"
            fullWidth
            icon={<Ionicons name="navigate" size={20} color="#FFFFFF" />}
          />
          <TouchableOpacity style={styles.callButton} onPress={() => {}}>
            <Ionicons name="call" size={20} color={Colors.primary} />
            <Text style={styles.callButtonText}>Call Hospital</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },
  loadingText: {
    fontSize: FontSizes.md,
    color: Colors.light.textSecondary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.light.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: "#FDECEC",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  hospitalCard: {
    padding: Spacing.lg,
  },
  hospitalImage: {
    width: "100%",
    height: 160,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.light.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  hospitalName: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  hospitalAddress: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.md,
  },
  hospitalMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  distance: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    color: Colors.primary,
  },
  hours: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Spacing.md,
  },
  inventoryCard: {
    padding: Spacing.md,
  },
  inventoryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  inventoryLabel: {
    flexDirection: "row",
    alignItems: "center",
    width: 60,
  },
  bloodDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: Spacing.sm,
  },
  bloodType: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    color: Colors.light.text,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: Spacing.sm,
  },
  units: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    width: 60,
    textAlign: "right",
  },
  statusLabel: {
    fontSize: FontSizes.xs,
    fontWeight: "600",
    width: 50,
    textAlign: "right",
  },
  actions: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  callButtonText: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.primary,
  },
});
