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

    // Get customer counts
    const totalCustomers = await prisma.customer.count({
      where: { businessId }
    })ssd

    const newCustomersThisMonth = await prisma.customer.count({
      where: {
        businessId,
        registeredAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    })

    // Get opt-in stats
    const whatsappOptIns = await prisma.customer.count({
      where: { businessId, whatsappOptIn: true }
    })

    const smsOptIns = await prisma.customer.count({
      where: { businessId, smsOptIn: true }
    })

    const emailOptIns = await prisma.customer.count({
      where: { businessId, emailOptIn: true }
    })

    // Get QR code stats
    const totalQRCodes = await prisma.qRCode.count({
      where: { businessId }
    })

    const totalScans = await prisma.qRCode.aggregate({
      where: { businessId },
      _sum: { scans: true }
    })

    // Get campaign stats
    const totalCampaigns = await prisma.campaign.count({
      where: { businessId }
    })

    const sentCampaigns = await prisma.campaign.count({
      where: { businessId, status: 'SENT' }
    })

    // Get recent customers
    const recentCustomers = await prisma.customer.findMany({
      where: { businessId },
      orderBy: { registeredAt: 'desc' },
      take: 5
    })

    return NextResponse.json({
      totalCustomers,
      newCustomersThisMonth,
      whatsappOptIns,
      smsOptIns,
      emailOptIns,
      totalQRCodes,
      totalScans: totalScans._sum.scans || 0,
      totalCampaigns,
      sentCampaigns,
      recentCustomers
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
