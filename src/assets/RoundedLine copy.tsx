function RoundedLine({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 949 622"
      {...props}
    >
      <path
        stroke="url(#paint0_linear_38_185)"
        d="M824.084 1H928c11.046 0 20 8.954 20 20v580c0 11.046-8.954 20-20 20H21c-11.046 0-20-8.954-20-20V21C1 9.954 9.954 1 21 1h103.916"
        opacity="0.3"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_38_185"
          x1="474.5"
          x2="474.5"
          y1="1"
          y2="621"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default RoundedLine
