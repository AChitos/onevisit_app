import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Plus, Send, Calendar, Users, Mail, Phone, MoreHorizontal, Edit, Copy, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockCampaigns = [
  {
    id: '1',
    name: 'Happy Hour Special',
    type: 'WHATSAPP',
    subject: null,
    message: '🍻 Happy Hour Alert! 50% off all drinks from 4-6 PM today. Come join us!',
    status: 'SENT',
    sentAt: '2024-01-20T16:00:00Z',
    recipientCount: 25,
    deliveredCount: 23,
    createdAt: '2024-01-20T15:30:00Z'
  },
  {
    id: '2',
    name: 'Weekend Brunch Promotion',
    type: 'EMAIL',
    subject: 'Special Weekend Brunch Menu - Book Your Table Now!',
    message: 'Join us this weekend for our special brunch menu featuring...',
    status: 'SCHEDULED',
    scheduledAt: '2024-01-21T09:00:00Z',
    recipientCount: 18,
    deliveredCount: 0,
    createdAt: '2024-01-19T10:00:00Z'
  },
  {
    id: '3',
    name: 'New Menu Launch',
    type: 'SMS',
    subject: null,
    message: 'Exciting news! Try our new seasonal menu. 20% off your first order. Show this text at checkout.',
    status: 'DRAFT',
    sentAt: null,
    recipientCount: 0,
    deliveredCount: 0,
    createdAt: '2024-01-18T14:20:00Z'
  }
]

const getCampaignTypeIcon = (type: string) => {
  switch (type) {
    case 'WHATSAPP':
      return <MessageSquare className="w-4 h-4 text-green-600" />
    case 'EMAIL':
      return <Mail className="w-4 h-4 text-purple-600" />
    case 'SMS':
      return <Phone className="w-4 h-4 text-blue-600" />
    default:
      return <MessageSquare className="w-4 h-4" />
  }
}

const getStatusBadge = (status: string) => {
  const baseClasses = "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
  
  switch (status) {
    case 'SENT':
      return <span className={`${baseClasses} bg-green-100 text-green-700`}>Sent</span>
    case 'SCHEDULED':
      return <span className={`${baseClasses} bg-blue-100 text-blue-700`}>Scheduled</span>
    case 'DRAFT':
      return <span className={`${baseClasses} bg-gray-100 text-gray-700`}>Draft</span>
    case 'SENDING':
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>Sending</span>
    default:
      return <span className={`${baseClasses} bg-gray-100 text-gray-700`}>{status}</span>
  }
}

export default function CampaignsPage() {
  const totalCampaigns = mockCampaigns.length
  const sentCampaigns = mockCampaigns.filter(c => c.status === 'SENT').length
  const scheduledCampaigns = mockCampaigns.filter(c => c.status === 'SCHEDULED').length
  const totalRecipients = mockCampaigns.reduce((sum, c) => sum + c.recipientCount, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600 mt-2">
            Create and manage your marketing campaigns
          </p>
        </div>
        <Link href="/campaigns/new">
          <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create Campaign
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              All time campaigns
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent Campaigns</CardTitle>
            <Send className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sentCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              Successfully sent
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              Upcoming campaigns
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecipients}</div>
            <p className="text-xs text-muted-foreground">
              Messages sent to customers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/campaigns/new?type=whatsapp">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">WhatsApp Campaign</h3>
                  <p className="text-sm text-gray-600">Send instant messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/campaigns/new?type=email">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Email Campaign</h3>
                  <p className="text-sm text-gray-600">Send detailed newsletters</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/campaigns/new?type=sms">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">SMS Campaign</h3>
                  <p className="text-sm text-gray-600">Send quick text alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Campaign List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
          <CardDescription>
            Your latest marketing campaigns and their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Create your first marketing campaign to start engaging with your customers.
              </p>
              <Link href="/campaigns/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Campaign
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockCampaigns.map((campaign) => (
                <div key={campaign.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getCampaignTypeIcon(campaign.type)}
                        <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                        {getStatusBadge(campaign.status)}
                      </div>
                      
                      {campaign.subject && (
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Subject: {campaign.subject}
                        </p>
                      )}
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {campaign.message}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <span>Recipients: {campaign.recipientCount}</span>
                        {campaign.status === 'SENT' && (
                          <span>Delivered: {campaign.deliveredCount}</span>
                        )}
                        {campaign.sentAt && (
                          <span>Sent: {new Date(campaign.sentAt).toLocaleDateString()}</span>
                        )}
                        {campaign.status === 'SCHEDULED' && (
                          <span>Scheduled: {new Date(campaign.scheduledAt!).toLocaleDateString()}</span>
                        )}
                        <span>Created: {new Date(campaign.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {campaign.status === 'DRAFT' && (
                        <Button size="sm">
                          <Send className="mr-2 h-4 w-4" />
                          Send Now
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
