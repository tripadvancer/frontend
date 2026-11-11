export const UserSidebarAbout = async ({ info }: { info: string | null }) => {
    if (!info) {
        return null
    }

    return (
        <section>
            <h3 className="text-caps mb-4 uppercase">About me</h3>
            <p className="break-words">{info}</p>
        </section>
    )
}
