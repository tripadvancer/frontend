import { ReactNode } from 'react'

type DeviderProps = {
    children: ReactNode
}

export const Devider = ({ children }: DeviderProps) => {
    return (
        <div className="relative text-center">
            <hr className="absolute left-0 right-0 top-1/2 z-0 border-black-15" />
            <span className="relative z-10 bg-white px-4">{children}</span>
        </div>
    )
}
