import Link from 'next/link'
import React from 'react'

const ProductDisplay = (props) => {
  let tempArrForSizes = []
  let tempArrForColors = []
  tempArrForSizes.push(props.sizes)
  tempArrForColors.push(props.colors)
  let sizes = Array.isArray(props.sizes)? props.sizes: tempArrForSizes; 
  let colors = Array.isArray(props.colors)? props.colors: tempArrForColors; 
  let outofStock = props.availableQuantity < 1;
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer">
      <Link href={'/product/' + props.slug}>
        <span className="block relative rounded overflow-hidden">
          <img alt="ecommerce" className="w-full sm:mx-auto object-cover object-top h-[40vh] block" src={props.img} />
        </span>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font uppercase mb-1">{props.category}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{props.name}</h2>
          {sizes.length !== 0 ? <>{sizes?.map(size => { return <span key={size}>{size + ' '}</span> })}</> : null}
          <div className="mt-1">
          </div>
          <div className="mt-1">
            {colors.length !== 0 ? <>{colors?.map(color => {
              return <button key={color} className={`border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none`} style={{
                backgroundColor: color
              }}></button>
            })}</> : null}
          </div>
          <p className="mt-1 text-black">${props.price}</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductDisplay