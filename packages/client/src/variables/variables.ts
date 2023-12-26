// ================ colors ================
export const MAIN_BACKGROUND_COLOR = '#f8f0e5'
export const MAIN_LIGHT_CREAM_COLOR = '#eadbc8'
export const MAIN_DARK_CREAM_COLOR = '#dac0a3'
export const MAIN_DARK_CREAM_HOVER_COLOR = '#cda88b75'
export const MAIN_BLUE_COLOR = '#102c57'
export const MAIN_BACKDROP_BLUE_COLOR = 'rgba(16, 44, 86, 0.5)'
export const MAIN_LIGHTBLUE_COLOR = '#39567e1e'
export const MAIN_GRAY_COLOR = '#5b5a5a'
export const BLACK = '#000'
export const WHITE = '#fff'
export const ERROR_COLOR = '#d32f2f'

// ================ render objects ================

export interface IRenderTableHeaderData {
  id: number
  label: string
  value: string
}

export const RENDER_TABLE_HEADER_DATA: IRenderTableHeaderData[] = [
  { id: 0, label: 'Name', value: 'name' },
  { id: 1, label: 'Band', value: 'band' },
  { id: 2, label: 'Album', value: 'album' },
  { id: 3, label: 'Year', value: 'year' },
  { id: 4, label: 'Genre', value: 'genre' },
  { id: 5, label: 'Format', value: 'format' },
]
