'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, MessageSquare, Mail, Phone, Calendar, Check } from "lucide-react"
import { useRouter } from 'next/navigation'

interface RegistrationFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  birthday: string
  whatsappOptIn: boolean
  smsOptIn: boolean
  emailOptIn: boolean
}

export default function CustomerRegistrationPage({ 
  params 
}: { 
  params: { qrCodeId: string } 
}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthday: '',
    whatsappOptIn: false,
    smsOptIn: false,
    emailOptIn: false
  })

  const handleInputChange = (field: keyof RegistrationFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          businessId: 'demo-business-id', // Hardcoded for demo
          qrCodeId: params.qrCodeId
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to register')
      }

      setIsSuccess(true)
      
      // Redirect to thank you page after 3 seconds
      setTimeout(() => {
        router.push('/')
      }, 3000)
    } catch (error) {
      console.error('Registration error:', error)
      alert(error instanceof Error ? error.message : 'Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Our Community! 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for joining us! You'll receive special offers and updates based on your preferences.
            </p>
            <div className="text-sm text-gray-500">
              This window will close automatically...
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl">Join Our Community!</CardTitle>
          <CardDescription className="text-base">
            Get exclusive offers, event updates, and special promotions delivered right to you
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Your first name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Your last name"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="birthday">Birthday (Optional)</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => handleInputChange('birthday', e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  We'll send you a special birthday surprise! 🎂
                </p>
              </div>
            </div>

            {/* Communication Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">How would you like to hear from us?</h3>
              <p className="text-sm text-gray-600">
                Choose how you'd like to receive our special offers and updates. You can change these preferences anytime.
              </p>
              
              <div className="space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.whatsappOptIn}
                    onChange={(e) => handleInputChange('whatsappOptIn', e.target.checked)}
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                      <span className="font-medium">WhatsApp Messages</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Get instant notifications about daily specials and exclusive offers
                    </p>
                  </div>
                </label>
                
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.smsOptIn}
                    onChange={(e) => handleInputChange('smsOptIn', e.target.checked)}
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">SMS Text Messages</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Receive quick updates and time-sensitive offers via text
                    </p>
                  </div>
                </label>
                
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.emailOptIn}
                    onChange={(e) => handleInputChange('emailOptIn', e.target.checked)}
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">Email Updates</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Get detailed newsletters with events, menu updates, and special promotions
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !formData.firstName.trim()}
              className="w-full h-12 text-base"
            >
              {isSubmitting ? (
                <>Joining...</>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Join Our Community
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By joining, you agree to receive communications based on your preferences. 
              You can unsubscribe at any time. We respect your privacy and will never share your information.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
