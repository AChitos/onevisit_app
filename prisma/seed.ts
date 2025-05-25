import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a demo business
  const business = await prisma.business.upsert({
    where: { id: 'demo-business-id' },
    update: {},
    create: {
      id: 'demo-business-id',
      name: 'OneVisit Demo Cafe',
      email: 'demo@onevisit.app',
      phone: '+1-555-123-4567',
      address: '123 Main St, Coffee City, CA 90210',
      description: 'A cozy neighborhood cafe serving the best coffee and pastries in town.',
    },
  })

  console.log('Created demo business:', business)

  // Create some sample customers
  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { 
        email_businessId: {
          email: 'john.doe@example.com',
          businessId: business.id
        }
      },
      update: {},
      create: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-001-0001',
        businessId: business.id,
        whatsappOptIn: true,
        smsOptIn: true,
        emailOptIn: true,
      },
    }),
    prisma.customer.upsert({
      where: { 
        email_businessId: {
          email: 'jane.smith@example.com',
          businessId: business.id
        }
      },
      update: {},
      create: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1-555-001-0002',
        businessId: business.id,
        whatsappOptIn: true,
        smsOptIn: false,
        emailOptIn: true,
      },
    }),
    prisma.customer.upsert({
      where: { 
        email_businessId: {
          email: 'bob.wilson@example.com',
          businessId: business.id
        }
      },
      update: {},
      create: {
        firstName: 'Bob',
        lastName: 'Wilson',
        email: 'bob.wilson@example.com',
        phone: '+1-555-001-0003',
        businessId: business.id,
        whatsappOptIn: false,
        smsOptIn: true,
        emailOptIn: true,
      },
    }),
  ])

  console.log('Created sample customers:', customers.length)

  // Create a sample QR code
  const qrCode = await prisma.qRCode.upsert({
    where: { id: 'demo-qr-main-counter' },
    update: {
      url: 'http://localhost:3001/register/demo-qr-main-counter',
    },
    create: {
      id: 'demo-qr-main-counter',
      name: 'Main Counter',
      // description: 'QR code for customer registration at the main counter',
      url: 'http://localhost:3001/register/demo-qr-main-counter',
      businessId: business.id,
      scans: 15,
    },
  })

  console.log('Created sample QR code:', qrCode)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
