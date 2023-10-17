import classNames from 'classnames'

import Link from 'next/link'

import { getScopedI18n } from '@/utils/i18n.server'

type PaginatorProps = {
    pages: number
    currentPage: number
}

const PageItem = ({ content, isCurrent }: { content: number | string; isCurrent: boolean }) => (
    <li className="h-10 w-10">
        {content === '...' ? (
            <span className="flex h-full w-full items-center justify-center text-blue-100">...</span>
        ) : (
            <Link
                href={{ query: { page: content } }}
                className={classNames(
                    'hover:border-blue-active hover:text-blue-active flex h-full w-full items-center justify-center rounded-full border',
                    isCurrent ? 'border-blue-active bg-blue-active text-blue-20' : 'border-blue-20 text-blue-100',
                )}
            >
                {content}
            </Link>
        )}
    </li>
)

export const Paginator = async ({ pages, currentPage }: PaginatorProps) => {
    const t = await getScopedI18n('common.paginator')
    const maxVisiblePages = 5
    const pageNumbers: (number | string)[] = []

    const renderPageNumbers = () => {
        if (pages <= maxVisiblePages) {
            for (let i = 1; i <= pages; i++) {
                pageNumbers.push(i)
            }
        } else if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
            pageNumbers.push(...Array.from({ length: maxVisiblePages - 1 }, (_, i) => i + 1))
            pageNumbers.push('...')
            pageNumbers.push(pages)
        } else if (currentPage >= pages - Math.floor(maxVisiblePages / 2)) {
            pageNumbers.push(1)
            pageNumbers.push('...')
            pageNumbers.push(
                ...Array.from({ length: maxVisiblePages - 2 }, (_, i) => pages - (maxVisiblePages - 2) + i),
            )
        } else {
            pageNumbers.push(1)
            pageNumbers.push('...')
            pageNumbers.push(
                ...Array.from(
                    { length: maxVisiblePages - 2 },
                    (_, i) => currentPage - Math.floor(maxVisiblePages / 2) + i,
                ),
            )
            pageNumbers.push('...')
            pageNumbers.push(pages)
        }

        return pageNumbers.map((number, index) => (
            <PageItem key={index} content={number} isCurrent={number === currentPage} />
        ))
    }

    return (
        <div className="mt-8 flex justify-center gap-x-1 font-medium">
            <Link
                href={{ query: { page: currentPage - 1 } }}
                className={classNames(
                    'border-blue-20 hover:border-blue-active hover:text-blue-active flex h-10 items-center justify-center rounded-full border px-6 text-blue-100',
                    { 'pointer-events-none opacity-30': currentPage === 1 },
                )}
            >
                {t('prev')}
            </Link>
            <ol className="sm:flex hidden items-center justify-center gap-x-1">{renderPageNumbers()}</ol>
            <Link
                href={{ query: { page: currentPage + 1 } }}
                className={classNames(
                    'border-blue-20 hover:border-blue-active hover:text-blue-active flex h-10 items-center justify-center rounded-full border px-6 text-blue-100',
                    { 'pointer-events-none opacity-30': currentPage === pages },
                )}
            >
                {t('next')}
            </Link>
        </div>
    )
}
