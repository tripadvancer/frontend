import { auth } from './auth.ru'
import { landing } from './landing.ru'
import { savePlace } from './save-space.ru'
import { widget } from './widget.ru'

export default {
    ...auth,
    ...landing,
    ...savePlace,
    ...widget,

    'cookie_consent.title': 'Согласие на использование файлов cookie',
    'cookie_consent.description': 'Этот веб-сайт использует файлы cookie, чтобы обеспечить Вам максимальное удобство. Дополнительную информацию Вы можете найти в нашей {cookie_policy_link}.',
    'cookie_consent.policy_link': 'Политике использования файлов cookie',
    'cookie_consent.got_it': 'Понял!',

    'email_verification_notice.text': 'Ваш адрес электронной почты не был подтверждён. Подтвердите Ваш email, перейдя по ссылке в отправленном при регистрации письме. {learn_more_link}',
    'email_verification_notice.learn_more_link': 'Узнать больше',

    'abandoned_warning': 'Места в категории "Заброшки" могут быть опасны, будьте осторожны.',

    'about.title': 'Планируете путешествие, но не знаете куда поехать?',
    'about.description': 'Tripadvancer поможет Вам открыть мир с новой стороны, найти интересные места и отправиться в увлекательное путешествие.',

    'confirm_mini.title': 'Уверены?',
    'confirm_mini.yes': 'Да',
    'confirm_mini.no': 'Нет',

    'confirm.delete_place.title': 'Удалить место',
    'confirm.delete_place.message': 'Вы уверены, что хотите удалить это место и все связанные с ним данные? Это действие необратимо.',

    'confirm.request_personal_data.title': 'Запросить персональные данные',
    'confirm.request_personal_data.message': 'Вы уверены, что хотите запросить копию своих персональных данных?',

    'confirm.request_user_deletion.title': 'Удалить учётную запись',
    'confirm.request_user_deletion.message': 'Вы уверены, что хотите начать процесс удаления своей учётной записи и всех связанных с ней данных?',

    'confirm.yes': 'Подтвердить',
    'confirm.no': 'Отмена',

    'header.user_menu.my_profile': 'Профиль',
    'header.user_menu.places': 'Мои места',
    'header.user_menu.reviews': 'Мои отзывы',
    'header.user_menu.settings': 'Настройки',
    'header.user_menu.log_out': 'Выйти',
    'header.link.map': 'Карта',
    'header.link.company_blog': 'Блог',

    'common.error': 'Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.',
    'common.empty_message.reviews': 'Здесь пока нет отзывов.',
    'common.empty_message.places': 'Здесь пока нет мест.',

    'common.distance.km': '{distance} км',
    'common.distance.m': '{distance} м',

    'common.link.sign_up': 'Зарегистрироваться',
    'common.link.sign_in': 'Войти',
    'common.link.add_place': 'Добавить место',
    'common.link.terms': 'Terms and Conditions',
    'common.link.privacy': 'Privacy Policy',

    'common.action.show_more': 'Показать ещё',
    'common.action.close': 'Закрыть',
    'common.action.return_home': 'На главную',
    'common.action.go_home': 'Перейти на главную',
    'common.action.try_again': 'Попробовать снова',
    'common.action.send': 'Отправить',
    'common.action.delete': 'Удалить',
    'common.action.cancel': 'Отмена',
    'common.action.ok': 'Ок',
    'common.action.save_changes': 'Сохранить изменения',
    'common.action.confirm': 'Подтвердить',
    'common.action.load_more': 'Загрузить ещё ...',
    'common.action.route': 'Маршрут',
    'common.action.locate_me': 'Найти меня',
    'common.action.go_to_map': 'На карту',
    'common.action.save': 'Сохранить',

    'paginator.prev': 'Назад',
    'paginator.next': 'Вперёд',

    'validation.required': 'Это поле обязательно для заполнения',
    'validation.file.types': 'Разрешены только файлы {types}',
    'validation.file.max_size': 'Размер файла не должен превышать {size} МБ',
    'validation.file.max_count': 'Вы можете загрузить не более {count} файлов',
    'validation.text.min_length': 'Длина поля не должна быть меньше {min_length} символов',
    'validation.text.max_length': 'Длина поля не должна превышать {max_length} символов',
    'validation.email.invalid': 'Неверный формат email адреса',
    'validation.email.already_exists': 'Этот email уже занят',
    'validation.wrong_credentials': 'Неверный email или пароль',
    'validation.wrong_password': 'Вы ввели неверный пароль',
    'validation.wrong_email': 'Вы ввели неверный email',
    'validation.username.already_exists': 'Это имя уже занято',
    'validation.password.policy_violated': 'Пароль должен содержать не менее 8 символов, включая буквы и цифры',

    'validation.place.title.required': 'Вы не указали название места',
    'validation.place.title.min_length': 'Название места должно быть не менее {min_length} символов',
    'validation.place.title.max_length': 'Название места должно быть не более {max_length} символов',
    'validation.place.description.required': 'Вы не указали описание места',
    'validation.place.description.min_length': 'Описание места должно быть не менее {min_length} символов',
    'validation.place.description.max_length': 'Описание места должно быть не более {max_length} символов',
    'validation.place.location.invalid': 'Неверный формат координат, укажите их в формате: "широта, долгота", например "50.4501, 30.5234"',
    'validation.place.categories.required': 'Вы должны выбрать хотя бы одну категорию',
    'validation.place.categories.max_count': 'Вы можете выбрать не более {max_count} категорий',

    'placeholder.email': 'Email',
    'placeholder.password': 'Пароль',
    'placeholder.username': 'Имя пользователя',
    'placeholder.file': 'Выберите файл ...',
    'placeholder.file.loading': 'Загрузка файла ...',
    'placeholder.action.place.cover': 'Загрузите обложку (jpg, png до 10 Мб)',
    'placeholder.action.username': 'Введите имя пользователя',
    'placeholder.action.about_user': 'Напишите что-нибудь о себе',
    'placeholder.action.about_place': 'Введите описание места',
    'placeholder.action.review': 'Развёрнуто поделитесь своими впечатлениями - так Вы поможете остальным узнать больше о месте',
    'placeholder.action.complain.comment': 'Опишите причину жалобы',
    'placeholder.action.password': 'Введите пароль',
    'placeholder.action.new_password': 'Введите новый пароль',
    'placeholder.action.email': 'Введите email',
    'placeholder.action.new_email': 'Введите новый email',
    'placeholder.action.list_name': 'Введите название списка',
    'placeholder.place.title': 'Введите название места',
    'placeholder.place.coordinates': 'Выберите местоположение',

    'success.send_complaint': 'Ваша жалоба была успешно отправлена.',
    'success.copy_coordinates': 'Координаты были скопированы в буфер обмена.',
    'success.create_place': 'Ваше место было успешно добавлено.',
    'success.update_place': 'Ваше место было успешно обновлено.',
    'success.delete_place': 'Место было успешно удалено.',
    'success.create_review': 'Ваш отзыв был успешно добавлен.',
    'success.update_review': 'Ваш отзыв был успешно обновлён.',
    'success.delete_review': 'Отзыв был успешно удалён.',
    'success.change_user_password': 'Ваш пароль был успешно изменён.',
    'success.update_user_avatar': 'Ваш аватар был успешно обновлён.',
    'success.update_user_info': 'Ваш профиль был успешно обновлён.',
    'success.request_personal_data': 'Мы отправили Вам письмо с копией Ваших персональных данных.',

    'categories.all': 'Все категории',

    'complaint.reasons.abuse': 'Неправомерное использование, плохое обращение или умышленный вред',
    'complaint.reasons.copyright': 'Нарушение авторских или интеллектуальных прав',
    'complaint.reasons.duplicate': 'Дубликат, не добавляющий ценности',
    'complaint.reasons.false': 'Некорректная или вводящая в заблуждение информация',
    'complaint.reasons.fraud': 'Мошенничество, обман',
    'complaint.reasons.inappropriate': 'Неуместный или непристойный контент',
    'complaint.reasons.spam': 'Незначимый или нежелательный контент',
    'complaint.reasons.other': 'Другая причина',

    'complaint.form.review.title': 'Пожаловаться на отзыв',
    'complaint.form.place.title': 'Пожаловаться на место',

    'user_achievement.level_1': 'Новичок',
    'user_achievement.statistic.added_places': 'Добавлено мест',
    'user_achievement.statistic.added_photos': 'Добавлено фото',
    'user_achievement.statistic.added_reviews': 'Написано отзывов',
    'user_achievement.statistic.visited_places': 'Посещено мест',
    'user_achievement.statistic.visited_countries': 'Посещено стран',

    'user_tabs.map': 'Моя карта',
    'user_tabs.places': 'Мои места',
    'user_tabs.reviews': 'Мои отзывы',
    'user_tabs.settings': 'Настройки',

    'countries.places#zero': 'Нет мест',
    'countries.places#one': '{count} место',
    'countries.places#few': '{count} места',
    'countries.places#many': '{count} мест',
    'countries.places#other': '{count} мест',

    'place.actions.i_was_here': 'Я был здесь',
    'place.actions.navigate': 'Маршрут',
    'place.actions.save': 'Сохранить',
    'place.actions.show_on_map': 'Показать на карте',
    'place.actions.share': 'Поделиться',
    'place.actions.complain': 'Пожаловаться',
    'place.actions.edit': 'Редактировать место',
    'place.actions.delete': 'Удалить место',

    'place.reviews#zero': 'Нет отзывов',
    'place.reviews#one': '{count} отзыв',
    'place.reviews#few': '{count} отзыва',
    'place.reviews#many': '{count} отзывов',
    'place.reviews#other': '{count} отзывов',

    'place.rating.empty': 'У этого места пока нет оценки',
    'place.rating': '{reviews} со средней оценкой {avg_rating}',

    'review.user_actions.edit': 'Редактировать',
    'review.user_actions.delete': 'Удалить',
    'review.user_actions.complain': 'Пожаловаться',
    'review.user_actions.add': 'Добавить отзыв',

    'review.form.edit.title': 'Изменить Ваш отзыв',
    'review.form.add.title': 'Добавить отзыв',
    'review.form.fields.rating.label': 'Ваша оценка',
    'review.form.fields.text.label': 'Отзыв',
    'review.form.fields.photos.label': 'Фотографии',

    'map.popup.location.title': 'Выбранное место',
    'map.popup.location.add_place': 'Добавить место',
    'map.popup.location.i_am_here': 'Я здесь',

    'pages.not_found.title': 'Страница не найдена',
    'pages.not_found.text': 'Извините, но похоже, Вы забрели в неизведанные территории. Страница, которую Вы искали, либо была перемещена, удалена, либо никогда не существовала.',

    'pages.error.title': 'Упс! Что-то пошло не так',
    'pages.error.text': 'Мы действительно сожалеем, но похоже, что в цифровой вселенной произошёл сбой. Наши серверы в настоящее время испытывают технические трудности, и мы прилагаем все усилия, чтобы всё вернулось в норму.',

    'pages.countries.title': 'Все страны',

    'pages.country.description': 'Здесь собраны удивительные места, рекомендованные опытными путешественниками. Откройте для себя уникальные черты такой страны, как {country}, следуя советам тех, кто уже её посетил. Создайте свой неповторимый маршрут и погрузитесь в увлекательное путешествие всего в несколько кликов!',
    'pages.country.view_all': 'Все страны',
    'pages.country.places.empty': 'Тут пока нет мест. Будьте первым, кто добавит место!',

    'pages.place.about.title': 'О месте',
    'pages.place.photos.title': 'Фотографии',
    'pages.place.reviews.title': 'Отзывы',
    'pages.place.map.title': '{place_name} на карте',
    'pages.place.map.alt': 'Карта с местом {place_name}',
    'pages.place.place_nearby.title': 'Места рядом',
    'pages.place.author.title': 'Автор',

    'pages.user.about_me': 'Обо мне',
    'pages.user.settings.forms.fields.avatar.label': 'Аватар',
    'pages.user.settings.forms.fields.username.label': 'Имя пользователя',
    'pages.user.settings.forms.fields.info.label': 'Расскажите о себе',
    'pages.user.settings.forms.submit': 'Сохранить',
    'pages.user.settings.account.title': 'Ваша учётная запись',

    'pages.user.account.verify_email.title': 'Ваш email не подтверждён',
    'pages.user.account.verify_email.text': 'Подтверждённые аккаунты имеют больше возможностей. Пожалуйста, подтвердите Ваш email, перейдя по ссылке в письме, которое мы отправили Вам при регистрации.',
    'pages.user.account.verify_email.action': 'Отправить письмо ещё раз',

    'pages.user.account.change_email.title': 'Email',
    'pages.user.account.change_email.text': 'Ваш адрес электронной почты будет использоваться для входа в систему, получения уведомлений и восстановления пароля.',
    'pages.user.account.change_email.action': 'Изменить email',

    'pages.user.account.change_password.title': 'Пароль',
    'pages.user.account.change_password.text': 'Мы рекомендуем Вам использовать пароль, отличный от других Ваших учётных записей в Интернете, а так же изменять его время от времени.',
    'pages.user.account.change_password.action': 'Изменить пароль',

    'pages.user.account.request_personal_data.title': 'Персональные данные',
    'pages.user.account.request_personal_data.text': 'Вы можете запросить копию своих персональных данных, которые мы храним. Это включает в себя любые данные, которые Вы предоставили нам при регистрации, такие как имя пользователя, адрес электронной почты и другие дополнительные сведения.',
    'pages.user.account.request_personal_data.action': 'Запросить',

    'pages.user.account.request_user_deletion.title': 'Учётная запись',
    'pages.user.account.request_user_deletion.text': 'Вы можете запросить удаление своей учётной записи и всех связанных с ней данных. Вы сможете восстановить свою учётную запись, используя ссылку, отправленную на Ваш email, до завершения процесса удаления.',
    'pages.user.account.request_user_deletion.action': 'Удалить учётную запись',

    'pages.add_place.about.title': 'О месте',
    'pages.add_place.about.info': 'Расскажите, что вдохновило Вас — так Вы поможете остальным узнать больше об этом месте',
    'pages.add_place.add_category': 'Добавить категорию',
    'pages.add_place.photos.title': 'Фотографии',
    'pages.add_place.photos.info': 'Вы можете загрузить до {max_count} фотографий.',
    'pages.add_place.submit': 'Добавить место',
    'pages.add_place.submit.info': 'Добавляя новое место на карту, Вы подтверждаете и принимаете наши {terms_link} и {privacy_link}.',

    'places_nearby_warning.title': 'Внимание',
    'places_nearby_warning.text': 'Извините, добавление нового места в этой области невозможно, так как уже есть другие места в радиусе {radius}м. Если место, которое Вы хотели добавить, есть в списке ниже, пожалуйста, поделитесь своим отзывом. В противном случае, обратитесь в нашу службу поддержки.',

    'select_categories.title': 'Выберите до {max_count} категорий',

    'location_picker.title': 'Выберите местоположение',
    'location_picker.placeholder': 'Адрес или координаты',

    'choose_navigation_app.title': 'Выберите приложение для навигации',

    'share_place.title': 'Поделиться местом',
    'share_place.text': 'Поделитесь этим местом с друзьями, чтобы они тоже могли его посетить.',
    'share_place.copy.success': 'Ссылка была скопирована в буфер обмена.',
} as const
