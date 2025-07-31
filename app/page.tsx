"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, MapPin, Instagram, Facebook, MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Datos de ejemplo para los tópicos
const topics = [
  {
    id: "rico-sin-tacc",
    title: "Rico y sin tacc",
    color: "bg-orange-500",
    places: [
      {
        name: "Yoana Chipacitos",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Local especializado en productos sin TACC, se destaca por su sabor auténtico correntino y su especialidad en chipá y repostería local, acompañada de jugos y licuados. ",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/yoana_chipacitos",
          facebook: "https://facebook.com/yoana.chipacitos",
          whatsapp: "https://wa.me/543794724968",
        },
        address: "Quintana 999, Corrientes",
        address2: "Av. 3 de Abril 1234", // Agregar dirección 2 
      },
      {
        name: "Valirio",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Es un espacio cálido y contemporáneo que celebra la buena comida con conciencia. Su propuesta gastronómica se destaca por ofrecer una amplia variedad de platos sin TACC, pensados especialmente para personas celíacas o que eligen una alimentación libre de gluten, sin resignar sabor ni calidad.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/valirio.restobar",
          facebook: "https://facebook.com/ValyrioCafe",
          whatsapp: "https://wa.me/+5493794568686",
        },
        address: "San Lorenzo 1997, Corrientes",
      },
      {
        name: "Lo de Pepe",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Un rincón acogedor donde la tradición se encuentra con el buen café. 'Lo de Pepe' es más que una cafetería: es un espacio para compartir música, cultura y sabores locales. Ideal para disfrutar de una merienda casera, encuentros entre amigos o noches de peña y eventos con artistas en vivo. Un lugar con alma, donde cada visita se siente como en casa.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/lodepepecafe",
          facebook: "https://www.facebook.com/profile.php?id=100083134640359 ",
          whatsapp: "https://wa.me/+5493794296947", // Sucursal san juan 
          whatsapp2: "https://wa.me/+5493795574304", // Sucursal Rioja
        },
        address: "San Juan 1037, Corrientes",
        address2: "Rioja 625, Corrientes", //agregar
      },
      {
        name: "La Felipa",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Un espacio encantador en Corrientes, donde cada detalle está pensado para que disfrutes una merienda casera, fresca y con estilo. Con un ambiente cálido, juvenil y pet friendly, La Felipa combina accesibilidad, diseño vanguardista y compromiso medioambiental, creando una experiencia única que invita a quedarse.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/lafelipa.meriendas",
          facebook: "https://facebook.com/lafelipa.meriendas",
          whatsapp: "https://wa.me/+5493794525086",
        },
        address: "Salta 498, Corrientes",
        address2: "RN12 1034, Corrientes", // Agregar dirección 2 
      }
    ],
  },
  {
    id: "historia-cultura",
    title: "Historia y cultura",
    color: "bg-amber-600",
    places: [
      {
        name: "Museo de Bellas Artes Vidal",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "El Museo Provincial de Bellas Artes “Dr. Juan R. Vidal”, ubicado en una casona histórica de Corrientes, resguarda una valiosa colección de arte argentino que abarca desde obras clásicas hasta expresiones contemporáneas. Ofrece exposiciones permanentes y temporarias, visitas guiadas, cine, conciertos y talleres educativos. La entrada es libre y gratuita. Ideal para disfrutar del arte y la cultura en un entorno patrimonial.",
        images: [
          "https://museosdecorrientes.org/wp-content/uploads/2018/01/museo-de-bellas-artes.jpg",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/museovidalctes",
          facebook: "https://facebook.com/museovidalcorrientes",
          whatsapp: "https://wa.me/0",
        },
        address: "San Juan 634, Corrientes",
      },
      {
        name: "Centro de Interpretacion Ibera",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Es el centro de interpretación y bienvenida al Gran Parque Iberá, ubicado en la ciudad de Corrientes. Ofrece experiencias inmersivas con tecnologías interactivas, audiovisuales y recursos educativos sobre la biodiversidad, la cultura local y el ecosistema del Iberá. Es un punto clave para informarse sobre los portales de acceso a los esteros y planificar visitas. Además, brinda actividades educativas, charlas y exposiciones temporarias.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/casa.ibera",
          facebook: "https://facebook.com/CasaIbera",
          whatsapp: "https://wa.me/0",
        },
        address: "Carlos Pellegrini 501, Corrientes",
      },
      {
        name: "Museo Casa Martinez",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "El Museo Casa Martínez, ubicado en la ciudad de Corrientes, funciona en una antigua casona colonial que perteneció a la familia Martínez. Ofrece un recorrido por salas ambientadas con mobiliario de época, objetos históricos y documentos que narran la vida cotidiana del siglo XIX. Además, realiza actividades culturales, visitas guiadas y talleres educativos que conectan el pasado con la comunidad actual.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/museocasamartinez",
          facebook: "https://www.facebook.com/profile.php?id=100093797866794 ",
          whatsapp: "https://wa.me/0",
        },
        address: "Fray José de la Quintana 971, Corrientes",
      }
    ],
  },
  {
    id: "entretenimiento-teatro",
    title: "Entretenimiento y teatro",
    color: "bg-purple-600",
    places: [
      {
        name: "Teatro Vera",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Ubicado en el corazón de la ciudad de Corrientes, el Teatro Oficial Juan de Vera es uno de los espacios culturales más emblemáticos del nordeste argentino. Su sala principal, con capacidad para más de 500 personas, alberga una programación variada que incluye teatro, música, danza, cine y espectáculos multidisciplinarios.",
        images: [
          "/images/teatro_vera.jpg",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/teatrooficialjuandevera",
          facebook: "https://facebook.com/TeatroOficialJuandeVera",
          whatsapp: "https://wa.me/0",
        },
        address: "San Juan 637, Corrientes",
      },
        {
          name: "Espacio Marinio",
          logo: "/placeholder.svg?height=60&width=60",
          description:
            "Es un centro cultural independiente. Funciona en una antigua casona del siglo XIX y se ha convertido en un punto de encuentro clave para la producción artística local. Ofrece una variada agenda de actividades que incluyen teatro, música en vivo, cine, exposiciones, ferias y talleres. Además de promover la cultura regional, el espacio se caracteriza por su compromiso con la autogestión, la diversidad y la participación comunitaria.",
          images: [
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
          ],
          social: {
            instagram: "https://instagram.com/espacio_marinio",
            facebook: "https://facebook.com/espaciomarinio",
            whatsapp: "https://wa.me/0",
          },
          address: "Santa Fé 847, Corrientes",
        },
        {
        name: "Flotantes las Siete Corrientes",
          logo: "/placeholder.svg?height=60&width=60",
          description:
            "Un rincón escondido detrás del puerto donde podés almorzar, merendar o cenar con una hermosa vista al Paraná. Teatro, cultura y actividades recreativas en un solo lugar.",
          images: [
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=300&width=400",
          ],
          social: {
            instagram: "https://instagram.com/flotantesietecorrientes",
            facebook: "https://facebook.com/FlotanteSieteCorrientes",
            whatsapp: "https://wa.me/543794556098",
          },
          address: "Rioja y Av.Costanera, Corrientes",
        }
    ],
  },
  {
    id: "aventura-naturaleza",
    title: "Aventura y naturaleza",
    color: "bg-green-600",
    places: [
      {
        name: "Carayá Ecoparuque",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "El Carayá Ecoparque está ubicado en la reserva Laguna Brava, a pocos minutos de la ciudad de Corrientes. Es un espacio de aventura y naturaleza que ofrece actividades como kayak, remo, arquería, escalada y circuitos de cuerdas. Abierto todos los días de 10 a 18 hs, también es ideal para eventos familiares, escolares o jornadas de trabajo en equipo.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/caraya.ecoparque",
          facebook: "https://www.facebook.com/profile.php?id=100069462267280 ",
          whatsapp: "https://wa.me/5493794575184",
        },
        address: "RP5 km 8, Corrientes",
      },
      {
        name: "Reserva Natural Laguna Brava",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Ubicada a pocos kilómetros de la ciudad de Corrientes, protege un valioso ecosistema de laguna y monte nativo. Ofrece senderos, miradores, parrillas y sanitarios para disfrutar de la naturaleza, con avistaje de aves como patos, gallaretas y lobitos de río. Es un espacio ideal para el turismo de naturaleza, con actividades guiadas como kayak, arquería y escalada en el cercano Carayá Ecoparque.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/reservanaturallaguna",
          facebook: "https://facebook.com/0",
          whatsapp: "https://wa.me/0",
        },
        address: "RP5, Laguna Brava, Corrientes",
      },
      {
        name: "Reserva Natural Municipal Santa Catalina",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Ubicada al sur de la ciudad de Corrientes, protege 275 hectáreas de bosques nativos, palmares y pastizales. Alberga más de 20.000 especies de flora y fauna autóctonas, como el lapacho, el timbó y el aguará guazú. Ofrece visitas guiadas gratuitas dos veces al mes, con inscripción previa vía Muni Bot o sitio municipal.  Ideales para el ecoturismo, la educación ambiental y la observación de la naturaleza.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/Reservamunicipalcorrientes",
          facebook: "https://facebook.com/0",
          whatsapp: "https://wa.me/0",
        },
        address: "RP5, Laguna Brava, Corrientes", //Agregar direccion
      },
      {
        name: "Parque Provincial San Cayetano",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Este parque destaca por su biodiversidad, albergando una rica avifauna con 179 especies registradas, incluyendo algunas amenazadas como el loro hablador y el batitú. Su paisaje combina bosques, palmares, esteros y lagunas, ofreciendo un entorno ideal para actividades educativas y científicas. Además, el parque es un destino popular para ecoturismo, permitiendo a los visitantes disfrutar de la naturaleza y participar en programas de conservación y educación ambiental.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/parqueprovsancayetano",
          facebook: "https://facebook.com/parqueprovincialsancayetano",
          whatsapp: "https://wa.me/0",
        },
        address: "Av. San Cayetano, Corrientes", //Agregar direccion
      }
    ],
  },
  {
    id: "arte-algo-mas",
    title: "Localidades del Interior",
    color: "bg-pink-600",
    places: [
      {
        name: "Paso de la Patria",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "En la provincia de Corrientes, es un pintoresco pueblo ribereño sobre el río Paraná, famoso por sus playas, pesca deportiva y naturaleza exuberante. Ideal para quienes buscan tranquilidad, actividades al aire libre como navegación y avistaje de aves, y disfrutar de la gastronomía local. Un destino perfecto para el turismo familiar, actividades nauticas y pesca.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/pasodelapatriaturismo",
          facebook: "https://facebook.com/galeria.arte.moderno",
          whatsapp: "https://wa.me/0",
        },
        address: "Paso de la Patria, Corrientes",
      },
      {
        name: "Manuel Derqui",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Pequeña localidad de perfil rural y costero, ubicada a orillas del río Paraná. Se destaca por sus actividades pesqueras, con eventos como la Fiesta del Pescador, y por espacios como su balneario público y el camping Río Bonito, ideales para la pesca recreativa, actividades náuticas, turismo de naturaleza y descanso. Se convierte así en un destino especial para quienes buscan un lugar tranquilo donde conectar con la naturaleza y el río.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/manuelderqui",
          facebook: "https://www.facebook.com/profile.php?id=100086564806795 ",
          whatsapp: "https://wa.me/0",
        },
        address: "Manuel Derqui, Corrientes",
      },
      {
        name: "Empedrado",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Empedrado, conocida como la 'Perla del Paraná', es una localidad costera de Corrientes que se destaca por sus barrancas, playas y actividades como pesca, senderismo y deportes náuticos. Ofrece atractivos culturales como la Iglesia de Nuestro Señor Hallado, fiestas patronales y eventos tradicionales como la Fiesta Provincial de los Estudiantes. Ideal para el turismo de naturaleza, descanso y cultura regional.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/turismoempedrado",
          facebook: "https://www.facebook.com/municipalidadempedrado",
          whatsapp: "https://wa.me/0",
        },
        address: "Empedrado, Corrientes",
      },
      {
        name: "Bella Vista",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Ubicada a orillas del río Paraná en Corrientes, se destaca por sus playas, la pesca deportiva y su rica historia cultural. Ofrece atractivos como el yacimiento paleontológico Toropí, paseos naturales y eventos tradicionales como la Fiesta Nacional de la Naranja. Su entorno natural y sus festividades la convierten en un destino ideal para disfrutar del litoral.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/turismobellavistactes",
          facebook: "https://www.facebook.com/bellavistamuni",
          whatsapp: "https://wa.me/0",
        },
        address: "Bella Vista, Corrientes",
      },
      {
        name: "Goya",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Destino que combina el encanto natural del Paraná con una historia rica y viva, arquitectura patrimonial, festivales coloridos y una propuesta ideal para el descanso activo, la pesca, los deportes y el turismo cultural. Un lugar donde el río, el tabaco, la historia y la fiesta se entrelazan para ofrecer una experiencia auténtica.",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        social: {
          instagram: "https://instagram.com/turismogoya",
          facebook: "https://www.facebook.com/goyaciudadok",
          whatsapp: "https://wa.me/0",
        },
        address: "Goya, Corrientes",
      }
    ],
  },
]

