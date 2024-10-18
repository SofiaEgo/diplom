import React from "react";
import VideoSlider from "../components/VideoSlider";
import { FaChalkboardTeacher, FaCode, FaRocket } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-6 py-12 space-y-16">
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            Полезные видео
          </h2>
          <VideoSlider />
        </section>
        <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
          <h2 className="text-4xl font-semibold text-center mb-12">
            Наши Услуги
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <FaChalkboardTeacher className="text-5xl text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-center">
                Наставничество
              </h3>
              <p className="text-gray-200 text-center">
                Учитесь и развивайтесь в области фронтенд-разработки под
                руководством опытных менторов.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <FaCode className="text-5xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-center">
                Курсы по разработке
              </h3>
              <p className="text-gray-200 text-center">
                Обучающие курсы по разработке сайтов, приложений и многое другое
                для всех уровней.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <FaRocket className="text-5xl text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-center">
                Проектное обучение
              </h3>
              <p className="text-gray-200 text-center">
                Реализуйте реальные проекты, чтобы закрепить полученные знания и
                навыки на практике.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100 text-gray-800">
          <h2 className="text-4xl font-semibold text-center mb-12">
            Преимущества нашей платформы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-4">Доступ к экспертам</h3>
              <p className="text-gray-600">
                Возможность обучаться у лучших специалистов и получать
                качественные знания.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-4">
                Интерактивное обучение
              </h3>
              <p className="text-gray-600">
                Практические задания и проекты для отработки навыков.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-4">Гибкое расписание</h3>
              <p className="text-gray-600">
                Обучение в удобное для вас время с возможностью пересмотра
                материалов.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-indigo-900 to-blue-800 text-white">
          <h2 className="text-4xl font-semibold text-center mb-12">
            Часто задаваемые вопросы
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                Как записаться на курс?
              </h3>
              <p className="text-gray-200">
                Вы можете выбрать интересующий вас курс и записаться на него
                через наш сайт.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                Какова стоимость обучения?
              </h3>
              <p className="text-gray-200">
                Стоимость варьируется в зависимости от курса и его длительности.
                Подробности указаны в описании курса.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                Как работает система наставничества?
              </h3>
              <p className="text-gray-200">
                Наши опытные наставники помогут вам разобраться с трудностями и
                дадут полезные советы по проектам.
              </p>
            </div>
          </div>
        </section>
        <section className="py-16 bg-white text-gray-800">
          <h2 className="text-4xl font-semibold text-center mb-12">
            Новости и обновления
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-4">
                Запуск нового курса по React
              </h3>
              <p className="text-gray-600">
                Мы рады объявить о запуске нового курса по React. Узнайте все о
                хуках, управлении состоянием и создании современных
                веб-приложений.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-4">
                Вебинар по UX/UI дизайну
              </h3>
              <p className="text-gray-600">
                Присоединяйтесь к нашему бесплатному вебинару по основам UX/UI
                дизайна и узнайте, как создавать интуитивно понятные интерфейсы.
              </p>
            </div>
          </div>
        </section>
        <section className="py-16 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
          <h2 className="text-4xl font-semibold text-center mb-12">
            Отзывы студентов
          </h2>
          <div className="max-w-3xl mx-auto text-gray-200 space-y-6">
            <p>
              “Эта платформа изменила мой подход к обучению. Благодарю за такие
              замечательные курсы и поддержку!”
            </p>
            <p className="mt-4">- Софья</p>
            <button className="mt-8 px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Связаться с нами
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
