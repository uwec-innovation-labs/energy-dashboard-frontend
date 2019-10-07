import React, { useState } from 'react'
import UpArrow from '@material-ui/icons/ArrowDropUp'
import DownArrow from '@material-ui/icons/ArrowDropDown'

export default function PercentChange(props) {
  const [value] = useState(props.value)

  return (
    <div style={{ marginTop: '15px' }}>
      {value >= 0 ? (
        <UpArrow style={{ color: 'green' }} />
      ) : (
        <DownArrow style={{ color: 'red' }} />
      )}{' '}
      {value}%
    </div>
  )
}
