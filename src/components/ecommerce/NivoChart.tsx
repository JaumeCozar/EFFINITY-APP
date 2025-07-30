import { ResponsiveBar } from '@nivo/bar';
import { useEffect, useState } from 'react';

export const MyBar = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // State to store any fetch errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/waste-data');

        if (!res.ok) {
          // If the response is not OK (e.g., 404, 500), throw an error
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const rawData = await res.json();

        // --- Data Transformation Logic ---
        const grouped = rawData.reduce((acc, item) => {
          const { month, food, total_kg } = item;
          let monthEntry = acc.find(m => m.month === month);
          if (!monthEntry) {
            monthEntry = { month };
            acc.push(monthEntry);
          }
          monthEntry[food] = total_kg; // Assign the total_kg to the food item for the current month
          return acc;
        }, []);

        // Define all possible food items to ensure all keys are present for Nivo
        const allFoods = ["hot dog", "burger", "sandwich", "kebab", "fries", "donut"];
        grouped.forEach(monthEntry => {
          allFoods.forEach(food => {
            // If a food item is missing for a month, initialize its value to 0
            if (!(food in monthEntry)) {
              monthEntry[food] = 0;
            }
          });
        });
        // --- End Data Transformation Logic ---

        setData(grouped);
      } catch (err) {
        console.error("Failed to fetch waste data:", err);
        setError("Failed to load data. Please check the server connection and data format."); // Set user-friendly error message
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Error: {error}</div>;
  }

  // You can add a loading state here if the data fetch takes time
  if (data.length === 0 && !error) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading data...</div>;
  }

  return (
    <div style={{ height: 400 }}>
      <ResponsiveBar
        data={data}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]} // These keys must match the transformed data properties
        indexBy="month" // The property used for the X-axis categories
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }} // Color scheme for the bars
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null} // No axis on top
        axisRight={null} // No axis on right
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Month',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Quantity (kg)', // Label for the Y-axis
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};