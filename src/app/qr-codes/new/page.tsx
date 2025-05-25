'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, ArrowLeft, Download, Save, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NewQRCodePage() {
  const router = useRouter()
  const businessId = 'demo-business-id' // Hardcoded for demo
  const [name, setName] = useState('')
  const [qrCodeData, setQrCodeData] = useState<any>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateQR = async () => {
    if (!name.trim()) {
      setError('Please enter a name for the QR code')
      return
    }

    setIsCreating(true)
    setError(null)
    
    try {
      const response = await fetch('/api/qr-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          businessId
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create QR code')
      }

      const data = await response.json()
      setQrCodeData(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDownload = () => {
    if (!qrCodeData?.qrCode?.qrCodeData) return

    const link = document.createElement('a')
    link.href = qrCodeData.qrCode.qrCodeData
    link.download = `${name.replace(/\s+/g, '_')}_qr_code.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSaveAndContinue = () => {
    router.push('/qr-codes')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/qr-codes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create QR Code</h1>
          <p className="text-gray-600 mt-2">
            Generate a QR code for customer registration
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>QR Code Details</CardTitle>
            <CardDescription>
              Enter the details for your new QR code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="name">QR Code Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Main Counter, Table 5, Front Door"
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                Give your QR code a descriptive name to help you identify it later
              </p>
            </div>

            <Button 
              onClick={handleCreateQR}
              disabled={!name.trim() || isCreating}
              className="w-full"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating QR Code...
                </>
              ) : (
                <>
                  <QrCode className="mr-2 h-4 w-4" />
                  Create QR Code
                </>
              )}
            </Button>

            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>QR Code Preview</CardTitle>
            <CardDescription>
              Your generated QR code will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {qrCodeData ? (
              <div className="text-center space-y-4">
                <div className="inline-block p-4 bg-white rounded-lg shadow-sm border">
                  <Image 
                    src={qrCodeData.qrCode.qrCodeData} 
                    alt="Generated QR Code"
                    width={192}
                    height={192}
                    className="w-48 h-48 mx-auto"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{name}</h3>
                  <p className="text-sm text-gray-500 break-all mt-1">
                    {qrCodeData.registrationUrl}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleDownload} variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                  </Button>
                  <Button onClick={handleSaveAndContinue} className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    Save & Continue
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <QrCode className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-500">
                  Enter a name and click "Create QR Code" to generate your QR code
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {qrCodeData && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Use Your QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-semibold mx-auto mb-3">
                  1
                </div>
                <h3 className="font-medium mb-2">Download & Print</h3>
                <p className="text-sm text-gray-600">
                  Download the QR code and print it on paper, tent cards, or stickers
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-semibold mx-auto mb-3">
                  2
                </div>
                <h3 className="font-medium mb-2">Place in Your Venue</h3>
                <p className="text-sm text-gray-600">
                  Position the QR code where customers can easily see and scan it
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-semibold mx-auto mb-3">
                  3
                </div>
                <h3 className="font-medium mb-2">Customers Register</h3>
                <p className="text-sm text-gray-600">
                  When customers scan the code, they'll be taken to a registration form
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
