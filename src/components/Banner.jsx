import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Banner = () => {

  const [user , SetUser] = useState([]);
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {  
      try {
        const res = await axios.get("https://dummyjson.com/products");
        SetUser(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  } , []);

  console.log(user);
  
  
  if(loading) return <h1>Data Loading ...</h1>

  return (
    <div className='flex flex-wrap container gap-2'>
      {user && user.products.map(({ brand, thumbnail, title, description , images} , index) => (
        <div className='card w-96 p-4 bg-white border rounded-md' key={index}>
          {thumbnail && brand ? (<div className="image flex justify-center relative">
            <img className='h-52' src={thumbnail} alt={title} />
            <span className='shadow-effect h-fit p-1 rounded text-[12px] absolute right-0'>{brand}</span>
          </div>) : 
          (<div className="image flex justify-center">
            <img className='h-52' src={images[0]} alt={title} />
          </div>) }

          <div className="content">
            <p>{title}</p>
            <p>{description}</p>

          </div>
        </div>
      ))}
    </div>
  )
}

export default Banner;
