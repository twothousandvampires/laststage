// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  nitro: {
    static: true, // Оптимизация для статических файлов
  },
  build: {
    transpile: ['core'],
  },
  vite: {
    // Включаем поддержку работы с файлами вне корневой папки клиента
    server: {
      fs: {
        allow: ['..'] 
      }
    },
    build: {
      minify: 'terser', // Явно включаем Terser
      terserOptions: {
        compress: {
          drop_console: true, // Удаляет все console.log в продакшене
          drop_debugger: true,
        },
        mangle: {
          keep_classnames: false, // Разрешаем переименовывать классы (Room станет 'a')
          keep_fnames: false,     // Разрешаем переименовывать функции
        },
        format: {
          comments: false, // Удаляем все комментарии
        },
      },
    },
  },
  app: {
    head: {
      title: 'last stage',
      script: [
        { 
          src: 'https://telegram.org/js/telegram-web-app.js', 
        }
      ]
    }
  },
  $development: {
    app:{
      head: {
        title: 'last stage'
      }
    }
  },
  runtimeConfig: {
    public: {
      basePort: process.env.BASE_PORT,
      baseIp: process.env.BASE_IP,
    }
  },
  plugins: [
        '~/plugins/socket.js',
        '~/plugins/audio.js',
        '~/plugins/tooltip.js'
  ],
  modules: ['@nuxt/ui']
})