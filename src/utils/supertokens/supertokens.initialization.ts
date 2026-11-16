let resolveInitialization!: () => void

const initialization = new Promise<void>(resolve => {
    resolveInitialization = resolve
})

export const waitForSuperTokensInitialization = () => initialization

export const markSuperTokensInitialized = () => {
    resolveInitialization()
}
