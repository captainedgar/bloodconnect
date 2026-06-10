import { useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocation } from "@/hooks/use-location";
import { useNearbyBloodBanks } from "@/hooks/use-blood-banks";
import { BLOOD_TYPE_LABELS, BloodType } from "@/types";
import type { NearbyBloodBank } from "@/types";

export default function MobileMap() {
  const { location, loading: locationLoading, error: locationError } = useLocation();
  const [selectedBank, setSelectedBank] = useState<NearbyBloodBank | null>(null);
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

  const handleDirections = (bank: NearbyBloodBank) => {
    const latLng = `${bank.latitude},${bank.longitude}`;
    const label = bank.name;
    const url = Platform.select({
      ios: `maps://0.0?q=${label}@${latLng}`,
      android: `geo:0,0?q=${latLng}(${label})`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const getStockLevel = (bank: NearbyBloodBank, bloodType?: BloodType): "high" | "medium" | "low" => {
    if (bloodType) {
      const inventory = bank.inventory.find((inv) => inv.bloodType === bloodType);
      if (!inventory) return "low";
      if (inventory.units >= 20) return "high";
      if (inventory.units >= 10) return "medium";
      return "low";
    }

    const totalUnits = bank.inventory.reduce((sum, inv) => sum + inv.units, 0);
    if (totalUnits >= 100) return "high";
    if (totalUnits >= 50) return "medium";
    return "low";
  };

  const getMarkerColor = (level: "high" | "medium" | "low"): string => {
    switch (level) {
      case "high":
        return "#4CAF50";
      case "medium":
        return "#FFC107";
      case "low":
        return "#F44336";
    }
  };

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
      {location && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation
          showsMyLocationButton
        >
          {bloodBanks?.map((bank) => {
            const stockLevel = getStockLevel(bank, selectedBloodType ?? undefined);
            const markerColor = getMarkerColor(stockLevel);

            return (
              <Marker
                key={bank.id}
                coordinate={{
                  latitude: bank.latitude,
                  longitude: bank.longitude,
                }}
                title={bank.name}
                description={bank.address}
                pinColor={markerColor}
                onPress={() => setSelectedBank(bank)}
              />
            );
          })}
        </MapView>
      )}

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

      {selectedBank && (
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>{selectedBank.name}</Text>
            <TouchableOpacity onPress={() => setSelectedBank(null)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sheetAddress}>{selectedBank.address}</Text>
          <Text style={styles.sheetDistance}>
            {selectedBank.distance.toFixed(1)} km de distancia
          </Text>

          <View style={styles.inventoryGrid}>
            {selectedBank.inventory.map((inv) => (
              <View key={inv.id} style={styles.inventoryItem}>
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

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDirections(selectedBank)}
            >
              <Text style={styles.actionButtonText}>Cómo llegar</Text>
            </TouchableOpacity>

            {selectedBank.phone && (
              <TouchableOpacity
                style={[styles.actionButton, styles.callButton]}
                onPress={() => handleCall(selectedBank.phone!)}
              >
                <Text style={styles.actionButtonText}>Llamar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 12,
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
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  closeButton: {
    fontSize: 24,
    color: "#999",
    padding: 8,
  },
  sheetAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  sheetDistance: {
    fontSize: 14,
    color: "#E53935",
    fontWeight: "600",
    marginBottom: 16,
  },
  inventoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  inventoryItem: {
    flex: 1,
    minWidth: "22%",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  inventoryType: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  inventoryUnits: {
    fontSize: 18,
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
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#E53935",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  callButton: {
    backgroundColor: "#4CAF50",
  },
  actionButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
