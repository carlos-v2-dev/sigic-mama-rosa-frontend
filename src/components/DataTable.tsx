
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, FileText, Calendar } from 'lucide-react';
import { usePagination } from '../hooks/usePagination';
import { useDateFilter } from '../hooks/useDateFilter';
import { usePDFExport } from '../hooks/usePDFExport';
import PaginationControls from './PaginationControls';
import DateRangeFilter from './DateRangeFilter';
import PDFPreviewModal from './PDFPreviewModal';
import { Button } from '@/components/ui/button';

interface TableColumn {
  key: string;
  label: string;
}

interface DataTableProps {
  title: string;
  columns: TableColumn[];
  data: any[];
  onAdd: () => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  enableDateFilter?: boolean;
  enablePDFExport?: boolean;
  pdfFormatters?: Record<string, (value: any) => string>;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  enableDateFilter = false,
  enablePDFExport = false,
  pdfFormatters = {},
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Hook para filtrado por fechas
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    filteredData: dateFilteredData,
    clearDateFilter,
    hasDateFilter,
  } = useDateFilter({ 
    data, 
    dateField: 'created_at' 
  });

  // Filtrar datos basado en la búsqueda (solo para tablas sin filtro de fecha)
  const searchFilteredData = enableDateFilter 
    ? dateFilteredData 
    : dateFilteredData.filter(item => 
        Object.values(item).some(value => 
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

  // Hook para paginación
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    goToPrevious,
    goToNext,
    resetPage,
    totalItems,
    itemsPerPage,
  } = usePagination({ 
    data: searchFilteredData, 
    itemsPerPage: 10 
  });

  // Hook para exportación PDF
  const {
    generatePDF,
    downloadPDF,
    printPDF,
    closePDFPreview,
    isGenerating,
    previewData,
  } = usePDFExport();

  // Reset page when filters change
  useEffect(() => {
    resetPage();
  }, [searchQuery, startDate, endDate, resetPage]);

  const handlePDFExport = async () => {
    try {
      const pdfUrl = await generatePDF({
        title,
        filename: `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`,
        data: searchFilteredData,
        columns,
        formatters: pdfFormatters,
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
    }
  };

  const handleDownloadPDF = () => {
    if (previewData) {
      const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      downloadPDF(previewData, filename);
    }
  };

  const handlePrintPDF = () => {
    if (previewData) {
      printPDF(previewData);
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-green">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-32 right-16 w-64 h-64 bg-brand-yellow rounded-full opacity-8 animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-24 left-16 w-80 h-80 bg-brand-blue rounded-full opacity-6 animate-bounce" style={{ animationDuration: '7s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-red rounded-full opacity-4 animate-pulse" style={{ animationDelay: '3s', animationDuration: '9s' }}></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <p className="text-gray-600 mt-1">Gestiona y organiza tus datos</p>
              </div>
              <div className="flex items-center space-x-3">
                {enablePDFExport && (
                  <Button
                    onClick={handlePDFExport}
                    disabled={isGenerating || searchFilteredData.length === 0}
                    className="flex items-center space-x-2 bg-brand-red text-white hover:bg-brand-red/90"
                  >
                    <FileText size={18} />
                    <span>{isGenerating ? 'Generando...' : 'Exportar PDF'}</span>
                  </Button>
                )}
                <button
                  onClick={onAdd}
                  className="flex items-center space-x-2 bg-brand-blue text-white px-6 py-3 rounded-xl hover:bg-brand-blue/90 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Plus size={18} />
                  <span className="font-medium">Agregar Nuevo</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="px-8 py-4 border-b border-gray-100">
              {enableDateFilter ? (
                <DateRangeFilter
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                  onClear={clearDateFilter}
                  hasFilter={hasDateFilter}
                />
              ) : (
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar en la tabla..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm"
                  />
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-brand-green/50 border-b border-gray-100">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        {column.label}
                      </th>
                    ))}
                    <th className="px-8 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/90 backdrop-blur-sm divide-y divide-gray-100">
                  {paginatedData.map((item, index) => (
                    <tr key={index} className="hover:bg-brand-green/30 transition-colors group">
                      {columns.map((column) => (
                        <td key={column.key} className="px-8 py-6 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {item[column.key]}
                        </td>
                      ))}
                      <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => onEdit(item)}
                            className="w-8 h-8 flex items-center justify-center text-brand-blue hover:text-white hover:bg-brand-blue rounded-lg transition-all duration-200"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => onDelete(item)}
                            className="w-8 h-8 flex items-center justify-center text-brand-red hover:text-white hover:bg-brand-red rounded-lg transition-all duration-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {searchFilteredData.length === 0 && (
              <div className="text-center py-16 bg-white/90 backdrop-blur-sm">
                <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-brand-blue rounded"></div>
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  {enableDateFilter && hasDateFilter 
                    ? 'No se encontraron resultados para el rango de fechas seleccionado'
                    : searchQuery 
                    ? 'No se encontraron resultados' 
                    : 'No hay datos disponibles'}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  {enableDateFilter && hasDateFilter
                    ? 'Intenta con un rango de fechas diferente'
                    : searchQuery 
                    ? 'Intenta con otros términos de búsqueda' 
                    : 'Comienza agregando tu primer registro'}
                </p>
              </div>
            )}

            {/* Pagination */}
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={goToPage}
              onPrevious={goToPrevious}
              onNext={goToNext}
            />
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {previewData && (
        <PDFPreviewModal
          isOpen={!!previewData}
          onClose={closePDFPreview}
          pdfUrl={previewData}
          filename={`${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`}
          onDownload={handleDownloadPDF}
          onPrint={handlePrintPDF}
        />
      )}
    </div>
  );
};

export default DataTable;