const externalLinks = [
  {
    title: "Turismo Corrientes Oficial",
    logo: "/placeholder.svg?height=40&width=40",
    url: "https://turismo.corrientes.gob.ar",
  },
  {
    title: "Guía de Restaurantes",
    logo: "/placeholder.svg?height=40&width=40",
    url: "https://guiarestaurantes.com.ar",
  },
  {
    title: "Eventos y Festivales",
    logo: "/placeholder.svg?height=40&width=40",
    url: "https://eventoscorrientes.com",
  },
]

export default function CorrentesTourism() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<number>(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Auto-scroll para las imágenes
  useEffect(() => {
    if (selectedTopic) {
      const topic = topics.find((t) => t.id === selectedTopic)
      if (topic && topic.places[selectedPlace]) {
        const interval = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % topic.places[selectedPlace].images.length)
        }, 7000)
        return () => clearInterval(interval)
      }
    }
  }, [selectedTopic, selectedPlace])

  // Mostrar botón de scroll top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId)
    setSelectedPlace(0)
    setCurrentImageIndex(0)
  }

  const closeTopic = () => {
    setSelectedTopic(null)
    setSelectedPlace(0)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    const topic = topics.find((t) => t.id === selectedTopic)
    if (topic && topic.places[selectedPlace]) {
      setCurrentImageIndex((prev) => (prev + 1) % topic.places[selectedPlace].images.length)
    }
  }

  const prevImage = () => {
    const topic = topics.find((t) => t.id === selectedTopic)
    if (topic && topic.places[selectedPlace]) {
      setCurrentImageIndex((prev) => (prev === 0 ? topic.places[selectedPlace].images.length - 1 : prev - 1))
    }
  }

  const openMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(`${address}, Corrientes, Argentina`)
    window.open(`https://maps.google.com/?q=${encodedAddress}`, "_blank")
  }

  const selectedTopicData = topics.find((t) => t.id === selectedTopic)
  const currentPlace = selectedTopicData?.places[selectedPlace]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwTg7Etb4fMtVF6QWynadYH3QsSTJROr_29A&s')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Qué hacer en Corrientes</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Descubre los mejores lugares y experiencias que nuestra hermosa ciudad tiene para ofrecerte
          </p>
        </motion.div>
      </div>

      {/* Topics Section */}
      <div className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center"
          >
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${topic.color} flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
                onClick={() => handleTopicClick(topic.id)}
              >
                <h3 className="text-white font-bold text-center text-sm md:text-base px-2 leading-tight">
                  {topic.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Topic Detail Modal */}
      <AnimatePresence>
        {selectedTopic && selectedTopicData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeTopic}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedTopicData.title}</h2>
                  <Button variant="ghost" size="icon" onClick={closeTopic} className="hover:bg-gray-100">
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Places Navigation */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {selectedTopicData.places.map((place, index) => (
                    <Button
                      key={index}
                      variant={selectedPlace === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedPlace(index)
                        setCurrentImageIndex(0)
                      }}
                      className="whitespace-nowrap"
                    >
                      {place.name}
                    </Button>
                  ))}
                </div>

                {/* Current Place Details */}
                {currentPlace && (
                  <div className="space-y-6">
                    {/* Place Header */}
                    <div className="flex items-center gap-4">
                      <img
                        src={currentPlace.logo || "/placeholder.svg"}
                        alt={`${currentPlace.name} logo`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{currentPlace.name}</h3>
                        <p className="text-gray-600">{currentPlace.description}</p>
                      </div>
                    </div>

                    {/* Image Carousel */}
                    <div className="relative">
                      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                        <img
                          src={currentPlace.images[currentImageIndex] || "/placeholder.svg"}
                          alt={`${currentPlace.name} image ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                          onClick={nextImage}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="flex justify-center gap-2 mt-4">
                        {currentPlace.images.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex ? "bg-blue-500" : "bg-gray-300"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Social Links and Location */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-4">
                        <h4 className="font-semibold mb-3 text-gray-800">Redes Sociales</h4>
                        <div className="flex gap-4">
                          <a
                            href={currentPlace.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
                          >
                            <Instagram className="h-5 w-5" />
                            <span className="text-sm">Instagram</span>
                          </a>
                          <a
                            href={currentPlace.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Facebook className="h-5 w-5" />
                            <span className="text-sm">Facebook</span>
                          </a>
                          <a
                            href={currentPlace.social.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                          >
                            <MessageCircle className="h-5 w-5" />
                            <span className="text-sm">WhatsApp</span>
                          </a>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h4 className="font-semibold mb-3 text-gray-800">Ubicación</h4>
                        <button
                          onClick={() => openMaps(currentPlace.address)}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <MapPin className="h-5 w-5" />
                          <span className="text-sm">{currentPlace.address}</span>
                        </button>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* External Links Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Info que también te podría interesar</h2>
            <p className="text-gray-600 text-lg">Recursos adicionales para planificar tu visita</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {externalLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="block"
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <img
                      src={link.logo || "/placeholder.svg"}
                      alt={`${link.title} logo`}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{link.title}</h3>
                      <p className="text-sm text-gray-600">Visitar sitio web</p>
                    </div>
                  </div>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm opacity-80">© 2024 Qué hacer en Corrientes. Todos los derechos reservados.</p>
          <p className="text-xs opacity-60 mt-2">Desarrollado con ❤️ para promover el turismo en Corrientes</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors z-40"
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
