import { ETableSort } from '../../variables/eNums'

import { IRowData } from '../../variables/testFetchData'

export const useMainTable = () => {
  const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  const getComparator = <Key extends keyof string>(
    order: ETableSort,
    orderBy: Key,
  ): ((a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number) => {
    return order === ETableSort.desc
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  const stableSort = <T>(rowArray: IRowData[], comparator: (a: T, b: T) => number) => {
    const stabilizedArray = rowArray.map((el, index) => [el, index] as [T, number])
    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0])
      return order !== 0 ? order : a[1] - b[1]
    })

    return stabilizedArray.map(el => el[0])
  }

  return {
    getComparator,
    stableSort,
  }
}
