export const UserSidebarAbout = async ({ info }: { info: string | null }) => {
    if (!info) {
        return null
    }

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">About me</h3>
            <p className="break-words">{info}</p>
        </section>
    )
}
