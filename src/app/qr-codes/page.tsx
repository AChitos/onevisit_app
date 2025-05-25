'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Plus, Download, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

interface QRCodeData {
  id: string;
  name: string;
  scans: number;
  qrCodeUrl: string;
  createdAt: string;
  isActive: boolean;
  url: string;
}

export default function QRCodesPage() {
  const businessId = 'demo-business-id'; // Hardcoded for demo
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQRCodes() {
      try {
        const response = await fetch(`/api/qr-codes?businessId=${businessId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch QR codes');
        }
        const data = await response.json();
        setQrCodes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchQRCodes();
  }, [businessId]);

  const downloadQRCode = async (qrCode: QRCodeData) => {
    try {
      const response = await fetch(qrCode.qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${qrCode.name}-qr-code.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download QR code:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };
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

      {loading ? (
        <Card>
          <CardContent className="text-center py-12">
            <Loader2 className="mx-auto h-8 w-8 text-gray-400 animate-spin mb-4" />
            <p className="text-gray-500">Loading QR codes...</p>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="text-center py-12">
            <QrCode className="mx-auto h-16 w-16 text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading QR codes</h3>
            <p className="text-red-500 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : qrCodes.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qrCodes.map((qrCode) => (
            <Card key={qrCode.id}>
              <CardHeader>
                <CardTitle className="text-lg">{qrCode.name}</CardTitle>
                <CardDescription>
                  {qrCode.isActive ? 'Active QR Code' : 'Inactive QR Code'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center p-4">
                  <Image 
                    src={qrCode.qrCodeUrl} 
                    alt={`QR Code for ${qrCode.name}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>Scans: {qrCode.scans}</span>
                  <span>Created: {formatDate(qrCode.createdAt)}</span>
                </div>
                <div className="flex gap-2">
                  <Link href={qrCode.url} target="_blank" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => downloadQRCode(qrCode)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
