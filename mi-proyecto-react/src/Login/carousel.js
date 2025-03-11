import React from 'react';
import './carousel.css';
import  'bootstrap/dist/css/bootstrap.min.css';


const Carousel = () => {
    return (
        <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://larevistadelsureste.com/wp-content/uploads/2022/08/5-PALENQUE-CHIAPAS-1536x1025.jpeg" className="carousel-image" alt="Imagen 1" />
          </div>
          <div className="carousel-item">
            <img src="https://visitchiapas.com/v1/admin/archivos/Turismo/multimedia/8d828886_21062020_1509.jpg" className="carousel-image" alt="Imagen 2" />
          </div>
          <div className="carousel-item">
            <img src="https://1.bp.blogspot.com/_jP6jzVnE2xc/S85AH0i1tkI/AAAAAAAAAhQ/JTHOL_Qhp0Y/s1600/Palenque_0094.JPG" className="carousel-image" alt="Imagen 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    );
}
export default Carousel;