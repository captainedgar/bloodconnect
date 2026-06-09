import { prisma } from "@/config/prisma";
import type { UserResponse } from "@/types";

export async function getUserById(userId: string): Promise<UserResponse | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    bloodType: user.bloodType as UserResponse["bloodType"],
    role: user.role as UserResponse["role"],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
