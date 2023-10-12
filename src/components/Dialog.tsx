type DialogProps = {
    content: React.ReactNode
    onClose: () => void
}

export const Dialog = ({ content, onClose }: DialogProps) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-40 overflow-y-auto before:fixed before:bottom-0 before:left-0 before:right-0 before:top-0 before:bg-custom-black-100 before:opacity-50">
            <div className="flex min-h-full items-center justify-center">
                <div className="relative m-16 rounded-2xl bg-white p-16 shadow-lg phone:m-4 phone:w-full phone:px-8 phone:py-16">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={onClose}
                        className="absolute right-4 top-4 cursor-pointer text-custom-black-15 hover-animated hover:text-custom-blue-active"
                    >
                        <path
                            fillRule="evenodd"
                            d="M13.4545 12L20 18.5455L18.5455 20L12 13.4545L5.45455 20L4 18.5455L10.5455 12L4 5.45455L5.45455 4L12 10.5455L18.5455 4L20 5.45455L13.4545 12Z"
                        />
                    </svg>
                    {content}
                </div>
            </div>
        </div>
    )
}
