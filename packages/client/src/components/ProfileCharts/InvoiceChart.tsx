import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  loadInvoicesChartsData,
  setInvoicesChartsFilters,
} from 'client-core/store/actions/accountManagement'
import { useDispatch, useSelector } from 'react-redux'
import { Chart } from 'react-google-charts'
import { Button, Select, MenuItem, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
// import {
//   AMOUNT,
//   MONTHLY,
//   COUNT,
//   QUARTERLY,
//   YEARLY,
//   months,
//   quarters,
// } from 'client-core/store/constants/application'

const useStyles = makeStyles({
  commonButton: {
    fontSize: 12,
    padding: '8px 15px',
    '&:hover': {
      boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12)',
    },
  },
  button: {
    backgroundColor: '#fff',
    color: '#000',
    '&:hover': {
      backgroundColor: '#fff !important',
    },
  },
  buttonSelected: {
    backgroundColor: '#31c99c',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#31c99c !important',
    },
  },
  muiSelect: {
    padding: '5px 15px',
    boxShadow:
      '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  },
  spinner: { color: '#31c99c !important', display: 'block', margin: '0 auto' },
})

const InvoiceChart = ({ filters }) => {
  const dispatch = useDispatch()
  const loadInvoicesChartsDataAction = payload => dispatch(loadInvoicesChartsData(payload))
  const setInvoicesChartsFiltersAction = payload => dispatch(setInvoicesChartsFilters(payload))
  const { charts: chartsData, filter: chartFilter } = useSelector(
    state => state.accountStore.statements.invoices.chartsData,
  )
  const { comparator: chartComparator, countBy: chartCountBy } = chartFilter || {}

  const styles = useStyles()

  const [chartPeriod, setChartPeriod] = useState(MONTHLY)
  const [countBy, setCountBy] = useState(AMOUNT)

  const yearToRequest = useMemo(
    () => (filters?.year?.year === 'Custom period' ? null : filters?.year?.year),
    [filters?.year],
  )

  const isDecimal = useMemo(() => countBy === AMOUNT, [countBy])

  useEffect(() => {
    if (chartFilter) {
      setCountBy(chartCountBy.toUpperCase())
      setChartPeriod(getPeriodFromState(chartComparator))
    }
  }, [])

  useEffect(() => {
    if (filters?.year?.team !== filters?.team?.name && !filters?.year?.year == 'Custom period') {
      return
    }

    const comparator = getSelectedPeriod(chartPeriod)
    const query = {
      team: filters?.team?.id,
      year: yearToRequest || null,
      rangeFrom: filters.datePicker.rangeFrom,
      rangeTo: filters.datePicker.rangeTo,
      comparator,
      countBy: countBy.toLowerCase(),
    }

    if (!query.rangeTo && !query.rangeFrom && !query.year) {
      return
    }

    if (countBy !== chartCountBy || chartPeriod !== getPeriodFromState(chartComparator)) {
      loadInvoicesChartsDataAction(query)
      setInvoicesChartsFiltersAction({
        comparator,
        year: yearToRequest,
        countBy: countBy.toLowerCase(),
      })
    }
  }, [chartPeriod, countBy, filters?.team, filters.year])

  const handlePeriod = useCallback(({ target: { value } }) => {
    setChartPeriod(value)
  }, [])

  const getSelectedPeriod = useCallback(value => {
    switch (value) {
      case MONTHLY:
        return 'month'
      case QUARTERLY:
        return 'quarter'
      case YEARLY:
        return 'year'
      default:
        return 'month'
    }
  }, [])

  const getPeriodFromState = useCallback(value => {
    switch (value) {
      case 'month':
        return MONTHLY
      case 'quarter':
        return QUARTERLY
      case 'year':
        return YEARLY
      default:
        return MONTHLY
    }
  }, [])

  const prepareComparatorForChart = useCallback(
    comparator => {
      if (chartPeriod === MONTHLY) {
        return months[comparator]
      }

      if (chartPeriod === QUARTERLY) {
        return quarters[comparator]
      }

      return ''
    },
    [chartPeriod],
  )

  const prepareDataForChart = useCallback(() => {
    const chartHeader = [countBy, countBy, { role: 'style' }, { role: 'annotation' }]
    const data = chartsData.map(item => [
      `${prepareComparatorForChart(item.separatedBy)} ${item.invoicesYear}`,
      item.countedBy,
      '#8ecce6',
      item.countedBy,
    ])
    return [chartHeader, ...data]
  }, [chartsData])

  return (
    <>
      {chartsData ? (
        <div className="invoice-charts">
          <div className="charts-actions">
            <div className="button-block">
              <Button
                variant="contained"
                onClick={() => setCountBy(AMOUNT)}
                classes={{ root: styles.commonButton }}
                className={`${countBy === AMOUNT ? styles.buttonSelected : styles.button}`}
              >
                AMOUNT
              </Button>
              <Button
                variant="contained"
                onClick={() => setCountBy(COUNT)}
                classes={{ root: styles.commonButton }}
                className={countBy === COUNT ? styles.buttonSelected : styles.button}
              >
                COUNT
              </Button>
            </div>
            <Select
              onChange={handlePeriod}
              value={chartPeriod}
              variant="filled"
              disableUnderline
              classes={{ select: styles.muiSelect }}
            >
              <MenuItem key={MONTHLY} value={MONTHLY}>
                Monthly
              </MenuItem>
              <MenuItem key={QUARTERLY} value={QUARTERLY}>
                Quarterly
              </MenuItem>
              <MenuItem key={YEARLY} value={YEARLY}>
                Yearly
              </MenuItem>
            </Select>
          </div>
          {chartsData?.length ? (
            <Chart
              width={'100%'}
              height={'400px'}
              chartType="ColumnChart"
              loader={
                <div>
                  <CircularProgress classes={{ root: styles.spinner }} size={25} />
                  <p>Loading google charts data</p>
                </div>
              }
              data={prepareDataForChart()}
              options={{
                vAxis: {
                  format: isDecimal ? 'decimal' : '',
                },
                legend: 'none',
                annotations: {
                  format: 'decimal',
                  textStyle: {
                    fontSize: 13,
                    bold: true,
                  },
                },
              }}
            />
          ) : (
            <div className="chart-info-wrapper">
              <p className="chart-info-message">No invoices for the chosen period</p>
              <p className="chart-info-submessage">
                Try selecting a longer time period or another practice
              </p>
            </div>
          )}
        </div>
      ) : (
        <CircularProgress classes={{ root: styles.spinner }} size={45} />
      )}
    </>
  )
}

export default InvoiceChart
