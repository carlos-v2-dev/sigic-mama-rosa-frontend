import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  const servicesData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Servicios Registrados',
        data: [12, 19, 15, 25, 22, 18, 8],
        borderColor: '#009ece',
        backgroundColor: 'rgba(0, 158, 206, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#009ece',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const usersData = {
    labels: ['Activos', 'Nuevos', 'Inactivos'],
    datasets: [
      {
        data: [32, 14, 54],
        backgroundColor: ['#009ece', '#f7d708', '#ce0000'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#F3F4F6',
        },
        border: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-brand-green">
      {/* Animated Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-blue rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-brand-yellow rounded-full opacity-8 animate-bounce" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-brand-red rounded-full opacity-6 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-brand-blue rounded-full opacity-5 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Control</h1>
            <p className="text-gray-600">Gestiona y supervisa tus proyectos</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Servicios Hoy</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">24</p>
                  <p className="text-green-600 text-sm mt-2 font-medium">+12% vs ayer</p>
                </div>
                <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Usuarios Activos</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">183</p>
                  <p className="text-green-600 text-sm mt-2 font-medium">+5% vs semana</p>
                </div>
                <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Inventario</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">1,247</p>
                  <p className="text-gray-500 text-sm mt-2 font-medium">Items disponibles</p>
                </div>
                <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center border-2 border-gray-300">
                  <div className="w-6 h-6 bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Áreas</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
                  <p className="text-gray-500 text-sm mt-2 font-medium">Activas</p>
                </div>
                <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Services Chart */}
            <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Servicios Registrados</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">7D</button>
                  <button className="px-3 py-1 text-sm bg-brand-blue text-white rounded-lg">30D</button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">90D</button>
                </div>
              </div>
              <div className="h-64">
                <Line data={servicesData} options={chartOptions} />
              </div>
            </div>
            
            {/* Users Doughnut Chart */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Estado de Usuarios</h3>
              <div className="h-48 relative">
                <Doughnut data={usersData} options={doughnutOptions} />
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-brand-blue rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Activos</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">32</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-brand-yellow rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Nuevos</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">14</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-brand-red rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Inactivos</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">54</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
