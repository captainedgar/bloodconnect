import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors, Spacing, BorderRadius, FontSizes, Shadows } from "@/constants/theme";
import { SearchBar } from "@/components/ui/search-bar";
import { BloodDropIcon } from "@/components/ui/blood-drop-icon";
import { BloodType, BLOOD_TYPE_LABELS } from "@/types";
import { useLocation } from "@/hooks/use-location";
import { useNearbyBloodBanks } from "@/hooks/use-blood-banks";

export default function MapScreen() {
  const router = useRouter();
  const { location } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState<BloodType | null>(null);

  const { data: bloodBanks } = useNearbyBloodBanks(
    location
      ? {
          latitude: location.latitude,
          longitude: location.longitude,
          radius: 50,
          bloodType: selectedBloodType ?? undefined,
        }
      : null
  );

  const getStockColor = (units: number) => {
    if (units >= 20) return Colors.success;
    if (units >= 10) return Colors.warning;
    return Colors.danger;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search location..."
          onFilterPress={() => {}}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterSection}
        contentContainerStyle={styles.filterContent}
      >
        <TouchableOpacity
          style={[
            styles.filterChip,
            !selectedBloodType && styles.filterChipActive,
          ]}
          onPress={() => setSelectedBloodType(null)}
        >
          <Text
            style={[
              styles.filterChipText,
              !selectedBloodType && styles.filterChipTextActive,
            ]}
          >
            All Types
          </Text>
        </TouchableOpacity>
        {Object.values(BloodType).map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterChip,
              selectedBloodType === type && styles.filterChipActive,
            ]}
            onPress={() => setSelectedBloodType(type)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedBloodType === type && styles.filterChipTextActive,
              ]}
            >
              {BLOOD_TYPE_LABELS[type]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.mapPlaceholder}>
        {Platform.OS === "web" ? (
          <Text style={styles.mapText}>Map View (Web)</Text>
        ) : (
          <Text style={styles.mapText}>Map View (Native)</Text>
        )}
        {bloodBanks && bloodBanks.length > 0 && (
          <View style={styles.pinsPreview}>
            {bloodBanks.slice(0, 5).map((bank) => {
              const totalUnits = bank.inventory.reduce((sum, inv) => sum + inv.units, 0);
              const color = getStockColor(totalUnits / bank.inventory.length);
              return (
                <TouchableOpacity
                  key={bank.id}
                  style={styles.pinPreview}
                  onPress={() => router.push(`/bank-details?id=${bank.id}`)}
                >
                  <BloodDropIcon
                    label={bank.name.substring(0, 3)}
                    color={color}
                    size="sm"
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.danger }]} />
          <Text style={styles.legendText}>Low Stock</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.success }]} />
          <Text style={styles.legendText}>Good Stock</Text>
        </View>
      </View>

      {bloodBanks && bloodBanks.length > 0 && (
        <ScrollView style={styles.banksList} showsVerticalScrollIndicator={false}>
          {bloodBanks.slice(0, 3).map((bank) => {
            const totalUnits = bank.inventory.reduce((sum, inv) => sum + inv.units, 0);
            const avgUnits = totalUnits / bank.inventory.length;
            const statusColor = getStockColor(avgUnits);
            const statusLabel = avgUnits >= 20 ? "Good Stock" : avgUnits >= 10 ? "Low Stock" : "Critical";

            return (
              <TouchableOpacity
                key={bank.id}
                style={styles.bankCard}
                onPress={() => router.push(`/bank-details?id=${bank.id}`)}
                activeOpacity={0.8}
              >
                <View style={styles.bankCardHeader}>
                  <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                  <Text style={styles.bankName} numberOfLines={1}>
                    {bank.name}
                  </Text>
                </View>
                <Text style={styles.bankAddress} numberOfLines={1}>
                  {bank.address}
                </Text>
                <View style={styles.bankCardFooter}>
                  <Text style={styles.bankDistance}>
                    {bank.distance.toFixed(1)} km away
                  </Text>
                  <Text style={[styles.bankStatus, { color: statusColor }]}>
                    {statusLabel}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  searchSection: {
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  filterSection: {
    maxHeight: 56,
  },
  filterContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: FontSizes.sm,
    fontWeight: "500",
    color: Colors.light.textSecondary,
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  mapPlaceholder: {
    flex: 1,
    margin: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: "#E8F4F8",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  mapText: {
    fontSize: FontSizes.lg,
    color: Colors.light.textSecondary,
  },
  pinsPreview: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  pinPreview: {
    alignItems: "center",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.light.surfaceElevated,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: FontSizes.xs,
    color: Colors.light.textSecondary,
  },
  banksList: {
    maxHeight: 200,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  bankCard: {
    backgroundColor: Colors.light.surfaceElevated,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  bankCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bankName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.light.text,
    flex: 1,
  },
  bankAddress: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.sm,
  },
  bankCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bankDistance: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
  },
  bankStatus: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
  },
});
