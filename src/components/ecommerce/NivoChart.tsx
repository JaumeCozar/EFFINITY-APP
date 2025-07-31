import { ResponsiveBar } from '@nivo/bar'
import data from './NivoChart.json'
import { useTheme } from '../../context/ThemeContext'
import { useEffect, useState } from 'react'

const keys1 = [
  "Frutas",
  "Verduras y Hortalizas",
  "Carnes Blancas",
  "Carnes Rojas",
  "Pescado y Marisco",
  "Lácteos",
  "Quesos",
  "Huevos",
  "Cereales y Legumbres"
]



export const MyBar = () => {
  const { theme } = useTheme(); // 'light' o 'dark'
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1200);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Colores según el tema
  const axisColor = theme === 'dark' ? '#e5e7eb' : '#333';
  const legendTextColor = theme === 'dark' ? '#e5e7eb' : '#333';
  const labelTextColor = '#000';
  const gridColor = theme === 'dark' ? '#444' : '#e5e7eb';
  const background = theme === 'dark' ? '#101828' : '#fff';

  const commonProps = {
    data,
    indexBy: "month",
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    labelTextColor,
    axisBottom: {
      legend: '',
      legendOffset: 32,
      tickPadding: 5,
      tickSize: 5,
      tickRotation: isSmallScreen ? -90 : 0,
      tickValues: 'every 1',
    },
    axisLeft: {
      legend: 'food',
      legendOffset: -40,
      tickPadding: 5,
      tickSize: 5,
    },
    margin: {
      top: 50,
      right: 20,    // Reducido para eliminar el espacio en blanco
      bottom: isSmallScreen ? 90 : 80,
      left: 60
    },
    theme: {
      axis: {
        ticks: {
          line: { stroke: axisColor },
          text: { fill: axisColor, fontSize: isSmallScreen ? 10 : 12 }
        },
        legend: {
          text: { fill: axisColor, fontSize: isSmallScreen ? 10 : 12 }
        }
      },
      legends: {
        text: { fill: legendTextColor, fontSize: isSmallScreen ? 10 : 12 }
      },
      labels: {
        text: { fill: labelTextColor, fontSize: isSmallScreen ? 10 : 12 }
      },
      grid: {
        line: { stroke: gridColor }
      },
      background
    }
  }

  return (
    <div className="w-full border border-gray-200 rounded-2xl bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden"
      style={{ zIndex: 0, position: 'relative', minHeight: 400, maxHeight: 1100 }}
    >
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 min-w-0">
          <div style={{ height: '40vw', minHeight: 200, maxHeight: 500 }}>
            <ResponsiveBar
              {...commonProps}
              keys={keys1}
            />
          </div>
        </div>

        {/* Leyenda personalizada */}
        <div className="lg:w-64 w-full p-4 lg:border-l lg:border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Categorías de Alimentos</h3>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Grupo 1:</h4>
              <div className="space-y-2">
                {keys1.map((key, index) => (
                  <div key={key} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded flex-shrink-0"
                      style={{ 
                        backgroundColor: `hsl(${index * 25}, 70%, 50%)`,
                        border: '1px solid #ccc'
                      }}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 truncate">{key}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
