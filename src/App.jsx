
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Navbar, Nav, FormControl } from 'react-bootstrap';
import { BsSun, BsMoon } from 'react-icons/bs';
import './App.css';  // Asegúrate de tener los estilos en App.css


const services = [
  {
    title: 'Traspaso de Vehículos',
    image: 'https://fc-abogados.com/es/wp-content/uploads/2020/08/unnamed-1.png',
    description: 'Servicio de traspaso de vehículos, incluyendo todos los pasos y requisitos necesarios para completar el proceso de transferencia de propiedad.',
    subServices: [
      { name: 'Acto de Venta', price: 2500, type: 'checkbox' },
      { name: 'Documentos Notariado', price: 1500, type: 'checkbox' },
      { name: 'Cálculo del 2% del valor del vehículo', price: 0, type: 'conditionalInput' }
    ]
  },
  {
    title: 'Acta de Nacimiento',
    image: 'https://medicinalegalunivia.wordpress.com/wp-content/uploads/2015/05/derechosello-certification.jpg',
    description: 'Descripción breve del servicio de Acta de Nacimiento. Esto puede incluir detalles sobre cómo obtener el acta, requisitos y tiempos de entrega.',
    subServices: [
      { name: 'Copia certificada', price: 200,  type: 'checkbox' },
      { name: 'Copia digital', price: 150,  type: 'checkbox' }
    ]
  },
  {
    title: 'Actas Escolares',
    image: 'https://aprende.com/wp-content/uploads/2020/08/por-que-debes-certificar-tus-conocimientos-940x580.jpg',
    description: 'Descripción breve del servicio de Actas Escolares. Esto puede incluir detalles sobre cómo obtener las actas escolares, requisitos y tiempos de entrega.',
    subServices: [
      { name: 'Inextensa', price: 250,  type: 'checkbox' },
      { name: 'Fines escolares', price: 50,  type: 'checkbox' }
    ]
  },
  {
    title: 'Divorcios',
    image: 'https://cdn.actualicese.com/fotos/E-firma-legal-abogado-seguro-herencia-certificado-terminos4.jpg',
    description: 'Descripción breve del servicio de Divorcios. Esto puede incluir detalles sobre el proceso de divorcio, requisitos y tiempos de entrega.',
    subServices: [
      { name: 'Divorcio por mutuo consentimiento', price: 35000, type: 'checkbox' },
      { name: 'Petición de divorcio presentada por una de las partes', price: 48000, type: 'checkbox' },
      { name: 'Divorcio al vapor', price: 55000, type: 'checkbox' },
      { name: 'Existen activos en la relacion ?', price: 0, type: 'conditionalInput' }
    ]
  },
  {
    title: 'Certificaciones',
    image: 'https://hazrevista.org/wp-content/uploads/2019/01/certificacion-compliance.jpg',
    description: 'Descripción breve del servicio de Certificaciones. Esto puede incluir detalles sobre los tipos de certificaciones disponibles, requisitos y tiempos de entrega.',
    subServices: [
      { name: 'Certificación laboral', price: 400,  type: 'checkbox' },
      { name: 'Certificación académica', price: 300,  type: 'checkbox' }
    ]
  },
  {
    title: 'Certificaciones V2',
    image: 'https://argentinalegal.net/wp-content/uploads/2020/05/certificado-de-retencion-intro-e1589634105395.jpg',
    description: 'Descripción breve del servicio de Certificaciones. Esto puede incluir detalles sobre los tipos de certificaciones disponibles, requisitos y tiempos de entrega.',
    subServices: [
      { name: 'Certificación de ingresos', price: 600,  type: 'checkbox' },
      { name: 'Certificación de residencia', price: 350,  type: 'checkbox' }
    ]
  }
];




const ServiceCards = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [propertyValue, setPropertyValue] = useState('');

  const handleShowModal = (service) => {
    setSelectedService(service);
    setSelectedSubServices([]);
    setTotalPrice(0);
    setPropertyValue('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  const handleSubServiceChange = (index, type) => {
    const updatedSelectedSubServices = [...selectedSubServices];
    if (updatedSelectedSubServices.includes(index)) {
      updatedSelectedSubServices.splice(updatedSelectedSubServices.indexOf(index), 1);
    } else {
      updatedSelectedSubServices.push(index);
    }
    setSelectedSubServices(updatedSelectedSubServices);

    let total = updatedSelectedSubServices.reduce((acc, curr) => {
      return acc + selectedService.subServices[curr].price;
    }, 0);

    if (type === 'conditionalInput' && propertyValue) {
      total += parseFloat(propertyValue) || 0;
    }
    setTotalPrice(total);
  };

  const handlePropertyValueChange = (e) => {
    const value = (parseFloat(e.target.value) || 0);
    setPropertyValue(value);

    let total = selectedSubServices.reduce((acc, curr) => {
      return acc + selectedService.subServices[curr].price;
    }, 0);

    if (selectedSubServices.includes(selectedService.subServices.findIndex(s => s.type === 'conditionalInput'))) {
      total += (value *0.2)
    }

    setTotalPrice(total);
  };

  return (
    <Container>
      <Row>
        {services.map((service, index) => (
          <Col key={index} className='mb-4' xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Card.Img variant="top" src={service.image} />
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                <Button variant="primary" onClick={() => handleShowModal(service)}>
                  Solicitar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedService?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicCriteria">
              <Form.Label>Elige tus criterios</Form.Label>
              {selectedService?.subServices.map((subService, index) => (
                <div key={index}>
                  {subService.type === 'checkbox' ? (
                    <Form.Check
                      type="checkbox"
                      id={`subService-${index}`}
                      label={`${subService.name} - RD$${subService.price}`}
                      checked={selectedSubServices.includes(index)}
                      onChange={() => handleSubServiceChange(index, subService.type)}
                    />
                  ) : subService.type === 'conditionalInput' ? (
                    <div>
                      <Form.Check
                        type="checkbox"
                        id={`subService-${index}`}
                        label={subService.name}
                        checked={selectedSubServices.includes(index)}
                        onChange={() => handleSubServiceChange(index, subService.type)}
                      />
                      {selectedSubServices.includes(index) && (
                        <Form.Control
                          type="number"
                          placeholder="Ingrese el monto de las propiedades en la relación"
                          value={propertyValue}
                          onChange={handlePropertyValueChange}
                          style={{ width: '190px' }}
                        />
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </Form.Group>
            <Form.Group controlId="formBasicPrice">
              <Form.Label>Precio Total</Form.Label>
              <Form.Control type="text" value={`RD$${totalPrice}`} readOnly />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary">
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home">Oficina de Abogados</Navbar.Brand>

        <div className="d-flex">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={toggleDarkMode} className="ms-2 d-lg-none">
            {darkMode ? <BsSun /> : <BsMoon />}
          </Button>
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#services">Servicios</Nav.Link>
            <Nav.Link href="#contact">Contacto</Nav.Link>
          </Nav>
          <Form className="d-flex navar-search-form">
            <FormControl type="search" placeholder="Buscar" className="mr-2" aria-label="Buscar" />
            <Button variant="outline-success">Buscar</Button>
          </Form>
          <Button variant={darkMode ? "outline-light" : "outline-dark"} onClick={toggleDarkMode} className="ms-2 d-none d-lg-block">
            {darkMode ? <BsSun /> : <BsMoon />}
          </Button>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

function App() {
  return (
    <>
      <Header />
      <div style={{ marginTop: '75px' }}> {/* Añadir margen superior para evitar que el contenido quede debajo del header */}
        <ServiceCards />
      </div>
    </>
  );
}

export default App;
