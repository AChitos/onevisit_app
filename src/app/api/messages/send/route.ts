import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { campaignId, businessId } = body

    if (!campaignId || !businessId) {
      return NextResponse.json(
        { error: 'Campaign ID and Business ID are required' },
        { status: 400 }
      )
    }

    // Get the campaign
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
      include: {
        business: true
      }
    })

    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      )
    }

    if (campaign.businessId !== businessId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Get eligible customers based on campaign type
    let whereClause = { businessId }
    
    switch (campaign.type) {
      case 'WHATSAPP':
        whereClause = { ...whereClause, whatsappOptIn: true }
        break
      case 'EMAIL':
        whereClause = { ...whereClause, emailOptIn: true }
        break
      case 'SMS':
        whereClause = { ...whereClause, smsOptIn: true }
        break
    }

    const eligibleCustomers = await prisma.customer.findMany({
      where: whereClause
    })

    // Simulate sending messages
    const deliveredCount = Math.floor(eligibleCustomers.length * 0.95) // 95% delivery rate simulation
    
    // Update campaign status
    const updatedCampaign = await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        status: 'SENT',
        sentAt: new Date(),
        recipientCount: eligibleCustomers.length,
        deliveredCount: deliveredCount
      }
    })

    // In a real application, this is where you would integrate with:
    // - WhatsApp Business API for WhatsApp messages
    // - Email service (SendGrid, Mailgun, etc.) for emails
    // - SMS service (Twilio, AWS SNS, etc.) for SMS
    
    console.log(`Simulated sending ${campaign.type} campaign "${campaign.name}" to ${eligibleCustomers.length} recipients`)

    return NextResponse.json({
      success: true,
      campaign: updatedCampaign,
      sentTo: eligibleCustomers.length,
      delivered: deliveredCount,
      message: 'Campaign sent successfully'
    })

  } catch (error) {
    console.error('Message sending error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
