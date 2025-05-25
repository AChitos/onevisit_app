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

    const business = await prisma.business.findUnique({
      where: { id: businessId }
    })

    if (!business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      business: {
        id: business.id,
        name: business.name,
        description: business.description,
        address: business.address,
        phone: business.phone,
        email: business.email,
        website: business.website,
        logo: business.logo,
        createdAt: business.createdAt,
        updatedAt: business.updatedAt
      }
    })

  } catch (error) {
    console.error('Business settings fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get('businessId')

    if (!businessId) {
      return NextResponse.json(
        { error: 'Business ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { name, description, address, phone, email, website, logo } = body

    const business = await prisma.business.update({
      where: { id: businessId },
      data: {
        name,
        description,
        address,
        phone,
        email,
        website,
        logo,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      business: {
        id: business.id,
        name: business.name,
        description: business.description,
        address: business.address,
        phone: business.phone,
        email: business.email,
        website: business.website,
        logo: business.logo,
        createdAt: business.createdAt,
        updatedAt: business.updatedAt
      }
    })

  } catch (error) {
    console.error('Business settings update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
