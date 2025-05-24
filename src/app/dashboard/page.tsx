import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, QrCode, TrendingUp, Calendar, Eye, Send, Clock } from "lucide-react"
import Link from "next/link"

// Mock data for charts and recent activity
const recentActivity = [
  {
    id: '1',
    type: 'customer_registered',
    message: 'Sarah Johnson registered via QR code',
    timestamp: '2024-01-20T14:30:00Z',
    icon: <Users className="w-4 h-4 text-blue-600" />
  },
  {
    id: '2',
    type: 'campaign_sent',
    message: 'Happy Hour Special sent to 25 customers',
    timestamp: '2024-01-20T16:00:00Z',
    icon: <Send className="w-4 h-4 text-green-600" />
  },
  {
    id: '3',
    type: 'qr_scan',
    message: '3 customers scanned Main Counter QR code',
    timestamp: '2024-01-20T18:45:00Z',
    icon: <QrCode className="w-4 h-4 text-purple-600" />
  }
]

const upcomingCampaigns = [
  {
    id: '1',
    name: 'Weekend Brunch Promotion',
    type: 'EMAIL',
    scheduledAt: '2024-01-21T09:00:00Z',
    recipients: 18
  },
  {
    id: '2',
    name: 'New Menu Announcement',
    type: 'WHATSAPP',
    scheduledAt: '2024-01-22T12:00:00Z',
    recipients: 25
  }
]

export default function DashboardPage() {
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
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaigns Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              25 messages delivered
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QR Code Scans</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +8 from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Messages delivered successfully
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest customer interactions and campaign activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No activity yet</h3>
                <p className="mt-1 text-sm text-gray-500">Activity will appear here as customers interact with your business.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Campaigns</CardTitle>
            <CardDescription>
              Scheduled campaigns ready to be sent
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingCampaigns.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No scheduled campaigns</h3>
                <p className="mt-1 text-sm text-gray-500">Create and schedule campaigns to see them here.</p>
                <Link href="/campaigns/new">
                  <Button className="mt-4" size="sm">
                    <Send className="mr-2 h-4 w-4" />
                    Create Campaign
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                        <p className="text-sm text-gray-500">
                          {campaign.type} • {campaign.recipients} recipients
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(campaign.scheduledAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(campaign.scheduledAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
