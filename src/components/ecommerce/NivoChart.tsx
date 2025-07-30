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

const keys2 = [
  "Pasta y Arroz",
  "Aceites y Grasas",
  "Pan y Repostería",
  "Frutos Secos",
  "Bebidas",
  "Dulces y Postres",
  "Salsas y Condimentos",
  "Mermeladas y Conservas",
  "Alimentos Vegetales"
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
      right: 180,    // Aumentado para que la leyenda quede fuera del gráfico
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
    <div className="flex flex-col gap-6 w-full border border-gray-200 rounded-2xl bg-white dark:bg-gray-900 dark:border-gray-800"
      style={{ zIndex: 0, position: 'relative', minHeight: 400, maxHeight: 1100 }}
    >
      <div style={{ height: '40vw', minHeight: 200, maxHeight: 500 }}>
        <ResponsiveBar
          {...commonProps}
          keys={keys1}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 40,  // Más a la derecha
              translateY: 40,
              itemsSpacing: 3,
              itemWidth: 100,
              itemHeight: 16,
              itemTextColor: legendTextColor,
              symbolSize: 16,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: theme === 'dark' ? '#fff' : '#000'
                  }
                }
              ]
            }
          ]}
        />
      </div>

      <div style={{ height: '40vw', minHeight: 200, maxHeight: 500 }}>
        <ResponsiveBar
          {...commonProps}
          keys={keys2}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              translateX: 40,  // Más a la derecha
              translateY: 40,
              itemsSpacing: 3,
              itemWidth: 100,
              itemHeight: 16,
              itemTextColor: legendTextColor,
              symbolSize: 16,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: theme === 'dark' ? '#fff' : '#000'
                  }
                }
              ]
            }
          ]}
        />
      </div>
    </div>
  )
}
