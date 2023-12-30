import { Tracks } from '@prisma/client'

const getUniqueGenres = (data: Tracks[]) => {
  const uniqueGenres = new Set()

  data.forEach(item => {
    if (item.genre) {
      uniqueGenres.add(item.genre.toLowerCase())
    }
  })

  return [...uniqueGenres].join(', ')
}

export default getUniqueGenres
