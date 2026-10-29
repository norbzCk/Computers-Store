import logo from '../assets/Billionaire\'s computers logo.png'

const sizes = {
  sm: {
    img: 'h-10',
    line1: 'text-[16px]',
    line2: 'text-[13px] tracking-[0.18em]',
  },
  md: {
    img: 'h-10 sm:h-12 lg:h-14',
    line1: 'text-[18px] sm:text-[21px] lg:text-[24px]',
    line2: 'text-[14px] sm:text-[17px] lg:text-[19px] tracking-[0.16em]',
  },
  lg: {
    img: 'h-16 sm:h-20 lg:h-24',
    line1: 'text-[26px] sm:text-[34px] lg:text-[40px]',
    line2: 'text-[21px] sm:text-[27px] lg:text-[32px] tracking-[0.18em]',
  },
}

export default function Logo({ size = 'md', className = '' }) {
  const s = sizes[size] || sizes.md

  return (
    <span className={`inline-flex items-center gap-2 sm:gap-3 ${className}`.trim()}>
      <img src={logo} alt="Billionaire's Computers" className={`${s.img} w-auto shrink-0`} />
      <span className="flex flex-col items-center text-center leading-tight">
        <span className={`font-bold uppercase whitespace-nowrap text-navy ${s.line1}`}>
          Billionaire's
        </span>
        <span className={`font-bold uppercase whitespace-nowrap text-primary ${s.line2}`}>
          Computers
        </span>
      </span>
    </span>
  )
}
