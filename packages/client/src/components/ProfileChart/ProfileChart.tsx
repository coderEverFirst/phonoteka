import React, { useState, useEffect } from 'react'

import { PieChart } from '@mui/x-charts/PieChart'

const ProfileChart = () => {
  const chartData = [
    { id: 0, value: 10, label: 'Rock' },
    { id: 1, value: 15, label: 'Classic' },
    { id: 3, value: 25, label: 'Pop' },
    { id: 4, value: 56, label: 'Techno' },
    { id: 5, value: 84, label: 'Hip-Hop' },
    { id: 6, value: 12, label: 'Lo-Fi' },
    { id: 7, value: 73, label: 'Dude`s music' },
  ]

  const [chartSpeedAngle, setChartSpeedAngle] = useState<number>(0)

  useEffect(() => {
    for (let i = 1; i <= 360; i++) {
      const speedCoefficient: number = 0.6

      setTimeout(() => {
        setChartSpeedAngle(i)
      }, i / speedCoefficient)
    }
  }, [])

  const paletteChart = [
    '#fd7f6f',
    '#7eb0d5',
    '#b2e061',
    '#bd7ebe',
    '#ffb55a',
    '#ffee65',
    '#beb9db',
    '#fdcce5',
    '#8bd3c7',
  ]

  const pieParams = { height: 500, margin: { left: 80, right: 80, top: 40, bottom: 100 } }

  return (
    <PieChart
      series={[
        {
          data: chartData,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { additionalRadius: -5, color: 'gray' },

          startAngle: 0,
          endAngle: chartSpeedAngle,
        },
      ]}
      colors={paletteChart}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' },
          padding: 0,
        },
      }}
      {...pieParams}
    />
  )
}

export default ProfileChart
