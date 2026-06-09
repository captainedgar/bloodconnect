import "dotenv/config";
import app from "./app";
import { env } from "@/config/env";
import { prisma } from "@/config/prisma";

async function main() {
  try {
    await prisma.$connect();
    console.log("✓ Conectado a la base de datos");

    app.listen(env.PORT, () => {
      console.log(`✓ Servidor corriendo en http://localhost:${env.PORT}`);
      console.log(`✓ Ambiente: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

main();
