import { WorldMap } from '@/components/features/world-map/world-map'

export const UserMap = () => {
    return (
        <div>
            {/* Tailwind find in svg path with id="ru" and fill-red-100 it */}
            <div className="relative mb-8 rounded-2xl bg-blue-10 fill-black-40 p-8">
                <WorldMap />
                <div className="absolute bottom-2 left-2 rounded-2xl bg-orange-20 px-4 py-2 text-small-bold">
                    3% world coverage
                </div>
            </div>

            <div>
                <div className="flex justify-between border-t border-dashed border-black-40 py-4 last:border-b">
                    <div className="text-big-bold">Poland</div>
                    <div className="text-big">27 places visited</div>
                </div>
                <div className="flex justify-between border-t border-dashed border-black-40 py-4 last:border-b">
                    <div className="text-big-bold">Germany</div>
                    <div className="text-big">15 places visited</div>
                </div>
                <div className="flex justify-between border-t border-dashed border-black-40 py-4 last:border-b">
                    <div className="text-big-bold">Italy</div>
                    <div className="text-big">3 places visited</div>
                </div>
            </div>
        </div>
    )
}
