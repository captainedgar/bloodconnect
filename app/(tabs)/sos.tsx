import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, BorderRadius, FontSizes, Shadows } from "@/constants/theme";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UrgentRequest {
  id: string;
  bloodType: string;
  hospital: string;
  units: number;
  timeAgo: string;
  distance: string;
}

const MOCK_REQUESTS: UrgentRequest[] = [
  {
    id: "1",
    bloodType: "O+",
    hospital: "City General Hospital",
    units: 4,
    timeAgo: "12 min ago",
    distance: "2.4 km",
  },
  {
    id: "2",
    bloodType: "A-",
    hospital: "St. Mary Medical Center",
    units: 2,
    timeAgo: "25 min ago",
    distance: "3.8 km",
  },
  {
    id: "3",
    bloodType: "B+",
    hospital: "Regional Blood Bank",
    units: 6,
    timeAgo: "45 min ago",
    distance: "5.1 km",
  },
];

export default function SOSScreen() {
  const [pulseAnim] = useState(new Animated.Value(1));
  const [isAlerting, setIsAlerting] = useState(false);

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleSOSPress = () => {
    setIsAlerting(!isAlerting);
    if (!isAlerting) {
      startPulse();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SOS Emergency</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color="#FFFFFF" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sosSection}>
          <Animated.View
            style={[
              styles.sosButtonOuter,
              { transform: [{ scale: isAlerting ? pulseAnim : 1 }] },
            ]}
          >
            <View style={styles.sosButtonRing}>
              <TouchableOpacity
                style={styles.sosButton}
                onPress={handleSOSPress}
                activeOpacity={0.8}
              >
                <Text style={styles.sosText}>SOS</Text>
                <Text style={styles.sosSubtext}>
                  {isAlerting ? "Alert Sent!" : "Tap to Alert"}
                </Text>
                <Text style={styles.sosSubtext}>Donors Near You</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        {isAlerting && (
          <Card dark style={styles.donorsCard}>
            <View style={styles.donorsHeader}>
              <Text style={styles.donorsCount}>23</Text>
              <Text style={styles.donorsText}>People are on their way!</Text>
            </View>
            <View style={styles.avatarsContainer}>
              {[1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={[styles.avatar, { marginLeft: i > 1 ? -12 : 0 }]}>
                  <Ionicons name="person-circle" size={36} color={`hsl(${i * 60}, 70%, 60%)`} />
                </View>
              ))}
              <View style={[styles.avatar, styles.avatarMore, { marginLeft: -12 }]}>
                <Text style={styles.avatarMoreText}>+18</Text>
              </View>
            </View>
          </Card>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Urgent Requests Near You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {MOCK_REQUESTS.map((request) => (
          <Card key={request.id} style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <View style={styles.bloodTypeBadge}>
                <Ionicons name="water" size={20} color="#FFFFFF" />
                <Text style={styles.bloodTypeText}>{request.bloodType}</Text>
              </View>
              <View style={styles.requestInfo}>
                <Text style={styles.hospitalName}>{request.hospital}</Text>
                <Text style={styles.timeAgo}>{request.timeAgo}</Text>
              </View>
            </View>
            <View style={styles.requestFooter}>
              <Text style={styles.unitsNeeded}>{request.units} Units Needed</Text>
              <View style={styles.requestMeta}>
                <Badge label="Urgent" variant="danger" />
                <Text style={styles.distance}>{request.distance}</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.sosBackground,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  notificationButton: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  sosSection: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
  },
  sosButtonOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(229, 43, 43, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  sosButtonRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(229, 43, 43, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  sosButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.lg,
  },
  sosText: {
    fontSize: FontSizes.xxl,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  sosSubtext: {
    fontSize: FontSizes.xs,
    color: "#FFFFFF",
    textAlign: "center",
  },
  donorsCard: {
    marginBottom: Spacing.md,
  },
  donorsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  donorsCount: {
    fontSize: FontSizes.xxl,
    fontWeight: "800",
    color: Colors.primary,
    marginRight: Spacing.sm,
  },
  donorsText: {
    fontSize: FontSizes.md,
    color: "#FFFFFF",
    flex: 1,
  },
  avatarsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    borderRadius: BorderRadius.full,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.sosSurface,
  },
  avatarMore: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.light.textSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarMoreText: {
    color: "#FFFFFF",
    fontSize: FontSizes.xs,
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  seeAll: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: "500",
  },
  requestCard: {
    marginBottom: Spacing.md,
  },
  requestHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  bloodTypeBadge: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  bloodTypeText: {
    color: "#FFFFFF",
    fontSize: FontSizes.sm,
    fontWeight: "700",
    marginTop: 2,
  },
  requestInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.light.text,
  },
  timeAgo: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  requestFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unitsNeeded: {
    fontSize: FontSizes.md,
    fontWeight: "700",
    color: Colors.danger,
  },
  requestMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  distance: {
    fontSize: FontSizes.sm,
    color: Colors.light.textSecondary,
  },
});
