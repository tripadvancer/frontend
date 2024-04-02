import { FormButton } from '@/components/ui/form-button'
import { MapIcon16 } from '@/components/ui/icons'

export const LandingHeroCountry = () => {
    const countryRegion = fetch(`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/3000/api/edge-geo`).then(res => res.json())

    return (
        <div className="flex flex-col gap-8 rounded-2xl bg-orange-10 px-4 py-8 sm:flex-row sm:p-8">
            <div
                className="relative h-[416px] w-full rounded-2xl"
                style={{ backgroundImage: 'url(/images/countries/public/at.jpg)', backgroundSize: 'cover' }}
            />

            <div className="flex flex-none basis-80 flex-col gap-y-8 sm:justify-between">
                <div>
                    <div className="mb-4 text-h7-m sm:text-h7">Poland</div>
                    <div className="mb-4 h-[1px] bg-black-70 sm:mb-8" />
                    <p className="text-small">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ornare scelerisque nisl nec
                        consequat. Vestibulum eu malesuada ligula, eu iaculis est. Quisque mattis diam ligula, id
                        imperdiet libero iaculis et. In vitae turpis tortor.
                        <br />
                        <br />
                        Pellentesque vehicula tellus nunc, quis viverra sem ullamcorper eu. Integer dictum purus magna,
                        sed blandit nibh consectetur et. Proin mollis ligula at mi tempor, id luctus felis iaculis. Ut
                        sit amet tincidunt velit, ut aliquet augue. Sed luctus ac magna non gravida. Suspendisse
                        potenti. Proin eu massa tempus metus tristique scelerisque.
                    </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <FormButton className="sm:basis-1/2">View all places</FormButton>
                    <FormButton className="sm:basis-1/2" type="stroke" icon={<MapIcon16 />}>
                        Go to map
                    </FormButton>
                </div>
            </div>
        </div>
    )
}
