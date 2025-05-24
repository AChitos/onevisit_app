import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, Search, Filter, Download, UserPlus, Mail, MessageSquare, Phone, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockCustomers = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    whatsappOptIn: true,
    smsOptIn: true,
    emailOptIn: true,
    registeredAt: '2024-01-15',
    lastContact: '2024-01-20',
    birthday: '1990-06-15'
  },
  {
    id: '2',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike.chen@email.com',
    phone: '+1 (555) 987-6543',
    whatsappOptIn: true,
    smsOptIn: false,
    emailOptIn: true,
    registeredAt: '2024-01-10',
    lastContact: null,
    birthday: null
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.davis@email.com',
    phone: '+1 (555) 456-7890',
    whatsappOptIn: false,
    smsOptIn: true,
    emailOptIn: true,
    registeredAt: '2024-01-08',
    lastContact: '2024-01-18',
    birthday: '1985-12-03'
  }
]

export default function CustomersPage() {
  const totalCustomers = mockCustomers.length
  const whatsappOptIns = mockCustomers.filter(c => c.whatsappOptIn).length
  const emailOptIns = mockCustomers.filter(c => c.emailOptIn).length
  const smsOptIns = mockCustomers.filter(c => c.smsOptIn).length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-2">
            Manage your customer database and preferences
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/customers/new">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Customer
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
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              Registered customers
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WhatsApp Subscribers</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{whatsappOptIns}</div>
            <p className="text-xs text-muted-foreground">
              Opted in for WhatsApp
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Subscribers</CardTitle>
            <Mail className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailOptIns}</div>
            <p className="text-xs text-muted-foreground">
              Opted in for email
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMS Subscribers</CardTitle>
            <Phone className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{smsOptIns}</div>
            <p className="text-xs text-muted-foreground">
              Opted in for SMS
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search customers by name, email, or phone..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            All registered customers and their communication preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No customers yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start collecting customer information by creating QR codes and sharing them in your venue.
              </p>
              <Link href="/qr-codes/new">
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create QR Code
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockCustomers.map((customer) => (
                <div key={customer.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <h3 className="font-medium text-gray-900">
                          {customer.firstName} {customer.lastName}
                        </h3>
                        <div className="flex items-center gap-2">
                          {customer.whatsappOptIn && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              <MessageSquare className="w-3 h-3" />
                              WhatsApp
                            </div>
                          )}
                          {customer.emailOptIn && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                              <Mail className="w-3 h-3" />
                              Email
                            </div>
                          )}
                          {customer.smsOptIn && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                              <Phone className="w-3 h-3" />
                              SMS
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1 space-y-1">
                        {customer.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {customer.email}
                          </div>
                        )}
                        {customer.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {customer.phone}
                          </div>
                        )}
                        {customer.birthday && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Birthday: {new Date(customer.birthday).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
                      <div>
                        Registered: {new Date(customer.registeredAt).toLocaleDateString()}
                      </div>
                      {customer.lastContact && (
                        <div className="sm:border-l sm:border-gray-300 sm:pl-2">
                          Last contact: {new Date(customer.lastContact).toLocaleDateString()}
                        </div>
                      )}
                      <Button variant="outline" size="sm" className="sm:ml-2">
                        View Details
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
