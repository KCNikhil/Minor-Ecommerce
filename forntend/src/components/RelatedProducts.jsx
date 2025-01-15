import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const RelatedProducts = ({catogery,subCatogery}) => {

    const {products } = useContext(ShopContext);
    const [related,setRelated] = useState([]);

    useEffect(()=>{
        if(products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=> catogery === item.catogery);
            productsCopy = productsCopy.filter((item)=> subCatogery === item.subCatogery);

            setRelated(productsCopy.slice(0,5));
        }
    })

  return (
    <div>
      
    </div>
  )
}

export default RelatedProducts
