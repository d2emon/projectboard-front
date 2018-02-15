export default {
  items: [
    {
      name: 'Панель',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'НОВОЕ'
      }
    },
    {
      title: true,
      name: 'Темы',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Цвета',
      url: '/theme/colors',
      icon: 'icon-drop'
    },
    {
      name: 'Типография',
      url: '/theme/typography',
      icon: 'icon-pencil'
    },
    {
      title: true,
      name: 'Компоненты',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Базовые',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Крошки',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Карточки',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Карусель',
          url: '/base/carousels',
          icon: 'icon-puzzle'
        },
        {
          name: 'Свертывание',
          url: '/base/collapses',
          icon: 'icon-puzzle'
        },
        {
          name: 'Формы',
          url: '/base/forms',
          icon: 'icon-puzzle'
        },
        {
          name: 'Панели',
          url: '/base/jumbotrons',
          icon: 'icon-puzzle'
        },
        {
          name: 'Группы Списков',
          url: '/base/list-groups',
          icon: 'icon-puzzle'
        },
        {
          name: 'Навигация',
          url: '/base/navs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Пагинация',
          url: '/base/paginations',
          icon: 'icon-puzzle'
        },
        {
          name: 'Всплывающие',
          url: '/base/popovers',
          icon: 'icon-puzzle'
        },
        {
          name: 'Прогресс',
          url: '/base/progress-bars',
          icon: 'icon-puzzle'
        },
        {
          name: 'Выключатели',
          url: '/base/switches',
          icon: 'icon-puzzle'
        },
        {
          name: 'Таблицы',
          url: '/base/tables',
          icon: 'icon-puzzle'
        },
        {
          name: 'Ярлычки',
          url: '/base/tooltips',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Кнопки',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Обычные Кнопки',
          url: '/buttons/standard-buttons',
          icon: 'icon-cursor'
        },
        {
          name: 'Группы Кнопок',
          url: '/buttons/button-groups',
          icon: 'icon-cursor'
        },
        {
          name: 'Выпадающие',
          url: '/buttons/dropdowns',
          icon: 'icon-cursor'
        },
        {
          name: 'Социальные',
          url: '/buttons/social-buttons',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'Иконки',
      url: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'Флаги',
          url: '/icons/flags',
          icon: 'icon-star',
          badge: {
            variant: 'success',
            text: 'НОВОЕ'
          }
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7'
          }
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Графики',
      url: '/charts',
      icon: 'icon-pie-chart'
    },
    {
      name: 'Сообщения',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Предупреждения',
          url: '/notifications/alerts',
          icon: 'icon-bell'
        },
        {
          name: 'Бейджи',
          url: '/notifications/badges',
          icon: 'icon-bell'
        },
        {
          name: 'Модалки',
          url: '/notifications/modals',
          icon: 'icon-bell'
        }
      ]
    },
    {
      name: 'Виджеты',
      url: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'primary',
        text: 'НОВОЕ'
      }
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Дополнительное'
    },
    {
      name: 'Страницы',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Вход',
          url: '/pages/login',
          icon: 'icon-star'
        },
        {
          name: 'Регистрация',
          url: '/pages/register',
          icon: 'icon-star'
        },
        {
          name: 'Error 404',
          url: '/pages/404',
          icon: 'icon-star'
        },
        {
          name: 'Error 500',
          url: '/pages/500',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Скачать CoreUI',
      url: 'http://coreui.io/vue/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success'
    },
    {
      name: 'Попробовать CoreUI PRO',
      url: 'http://coreui.io/pro/vue/',
      icon: 'icon-layers',
      variant: 'danger'
    }
  ]
}
