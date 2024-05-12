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

    'widget.tabs.all': 'Все места',
    'widget.tabs.saved': 'Сохранённые',

    'widget.all_places.empty_message': 'В этой области нет мест.{br}Попробуйте изменить категории или увеличьте масштаб.',
        
    'widget.saved.empty_message': 'У Вас нет списков.{br}Создайте список, чтобы cохранять в него места.',
    'widget.saved.not_logged_in': 'Для просмотра сохранённых мест необходимо {sign_in_link}.',
    
    'widget.saved.lists.empty_message': 'Этот список пуст.{br}Добавьте место в список или измените категории.',
    'widget.saved.lists.add_button': 'Создать список',
    'widget.saved.lists.info': 'Выберите список, чтобы увидеть сохранённые места.',
    'widget.saved.lists.show_only_list': 'На карте',
    'widget.saved.lists.places#one': '{count} место',
    'widget.saved.lists.places#few': '{count} места',
    'widget.saved.lists.places#many': '{count} мест',
    'widget.saved.lists.places#other': '{count} мест',
    'widget.saved.lists.private': 'Приватный',
    'widget.saved.lists.public': 'Публичный',
    'widget.saved.lists.enable_map_filter': 'Включить режим предпросмотра',
    'widget.saved.lists.disable_map_filter': 'Отключить режим предпросмотра',

    'widget.random.empty_message': 'Не найдено мест, соответствующих Вашим фильтрам.{br}Попробуйте изменить категории или радиус.',
    'widget.random.distance_cation': 'Расстояние от Вас',
    'widget.random.info': 'Выберите категории, радиус вокруг вас или указанной точки, и мы подберем для Вас интересное место.',
    'widget.random.button': 'Найти случайное место',
    'widget.random.button_coundown': 'Найти случайное место ({countdown})',
    'widget.random.error.not_location': 'Чтобы найти случайное место — нужно разрешить доступ к вашему местоположению или выбрать “Я здесь“ на карте.',
    
    'widget.toggler.map': 'Карта',
    'widget.toggler.search_and_filters': 'Поиск и фильтры',
} as const