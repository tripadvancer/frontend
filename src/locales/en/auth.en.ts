export const auth = {
    'auth.change_email.title': 'Change email',
    'auth.change_email.info': 'Enter your new email address below and we will send you a verification email:',

    'auth.change_email_completing.title': 'Confirm your new email',
    'auth.change_email_completing.message': 'We have sent you a verification email. After confirming your new email address, you will be able to sign in using it.',

    'auth.change_password.title': 'Change password',
    'auth.change_password.info': 'Create a new password that is at least 8 characters long and contains a mix of letters and numbers:',

    'auth.claim_email_error.title': 'Your email is not verified',
    'auth.claim_email_error.message': 'Verified accounts have more features. Please confirm your email by clicking the link in the email we sent you during registration.',
    'auth.claim_email_error.resend_verification_email': 'Resend Verification Email',
    'auth.claim_email_error.go_to_settings': 'Or change your email. {settings_link}',
    'auth.claim_email_error.settings_link': 'Settings',

    'auth.confirm_user_deletion.loading': 'Starting the deletion process...',
    'auth.confirm_user_deletion.token_expired': 'The confirmation link has expired. Please request a new confirmation link.',
    'auth.confirm_user_deletion.ok': 'The deletion process has been started. This process may take up to several days. You can restore your account using the link sent to your email until the deletion process is finished.',

    'auth.forgot_password_completing.title': 'Completing the recovery',
    'auth.forgot_password_completing.message': 'We sent you an email with instructions on how to reset your password.',

    'auth.forgot_password.title': 'Forgot your password?',
    'auth.forgot_password.submit': 'Restore password',
    'auth.forgot_password.info': 'To reset your password, please enter your email address. We will send an email to the provided address with instructions on how to reset your password:',
    'auth.forgot_password.to_back': '{sign_in_link} or {sign_up_link}',

    'auth.reset_password.title': 'Enter your new password below',
    'auth.reset_password.token_expired': 'The password reset link has expired. Please request a new password reset link.',
    'auth.reset_password.ok': 'Your password has been reset.',
    'auth.reset_password.submit': 'Reset password',

    'auth.restore_user.loading': 'Restoring your account...',
    'auth.restore_user.token_expired': 'The restore link has expired. Please request a new restore link.',
    'auth.restore_user.ok': 'Your account has been restored.',

    'auth.signin.title': 'Sign in',
    'auth.signin.third_party.or': 'Or',
    'auth.signin.submit': 'Sign in',
    'auth.signin.link.forgot_password': 'Forgot password?',
    'auth.signin.to_back': 'Don’t have an account? {sign_up_link}',

    'auth.signin_reject.title': 'Your account is pending deletion',
    'auth.signin_reject.message': 'We have sent you the instructions to restore your account. Please note that there is a limited time window available for account restoration.',

    'auth.signup.title': 'Sign up',
    'auth.signup.third_party.title': 'Or, sign up with your email address',
    'auth.signup.submit': 'Sign up',
    'auth.signup.info': 'By completing the registration process, you acknowledge and accept our {terms_link} and {privacy_link}.',
    'auth.signup.to_back': 'Have an account? {sign_in_link}',

    'auth.signup_completing.title': 'Verify your email',
    'auth.signup_completing.message': 'We have sent you a verification email. Please check your inbox and follow the instructions provided in the email to complete the verification process.',
    'auth.signup_completing.resend_verification_email': 'Resend Verification Email',

    'auth.third_party_callback.redirecting': 'You are being redirected...',
    'auth.third_party_callback.checking_status': 'We are checking your status...',
    'auth.third_party_callback.error.email_not_provided': 'No email provided by social login. Please use another form of login.',
    'auth.third_party_callback.error.email_already_exists': 'Seems like you already have an account with another method. Please use that instead.',

    'auth.verify_email.loading': 'Verifying your email...',
    'auth.verify_email.token_expired': 'The email verification link has expired. Please sign in again so we can send you a new verification link.',
    'auth.verify_email.ok': 'Your email has been verified.',

    'auth.request_user_deletion_completing.title': 'Requesting account deletion',
    'auth.request_user_deletion_completing.message': 'We have sent you an email with instructions on how to confirm the deletion of your account.',
} as const