import { RefObject } from 'react'

import { useOnClickOutside } from 'usehooks-ts'

type ElementRef = RefObject<HTMLElement | null>

// usehooks-ts doesn't accept refs created with useRef<T>(null): https://github.com/juliencrn/usehooks-ts/issues/663
export function useClickOutside(refs: ElementRef | ElementRef[], handler: () => void) {
    useOnClickOutside(refs as RefObject<HTMLElement> | RefObject<HTMLElement>[], handler)
}
