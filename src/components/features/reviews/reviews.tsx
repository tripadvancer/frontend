'use client'

import { IReview } from '@/utils/types/review'

import { Review } from '@/components/features/review/review'
import { FormButton } from '@/components/ui/form-button'
import { reviewsAPI } from '@/redux/services/reviews-api'
import { useI18n } from '@/utils/i18n/i18n.client'

type ReviewsProps = {
    variant: 'place-page' | 'user-page'
}

export const Reviews = ({ variant }: ReviewsProps) => {
    // const t = useI18n()
    // const [page, setPage] = useState(1)
    // const response = reviewsAPI.useGetReviewsByPlaceIdQuery({ placeId: resourceId, page })

    // if (response.isSuccess) {
    //     return (
    //         <div className="flex flex-col gap-y-8">
    //             {response.data.items.map((review, index) => (
    //                 <Review
    //                     key={index}
    //                     review={review}
    //                     reviewsCount={response.data.items.length as number}
    //                     variant={variant}
    //                 />
    //             ))}

    //             {response.data.totalPages > page && (
    //                 <FormButton
    //                     type="stroke"
    //                     shape="rounded"
    //                     className="w-full"
    //                     isLoading={response.isFetching}
    //                     onClick={() => setPage(prev => prev + 1)}
    //                 >
    //                     {t('common.action.load_more')}
    //                 </FormButton>
    //             )}
    //         </div>
    //     )
    // }

    return <div></div>
}
