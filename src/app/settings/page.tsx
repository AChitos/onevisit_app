import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Mail, Phone, MapPin, Save, User, Bell, Shield } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your business profile and application preferences
        </p>
      </div>

      <div className="space-y-8">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Business Information
            </CardTitle>
            <CardDescription>
              Update your business details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  defaultValue="The Coffee Corner"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <select
                  id="businessType"
                  className="mt-2 w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  defaultValue="cafe"
                >
                  <option value="cafe">Cafe</option>
                  <option value="bar">Bar</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="pub">Pub</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="businessDescription">Business Description</Label>
              <textarea
                id="businessDescription"
                defaultValue="A cozy neighborhood coffee shop serving artisanal coffee and fresh pastries."
                className="mt-2 w-full min-h-[80px] p-3 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="businessEmail">Email Address</Label>
                <Input
                  id="businessEmail"
                  type="email"
                  defaultValue="info@coffecorner.com"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="businessPhone">Phone Number</Label>
                <Input
                  id="businessPhone"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="businessAddress">Business Address</Label>
              <Input
                id="businessAddress"
                defaultValue="123 Main Street, Downtown, City 12345"
                className="mt-2"
              />
            </div>

            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Business Information
            </Button>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Settings
            </CardTitle>
            <CardDescription>
              Manage your account preferences and login information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  defaultValue="John"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  defaultValue="Smith"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accountEmail">Account Email</Label>
              <Input
                id="accountEmail"
                type="email"
                defaultValue="john@coffecorner.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter current password to change"
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="mt-2"
                />
              </div>
            </div>

            <Button>
              <Save className="mr-2 h-4 w-4" />
              Update Account
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure how you want to receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">New Customer Registrations</h4>
                  <p className="text-sm text-gray-600">Get notified when new customers register</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Campaign Delivery Reports</h4>
                  <p className="text-sm text-gray-600">Receive reports when campaigns are delivered</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Weekly Analytics Summary</h4>
                  <p className="text-sm text-gray-600">Get a weekly summary of your performance</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">System Updates</h4>
                  <p className="text-sm text-gray-600">Important updates about the platform</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
              </div>
            </div>

            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Notification Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Manage your data and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Data Export</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Download all your customer data and campaign history
                </p>
                <Button variant="outline" size="sm">
                  Export Data
                </Button>
              </div>

              <div>
                <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline" size="sm">
                  Enable 2FA
                </Button>
              </div>

              <div>
                <h4 className="font-medium mb-2">Session Management</h4>
                <p className="text-sm text-gray-600 mb-3">
                  View and manage your active sessions
                </p>
                <Button variant="outline" size="sm">
                  Manage Sessions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
