import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="hero min-h-[50vh] bg-base-100 rounded-box shadow-xl mb-12">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative h-80 w-80">
                <div className="absolute top-0 right-0 h-64 w-64 bg-primary opacity-30 rounded-full z-0"></div>
                <div className="absolute top-16 left-0 h-64 w-64 bg-secondary opacity-30 rounded-full z-0"></div>
                <div className="absolute bottom-0 right-16 h-64 w-64 bg-accent opacity-30 rounded-full z-0"></div>
                <div className="relative z-10 grid grid-cols-3 gap-2">
                  <div className="p-2 bg-neutral rounded-box shadow-lg">
                    <div className="bg-blue-700 h-24 rounded-t-box flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <div className="p-2 text-center">
                      <div className="badge badge-primary mb-1">Platino</div>
                      <p className="text-xs text-white">God of War</p>
                    </div>
                  </div>
                  <div className="p-2 bg-neutral rounded-box shadow-lg">
                    <div className="bg-green-700 h-24 rounded-t-box flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                      </svg>
                    </div>
                    <div className="p-2 text-center">
                      <div className="badge badge-secondary mb-1">Raro</div>
                      <p className="text-xs text-white">Halo Infinite</p>
                    </div>
                  </div>
                  <div className="p-2 bg-neutral rounded-box shadow-lg">
                    <div className="bg-gray-700 h-24 rounded-t-box flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="p-2 text-center">
                      <div className="badge badge-accent mb-1">Épico</div>
                      <p className="text-xs text-white">Elden Ring</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h1 className="text-5xl font-bold text-primary-content">Comparte tus logros de juego</h1>
              <p className="py-6">Conecta con jugadores de todo el mundo y muestra tus trofeos de PlayStation, logros de Xbox y Steam en un solo lugar. ¡Presume de tus habilidades y descubre los logros de tus amigos!</p>
              {/* <button className="btn btn-primary">Empezar a compartir</button> */}
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Plataformas Compatibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">PS</span>
                </div>
                <h3 className="card-title">PlayStation</h3>
                {/* <p>Conecta tu cuenta de PlayStation Network y comparte automáticamente tus trofeos.</p> */}
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">XB</span>
                </div>
                <h3 className="card-title">Xbox</h3>
                {/* <p>Sincroniza tu cuenta de Xbox Live para mostrar todos tus logros conseguidos.</p> */}
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">S</span>
                </div>
                <h3 className="card-title">Steam</h3>
                {/* <p>Vincula tu perfil de Steam y comparte tus logros con toda la comunidad.</p> */}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {/* <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Comunidad de Jugadores
                </h2>
                <p>Conecta con otros jugadores, sigue a tus amigos y descubre nuevos juegos basados en los logros de tu comunidad.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Perfil Personalizado
                </h2>
                <p>Personaliza tu perfil para destacar tus logros más difíciles, raros o de los que estés más orgulloso.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Estadísticas Avanzadas
                </h2>
                <p>Visualiza estadísticas detalladas de tus logros, compara tu progreso con amigos y descubre patrones en tus hábitos de juego.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notificaciones en Tiempo Real
                </h2>
                <p>Recibe notificaciones cuando tus amigos desbloqueen nuevos logros o superen tus récords en juegos compartidos.</p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Testimonials */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Lo que dicen nuestros usuarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                      <span className="text-xl">M</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">Miguel94</h3>
                    <div className="rating rating-sm">
                      <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" readOnly checked />
                      <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" readOnly checked />
                      <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" readOnly checked />
                      <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" readOnly checked />
                      <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" readOnly checked />
                    </div>
                  </div>
                </div>
                <p>"Esta plataforma ha revolucionado la forma en que comparto mis logros. Ahora todos mis amigos pueden ver mis trofeos de PlayStation y Xbox en un solo lugar."</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center">
                      <span className="text-xl">L</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">Laura_Gamer</h3>
                    <div className="rating rating-sm">
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly checked />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly checked />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly checked />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly checked />
                      <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" readOnly checked />
                    </div>
                  </div>
                </div>
                <p>"Las estadísticas son increíbles. Puedo ver cuánto tiempo me llevó conseguir cada logro y compararme con mis amigos. ¡Una aplicación imprescindible para cazadores de trofeos!"</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center">
                      <span className="text-xl">C</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">Carlos_Steam</h3>
                    <div className="rating rating-sm">
                      <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" readOnly checked />
                      <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" readOnly checked />
                      <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" readOnly checked />
                      <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" readOnly checked />
                      <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" readOnly />
                    </div>
                  </div>
                </div>
                <p>"Por fin puedo mostrar mis logros de Steam junto con mis trofeos de PlayStation. La interfaz es muy intuitiva y la comunidad es súper activa."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para presumir tus logros?</h2>
            <p className="mb-6 max-w-2xl mx-auto">Únete a miles de jugadores que ya están compartiendo sus trofeos y conectando con otros apasionados del gaming. Regístrate ahora y comienza a mostrar tu colección de logros.</p>
            <div className="flex justify-center gap-4">
            <Link to="/signup" className="btn btn-primary">Crear cuenta</Link>
              {/* <button className="btn btn-primary">Crear cuenta</button> */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;