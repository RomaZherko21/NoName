import { useState } from 'react'
import { Box } from '@mui/material'

interface Props {
  width: number
  children: any
}

function Carousel({ width, children }: Props) {
  const [offset, setOffset] = useState(0)

  const cardClick = (id: number) => {
    setOffset(() => {
      const newOffset = id * -width

      return newOffset
    })
  }

  return (
    <Box sx={{ maxWidth: { width }, display: 'flex' }}>
      <Box sx={{ position: 'absolute', display: 'flex', gap: 3, pl: 4, pt: 3, zIndex: 1 }}>
        {children.map((child: any, id: number) => (
          <Box
            onClick={() => cardClick(id)}
            sx={{
              width: 10,
              height: 10,
              backgroundColor: 'text.primary',
              borderRadius: 50,
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>
      <Box sx={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 2 }}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            transform: `translateX(${offset}px)`,
            transition: 'translate',
            transitionProperty: 'transform',
            transitionDuration: '300ms',
            transitionTimingFunction: 'ease-in-out',
          }}
        >
          {children.map((child: any) => {
            return child
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default Carousel
