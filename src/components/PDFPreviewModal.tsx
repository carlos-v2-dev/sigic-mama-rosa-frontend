
import React from 'react';
import { Download, Printer, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  filename: string;
  onDownload: () => void;
  onPrint: () => void;
}

const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  filename,
  onDownload,
  onPrint,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>Vista previa del PDF</DialogTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onDownload}
                className="flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Descargar</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onPrint}
                className="flex items-center space-x-2"
              >
                <Printer size={16} />
                <span>Imprimir</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="flex items-center space-x-2"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6 overflow-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
          <div className="bg-white border rounded-lg shadow-sm">
            <iframe
              src={pdfUrl}
              className="w-full h-96 border-0 rounded-lg"
              title="Vista previa del PDF"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFPreviewModal;
