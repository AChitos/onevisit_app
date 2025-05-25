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

    const campaigns = await prisma.campaign.findMany({
      where: { businessId },
      orderBy: { createdAt: 'desc' },
      include: {
        sends: {
          select: {
            status: true
          }
        }
      }
    })

    // Add send statistics to each campaign
    const campaignsWithStats = campaigns.map(campaign => ({
      ...campaign,
      totalSends: campaign.sends.length,
      sentCount: campaign.sends.filter(send => send.status === 'SENT').length,
      deliveredCount: campaign.sends.filter(send => send.status === 'DELIVERED').length,
      failedCount: campaign.sends.filter(send => send.status === 'FAILED').length,
    }))

    return NextResponse.json(campaignsWithStats)
  } catch (error) {
    console.error('Campaigns fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      subject, 
      message, 
      type, 
      businessId,
      scheduledAt 
    } = body

    if (!name || !message || !type || !businessId) {
      return NextResponse.json(
        { error: 'Name, message, type, and business ID are required' },
        { status: 400 }
      )
    }

    const campaign = await prisma.campaign.create({
      data: {
        name,
        subject,
        message,
        type,
        businessId,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        status: scheduledAt ? 'SCHEDULED' : 'DRAFT'
      }
    })

    return NextResponse.json({
      success: true,
      campaign
    })
  } catch (error) {
    console.error('Campaign creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    )
  }
}
