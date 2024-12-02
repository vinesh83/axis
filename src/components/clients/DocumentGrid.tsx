import React, { useState } from 'react';
import { File, FileText, FileImage, FolderOpen } from 'lucide-react';
import PDFViewer from './PDFViewer';
import { Document } from '../../types/clients';

interface DocumentGridProps {
  documents: Document[];
}

const DocumentGrid = ({ documents }: DocumentGridProps) => {
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);

  // Group documents by category
  const groupedDocs = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  const handleDocumentClick = (doc: Document) => {
    if (doc.type.toLowerCase() === 'pdf' && doc.url) {
      setSelectedPDF(doc.url);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
      
      {Object.entries(groupedDocs).map(([category, docs]) => (
        <div key={category} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-2 mb-4">
            <FolderOpen className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">{category}</h3>
            <span className="text-sm text-gray-500">({docs.length})</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {docs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleDocumentClick(doc)}
                className={`
                  relative group rounded-lg overflow-hidden transition-all duration-200
                  ${doc.type.toLowerCase() === 'pdf' && doc.url
                    ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]'
                    : ''
                  }
                `}
              >
                <div className="aspect-[3/4] relative">
                  {/* Thumbnail or placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
                    {doc.thumbnailUrl ? (
                      <img
                        src={doc.thumbnailUrl}
                        alt={doc.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <>
                        <DocumentIcon type={doc.type} />
                        <div className="mt-2 text-center">
                          <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {doc.type.toUpperCase()}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Hover overlay for PDFs */}
                  {doc.type.toLowerCase() === 'pdf' && doc.url && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        View Document
                      </span>
                    </div>
                  )}
                </div>

                {/* Document info */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm font-medium truncate">
                    {doc.name}
                  </p>
                  <p className="text-white/80 text-xs mt-0.5">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedPDF && (
        <PDFViewer 
          url={selectedPDF} 
          onClose={() => setSelectedPDF(null)} 
        />
      )}
    </div>
  );
};

const DocumentIcon = ({ type }: { type: string }) => {
  const className = "w-12 h-12";
  
  switch (type.toLowerCase()) {
    case 'pdf':
      return <FileText className={`${className} text-red-500`} />;
    case 'image':
      return <FileImage className={`${className} text-blue-500`} />;
    default:
      return <File className={`${className} text-gray-500`} />;
  }
};

export default DocumentGrid;