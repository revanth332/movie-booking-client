import API from '@/services/API';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Seats() {
    const [seats,setSeats] = useState();
    const params = useParams();

useEffect(() => {
    const getSeats = async () => {
        try{
            const seats = await API.get.getSeats("jk");
            setSeats(seats);
        }
        catch(err){
            console.log(err);
        }
    }
    getSeats();
},[])

  return (
    <div className='flex items-center justify-evenly flex-col h-screen'>
        <div className='grid grid-cols-10 w-1/2 gap-2'>
            {
                [...new Array(20)].map((item,indx) => <div key={indx} className="border-2 text-center border-green-400 h-[30px] w-[30px]">{indx+1}</div>)
            }
        </div>
        <div className='grid grid-cols-10 w-1/2 gap-2'>
        {
                [...new Array(40)].map((item,indx) => <div key={indx} className="border-2 text-center border-green-400 h-[30px] w-[30px]">{indx+1}</div>)
            }
        </div>
    </div>
  )
}
