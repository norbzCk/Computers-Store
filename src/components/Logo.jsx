import logo130 from '../assets/logo-130.webp'
import logo260 from '../assets/logo-260.webp'
import logo520 from '../assets/logo-520.webp'

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

const imageSizes = {
  sm: '54px',
  md: '(min-width: 1024px) 76px, (min-width: 640px) 65px, 54px',
  lg: '(min-width: 1024px) 130px, (min-width: 640px) 108px, 87px',
}

export default function Logo({ size = 'md', className = '', light = false }) {
  const s = sizes[size] || sizes.md
  const sizesAttr = imageSizes[size] || imageSizes.md

  return (
    <span className={`inline-flex items-center gap-2 sm:gap-3 ${className}`.trim()}>
      <img
        src={logo520}
        srcSet={`${logo130} 130w, ${logo260} 260w, ${logo520} 520w`}
        sizes={sizesAttr}
        alt="Billionaire's Computers"
        width="537"
        height="396"
        decoding="async"
        className={`${s.img} w-auto shrink-0 ${light ? 'rounded-full bg-white/95 p-1 shadow-lg' : ''}`}
      />
      <span className="flex flex-col items-center text-center leading-tight">
        <span className={`font-bold uppercase whitespace-nowrap ${light ? 'text-white' : 'text-navy'} ${s.line1}`}>
          Billionaire's
        </span>
        <span className={`font-bold uppercase whitespace-nowrap ${light ? 'text-sky-200' : 'text-primary'} ${s.line2}`}>
          Computers
        </span>
      </span>
    </span>
  )
}
