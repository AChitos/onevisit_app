'use client';

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, QrCode, TrendingUp, Calendar, Eye, Send, Clock, Loader2 } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalCustomers: number
  newCustomersThisMonth: number
  whatsappOptIns: number
  smsOptIns: number
  emailOptIns: number
  totalQRCodes: number
  totalScans: number
  totalCampaigns: number
  sentCampaigns: number
  recentCustomers: Array<{
    id: string
    firstName: string
    lastName: string
    email: string
    registeredAt: string
  }>
}

export default function DashboardPage() {
  const businessId = 'demo-business-id' // Hardcoded for demo
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(`/api/dashboard/stats?businessId=${businessId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats')
        }
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [businessId])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-red-500 mb-4">{error || 'Failed to load dashboard'}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Overview of your marketing performance and activity
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/campaigns/new">
            <Button>
              <Send className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newCustomersThisMonth} this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaigns Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sentCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalCampaigns} total campaigns
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QR Code Scans</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalScans}</div>
            <p className="text-xs text-muted-foreground">
              From {stats.totalQRCodes} QR codes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WhatsApp Opt-ins</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.whatsappOptIns}</div>
            <p className="text-xs text-muted-foreground">
              {stats.smsOptIns} SMS, {stats.emailOptIns} email
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Customers</CardTitle>
            <CardDescription>
              Latest customer registrations from QR code scans
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats.recentCustomers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No customers yet</h3>
                <p className="mt-1 text-sm text-gray-500">Customers will appear here when they register via QR codes.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {customer.firstName} {customer.lastName} registered
                      </p>
                      <p className="text-xs text-gray-500">
                        {customer.email} • {new Date(customer.registeredAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Campaign Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Overview</CardTitle>
            <CardDescription>
              Your marketing campaign performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Total Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCampaigns}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-500" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Campaigns Sent</p>
                  <p className="text-2xl font-bold text-green-600">{stats.sentCampaigns}</p>
                </div>
                <Send className="h-8 w-8 text-green-500" />
              </div>

              <div className="pt-4 border-t">
                <Link href="/campaigns/new">
                  <Button className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Create New Campaign
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to grow your customer base and engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/qr-codes/new">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                <QrCode className="w-6 h-6" />
                <span className="text-sm">Create QR Code</span>
              </Button>
            </Link>
            
            <Link href="/campaigns/new">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                <Send className="w-6 h-6" />
                <span className="text-sm">Send Campaign</span>
              </Button>
            </Link>
            
            <Link href="/customers">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                <Users className="w-6 h-6" />
                <span className="text-sm">View Customers</span>
              </Button>
            </Link>
            
            <Link href="/campaigns">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                <Eye className="w-6 h-6" />
                <span className="text-sm">View Reports</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
