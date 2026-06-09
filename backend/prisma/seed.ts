import { PrismaClient, BloodType } from "@prisma/client";

const prisma = new PrismaClient();

const HOSPITALS = [
  {
    name: "Hospital General de México",
    address: "Dr. Balmis 148, Doctores, Cuauhtémoc, CDMX",
    latitude: 19.4195,
    longitude: -99.1515,
    phone: "+52 55 5626 4500",
    email: "contacto@hgm.salud.gob.mx",
  },
  {
    name: "Hospital ABC Observatorio",
    address: "Av. Observatorio 154, Las Américas, Álvaro Obregón, CDMX",
    latitude: 19.3990,
    longitude: -99.2005,
    phone: "+52 55 5230 8000",
    email: "info@hospitalabc.com",
  },
  {
    name: "Hospital Ángeles del Pedregal",
    address: "Camino a Santa Teresa 1055, Héroes de Padierna, CDMX",
    latitude: 19.3015,
    longitude: -99.2145,
    phone: "+52 55 5449 5000",
    email: "informes@hospitalangeles.mx",
  },
  {
    name: "Instituto Nacional de Cardiología",
    address: "Juan Badiano 1, Sección XVI, Tlalpan, CDMX",
    latitude: 19.2875,
    longitude: -99.1510,
    phone: "+52 55 5573 2911",
    email: "contacto@cardiologia.org.mx",
  },
  {
    name: "Hospital Médica Sur",
    address: "Puente de Piedra 150, Toriello Guerra, Tlalpan, CDMX",
    latitude: 19.3010,
    longitude: -99.1480,
    phone: "+52 55 5424 7200",
    email: "contacto@medicasur.org.mx",
  },
];

const BLOOD_BANKS = [
  {
    name: "Banco Central de Sangre CDMX",
    address: "Av. Cuauhtémoc 330, Doctores, Cuauhtémoc, CDMX",
    latitude: 19.4130,
    longitude: -99.1550,
    phone: "+52 55 5588 1234",
    email: "bancocentral@salud.gob.mx",
    hospitalIndex: 0,
  },
  {
    name: "Centro de Transfusiones ABC",
    address: "Av. Observatorio 154, Las Américas, Álvaro Obregón, CDMX",
    latitude: 19.3992,
    longitude: -99.2010,
    phone: "+52 55 5230 8100",
    email: "transfusion@hospitalabc.com",
    hospitalIndex: 1,
  },
  {
    name: "Banco de Sangre Ángeles",
    address: "Camino a Santa Teresa 1055, Héroes de Padierna, CDMX",
    latitude: 19.3018,
    longitude: -99.2150,
    phone: "+52 55 5449 5100",
    email: "sangre@hospitalangeles.mx",
    hospitalIndex: 2,
  },
  {
    name: "Banco de Sangre INCardiología",
    address: "Juan Badiano 1, Sección XVI, Tlalpan, CDMX",
    latitude: 19.2878,
    longitude: -99.1515,
    phone: "+52 55 5573 2912",
    email: "banco@cardiologia.org.mx",
    hospitalIndex: 3,
  },
  {
    name: "Centro de Donación Médica Sur",
    address: "Puente de Piedra 150, Toriello Guerra, Tlalpan, CDMX",
    latitude: 19.3012,
    longitude: -99.1485,
    phone: "+52 55 5424 7300",
    email: "donacion@medicasur.org.mx",
    hospitalIndex: 4,
  },
  {
    name: "Banco de Sangre Independiente Coyoacán",
    address: "Av. Universidad 1700, Coyoacán, CDMX",
    latitude: 19.3370,
    longitude: -99.1870,
    phone: "+52 55 5554 4321",
    email: "info@bancosangrecoyo.org",
    hospitalIndex: null,
  },
];

const BLOOD_TYPES = Object.values(BloodType);

function randomUnits(): number {
  return Math.floor(Math.random() * 50) + 5;
}

async function main() {
  console.log("Seeding database...");

  await prisma.appointment.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.bloodInventory.deleteMany();
  await prisma.bloodRequest.deleteMany();
  await prisma.bloodBank.deleteMany();
  await prisma.hospital.deleteMany();

  console.log("Cleared existing seed data.");

  const hospitals = [];
  for (const h of HOSPITALS) {
    const hospital = await prisma.hospital.create({ data: h });
    hospitals.push(hospital);
    console.log(`  Hospital: ${hospital.name}`);
  }

  const bloodBanks = [];
  for (const bb of BLOOD_BANKS) {
    const { hospitalIndex, ...rest } = bb;
    const hospitalId = hospitalIndex !== null ? hospitals[hospitalIndex].id : null;
    const bloodBank = await prisma.bloodBank.create({
      data: { ...rest, hospitalId },
    });
    bloodBanks.push(bloodBank);
    console.log(`  Blood Bank: ${bloodBank.name}`);
  }

  let inventoryCount = 0;
  for (const bank of bloodBanks) {
    for (const bloodType of BLOOD_TYPES) {
      await prisma.bloodInventory.create({
        data: {
          bloodBankId: bank.id,
          bloodType,
          units: randomUnits(),
        },
      });
      inventoryCount++;
    }
  }
  console.log(`  Created ${inventoryCount} inventory records.`);

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
