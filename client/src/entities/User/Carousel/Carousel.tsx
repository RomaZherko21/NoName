import { useState, useEffect, Children, cloneElement } from 'react'
import { Box } from '@mui/material'

function Carousel(props: any) {
  const [cards, setCards] = useState([])
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    setCards(
      Children.map(props.children, (child) => {
        return cloneElement(child, {
          style: { height: '100%', minWidth: '100%', maxWidth: '100%' },
        })
      })
    )
  })

  const firstCardClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + 550

      return Math.min(newOffset, 0)
    })
  }

  const secondCardClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - 550

      const maxOffset = -(550 * (cards.length - 1))

      return Math.max(newOffset, maxOffset)
    })
  }

  return (
    <Box sx={{ maxWidth: 550, display: 'flex' }}>
      <Box sx={{ position: 'absolute', display: 'flex', gap: 3, pl: 4, pt: 3, zIndex: 1 }}>
        <Box
          onClick={firstCardClick}
          sx={{
            width: 10,
            height: 10,
            backgroundColor: 'text.primary',
            borderRadius: 50,
            cursor: 'pointer',
          }}
        />
        <Box
          onClick={secondCardClick}
          sx={{
            width: 10,
            height: 10,
            backgroundColor: 'text.primary',
            borderRadius: 50,
            cursor: 'pointer',
          }}
        />
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
          {cards}
        </Box>
      </Box>
    </Box>
  )
}

export default Carousel
