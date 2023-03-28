import React from 'react'

function Rectangle({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 697 70"
      {...props}
    >
      <path
        fill="#fff"
        fillOpacity="0.1"
        d="M14.782 7.479A14 14 0 0126.888.51H671.3a13 13 0 0111.241 6.47l12.57 21.64a13 13 0 010 13.06l-12.57 21.64a13 13 0 01-11.241 6.47H26.888a14 14 0 01-12.106-6.968l-11.99-20.64a14 14 0 010-14.064l11.99-20.64z"
      ></path>
      <path
        stroke="url(#paint0_linear_38_209)"
        strokeOpacity="0.4"
        d="M15.214 7.73a13.5 13.5 0 0111.674-6.72H671.3c4.454 0 8.571 2.37 10.809 6.222l12.569 21.64a12.499 12.499 0 010 12.557L682.11 63.07a12.501 12.501 0 01-10.809 6.222H26.888a13.5 13.5 0 01-11.674-6.72L3.225 41.932a13.5 13.5 0 010-13.56L15.214 7.73z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_38_209"
          x1="-1.292"
          x2="719.025"
          y1="35.151"
          y2="35.151"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset="0.484" stopColor="#fff" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#fff"></stop>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Rectangle
