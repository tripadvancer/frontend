export const widget = {
    'widget.error': 'Произошла непредвиденная ошибка.{br}Пожалуйста, попробуйте позже.',
    'widget.sign_in_link': 'авторизоваться',
    
    'widget.search.placeholder': 'Найти страну, место или адрес',

    'widget.categories.title': 'Категории',
    'widget.categories.selected#one': 'выбрана {count} категория',
    'widget.categories.selected#few': 'выбрано {count} категории',
    'widget.categories.selected#many': 'выбрано {count} категорий',
    'widget.categories.selected#other': 'выбрано {count} категорий',

    'widget.places.title': 'Места',

    'widget.tabs.all': 'Все',
    'widget.tabs.saved': 'Сохраненные',
    'widget.tabs.visited': 'Я посетил',
    'widget.tabs.random': 'Случайное',

    'widget.all_places.empty_message': 'В этой области нет мест.{br}Попробуйте измените категории или увеличьте масштаб карты.',

    'widget.visited_places.empty_message': 'Вы еще не посетили ни одного места.{br}Добавьте место в посещенные, чтобы увидеть его здесь.',
    'widget.visited_places.not_logged_in': 'Для просмотра посещенных мест необходимо {sign_in_link}.',
    
    'widget.random.empty_message': 'Не найдено мест, соответствующих Вашим фильтрам.{br}Попробуйте изменить категории или радиус.',
    'widget.random.info': 'Выберите категории, радиус вокруг Вас и найдите случайное место.',
    'widget.random.button': 'Найти случайное место',
    'widget.random.button_coundown': 'Найти случайное место ({countdown})',
    'widget.random.error.not_location': 'Чтобы найти случайное место — нужно разрешить доступ к вашему местоположению или выбрать “Я здесь“ на карте.',
    
    'widget.saved.empty_message': 'У Вас нет списков.{br}Создайте список, чтобы cохранять в него места.',
    'widget.saved.not_logged_in': 'Для просмотра сохраненных мест необходимо {sign_in_link}.',
    
    'widget.saved.lists.empty_message': 'Вы еще не сохранили ни одного места.',
    'widget.saved.lists.add_button': 'Создать список',
    'widget.saved.lists.info': 'Выберите список, чтобы увидеть сохранённые места.',
    'widget.saved.lists.show_only_list': 'Показать на карте',
    'widget.saved.lists.places#one': '{count} место',
    'widget.saved.lists.places#few': '{count} места',
    'widget.saved.lists.places#many': '{count} мест',
    'widget.saved.lists.places#other': '{count} мест',
    'widget.saved.lists.private': 'Приватный',
    'widget.saved.lists.public': 'Публичный',
    
    'widget.toggler.map': 'Карта',
    'widget.toggler.search_and_filters': 'Поиск и фильтры',
} as const