import { BloodType } from "@/types";

const COMPATIBILITY_MAP: Record<BloodType, BloodType[]> = {
  [BloodType.O_NEGATIVE]: [
    BloodType.O_NEGATIVE,
    BloodType.O_POSITIVE,
    BloodType.A_NEGATIVE,
    BloodType.A_POSITIVE,
    BloodType.B_NEGATIVE,
    BloodType.B_POSITIVE,
    BloodType.AB_NEGATIVE,
    BloodType.AB_POSITIVE,
  ],
  [BloodType.O_POSITIVE]: [
    BloodType.O_POSITIVE,
    BloodType.A_POSITIVE,
    BloodType.B_POSITIVE,
    BloodType.AB_POSITIVE,
  ],
  [BloodType.A_NEGATIVE]: [
    BloodType.A_NEGATIVE,
    BloodType.A_POSITIVE,
    BloodType.AB_NEGATIVE,
    BloodType.AB_POSITIVE,
  ],
  [BloodType.A_POSITIVE]: [BloodType.A_POSITIVE, BloodType.AB_POSITIVE],
  [BloodType.B_NEGATIVE]: [
    BloodType.B_NEGATIVE,
    BloodType.B_POSITIVE,
    BloodType.AB_NEGATIVE,
    BloodType.AB_POSITIVE,
  ],
  [BloodType.B_POSITIVE]: [BloodType.B_POSITIVE, BloodType.AB_POSITIVE],
  [BloodType.AB_NEGATIVE]: [BloodType.AB_NEGATIVE, BloodType.AB_POSITIVE],
  [BloodType.AB_POSITIVE]: [BloodType.AB_POSITIVE],
};

export function getCompatibleRecipients(donorType: BloodType): BloodType[] {
  return COMPATIBILITY_MAP[donorType] ?? [];
}

export function getCompatibleDonors(recipientType: BloodType): BloodType[] {
  return (Object.entries(COMPATIBILITY_MAP) as [BloodType, BloodType[]][])
    .filter(([, recipients]) => recipients.includes(recipientType))
    .map(([type]) => type);
}

export function isCompatible(
  donorType: BloodType,
  recipientType: BloodType
): boolean {
  return COMPATIBILITY_MAP[donorType]?.includes(recipientType) ?? false;
}
