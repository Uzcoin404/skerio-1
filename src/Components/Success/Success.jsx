import React from 'react'
import {Main,SuccessImg} from './scstyle'
import GifSuccess from '../../img/success.gif'

const success = () => {
  return (
    <Main>
     <SuccessImg src={GifSuccess} />
    </Main>
  )
}

export default success