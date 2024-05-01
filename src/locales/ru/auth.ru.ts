export const auth = {
    'auth.change_email.title': 'Изменить email',
    'auth.change_email.info': 'Введите свой новый адрес электронной почты ниже, и мы отправим Вам письмо с подтверждением:',

    'auth.change_email_completing.title': 'Подтвердите Ваш новый email',
    'auth.change_email_completing.message': 'Мы отправили Вам письмо с подтверждением. После подтверждения нового адреса электронной почты Вы сможете войти в систему, используя его.',

    'auth.change_password.title': 'Изменить пароль',
    'auth.change_password.info': 'Создайте новый пароль длиной не менее 8 символов, содержащий сочетание букв и цифр:',

    'auth.claim_email_error.title': 'Ваш email не подтверждён',
    'auth.claim_email_error.message': 'Подтверждённые аккаунты имеют больше возможностей. Пожалуйста, подтвердите Ваш email, перейдя по ссылке в письме, которое мы отправили Вам при регистрации.',
    'auth.claim_email_error.resend_verification_email': 'Отправить письмо ещё раз',
    'auth.claim_email_error.go_to_settings': 'Или измените свой email. {settings_link}',
    'auth.claim_email_error.settings_link': 'Настройки',

    'auth.confirm_user_deletion.loading': 'Начинаем процесс удаления Вашей учётной записи...',
    'auth.confirm_user_deletion.token_expired': 'Срок действия ссылки истёк. Пожалуйста, запросите новую ссылку для удаления учётной записи.',
    'auth.confirm_user_deletion.ok': 'Процесс удаления Вашей учётной записи начат. Этот процесс может занять до нескольких дней. Вы можете восстановить свою учётную запись, используя ссылку, отправленную на Ваш email, до завершения процесса удаления.',

    'auth.forgot_password_completing.title': 'Восстановление пароля',
    'auth.forgot_password_completing.message': 'Мы отправили Вам письмо с инструкциями по восстановлению пароля.',

    'auth.forgot_password.title': 'Забыли пароль?',
    'auth.forgot_password.submit': 'Восстановить пароль',
    'auth.forgot_password.info': 'Укажите Ваш email и мы вышлем письмо с инструкцией по восстановлению пароля:',
    'auth.forgot_password.to_back': '{sign_in_link} или {sign_up_link}',

    'auth.reset_password.title': 'Введите новый пароль для Вашей учётной записи',
    'auth.reset_password.token_expired': 'Срок действия ссылки истёк. Пожалуйста, запросите новую ссылку для восстановления пароля.',
    'auth.reset_password.ok': 'Ваш пароль был успешно изменён.',
    'auth.reset_password.submit': 'Изменить пароль',

    'auth.restore_user.loading': 'Восстанавливаем Вашу учётную запись...',
    'auth.restore_user.token_expired': 'Срок действия ссылки истёк. Пожалуйста, запросите новую ссылку для восстановления учётной записи.',
    'auth.restore_user.ok': 'Ваша учётная запись была восстановлена.',

    'auth.signin.title': 'Вход',
    'auth.signin.third_party.or': 'Или',
    'auth.signin.submit': 'Войти',
    'auth.signin.link.forgot_password': 'Забыли пароль?',
    'auth.signin.to_back': 'Нет учётной записи? {sign_up_link}',

    'auth.signin_reject.title': 'Ваша учётная запись в процессе удаления',
    'auth.signin_reject.message': 'Мы отправили Вам инструкции по восстановлению Вашей учётной записи. Обратите внимание, что восстановление учётной записи доступно ограниченное время.',

    'auth.signup.title': 'Регистрация',
    'auth.signup.third_party.title': 'Или зарегистрируйтесь, используя свой email',
    'auth.signup.submit': 'Зарегистрироваться',
    'auth.signup.info': 'Завершая процесс регистрации, Вы подтверждаете и принимаете наши {terms_link} и {privacy_link}.',
    'auth.signup.to_back': 'Уже зарегистрированы? {sign_in_link}',

    'auth.signup_completing.title': 'Подтвердите Ваш email',
    'auth.signup_completing.message': 'Мы отправили Вам письмо с подтверждением. Пожалуйста, проверьте свой почтовый ящик и следуйте инструкциям в письме, чтобы завершить процесс подтверждения.',
    'auth.signup_completing.resend_verification_email': 'Отправить письмо ещё раз',

    'auth.third_party_callback.redirecting': 'Идёт перенаправление...',
    'auth.third_party_callback.checking_status': 'Мы проверяем статус Вашей учётной записи...',
    'auth.third_party_callback.error.email_not_provided': 'Мы не получили Ваш email от социальной сети. Пожалуйста, попробуйте другой способ входа.',
    'auth.third_party_callback.error.email_already_exists': 'Похоже, у Вас уже есть учётная запись с другим методом входа. Пожалуйста, используйте её для входа.',

    'auth.verify_email.loading': 'Проверяем Ваш email...',
    'auth.verify_email.token_expired': 'Ссылка для подтверждения email устарела. Пожалуйста, залогиньтесь снова, чтобы мы могли отправить Вам новую ссылку для подтверждения.',
    'auth.verify_email.ok': 'Ваш email был подтверждён.',

    'auth.request_user_deletion_completing.title': 'Запрос на удаление учётной записи',
    'auth.request_user_deletion_completing.message': 'Мы отправили Вам письмо с инструкциями по подтверждению удаления Вашей учётной записи.',
} as const