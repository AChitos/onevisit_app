import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateQRCodeDataURL } from '@/lib/qr-code'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get('businessId')

    let whereClause: any = {}
    if (businessId) {
      whereClause.businessId = businessId
    }

    const qrCodes = await prisma.qRCode.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    })

    // Generate QR code images for each QR code
    const qrCodesWithImages = await Promise.all(
      qrCodes.map(async (qrCode) => {
        const qrCodeDataUrl = await generateQRCodeDataURL(qrCode.url)
        return {
          id: qrCode.id,
          name: qrCode.name,
          scans: qrCode.scans,
          qrCodeUrl: qrCodeDataUrl,
          createdAt: qrCode.createdAt.toISOString(),
          isActive: qrCode.isActive,
          url: qrCode.url
        }
      })
    )

    return NextResponse.json(qrCodesWithImages)
  } catch (error) {
    console.error('QR codes fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch QR codes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, businessId } = body

    if (!name || !businessId) {
      return NextResponse.json(
        { error: 'Name and business ID are required' },
        { status: 400 }
      )
    }

    const qrCode = await prisma.qRCode.create({
      data: {
        name,
        businessId,
        url: '', // Will be updated below
        scans: 0,
      }
    })

    const registrationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/register/${qrCode.id}`
    const qrCodeDataUrl = await generateQRCodeDataURL(registrationUrl)

    const updatedQrCode = await prisma.qRCode.update({
      where: { id: qrCode.id },
      data: { url: registrationUrl }
    })

    return NextResponse.json({
      success: true,
      qrCode: {
        ...updatedQrCode,
        qrCodeData: qrCodeDataUrl
      },
      registrationUrl
    })
  } catch (error) {
    console.error('QR code creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create QR code' },
      { status: 500 }
    )
  }
}
