import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Plus, Download, Eye } from "lucide-react";
import Link from "next/link";

export default function QRCodesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QR Codes</h1>
          <p className="text-gray-600 mt-2">
            Create and manage QR codes for customer registration
          </p>
        </div>
        <Link href="/qr-codes/new">
          <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create QR Code
          </Button>
        </Link>
      </div>

      {/* Empty State */}
      <Card>
        <CardContent className="text-center py-12">
          <QrCode className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No QR codes yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Create your first QR code to start collecting customer information. 
            Place it in your cafe or bar for customers to scan and register.
          </p>
          <Link href="/qr-codes/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First QR Code
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* This would show actual QR codes when they exist */}
      <div className="hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Main Counter</CardTitle>
            <CardDescription>
              QR code for the main counter area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <QrCode className="h-16 w-16 text-gray-400" />
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>Scans: 0</span>
              <span>Created: Today</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
