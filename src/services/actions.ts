'use server'

export async function forgotPasswordAction(formData: FormData) {
    const url = process.env.API_URL + '/auth/forgot-password'
    const email = formData.get('email')

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
    } catch (err) {
        console.log(err)
    }
}
