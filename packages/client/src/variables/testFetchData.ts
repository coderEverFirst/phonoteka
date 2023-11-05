export interface IRowData {
  id: number
  name: string
  band: string
  album: string
  year: string
  genre: string
  format: string
}
export const rowsData: IRowData[] = [
  {
    id: 0,
    name: 'Nightcall',
    band: 'Kavinsky',
    album: 'OutRun',
    year: '2013',
    genre: 'Retrowave',
    format: 'flac',
  },
  {
    id: 1,
    name: 'Bohemian Rhapsody',
    band: 'Queen',
    album: 'A Night at the Opera',
    year: '1975',
    genre: 'Rock',
    format: 'mp3',
  },
  {
    id: 2,
    name: 'Hotel California',
    band: 'Eagles',
    album: 'Hotel California',
    year: '1976',
    genre: 'Rock',
    format: 'wav',
  },
  {
    id: 3,
    name: 'Purple Haze',
    band: 'Jimi Hendrix',
    album: 'Are You Experienced',
    year: '1967',
    genre: 'Rock',
    format: 'flac',
  },
]
