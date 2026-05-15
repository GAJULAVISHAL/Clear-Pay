import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { randomBytes, scrypt } from "node:crypto";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

type SeedUser = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  emailVerified: boolean;
  phoneNumberVerified: boolean;
  balance: {
    amount: number;
    locked: number;
  };
  onRampTransactions: Array<{
    token: string;
    provider: string;
    amount: number;
    status: "Success" | "failure" | "Processing";
  }>;
};

const seedUsers: SeedUser[] = [
  {
    id: "user_alice",
    name: "alice",
    email: "alice@example.com",
    phoneNumber: "9999999999",
    password: "alice1234",
    emailVerified: true,
    phoneNumberVerified: true,
    balance: {
      amount: 20000,
      locked: 0,
    },
    onRampTransactions: [
      {
        token: "122",
        provider: "HDFC Bank",
        amount: 20000,
        status: "Success",
      },
    ],
  },
  {
    id: "user_bob",
    name: "bob",
    email: "bob@example.com",
    phoneNumber: "9999999998",
    password: "bob12345",
    emailVerified: true,
    phoneNumberVerified: true,
    balance: {
      amount: 2000,
      locked: 0,
    },
    onRampTransactions: [
      {
        token: "123",
        provider: "HDFC Bank",
        amount: 2000,
        status: "failure",
      },
    ],
  },
];

const passwordConfig = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64,
};

function generatePasswordKey(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(
      password.normalize("NFKC"),
      salt,
      passwordConfig.dkLen,
      {
        N: passwordConfig.N,
        r: passwordConfig.r,
        p: passwordConfig.p,
        maxmem: 128 * passwordConfig.N * passwordConfig.r * 2,
      },
      (error, key) => {
        if (error) reject(error);
        else resolve(key as Buffer);
      },
    );
  });
}

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const key = await generatePasswordKey(password, salt);
  return `${salt}:${key.toString("hex")}`;
}

async function upsertUserWithRelations(user: SeedUser) {
  const upserted = await prisma.user.upsert({
    where: { phoneNumber: user.phoneNumber },
    update: {
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      phoneNumberVerified: user.phoneNumberVerified,
    },
    create: {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      emailVerified: user.emailVerified,
      phoneNumberVerified: user.phoneNumberVerified,
    },
  });

  const passwordHash = await hashPassword(user.password);

  await prisma.account.upsert({
    where: { id: `cred_${user.id}` },
    update: {
      providerId: "credential",
      accountId: user.id,
      password: passwordHash,
    },
    create: {
      id: `cred_${user.id}`,
      userId: upserted.id,
      providerId: "credential",
      accountId: user.id,
      password: passwordHash,
    },
  });

  const existingBalance = await prisma.balance.findFirst({
    where: { userId: upserted.id },
  });

  if (existingBalance) {
    await prisma.balance.update({
      where: { id: existingBalance.id },
      data: {
        amount: user.balance.amount,
        locked: user.balance.locked,
      },
    });

  } else {
    await prisma.balance.create({
      data: {
        userId: upserted.id,
        amount: user.balance.amount,
        locked: user.balance.locked,
      },
    });
  }

  await prisma.onRampTransaction.createMany({
    data: user.onRampTransactions.map((txn) => ({
      token: txn.token,
      provider: txn.provider,
      amount: txn.amount,
      status: txn.status,
      startTime: new Date(),
      userId: upserted.id,
    })),
    skipDuplicates: true,
  });

  return upserted;
}

async function main() {
  for (const user of seedUsers) {
    await upsertUserWithRelations(user);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
