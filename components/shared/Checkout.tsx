import React from 'react'
import { Button } from '../ui/button'
import { CreateEventParams } from '@/types'

const Checkout = ({event, userId}: {event:CreateEventParams, userId:string}) => {

    const onCheckout = async() => {
        console.log('Checkout')
    }
  return (
  <form action={onCheckout} method='post'>
<Button type='submit' role='link' size='lg' className='button sm:w-fit'>
{event.event.isFree ? 'Get Ticket' : 'Buy Ticket'}
</Button>
  </form>
  )
}

export default Checkout