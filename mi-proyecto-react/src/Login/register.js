import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './carousel';
import './carousel.css';

const Register = () => {
  const navigate = useNavigate();

  return (
    <section className="login-section">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0"> 
                
                {/* 📌 Sección del Formulario */}
                <div className="col-lg-6 form-container">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <h4 className="mt-1 mb-5 pb-1">"Ruta Maya"</h4>
                    </div>

                    <form>
                     
                      <div className="form-outline mb-4">
                        <label>Nombre Completo</label>
                        <input type="text" className="form-control" placeholder="Nombre Completo" />
                      </div>

                      <div className="form-outline mb-4">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Email address" />
                      </div>

                      <div className="form-outline mb-4">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" />
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button type="button" className="btn btn-success btn-rounded" onClick={() => navigate('/login')}>Iniciar Sesión</button>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <button type="button" className="btn btn-success btn-rounded" onClick={() => navigate('/register')}>
                          Registrarse
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* 📌 Sección del Carrusel (Ocupará TODO el espacio disponible de la mitad derecha) */}
                <div className="col-lg-6 carousel-container">
                  <Carousel />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
