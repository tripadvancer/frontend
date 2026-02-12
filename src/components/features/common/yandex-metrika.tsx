'use client'

import { useEffect } from 'react'

export default function YandexMetrika() {
    useEffect(() => {
        if (window.ym) return
        ;(function (m, e, t, r, i, k, a) {
            m[i] =
                m[i] ||
                function () {
                    ;(m[i].a = m[i].a || []).push(arguments)
                }
            // @ts-ignore
            m[i].l = 1 * new Date()
            // @ts-ignore
            k = e.createElement(t)
            // @ts-ignore
            a = e.getElementsByTagName(t)[0]
            // @ts-ignore
            k.async = 1
            // @ts-ignore
            k.src = r
            // @ts-ignore
            a.parentNode.insertBefore(k, a)
        })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

        window.ym(106790574, 'init', {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
        })
    }, [])

    return null
}
