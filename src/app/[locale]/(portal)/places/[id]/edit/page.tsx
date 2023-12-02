export default async function EditPlacePage({ params }: { params: { locale: string; id: string } }) {
    return (
        <div className="flex flex-col">
            Header
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container py-24">
                    <div className="inner-container flex flex-col gap-16 lg:flex-row-reverse lg:gap-8">
                        <div className="flex w-full flex-col gap-y-8 lg:w-64">Sidebar</div>
                        <div className="flex flex-1 flex-col gap-y-16">Body</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
