'use client'

import Session from 'supertokens-web-js/recipe/session'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { IUserInfo } from '@/utils/types/user'

import { useToast } from '@/providers/toast-provider'
import { getWidgetIsMenuOpened, toggleWidgetMenu } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { api } from '@/redux/services/api'
import { useI18n } from '@/utils/i18n/i18n.client'

export const WidgetHeaderUserMenu = ({ id }: IUserInfo) => {
    const t = useI18n()
    const router = useRouter()
    const toast = useToast()
    const dispatch = useAppDispatch()
    const isMenuOpened = useAppSelector(getWidgetIsMenuOpened)

    const signOut = async () => {
        try {
            await Session.signOut()
            dispatch(toggleWidgetMenu())
            dispatch(api.util.invalidateTags(['Places']))
            router.refresh()
        } catch (err) {
            toast.error(t('common.error'))
        }
    }

    if (isMenuOpened) {
        return (
            <nav className="flex flex-col items-end gap-y-4 px-4 pb-8 pt-4 text-big-bold sm:px-8 sm:pt-0">
                <Link href={`users/${id}/places`} className="flex items-center gap-x-2">
                    {t('header.user_menu.places')}
                    {/* prettier-ignore */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M13 14.9291C16.3923 14.4439 19 11.5265 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.5265 7.60771 14.4439 11 14.9291V22L12 23L13 22V14.9291ZM17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" />
                </svg>
                </Link>

                <Link href={`users/${id}/reviews`} className="flex items-center gap-x-2">
                    {t('header.user_menu.reviews')}
                    {/* prettier-ignore */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6 22L12.0868 18.1581H20C21.1046 18.1581 22 17.2539 22 16.1384V4.01977C22 2.90428 21.1046 2 20 2H4C2.89543 2 2 2.90428 2 4.01977V16.1384C2 17.2539 2.89543 18.1581 4 18.1581H6V22ZM11.5132 16.1384L8 18.3558V16.1384H4V4.01977H20V16.1384H11.5132Z" />
                </svg>
                </Link>

                <Link href={`users/${id}/settings`} className="flex items-center gap-x-2">
                    {t('header.user_menu.settings')}
                    {/* prettier-ignore */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" />
                    <path fillRule="evenodd" d="M18.6562 20.897L20.8733 18.6798L20.0925 15.843L20.4327 15.0305L23 13.5818V10.4464L20.44 8.99173L20.1055 8.18067L20.8961 5.34235L18.6774 3.12683L15.8403 3.90748L15.0296 3.56758L13.5808 1H10.4454L8.99072 3.56004L8.17985 3.89446L5.34198 3.10281L3.1267 5.31809L3.90748 8.15567L3.56758 8.96634L1 10.4151V13.5496L3.55774 15.0076L3.89252 15.8193L3.10197 18.6572L5.31809 20.8733L8.15567 20.0925L8.96644 20.4325L10.4153 22.999H13.5498L15.0067 20.4412L15.8183 20.1065L18.6562 20.897ZM18.8527 13.6256L17.9809 15.7078L18.6362 18.0886L18.0678 18.657L15.692 17.9951L13.609 18.8542L12.3873 20.999H11.5829L10.3714 18.8529L8.29155 17.9808L5.90947 18.6362L5.34203 18.0688L6.00385 15.693L5.14482 13.6101L3 12.3876V11.583L5.1471 10.3715L6.0192 8.29155L5.36375 5.90947L5.93001 5.34321L8.30576 6.00595L10.3895 5.14655L11.6093 3H12.4129L13.6245 5.1471L15.7044 6.0192L18.087 5.36362L18.6558 5.93166L17.9941 8.30696L18.8534 10.3906L21 11.6103V12.4139L18.8527 13.6256Z" />
                </svg>
                </Link>

                <span className="link-red flex items-center gap-x-2" onClick={signOut}>
                    {t('header.user_menu.log_out')}
                    {/* prettier-ignore */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2.4578C4.94289 3.73207 2 7.52236 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 7.52236 19.0571 3.73207 15 2.4578V4.58152C17.9318 5.76829 20 8.64262 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 8.64262 6.06817 5.76829 9 4.58152V2.4578Z" />
                    <path d="M11 2H13V12H11V2Z" />
                </svg>
                </span>
            </nav>
        )
    }

    return null
}
