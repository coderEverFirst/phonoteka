import React, { useState, useEffect } from 'react'
import { PieChart } from '@mui/x-charts/PieChart'

interface IProfileChart {
  genreData: Array<{
    id: number
    label: string
    value: number
  }>
}

const ProfileChart = (props: IProfileChart) => {
  const { genreData } = props
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
          data: genreData,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { additionalRadius: -5, color: 'gray' },
          cornerRadius: 0,
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
