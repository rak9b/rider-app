import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { Upload, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface Document {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'rejected' | 'missing';
  expiry?: string;
}

export const DocumentUpload = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Driver\'s License', status: 'verified', expiry: '2025-12-31' },
    { id: '2', name: 'Vehicle Insurance', status: 'pending' },
    { id: '3', name: 'Vehicle Registration', status: 'missing' },
    { id: '4', name: 'Background Check', status: 'verified', expiry: '2024-06-15' },
  ]);

  const handleUpload = (id: string) => {
    // Simulate upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,.pdf';
    fileInput.onchange = () => {
      toast.loading('Uploading document...', { duration: 1500 });
      setTimeout(() => {
        setDocuments(docs => docs.map(d => d.id === id ? { ...d, status: 'pending' } : d));
        toast.success('Document uploaded for review');
      }, 1500);
    };
    fileInput.click();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="text-green-500" size={20} />;
      case 'pending': return <Clock className="text-yellow-500" size={20} />;
      case 'rejected': return <AlertCircle className="text-red-500" size={20} />;
      default: return <div className="w-5 h-5 rounded-full border-2 border-gray-300 border-dashed" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified': return <Badge variant="success">Verified</Badge>;
      case 'pending': return <Badge variant="warning">Under Review</Badge>;
      case 'rejected': return <Badge variant="danger">Rejected</Badge>;
      default: return <Badge variant="outline">Required</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your required documents to stay active.</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm font-medium">
          {documents.filter(d => d.status === 'verified').length} / {documents.length} Completed
        </div>
      </div>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  doc.status === 'verified' ? 'bg-green-100 dark:bg-green-900/20' : 
                  doc.status === 'missing' ? 'bg-gray-100 dark:bg-slate-800' : 'bg-yellow-100 dark:bg-yellow-900/20'
                }`}>
                  <FileText className={`w-6 h-6 ${
                    doc.status === 'verified' ? 'text-green-600' : 
                    doc.status === 'missing' ? 'text-gray-400' : 'text-yellow-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{doc.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(doc.status)}
                    {doc.expiry && <span className="text-xs text-gray-500">Expires: {doc.expiry}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {doc.status !== 'verified' && (
                  <Button 
                    variant={doc.status === 'missing' ? 'primary' : 'outline'} 
                    size="sm"
                    onClick={() => handleUpload(doc.id)}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {doc.status === 'missing' ? 'Upload' : 'Re-upload'}
                  </Button>
                )}
                {doc.status === 'verified' && (
                  <div className="hidden sm:flex items-center text-green-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 mr-1" /> Up to date
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
