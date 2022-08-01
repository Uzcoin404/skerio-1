import React from 'react'
import {Main,ErrorImg} from './404style'
import Error from '../../img/404.gif'

const success = () => {
  return (
    <Main>
     <ErrorImg src={Error} />
    </Main>
  )
}

export default success