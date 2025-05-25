import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get('businessId')

    if (!businessId) {
      return NextResponse.json(
        { error: 'Business ID is required' },
        { status: 400 }
      )
    }

    const customers = await prisma.customer.findMany({
      where: { businessId },
      orderBy: { registeredAt: 'desc' },
    })

    return NextResponse.json(customers)
  } catch (error) {
    console.error('Customers fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      businessId,
      whatsappOptIn = false,
      smsOptIn = false,
      emailOptIn = false,
      qrCodeId 
    } = body

    if (!firstName || !businessId) {
      return NextResponse.json(
        { error: 'First name and business ID are required' },
        { status: 400 }
      )
    }

    // Check if customer already exists with this email for this business
    if (email) {
      const existingCustomer = await prisma.customer.findUnique({
        where: {
          email_businessId: {
            email,
            businessId
          }
        }
      })

      if (existingCustomer) {
        return NextResponse.json(
          { error: 'Customer with this email already exists' },
          { status: 409 }
        )
      }
    }

    const customer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        businessId,
        whatsappOptIn,
        smsOptIn,
        emailOptIn,
      }
    })

    // If this registration came from a QR code, increment its scan count
    if (qrCodeId) {
      await prisma.qRCode.update({
        where: { id: qrCodeId },
        data: { scans: { increment: 1 } }
      })
    }

    return NextResponse.json({
      success: true,
      customer
    })
  } catch (error) {
    console.error('Customer creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    )
  }
}