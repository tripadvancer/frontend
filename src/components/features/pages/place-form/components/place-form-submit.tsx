'use client'

import Link from 'next/link'

import { FormButton } from '@/components/ui/form-button'

type PlaceFormSubmitProps = {
    isLoading: boolean
    isDisabled: boolean
}

export const PlaceFormSubmit = ({ isLoading, isDisabled }: PlaceFormSubmitProps) => {
    return (
        <div className="flex flex-col lg:flex-row lg:gap-x-8">
            <div className="flex-1">
                <FormButton htmlType="submit" className="mb-4 w-full" isLoading={isLoading} isDisabled={isDisabled}>
                    Save changes
                </FormButton>
                <p className="text-small text-black-40 text-center">
                    By adding a new place to the map, you acknowledge and accept our{' '}
                    {<Link href="/legal/terms-and-conditions">Terms and Conditions</Link>} and{' '}
                    {<Link href="/legal/privacy-policy">Privacy Policy</Link>}.
                </p>
            </div>
            <div className="hidden w-64 lg:block" />
        </div>
    )
}
