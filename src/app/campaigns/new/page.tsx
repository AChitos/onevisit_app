'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, Clock, MessageSquare, Mail, Phone, Users } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation'

interface CampaignFormData {
  name: string
  type: 'WHATSAPP' | 'EMAIL' | 'SMS'
  subject: string
  message: string
  scheduledAt: string
  sendNow: boolean
}

export default function NewCampaignPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    type: (typeParam?.toUpperCase() as 'WHATSAPP' | 'EMAIL' | 'SMS') || 'WHATSAPP',
    subject: '',
    message: '',
    scheduledAt: '',
    sendNow: true
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Mock recipient counts
  const recipientCounts = {
    WHATSAPP: 25,
    EMAIL: 18,
    SMS: 22
  }

  const handleInputChange = (field: keyof CampaignFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const campaignData = {
        businessId: 'demo-business-id', // Hardcoded for demo
        name: formData.name,
        type: formData.type,
        subject: formData.type === 'EMAIL' ? formData.subject : undefined,
        message: formData.message,
        scheduledAt: formData.sendNow ? undefined : formData.scheduledAt,
        status: formData.sendNow ? 'SENDING' : 'SCHEDULED'
      }

      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData),
      })

      if (!response.ok) {
        throw new Error('Failed to create campaign')
      }

      const result = await response.json()
      
      // If sending now, simulate a delay for sending process
      if (formData.sendNow) {
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
      
      router.push('/campaigns')
    } catch (error) {
      console.error('Campaign creation failed:', error)
      alert('Failed to create campaign. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCampaignTypeInfo = (type: string) => {
    switch (type) {
      case 'WHATSAPP':
        return {
          icon: <MessageSquare className="w-5 h-5 text-green-600" />,
          name: 'WhatsApp',
          description: 'Send instant messages to customers who opted in for WhatsApp',
          color: 'green',
          maxLength: 4096,
          showSubject: false
        }
      case 'EMAIL':
        return {
          icon: <Mail className="w-5 h-5 text-purple-600" />,
          name: 'Email',
          description: 'Send detailed newsletters to email subscribers',
          color: 'purple',
          maxLength: 10000,
          showSubject: true
        }
      case 'SMS':
        return {
          icon: <Phone className="w-5 h-5 text-blue-600" />,
          name: 'SMS',
          description: 'Send quick text messages to SMS subscribers',
          color: 'blue',
          maxLength: 160,
          showSubject: false
        }
      default:
        return {
          icon: <MessageSquare className="w-5 h-5" />,
          name: 'Message',
          description: '',
          color: 'gray',
          maxLength: 1000,
          showSubject: false
        }
    }
  }

  const typeInfo = getCampaignTypeInfo(formData.type)
  const remainingChars = typeInfo.maxLength - formData.message.length
  const recipientCount = recipientCounts[formData.type]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/campaigns">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Campaign</h1>
          <p className="text-gray-600 mt-2">
            Send targeted messages to your customers
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Campaign Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Type</CardTitle>
            <CardDescription>
              Choose how you want to reach your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['WHATSAPP', 'EMAIL', 'SMS'] as const).map((type) => {
                const info = getCampaignTypeInfo(type)
                const count = recipientCounts[type]
                const isSelected = formData.type === type
                
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleInputChange('type', type)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      isSelected 
                        ? `border-${info.color}-500 bg-${info.color}-50` 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {info.icon}
                      <span className="font-medium">{info.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{info.description}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{count} subscribers</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Campaign Details */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>
              Set up your campaign information and message
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Happy Hour Special, Weekend Brunch"
                className="mt-2"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Internal name to help you identify this campaign
              </p>
            </div>

            {typeInfo.showSubject && (
              <div>
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Enter email subject line..."
                  className="mt-2"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder={`Write your ${typeInfo.name.toLowerCase()} message here...`}
                className="mt-2 w-full min-h-[120px] p-3 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
                maxLength={typeInfo.maxLength}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>
                  {formData.type === 'SMS' && remainingChars < 0 && (
                    <span className="text-red-500">Message too long! </span>
                  )}
                  Characters: {formData.message.length}/{typeInfo.maxLength}
                </span>
                <span className={remainingChars < 0 ? 'text-red-500' : ''}>
                  Remaining: {remainingChars}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scheduling */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule Campaign</CardTitle>
            <CardDescription>
              Choose when to send your campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  checked={formData.sendNow}
                  onChange={() => handleInputChange('sendNow', true)}
                  className="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Send Now</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Campaign will be sent immediately after creation
                  </p>
                </div>
              </label>
              
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  checked={!formData.sendNow}
                  onChange={() => handleInputChange('sendNow', false)}
                  className="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="font-medium">Schedule for Later</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Choose a specific date and time to send
                  </p>
                  {!formData.sendNow && (
                    <div className="mt-2">
                      <Input
                        type="datetime-local"
                        value={formData.scheduledAt}
                        onChange={(e) => handleInputChange('scheduledAt', e.target.value)}
                        className="max-w-xs"
                        min={isMounted ? new Date().toISOString().slice(0, 16) : ''}
                        required={!formData.sendNow}
                      />
                    </div>
                  )}
                </div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {typeInfo.icon}
                  <span className="font-medium">{typeInfo.name}</span>
                </div>
                <p className="text-sm text-gray-600">Campaign Type</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">{recipientCount}</span>
                </div>
                <p className="text-sm text-gray-600">Recipients</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {formData.sendNow ? (
                    <Send className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-600" />
                  )}
                  <span className="font-medium">
                    {formData.sendNow ? 'Send Now' : 'Scheduled'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Delivery</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => router.push('/campaigns')}>
            Save as Draft
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !formData.name.trim() || !formData.message.trim() || remainingChars < 0}
            className="min-w-[140px]"
          >
            {isSubmitting ? (
              'Creating...'
            ) : formData.sendNow ? (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Campaign
              </>
            ) : (
              <>
                <Clock className="mr-2 h-4 w-4" />
                Schedule Campaign
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
