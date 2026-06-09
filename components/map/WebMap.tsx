import { useState } from "react";
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocation } from "@/hooks/use-location";
import { useNearbyBloodBanks } from "@/hooks/use-blood-banks";
import { BLOOD_TYPE_LABELS, BloodType } from "@/types";

export default function WebMap() {
  const { location, loading: locationLoading, error: locationError } = useLocation();
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

  if (locationLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#E53935" />
        <Text style={styles.loadingText}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  if (locationError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{locationError}</Text>
        <Text style={styles.errorSubtext}>
          Activa la ubicación para ver bancos de sangre cercanos
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, !selectedBloodType && styles.filterButtonActive]}
          onPress={() => setSelectedBloodType(null)}
        >
          <Text style={[styles.filterText, !selectedBloodType && styles.filterTextActive]}>
            Todos
          </Text>
        </TouchableOpacity>
        {Object.values(BloodType).map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.filterButton, selectedBloodType === type && styles.filterButtonActive]}
            onPress={() => setSelectedBloodType(type)}
          >
            <Text style={[styles.filterText, selectedBloodType === type && styles.filterTextActive]}>
              {BLOOD_TYPE_LABELS[type]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {location && (
        <View style={styles.mapContainer}>
          <iframe
            title="Mapa de bancos de sangre"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: 12 }}
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.05},${location.latitude - 0.03},${location.longitude + 0.05},${location.latitude + 0.03}&layer=mapnik&marker=${location.latitude},${location.longitude}`}
          />
        </View>
      )}

      <View style={styles.banksList}>
        <Text style={styles.banksTitle}>
          Bancos de sangre cercanos ({bloodBanks?.length ?? 0})
        </Text>
        {bloodBanks?.map((bank) => (
          <TouchableOpacity
            key={bank.id}
            style={styles.bankCard}
            onPress={() => {
              const url = `https://www.google.com/maps/search/?api=1&query=${bank.latitude},${bank.longitude}`;
              Linking.openURL(url);
            }}
          >
            <View style={styles.bankHeader}>
              <Text style={styles.bankName}>{bank.name}</Text>
              <Text style={styles.bankDistance}>{bank.distance.toFixed(1)} km</Text>
            </View>
            <Text style={styles.bankAddress}>{bank.address}</Text>
            {bank.phone && (
              <Text style={styles.bankPhone}>{bank.phone}</Text>
            )}
            <View style={styles.inventoryRow}>
              {bank.inventory.map((inv) => (
                <View key={inv.id} style={styles.inventoryBadge}>
                  <Text style={styles.inventoryType}>{BLOOD_TYPE_LABELS[inv.bloodType]}</Text>
                  <Text
                    style={[
                      styles.inventoryUnits,
                      inv.units < 10 && styles.inventoryLow,
                      inv.units >= 10 && inv.units < 20 && styles.inventoryMedium,
                      inv.units >= 20 && styles.inventoryHigh,
                    ]}
                  >
                    {inv.units}
                  </Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
        {bloodBanks?.length === 0 && (
          <Text style={styles.noResults}>No se encontraron bancos de sangre cercanos</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  mapContainer: {
    height: 300,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E53935",
    textAlign: "center",
    marginTop: 24,
  },
  errorSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    backgroundColor: "#FFF",
    padding: 12,
    margin: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  filterButtonActive: {
    backgroundColor: "#E53935",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  filterTextActive: {
    color: "#FFF",
  },
  banksList: {
    padding: 16,
  },
  banksTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  bankCard: {
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  bankHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  bankDistance: {
    fontSize: 14,
    color: "#E53935",
    fontWeight: "600",
  },
  bankAddress: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  bankPhone: {
    fontSize: 13,
    color: "#0a7ea4",
    marginBottom: 8,
  },
  inventoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  inventoryBadge: {
    backgroundColor: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  inventoryType: {
    fontSize: 11,
    fontWeight: "600",
  },
  inventoryUnits: {
    fontSize: 13,
    fontWeight: "bold",
  },
  inventoryLow: {
    color: "#F44336",
  },
  inventoryMedium: {
    color: "#FFC107",
  },
  inventoryHigh: {
    color: "#4CAF50",
  },
  noResults: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 24,
  },
});
