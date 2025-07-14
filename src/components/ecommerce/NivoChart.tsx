import { ResponsiveBar } from '@nivo/bar'
import data from './NivoChart.json'
import { useTheme } from '../../context/ThemeContext'

export const MyBar = () => {
  const { theme } = useTheme(); // 'light' o 'dark'

  // Colores según el tema
  const axisColor = theme === 'dark' ? '#e5e7eb' : '#333';
  const legendTextColor = theme === 'dark' ? '#e5e7eb' : '#333';
  const labelTextColor = '#000';
  const gridColor = theme === 'dark' ? '#444' : '#e5e7eb';
  const background = theme === 'dark' ? '#101828' : '#fff';

  return (
    <div
      className="h-[300px] w-full border border-gray-200 rounded-2xl bg-white dark:bg-gray-900 dark:border-gray-800"
      style={{ zIndex: 0, position: 'relative' }}
    >
      <ResponsiveBar
        data={data}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="month"
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={labelTextColor}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 120,
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
        axisBottom={{
          legend: 'country (indexBy)',
          legendOffset: 32,
          tickPadding: 5,
          tickSize: 5
        }}
        axisLeft={{
          legend: 'food',
          legendOffset: -40,
          tickPadding: 5,
          tickSize: 5
        }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        theme={{
          axis: {
            ticks: {
              line: { stroke: axisColor },
              text: { fill: axisColor }
            },
            legend: {
              text: { fill: axisColor }
            }
          },
          legends: {
            text: { fill: legendTextColor }
          },
          labels: {
            text: { fill: labelTextColor }
          },
          grid: {
            line: { stroke: gridColor }
          },
          background
        }}
      />
    </div>
  )
}