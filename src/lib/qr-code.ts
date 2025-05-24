import QRCode from 'qrcode'

export async function generateQRCodeDataURL(text: string): Promise<string> {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 256
    })
    return qrCodeDataURL
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw new Error('Failed to generate QR code')
  }
}

export function generateRegistrationURL(qrCodeId: string): string {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  return `${baseURL}/register/${qrCodeId}`
}
