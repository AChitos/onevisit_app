'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { generateQRCodeDataURL, generateRegistrationURL } from "@/lib/qr-code"

export default function NewQRCodePage() {
  const [name, setName] = useState('')
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [registrationURL, setRegistrationURL] = useState('')

  const handleGenerateQR = async () => {
    if (!name.trim()) return

    setIsGenerating(true)
    try {
      // Generate a temporary ID for demo purposes
      const tempId = Math.random().toString(36).substr(2, 9)
      const url = generateRegistrationURL(tempId)
      setRegistrationURL(url)
      
      const qrDataURL = await generateQRCodeDataURL(url)
      setQrCodeDataURL(qrDataURL)
    } catch (error) {
      console.error('Error generating QR code:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!qrCodeDataURL) return

    const link = document.createElement('a')
    link.href = qrCodeDataURL
    link.download = `${name.replace(/\s+/g, '_')}_qr_code.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
              onClick={handleGenerateQR}
              disabled={!name.trim() || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>Generating...</>
              ) : (
                <>
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Code
                </>
              )}
            </Button>
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
            {qrCodeDataURL ? (
              <div className="text-center space-y-4">
                <div className="inline-block p-4 bg-white rounded-lg shadow-sm border">
                  <img 
                    src={qrCodeDataURL} 
                    alt="Generated QR Code"
                    className="w-48 h-48 mx-auto"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{name}</h3>
                  <p className="text-sm text-gray-500 break-all mt-1">
                    {registrationURL}
                  </p>
                </div>
                <Button onClick={handleDownload} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <QrCode className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-500">
                  Enter a name and click "Generate QR Code" to create your QR code
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {qrCodeDataURL && (
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
