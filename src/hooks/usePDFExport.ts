
import { useState } from 'react';

interface PDFExportOptions {
  title: string;
  filename: string;
  data: any[];
  columns: { key: string; label: string }[];
  formatters?: Record<string, (value: any) => string>;
}

export const usePDFExport = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewData, setPreviewData] = useState<string | null>(null);

  const generatePDF = async (options: PDFExportOptions) => {
    setIsGenerating(true);
    
    try {
      // Crear el contenido HTML para el PDF
      const htmlContent = generateHTMLContent(options);
      
      // Generar PDF usando la API del navegador
      const pdfBlob = await generatePDFFromHTML(htmlContent);
      
      // Crear URL para previsualización
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPreviewData(pdfUrl);
      
      return pdfUrl;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  const printPDF = (url: string) => {
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        printWindow.print();
      });
    }
  };

  const closePDFPreview = () => {
    if (previewData) {
      URL.revokeObjectURL(previewData);
      setPreviewData(null);
    }
  };

  return {
    generatePDF,
    downloadPDF,
    printPDF,
    closePDFPreview,
    isGenerating,
    previewData,
  };
};

const generateHTMLContent = (options: PDFExportOptions): string => {
  const { title, data, columns, formatters = {} } = options;
  
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 20px; 
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #009ece;
          padding-bottom: 20px;
        }
        .header h1 {
          color: #009ece;
          margin: 0;
          font-size: 24px;
        }
        .header p {
          margin: 5px 0;
          color: #666;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #f8f9fa;
          font-weight: bold;
          color: #333;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #ddd;
          padding-top: 20px;
        }
        @media print {
          body { margin: 0; }
          .header { break-after: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${title}</h1>
        <p>Generado el ${currentDate}</p>
        <p>Total de registros: ${data.length}</p>
      </div>
      
      <table>
        <thead>
          <tr>
            ${columns.map(col => `<th>${col.label}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>
              ${columns.map(col => {
                const value = row[col.key];
                const formattedValue = formatters[col.key] ? formatters[col.key](value) : value;
                return `<td>${formattedValue || '-'}</td>`;
              }).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="footer">
        <p>Documento generado automáticamente por el sistema de gestión</p>
      </div>
    </body>
    </html>
  `;
};

const generatePDFFromHTML = async (htmlContent: string): Promise<Blob> => {
  // Crear un iframe temporal para generar el PDF
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.left = '-9999px';
  iframe.style.width = '210mm';
  iframe.style.height = '297mm';
  
  document.body.appendChild(iframe);
  
  return new Promise((resolve, reject) => {
    if (!iframe.contentWindow) {
      reject(new Error('No se pudo crear el iframe'));
      return;
    }

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(htmlContent);
    iframe.contentWindow.document.close();

    iframe.onload = () => {
      try {
        // Simular la generación del PDF
        // En un entorno real, aquí usarías una librería como jsPDF o html2pdf
        const blob = new Blob([htmlContent], { type: 'text/html' });
        document.body.removeChild(iframe);
        resolve(blob);
      } catch (error) {
        document.body.removeChild(iframe);
        reject(error);
      }
    };
  });
};
