"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, MapPin, Instagram, Facebook, MessageCircle, X, ChevronLeft, ChevronRight, Utensils, Globe, CalendarCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Datos de ejemplo para los tópicos
const topics = [
  {
    id: "rico-sin-tacc",
    title: "Café, comida y compañia",
    color: "bg-orange-500",
    places: [
      {
        name: "Yoana Chipacitos",
        logo: "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/305631931_391080759888189_3149520148533478838_n.png?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG3mDYNrf1mHGRe5JGuaEaJO5sJ1lnxRmU7mwnWWfFGZTF7zb599KxKpjUA1Zc6p8LBJdVth_m2KhK3lIQ8xazu&_nc_ohc=DF6mYN0ag3UQ7kNvwEjDmqg&_nc_oc=Adlqdz4Wek9yZx-iOiH5QuHoIrb-RCfYVC8YBYVUD26QS9bouptfxO8kaGuS2i_KZDs&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=F0DFqpIPEBAVsGb0xTNfkw&oh=00_AfWUaxP5_ayV2BDE-Q_MFNCqstfXH0gj1lDVhdxgfmTB4g&oe=68A1A457",
        description:
          "Local especializado en productos sin TACC, se destaca por su sabor auténtico correntino y su especialidad en chipá y repostería local, acompañada de jugos y licuados. ",
        images: [
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t1.6435-9/70120602_1382845865196175_5200399934469177344_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=0b6b33&_nc_eui2=AeE4kPTfHTszsfD1ZIni9GGVvKg7OBqwgSu8qDs4GrCBKx7ZNB40IlaGReDUCQXLLozdjIMe6vEYPrsmO9CQTJgQ&_nc_ohc=NZoSUoJC9XsQ7kNvwEVo-Ti&_nc_oc=Adk34l8sfwNlYmq6sMUHqmGVEMyIWONJVaMD2JYiwJLASz8n_IuMEdo0H7W_7pkT448&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=Bi8nqLJqHArtw7iKe-uesQ&oh=00_AfVka0l_x_BqtlsoG9KaImwWArw0BnkiWv10nbqq8vZdqA&oe=68C351DE",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t1.6435-9/73157124_1427201544093940_1981068676190699520_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=0b6b33&_nc_eui2=AeEoPPccPACXeoHdHYSdN0xy3rH6hGn4x2XesfqEafjHZUNFlWVO-VdWxMx5TSYq3FIsQsthaz9MWabj5N6foP2p&_nc_ohc=UN91p_8KgiMQ7kNvwGKS9OG&_nc_oc=AdmNFXKz4JjhCmfCZG_zWrB_CwLyc62vtlWSXDVAJkJsDenZPnfQg2yYupiKkZ-GXbg&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=HbNPmEsrVtGLA55iuJ9iNA&oh=00_AfWg0ztGbFrtG2chqQ5C97DSmyGpO-CRhnl09pS7k7z-ZQ&oe=68C34239",
          "https://scontent.fres6-1.fna.fbcdn.net/v/t1.6435-9/70536796_1386519641495464_336694817184546816_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=uSgpy469kbsQ7kNvwFjJv1j&_nc_oc=AdlH-INCFQkD7uTRrKNZCFbJeB2UD_3rhv-CjU3p0s4K0samFYXGrKe-NLN9s__LJuw&_nc_zt=23&_nc_ht=scontent.fres6-1.fna&_nc_gid=TXw9IVGwZNGoQ5nAHRis4A&oh=00_AfVdX_YZorOpiQ_LS-BHAcL2v4AQBy73q-ZPuCFUhm1MFg&oe=68C60A46",
        ],
        social: {
          instagram: "https://instagram.com/yoana_chipacitos",
          facebook: "https://facebook.com/yoana.chipacitos",
          whatsapp: "https://wa.me/543794724968",
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "Fray José de la Quintana 999",
        address2: "Av. 3 de Abril 1234", // Agregar dirección 2 
      },
      {
        name: "Valirio",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Es un espacio cálido y contemporáneo que celebra la buena comida con conciencia. Su propuesta gastronómica se destaca por ofrecer una amplia variedad de platos sin TACC, pensados especialmente para personas celíacas o que eligen una alimentación libre de gluten, sin resignar sabor ni calidad.",
        images: [
          "https://godiamo.com.ar/storage/2024/03/ValirioRestoBar_Fachada-scaled.webp",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t51.75761-15/501667714_18357679921196907_5720837044807600493_n.jpg?stp=dst-jpegr_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHV4PK3YpC950EL2WKnd7rzoAgYpIOTEtugCBikg5MS28Od_wPwU6raRV_yks1Qyg6cxGDLjPvglAuIm3T-BBu5&_nc_ohc=1rD1sD-KwnEQ7kNvwFE3gMJ&_nc_oc=AdnqRc-1Zuo-HN8GwjzaG2F-v0cVWRHdI9_LxChYxFH2ZuXjQU9WT3r7h3GKa2AXi3Y&_nc_zt=23&se=-1&_nc_ht=scontent.fpra1-1.fna&_nc_gid=-aBkI78bAaKhD0K78VvWSQ&oh=00_AfXxHhj4QEAffi7sKIqhpBs2dvWO1P4vgS7oLrrFnCe-oQ&oe=68A1BE7C",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t1.6435-9/90963911_4199827016697704_280069087885787136_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=0b6b33&_nc_eui2=AeHR6zoEt6_CIczva_rHeRhAlCZ6b2_STEyUJnpvb9JMTEyZAm2K3kBVa2FFt2qpkrT3v1axI-mm7G20PCdwFYYz&_nc_ohc=1d4ZiMDN7z8Q7kNvwGnNtxr&_nc_oc=AdkQ_Q5Mem6zZ9gXOZ6ZexhGahYeqhIDhpVADVH14cOPyVYuMYMgI13v9A2VhNJFQM0&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=P_61LPtLFQtQwJvWdM4BLg&oh=00_AfWMEBwPG10nKC8Wx29eW_mEXLttXQ2ju5wrt8Rcu9_uTw&oe=68C3310B",
        ],
        social: {
          instagram: "https://instagram.com/valirio.restobar",
          facebook: "https://facebook.com/ValyrioCafe",
          whatsapp: "https://wa.me/+5493794568686",
          whatsapp2: null,
        },
        menu: "https://menu.fu.do/valyriocafe?fbclid=PAQ0xDSwMLiLtleHRuA2FlbQIxMAABp9ttrKIiLvaBa2ah2dFvSOdAawFMYZPMabNhbb67Io268Ct6PR48mimRWMa__aem_WBUDoSRO0J39hMIKECE14Q",
        website: null,
        inscriptions: null,
        address: "San Lorenzo 1097",
        address2: null,
      },
      {
        name: "Lo de Pepe",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Un rincón acogedor donde la tradición se encuentra con el buen café. 'Lo de Pepe' es más que una cafetería: es un espacio para compartir música, cultura y sabores locales. Ideal para disfrutar de una merienda casera, encuentros entre amigos o noches de peña y eventos con artistas en vivo. Un lugar con alma, donde cada visita se siente como en casa.",
        images: [
          "https://cafedeespecialidad.info/wp-content/uploads/2023/11/AF1QipOxKga-dAaO441AZZ4OO4pUpA4TNQ5qGft-SZFaw408-h483-k-no.jpeg",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t51.75761-15/481892961_17999965235755713_1657415546182766022_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGLNcYu5y9psRBrXBEtZbWG4YTo4CejU1jhhOjgJ6NTWDoDVyEWi8_6A2azJBVKiJ3dQYIab5v9d7KN6Oy67jW8&_nc_ohc=iRrbVJr43dcQ7kNvwEWcCcq&_nc_oc=AdlBeaecxEXfaS3y6xJckOwSrhikk1UAx5l9oraEdIulPC5Epv9UGW13xQynnhebyhI&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=4yfLPtG9kZSy4qE3XZDruw&oh=00_AfUCiPsztTT9pA-RcEanJPpdDqkh0mMLasIQpxkUd8LO8Q&oe=68A187D7",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/472840284_623565403662963_3470602800590550461_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHkAgmwHVNAuK4sd183IVRaZ13zzz8eNbBnXfPPPx41sOup03XyrTngC1zcKtaIfaskpO3ZlzzYIbzoZBz6b4jH&_nc_ohc=H0dqgYYOFQ8Q7kNvwHyH5xT&_nc_oc=AdnDWGhu6hRll50R7omEQLJSJSM2qjYMlriLZu05ql4upTObQ5kT1zPLXijBj85Fnik&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=X4oo7w7EJZVpA7USsQ2_zg&oh=00_AfUv-g0Jq5SLvgF34B-rtNsnIdSv_YytFcRrYqJX-Z1LLQ&oe=68A1ABF6",
        ],
        social: {
          instagram: "https://instagram.com/lodepepecafe",
          facebook: "https://www.facebook.com/profile.php?id=100083134640359 ",
          whatsapp: "https://wa.me/+5493794296947", // Sucursal san juan 
          whatsapp2: "https://wa.me/+5493795574304", // Sucursal Rioja
        },
        menu: "https://linktr.ee/lodepepecafe?fbclid=PAQ0xDSwMLiBVleHRuA2FlbQIxMQABpyBHy5h7xmFlSL6umq3ubc-DmtRiKB75EcvqAVwUxd6BgdEXtoUMTWhh8auv_aem_Fo0iDEppo3Sz1OGXgRr8Wg",
        website: null,
        inscriptions: null,
        address: "San Juan 1037, Corrientes",
        address2: "Rioja 625, Corrientes", //agregar
      },
      {
        name: "La Felipa",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Un espacio encantador en Corrientes, donde cada detalle está pensado para que disfrutes una merienda casera, fresca y con estilo. Con un ambiente cálido, juvenil y pet friendly, La Felipa combina accesibilidad, diseño vanguardista y compromiso medioambiental, creando una experiencia única que invita a quedarse.",
        images: [
          "https://visitcorrientes.tur.ar/wp-content/uploads/2021/08/WhatsApp-Image-2021-08-30-at-08.15.07-3.jpg",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/470164948_18027894680618701_8529087957516560092_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGM1qxdxaIXB_5ECROa8WQPU7RWdGJr4RNTtFZ0YmvhE9pzJQIcXsr7RXz0m9_od827IxFkfDC1N9paplk93IlR&_nc_ohc=1stiBrX9n_8Q7kNvwFVaeXp&_nc_oc=Adki4dbGRM1odhn__zsQnX_-c5mow2Qy49ZCpM-efs8HJczKdmZgQY4JlsmFN4fzNRw&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=bAJW4hipsdDj81Aco7-fAA&oh=00_AfVxlBGjbqh1BFhdWjoSZAFQNC4dXunwMbILjYlQcnAx2g&oe=68A185BC",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/476913239_661394556240416_6558300321057888448_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFiQF6F4VHKsZBcyeBTst8VKb7zW2IxQPkpvvNbYjFA-Q5M2iEGMCUftFdaEa6mTFHACg8CVh4VJJ912XRO7rfn&_nc_ohc=kEReZKw3FPQQ7kNvwHqBvgr&_nc_oc=AdknGbwtKGt2TNuLcgvKoA_p6aIfwRfV71L-toK7FXDDG0KT8v-vLqDai2QHe_9ibUQ&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=KQ7UyGk_6cK04tSqQCC9CQ&oh=00_AfVjRkfrdI_8AXr0oTxcANnj5-BEqdBRxlNTZjDk5EhAKw&oe=68A1AF36",
        ],
        social: {
          instagram: "https://instagram.com/lafelipa.meriendas",
          facebook: "https://facebook.com/lafelipa.meriendas",
          whatsapp: "https://wa.me/+5493794525086",
          whatsapp2: null,
        },
        menu: "https://menu.fu.do/lafelipa?fbclid=PAQ0xDSwMLiGxleHRuA2FlbQIxMAABp9lUt0Po54hPQ-UiXnqyNkEg73s1j-Ki0WiN8hmLDKabthi5nq3vDvUkRpOz_aem_cFV00fmYGbueBaKkge3l7Q",
        website: null,
        inscriptions: null,
        address: "Salta 498, Corrientes",
        address2: "RN12 1034, Corrientes", // Agregar dirección 2 
      },
      {
        name: "Tajy Roof Top",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Ubicado en el séptimo piso del Hotel Identidad, combina diseño minimalista con un ambiente acogedor que invita a relajarse mientras disfrutás de una vista panorámica inigualable de Corrientes. Su variado y accesible menú incluye opciones perfectas para desayunos, meriendas o encuentros casuales, en un entorno que transmite tranquilidad y buen gusto. Un espacio ideal para reconectar, saborear y dejarse cautivar por la ciudad desde las alturas.",
        images: [
          "https://godiamo.com.ar/storage/2024/03/TajyRooftopBar_Interior.webp",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/439246566_17941233947812896_5231960549624730498_n.jpg?stp=cp6_dst-jpegr_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE7DkHS2GNarj8MdYcqLY2xqQVQz26MHQipBVDPbowdCBq2M62Yv17jD2NmZjsn6CYDJqCEyuCxTB7TEZAMvXYZ&_nc_ohc=efOPo9D2p_QQ7kNvwFv4ipX&_nc_oc=AdkppJBbARE27m-h_BYFcR4IQvzOIFjJxWqqKHldDbX0pButQGk0wLHLi6WlxMEoJRw&_nc_zt=23&se=-1&_nc_ht=scontent.fpra1-1.fna&_nc_gid=005Fr1hjj4FpkI7eP3oVwQ&oh=00_AfUqXZq930GbktXVS2zk092fXdpEarwILmJPh0ISMq5ItA&oe=68A1A33F",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/490415693_653622347542740_8067704232558741988_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHWk65z4hbJo4ktVOeDdNpQxgsf5hgC_kHGCx_mGAL-QcS-pRJv82hddZAUWNvsoInkYhZbduyy7_4bTAUsV92x&_nc_ohc=nnqwVAz3EVwQ7kNvwHzzGix&_nc_oc=Admx77m9mHiE5O1l9Z_A0XjVi3QraHD30U-3-jZrq2jPmKggKa29wXzj_n7BmK_ps28&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=xUkn8bIKe9u34QYvRUDU_w&oh=00_AfXPrlQLRI1X1bPXfU7c5i07bs6QF5dANo48d5nljS_owA&oe=68A1A37E",
        ],
        social: {
          instagram: "https://www.instagram.com/tajyrooftop/",
          facebook: "https://www.facebook.com/people/TAJY-Rooftop/100086849416923/",
          whatsapp: "https://wa.me/0", // SACAR
          whatsapp2: "https://wa.me/+5493795574304", // Sucursal Rioja
        },
        menu: "https://menu.fu.do/tajyrooftopbar/qr-menu?fbclid=PAQ0xDSwMLiPNleHRuA2FlbQIxMQABp2aI5ZrzfJ-lFmxWayyZLCxitv3spoIUeHxUM8-UQiFXdW-8HFYOeHW_LRA6_aem_d0uzCQrxWlxh-0xcEdQx2A",
        website: null,
        inscriptions: null,
        address: "Hipólito Yrigoyen 1470",
        address2: null,
      },

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
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t51.75761-15/500396008_18344082016083111_8730460092066116432_n.jpg?stp=dst-jpegr_tt6&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGL5jQjB1cf3kZuJBYqcpR7Mx8O9etbue4zHw7161u57g1VqWC0_AuhTOAasjipLZxgnhPN5umh6X0AAzvOo6Vv&_nc_ohc=JA-UONa3ZSkQ7kNvwGoUvpY&_nc_oc=AdnZLGQJZzdOYrQB7tbjSSsZB13UPUvIIKLWPRonoRuBpG-uo14-z3kFD5aZKs-X7I0&_nc_zt=23&se=-1&_nc_ht=scontent.fpra1-1.fna&_nc_gid=caIfI7dJPtLcDJDlouzNaQ&oh=00_AfWzpDowVd7AVetiZwFH1UIjjEeRiV_rIcU5mYwJyY-D4g&oe=68A1C846",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t51.75761-15/480452600_18332181028083111_5172765028752698630_n.jpg?stp=dst-jpegr_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHM6RfMcoNcPqZXk8gmjie8O59cSf8nqVk7n1xJ_yepWSdbsqCO5oVe1XkyhVLMIbZuWwWZPfFMZ2mGBs4NTAi3&_nc_ohc=M9Gp-hFm0cgQ7kNvwFyYg1D&_nc_oc=Adntuvzb5hvLkWYtLEhkC_I5n4XLt-A4KGU0Iw2pWITDZHRUMsjf7QnD2UpvKlJ1hNk&_nc_zt=23&se=-1&_nc_ht=scontent.fpra1-1.fna&_nc_gid=bwx4XIkN7cExi5gr7IzH2A&oh=00_AfVLEj73-MFfzh92RhqNG6gi93u2EWg_0iwVEVIzSaubGA&oe=68A1BB19",
        ],
        social: {
          instagram: "https://instagram.com/museovidalctes",
          facebook: "https://facebook.com/museovidalcorrientes",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "San Juan 634, Corrientes",
        address2: null,
      },
      {
        name: "Centro de Interpretacion Ibera",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Es el centro de interpretación y bienvenida al Gran Parque Iberá, ubicado en la ciudad de Corrientes. Ofrece experiencias inmersivas con tecnologías interactivas, audiovisuales y recursos educativos sobre la biodiversidad, la cultura local y el ecosistema del Iberá. Es un punto clave para informarse sobre los portales de acceso a los esteros y planificar visitas. Además, brinda actividades educativas, charlas y exposiciones temporarias.",
        images: [
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t1.6435-9/46049460_290056051628429_8148149230821703680_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeGKHK5s5jsjqNDnfh6TkHIDWQKXJ3OMEhFZApcnc4wSEUIKHnNFcKvzj0PxnyUMpjavOU3qIzjl_4n1t83qbSaW&_nc_ohc=CT9aDK5LksgQ7kNvwH0APC3&_nc_oc=AdmN79rY97dbXWNfr7hkPCbBHTfBSEhIU236mycRwH8R35FF17pFkFSjO-fii50ubQk&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=bS07IWkzEXm120U8VTWPgQ&oh=00_AfWhuD8GgZ1qzfTAIglhqvreG79nsI8OF1x5d9WTKqyPdg&oe=68C2FF42",
          "https://visitcorrientes.tur.ar/wp-content/uploads/2018/07/casa-ibera-9.jpg",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t1.6435-9/78127037_479655059335193_461318941159981056_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cf85f3&_nc_eui2=AeHc31NQBm1oCXpsHEeArprb6khcnzd7IpbqSFyfN3silkt_qdWonf6-dsQTcOBhwpJagTu-Qcxt1HSignfBozoC&_nc_ohc=okwbfkHTJiUQ7kNvwELXSmC&_nc_oc=AdkjDXl8P6LprE5Y_1loJNIZ_pPHE3ifz1Qp_all0xLEhtsAK0qhVattx8yXxWA7n5k&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=oNH2V2757zCgLt4tIXUkyA&oh=00_AfVB_2qT78brFmU-1vX8NIzVzQXVIDZ8yqHhq6YrZWC3hw&oe=68C2D560",
        ],
        social: {
          instagram: "https://instagram.com/casa.ibera",
          facebook: "https://facebook.com/CasaIbera",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "Carlos Pellegrini 501, Corrientes",
        address2: null,
      },
      {
        name: "Museo Casa Martinez",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "El Museo Casa Martínez, ubicado en la ciudad de Corrientes, funciona en una antigua casona colonial que perteneció a la familia Martínez. Ofrece un recorrido por salas ambientadas con mobiliario de época, objetos históricos y documentos que narran la vida cotidiana del siglo XIX. Además, realiza actividades culturales, visitas guiadas y talleres educativos que conectan el pasado con la comunidad actual.",
        images: [
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/471279510_469562552847003_3846751174164493389_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeFonoe8Ork7c-vLAtm4aEa4H5GWyLV4etEfkZbItXh60bnUd3da71tMb11wk11lSg36xlpi79HC9lK4tCKhHblj&_nc_ohc=6e9UBQNjklwQ7kNvwH45Kfj&_nc_oc=AdnRA2-cgxPpe7z7LtNYgWDqVf_kI6InqqE97DPhKeiCLO8R0rYEV5zr7UyVM9HF56A&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=yoYQf_9PttzDn75IJuSO-w&oh=00_AfVrYdCvJ7chMsSeXKxB5yXU4VE293fKMBSFY38NNiumCQ&oe=68A1ACB8",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/473118836_484067178063207_162835199876910212_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGJrt-D1QD5dsSBVAPRXhmrS8VKTuylHaJLxUpO7KUdomuvb_gwVl8IwPtBY-pp_X-7G4vg_1zQKrqKTSxojm9h&_nc_ohc=y58wY6zhwIEQ7kNvwFxsGDt&_nc_oc=AdlGLxIitl9UPiYG8ngpfKY86UZt8lCjVDc0HIMhor1d7KjA81Nw_XMkoEesmo-wgcQ&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=UI_LiWaZfoOtRiYSEsaAng&oh=00_AfXeqZEDpz6aOmDmeIrnplPSuevdExRvmT8qnIGZBnxzYg&oe=68A1C500",
          "https://www.diarioepoca.com/content/bucket/2/1429772w850h725c.jpg.webp",
        ],
        social: {
          instagram: "https://instagram.com/museocasamartinez",
          facebook: "https://www.facebook.com/profile.php?id=100093797866794 ",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "Fray José de la Quintana 971, Corrientes",
        address2: null,
      },
      {
          name: "Centro cultural Sanmartiniano",
          logo: "/placeholder.svg?height=60&width=60",
          description:
            "El Centro Cultural Sanmartiniano, ubicado en 25 de Mayo 1406, Corrientes, es un espacio renovado y dedicado a difundir la vida y el legado del General José de San Martín. Desde su inauguración oficial el 15 de julio de 2025, ofrece una experiencia museográfica inmersiva distribuida en cuatro salas temáticas: infancia, formación militar en España, el Combate de San Lorenzo y el exilio en Francia. Exhibe una réplica exacta del sable del Libertador y resguarda documentos originales firmados por San Martín, algunos ya disponibles y otros próximos a exhibirse. Además, el centro ofrece visitas guiadas, actividades didácticas para alumnos y eventos ocasionales con fuerte enfoque educativo y cultural.",
          images: [
            "https://scontent.fcnq4-1.fna.fbcdn.net/v/t51.75761-15/485269265_17927552253034217_1058348805688948831_n.jpg?stp=dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeECVIHSSLMAdOKeHG2oJMq9TDwCYDSdc2JMPAJgNJ1zYpm7YnhFyBmXi_e3xGnf_4Jf5RtkIwzs8u3spVKT43tx&_nc_ohc=BRvqMNxyU4UQ7kNvwEiXx4l&_nc_oc=AdlSBJfP_8P6_hFyFAbHrTUG0CrztSOnxs3xcmK1okR_2rzH7VKStuvO4ZtCABXrkcs&_nc_zt=23&_nc_ht=scontent.fcnq4-1.fna&_nc_gid=IC_CfgLiqD67Ssa7j0SvXg&oh=00_AfVk8ZN1_heXWbl-uqs_HgfYnr14lXW-WMbfeE4XvEjFSQ&oe=68A51B9D",
            "https://corrientesaldia.info/wp-content/uploads/sites/47/2025/08/imagen-101771-800-768x512.jpg",
            "https://scontent.fcnq4-1.fna.fbcdn.net/v/t39.30808-6/530676372_1311268621007565_5334994172040073909_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFFbN_yIjc1OmaV758lDs65Z_TjTVQMvG1n9ONNVAy8baZLqALpiGQVSbpyTye-ULuLlZXGQ3aWDHDtfY2kQUOV&_nc_ohc=aRxvAiKHLdQQ7kNvwGoBusO&_nc_oc=Adnk8Dfzgp_oTReXBEeWV_75MJPYXXYP3oubkAB-xnM9IjYKT2MrrLp8FIowo5MOok4&_nc_zt=23&_nc_ht=scontent.fcnq4-1.fna&_nc_gid=m15uLm4KSui8nzZZRIpk-w&oh=00_AfWvzMcZJyT9_BGAhOdNq7VeB4uEQQ7ed1tjFtTwR_D2tw&oe=68A5387D",
          ],
                  social: {
          instagram: "https://www.instagram.com/sanmartinianoctes/ ",
          facebook: "https://www.facebook.com",
          whatsapp: "https://api.whatsapp.com/send/?phone=5493794155495&text&type=phone_number&app_absent=0",
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "25 de mayo 1406",
        address2: null,
        },
        {
          name: "Museo de Ciencias Naturales Amado Bonplad",
          logo: "/placeholder.svg?height=60&width=60",
          description:
            "El Museo de Ciencias Naturales Dr. Amado Bonpland, joya histórica de Corrientes desde 1855, invita a descubrir la increíble biodiversidad provincial a través de fascinantes colecciones de aves, mamíferos, reptiles, fósiles y piezas geológicas. Entre sus propuestas, se destacan muestras permanentes y temporarias, charlas interactivas y visitas guiadas que acercan la ciencia al público. De forma especial, organiza emocionantes safaris urbanos para avistar aves, fauna y flora en plena ciudad. Su renovado sector de paleontología —desarrollado junto al CECOAL y la UNNE— exhibe imponentes fósiles de megafauna, abriendo una ventana al pasado y convirtiendo cada visita en una experiencia única.",
          images: [
            "https://culturacorrientes.com/wp-content/uploads/2024/10/Museo-de-Ciencias-Naturales-Amado-Bonpland-1-1-768x432.jpg",
            "https://www.diarioellibertador.com.ar/wp-content/uploads/2024/10/08-foto-81-Luis-Gurdiel.jpg",
            "https://culturacorrientes.com/wp-content/uploads/2024/10/DSC_0046-Editar-1.jpg",
          ],
                  social: {
          instagram: "https://instagram.com/museocasamartinez",
          facebook: "https://www.facebook.com/profile.php?id=100093797866794 ",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "Fray José de la Quintana 971, Corrientes",
        address2: null,
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
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/518361382_1138625121645801_256468445231033747_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFm-sJGq4V5d2tAkisI-oqcHbhWkdjkBYUduFaR2OQFhScwXXdKl553JvxL_PPoqooauwrcqRF-RMFrQr-W4om1&_nc_ohc=46RG4ze6ProQ7kNvwEs8eRh&_nc_oc=AdlW0J6l8o5vSKOGJ-RCZ1qif4WYKn24CmeSCkIAjYSgPssC2z0e_ivmtOU_pVkKUMY&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=P7j-VBCZVySYds6qqD8iFA&oh=00_AfViqjteWQM9S5qfN_yVg-JQi4AhI8ppq59ziRqrTcOMNw&oe=68A160A3",
          "https://visitcorrientes.tur.ar/wp-content/uploads/2018/07/T9A6256-Edit.jpg",
          "https://teatrovera.com/images/el-teatro-vera/2142-21.21.47-DSC_0031-2-Pano-Editar-th.jpg",
        ],
        social: {
          instagram: "https://instagram.com/teatrooficialjuandevera",
          facebook: "https://facebook.com/TeatroOficialJuandeVera",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "San Juan 637, Corrientes",
        address2: null,
      },
        {
          name: "Espacio Marinio",
          logo: "/placeholder.svg?height=60&width=60",
          description:
            "Es un centro cultural independiente. Funciona en una antigua casona del siglo XIX y se ha convertido en un punto de encuentro clave para la producción artística local. Ofrece una variada agenda de actividades que incluyen teatro, música en vivo, cine, exposiciones, ferias y talleres. Además de promover la cultura regional, el espacio se caracteriza por su compromiso con la autogestión, la diversidad y la participación comunitaria.",
          images: [
            "https://visitcorrientes.tur.ar/wp-content/uploads/2018/07/Patio-Cultural5.jpg",
            "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/474749651_600829339330274_1333397889886261995_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFmHsqRJo2shas3VBoOYgnn_cJVROg3HG39wlVE6DccbYqAjtkSPxyK3jPs8R1dVi_9f72q53XO9pZLxfwKEA7x&_nc_ohc=vRVsY8cg1rgQ7kNvwHX-t2t&_nc_oc=Adk5-OGSas27H7dtzV_YoVXI8cY4xITBbnWqxzxINzQC-hKelcgfKiVEwof3RivpAiU&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=Nkw65PIfaTmoUZKZ3l2xzQ&oh=00_AfUeks_mO7PFYxnMF6x-uiaKAJ9w8jlx_PqRnge3AnfZAQ&oe=68A1AA92",
            "https://pxcdn.ellitoral.com.ar/litoral/012023/1673353864820.webp?cw=1200&ch=675&extw=jpg",
          ],
                  social: {
          instagram: "https://instagram.com/espacio_marinio",
          facebook: "https://facebook.com/espaciomarinio",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "Santa Fé 847, Corrientes",
        address2: null,
        },
        {
        name: "Flotantes las Siete Corrientes",
          logo: "/placeholder.svg?height=60&width=60",
          description:
            "Un rincón escondido detrás del puerto donde podés almorzar, merendar o cenar con una hermosa vista al Paraná. Teatro, cultura y actividades recreativas en un solo lugar.",
          images: [
            "https://visitcorrientes.tur.ar/wp-content/uploads/2018/07/WhatsApp-Image-2021-04-19-at-11.02.36-1.jpg",
            "https://scontent.fpra1-1.fna.fbcdn.net/v/t1.6435-9/121653363_789442341881577_1280600406267768428_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFxv_tz8scR4_W6RfFcehgToziij3q8QFmjOKKPerxAWc6Do3kpFzSFetUFCJ0uFjGM3vjfvlT98PruUlJ3QNvm&_nc_ohc=Zs1UEOaBtpsQ7kNvwEGuF4A&_nc_oc=AdkTQIObKFR9OFBgmFgChrb6KcMOCUaZQJfYYNJrlIQIlrRY7Hl-vIbcebh0ZX8w3Hs&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=pPQNs1WnMvkdNEPPiHrhrw&oh=00_AfXPw3vCSQAAAb4rWQ8OXZrXN_wkw8c4vjkiQPD2evYslQ&oe=68C32AD4",
            "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/519487440_9969050049872054_8640226964062230345_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE1bWOMUQYSOxCF2pZ9XuxIr6M3K3O61eKvozcrc7rV4g8WtchiN5WiAEhCT9eXRoH5duY493ivc6K5HcuQYmWW&_nc_ohc=cpdVJVR6dL4Q7kNvwGlflx5&_nc_oc=AdnXnVpbPSG9KizyrEW2Zi1-noIporYVEJV1GXWDwxphUZlu0vGQm7-_i4stgHqYT8o&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=WarIgKyUwB68p5FhpFb-hg&oh=00_AfVezNA9RZiBSIq26B6QCkVqXHxktOIsPMTmG8AufIPwTQ&oe=68A17F59",
          ],
                  social: {
          instagram: "https://instagram.com/flotantesietecorrientes",
          facebook: "https://facebook.com/FlotanteSieteCorrientes",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "Rioja y Av.Costanera, Corrientes",
        address2: null,
        },
        {
          name: "CCU",
            logo: "/placeholder.svg?height=60&width=60",
            description:
              "El Centro Cultural Universitario de Corrientes, corazón artístico de la UNNE, invita a vivir experiencias únicas en su histórica sede. Entre noches de milonga que llenan de tango el salón, obras de teatro que emocionan, ciclos de cine para todos los gustos y exposiciones que renuevan su encanto cada temporada, este espacio también ofrece cursos y talleres en diversas disciplinas, así como ferias eventuales, encuentros literarios y muchas otras propuestas que lo convierten en un punto de encuentro vibrante donde la cultura late a cada paso.",
            images: [
              "https://www.diarioepoca.com/content/bucket/5/1416755w600h450c.jpg.webp",
              "https://scontent.fcnq4-1.fna.fbcdn.net/v/t39.30808-6/486712790_1087147030118386_5473656447171935204_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG5zCVAcE3lJ5ruGGpFyoL6DxYrfjd5rP4PFit-N3ms_iJeCqpyCK7jt8NcYIXzZwGXDvRaWSnMic2nGX8EPD91&_nc_ohc=vo3-WnvpWZYQ7kNvwFiMmNt&_nc_oc=AdkAqdrVZZNEUQTR_BOdE8r2ljT7ibvyZ0zmjxbKIyXO36rpG8-8bfAVJ7ovpSeS2xk&_nc_zt=23&_nc_ht=scontent.fcnq4-1.fna&_nc_gid=p3UTwKetYzYfb5ahSASqtw&oh=00_AfW9UlJK6HbgN3gsiPZqAUVLI018CtiqYoM3WtXlOhC6hA&oe=68A53D97",
              "https://www.unne.edu.ar/extension/assets/img/ccu/event/4209ed03f9d01d5ff5c911a2857dbdd7/1080_22545433c3751e42890ba5324d2ba932.jpg ",
            ],
                    social: {
          instagram: "https://www.instagram.com/ccu.unne/",
          facebook: "https://www.facebook.com/CCU.UNNE/",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: "https://ccuunne.ar/capacitaciones",
        inscriptions: null,
        address: "9 de Julio 1272",
        address2: null,
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
          "https://godiamo.com.ar/storage/2024/01/CarayaEcoparque_Fachada-scaled.webp",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t1.6435-9/202988735_109070701429043_6095876193098129021_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3a1ebe&_nc_eui2=AeGmKCMTkYDP_A7vhEsPmYHyYj-OwW-wbKpiP47Bb7BsqtbVHciimb21_imlUYNZPLh6UwJfJhe_lLpHDXUVocK0&_nc_ohc=sN03E13p1XUQ7kNvwH--w4q&_nc_oc=AdnNBB0hgKv1KhqLE7RRGQ_GlEb1zQ6v06-OOXrR-9WvktCxNdGYezjMrEWIKdOHopo&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=tICfGEtfsDrLboQN8k9T-Q&oh=00_AfXR5GPy3w2UzKyh2c_epMewbj_PxHhXPhGTDyF34c_9yw&oe=68C36A4F",
          "https://ciudaddecorrientes.gov.ar/sites/default/files/photo5159408148577102013_0.jpg",
        ],
        social: {
          instagram: "https://instagram.com/caraya.ecoparque",
          facebook: "https://www.facebook.com/profile.php?id=100069462267280 ",
          whatsapp: "https://wa.me/5493794575184",
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "Carayá Ecoparque",
        address2: null,
      },
      {
        name: "Reserva Natural Laguna Brava",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Ubicada a pocos kilómetros de la ciudad de Corrientes, protege un valioso ecosistema de laguna y monte nativo. Ofrece senderos, miradores, parrillas y sanitarios para disfrutar de la naturaleza, con avistaje de aves como patos, gallaretas y lobitos de río. Es un espacio ideal para el turismo de naturaleza, con actividades guiadas como kayak, arquería y escalada en el cercano Carayá Ecoparque.",
        images: [
          "https://turismo.corrientes.gob.ar/assets/imagenes/16856/detalle/muelle.jpg?1635005927",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/478452600_639739688548718_7420119016771558931_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3a1ebe&_nc_eui2=AeGb0BO46VWfMjNLAKJ--QY7028Y7CUGAJnTbxjsJQYAmdkc6AXMEUELjeOd9NFFXfBjts0W5k-6ocJcxqqZnXaH&_nc_ohc=4fABUOzqBIUQ7kNvwEZqUcj&_nc_oc=AdnTKwXLO__n0VYOYETmAxQ-xs8Np3x4GT5sqG1pisl7GAB262mc2uVlF68yAI1QnfM&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=gpYY8XTNZJ-uzDs3E91NJQ&oh=00_AfUow9u_FeK6vDRdiov6sOe2pGXSks-eKIFED21nOA_rPQ&oe=68A134A5",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/474621764_625481279974559_1386608707202577463_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFZ5UmrM8suZeKSI6XGFmcHD8qVGSwHIx8PypUZLAcjHyrALqjymVeoBS8J3nzJaWmKMZ_1HjOL1OTYhUlutow5&_nc_ohc=QGMasKYaxrUQ7kNvwG35vWa&_nc_oc=Admha0htcw8SrPXNFpwpADNG_HyOY5GGXqNJLmPSJEQji4qB3xcdMHtvHGmiCnTqq-0&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=JGFAFuCd5nxKjA-jZ1w58Q&oh=00_AfWylYneESKnE8Hd7tnFYfMi32vG9ySC08Ch7Cfrm61q_w&oe=68A15060",
        ],
        social: {
          instagram: "https://instagram.com/reservanaturallaguna",
          facebook: "https://www.facebook.com/p/Reserva-Natural-Laguna-Brava-100077134893285/",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "Reserva Natural Laguna Brava",
        address2: null,
      },
      {
        name: "Reserva Natural Municipal Santa Catalina",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Ubicada al sur de la ciudad de Corrientes, protege 275 hectáreas de bosques nativos, palmares y pastizales. Alberga más de 20.000 especies de flora y fauna autóctonas, como el lapacho, el timbó y el aguará guazú. Ofrece visitas guiadas gratuitas dos veces al mes, con inscripción previa vía Muni Bot o sitio municipal.  Ideales para el ecoturismo, la educación ambiental y la observación de la naturaleza.",
        images: [
          "https://ciudaddecorrientes.gov.ar/sites/default/files/4922583140774554912_0.jpg",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/482029024_1044947207680260_8941668699912950847_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGnmY3SYeX493baFsKEmo7GPwJtajzhDyU_Am1qPOEPJcr-jdAA66DvTnzuJQFVarV9I82r2vVcvOndkzTIgY-H&_nc_ohc=H3MpHoD5_QMQ7kNvwE7otEa&_nc_oc=AdmgCu9fDISjozWsoU6ogcBaMzdmh4aj991uXxc0-QK-OWztHZA8R_VE_OBCMxjgW74&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=OYxA2B-TWkSOUE8w7dAz4Q&oh=00_AfXnSa1Crhk7l8lXhO48r4vCuSacCKxdagOkmLrhGWjEGQ&oe=68A15181",
          "https://ciudaddecorrientes.gov.ar/sites/default/files/styles/1140_de_ancho/public/4922583140774554899_0.jpg?itok=osQwDqcI",
        ],
        social: {
          instagram: "https://instagram.com/Reservamunicipalcorrientes",
          facebook: "https://facebook.com/0",
          whatsapp: "https://wa.me/5493794341768",
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: "https://ciudaddecorrientes.gov.ar/reservasantacatalina",
        address: "Reserva Natural Municipal Santa Catalina",
        address2: null,
      },
      {
        name: "Parque Provincial San Cayetano",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Este parque destaca por su biodiversidad, albergando una rica avifauna con 179 especies registradas, incluyendo algunas amenazadas como el loro hablador y el batitú. Su paisaje combina bosques, palmares, esteros y lagunas, ofreciendo un entorno ideal para actividades educativas y científicas. Además, el parque es un destino popular para ecoturismo, permitiendo a los visitantes disfrutar de la naturaleza y participar en programas de conservación y educación ambiental.",
        images: [
          "https://www.municipioriachuelo.gob.ar/sites/default/files/img-20241203-wa0039.jpg",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t1.6435-9/67824608_2525334997753002_4670919634688409600_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHIOJ9LZY6gwbaZgVDQqee0jeWpsuMmrs6N5amy4yauzoSoWGm5p3iVhjkyb_Eihv8lw7jP4JkLE0HmG-2ziwWK&_nc_ohc=32hcSezcFuQQ7kNvwGHsP29&_nc_oc=AdnKcC7M_B5tv_nGpC2rIpsCSZQiJSYhiqDF2O4rzdLMeNs0krYcS2R43IpQwiUPg7U&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=Xs7EnejK5flaQCRB5bbdoA&oh=00_AfV43t-auGeizMH3Lw20cB-G6XJmlh4-K_m47p5bLOpypw&oe=68C2CB3F",
          "https://pxcdn.ellitoral.com.ar/litoral/022022/1644205203425.jpeg",
        ],
        social: {
          instagram: "https://instagram.com/parqueprovsancayetano",
          facebook: "https://facebook.com/parqueprovincialsancayetano",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "Av. San Cayetano, Corrientes", //Agregar direccion
        address2: null,
      },
      {
        name: "Las Lagunas",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Las Lagunas Cabalgatas Guiadas en Paso de la Patria, Corrientes, te invitan a vivir un auténtico día de campo correntino. Podés recorrer sus senderos a caballo junto a gauchos expertos, disfrutar del matecocido con chipa cuerito y conocer animales de la granja como ponys, pavos y gansos. Entre cabalgatas y risas, también podés saborear un buen asado o picnic al aire libre, haciendo de la visita una experiencia familiar inolvidable.",
        images: [
          "https://scontent.fcnq4-1.fna.fbcdn.net/v/t39.30808-6/472904963_18384511228099018_7031435497199633350_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGzhtel99Y_ibLD49WjDtndi-3h4CQXAVqL7eHgJBcBWj4pkdsk3AE0q31qqkTI72DNcJucBK5z7Tn_mAiDw11L&_nc_ohc=WWMdbY8r_zEQ7kNvwEdahu4&_nc_oc=AdmZmndSAdCWqAypEPVGUYrKZRtsj5uLAng-m07sgn2qeofLl94zuXd0POq_rJqYRf8&_nc_zt=23&_nc_ht=scontent.fcnq4-1.fna&_nc_gid=J0K_gbEP8tJVC69aeMGYeA&oh=00_AfVCGESGJsMkRpmLaVCzD5yY2ktkmoxPocsZV6zx2ZSXYw&oe=68A53200",
          "https://scontent.fcnq4-1.fna.fbcdn.net/v/t51.75761-15/467528910_18376923601099018_5905381777750929548_n.jpg?stp=dst-jpegr_tt6&_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEUmkx1W6-LreQgtUOVt6BZbSX3zQZoBPBtJffNBmgE8CQ7AB4NkGdsfOEK08ElZpwIJj_TdjTwsmw8Q0FW96K-&_nc_ohc=0xetPExAwSIQ7kNvwE20_IH&_nc_oc=AdnoXM_WDJu4Gw_f4B8M3lnHcFghBxkMbHd9hmDo-gC49OeKcaQOAmzSEDiQeQkvbvc&_nc_zt=23&se=-1&_nc_ht=scontent.fcnq4-1.fna&_nc_gid=DSMc8R5VODYyjF5csfhonw&oh=00_AfW0sIKaZx5Qu7r0USP_Hkgzs4mA_bBuKK4fen5v3kHsfw&oe=68A52BAD",
          "https://scontent.fcnq4-1.fna.fbcdn.net/v/t39.30808-6/472531342_18384522058099018_1273127418248778855_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFe4aMI7A5HpqvNNdhp4QgTD18ZcH0WhxMPXxlwfRaHE48PgFc6Hp98viT4jtU9Vq6SvAk7C55x7AVmzuJCxPnc&_nc_ohc=ohdXmZIrBu0Q7kNvwFiyDHx&_nc_oc=AdlTPJFbefeysmlaUGWctP0jnmGUnmpczJN_t67mySw1B7XhL1ZMYal5ERG_4stmHZM&_nc_zt=23&_nc_ht=scontent.fcnq4-1.fna&_nc_gid=1YXkl0f3zK8SB-D9sdE3YA&oh=00_AfVGUzr0U60y0rAm1VIhTH13LcsyJIhkTqvK8ii75zYAmg&oe=68A54EE3",
        ],
        social: {
          instagram: "https://www.instagram.com/laslagunascabalgatasguiadas/",
          facebook: "https://www.facebook.com/LasLagunasCabalgatasGuiadas/",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "'Las Lagunas' Cabalgatas guiadas",
        address2: null,
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
          "https://www.diarioellibertador.com.ar/wp-content/uploads/2023/01/09-FOTO-90-9.jpg",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/487272080_1069426518545001_5349074703988679146_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGXT68_aVuPTcpjwszILM2aam5xK8wkG3tqbnErzCQbe33XLCkFHGckSoQuJk-4GbG5MwKBp3ONDUny2Pkb-2SS&_nc_ohc=CGA2DtGUNlcQ7kNvwFQ8cCf&_nc_oc=AdmSo1DYEXUCtNZkrfJhCNjFnl9jS7FQLm_gredU_6Kv9kFtr92mHDaLQHZOlqIlesk&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=GKX6C-uawKt7mYmvl_SBTw&oh=00_AfW6pkkJKHr8hIEBYZ-3yOHiv3tJi7V0ZpL6BwgLRhjotw&oe=68A1BD8B",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/486829099_1066845002136486_9220277621149756604_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGb6zfYZ5AteJpRRPQCUh1dycB2yLFlmNbJwHbIsWWY1qpCPJAWMOHlFtLvqL_vfx3EtoTbIZ67tnwFEH2oJGnI&_nc_ohc=Nanmr__A64QQ7kNvwEDmL7_&_nc_oc=Adnk-zAoVheSwP-9cV2sxyxOo4zkVQrZJwbzjHzm9DhMISlM7I-INmcqWKoRXhJwtkM&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=7m3C1Gyvo-WC8nhF3Ry_7w&oh=00_AfWL-GBcFaIypqhi2YpyMdHLxWnW6NPckJzvvKIp1GFZpQ&oe=68A1B92E",
        ],
        social: {
          instagram: "https://instagram.com/pasodelapatriaturismo",
          facebook: "https://facebook.com/galeria.arte.moderno",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "Paso de la Patria, Corrientes",
        address2: null,
      },
      {
        name: "Manuel Derqui",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Pequeña localidad de perfil rural y costero, ubicada a orillas del río Paraná. Se destaca por sus actividades pesqueras, con eventos como la Fiesta del Pescador, y por espacios como su balneario público y el camping Río Bonito, ideales para la pesca recreativa, actividades náuticas, turismo de naturaleza y descanso. Se convierte así en un destino especial para quienes buscan un lugar tranquilo donde conectar con la naturaleza y el río.",
        images: [
          "https://scontent.fres6-1.fna.fbcdn.net/v/t39.30808-6/484805377_632571596304995_270295342783012915_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=C_LIU9HeyYQQ7kNvwEk0ZA6&_nc_oc=AdkrVSNsf-CA67hObw-XrRlmx4WwmzRSJfSLXjmcufq8NLRGdFolz-DZXKxkFGkFhqw&_nc_zt=23&_nc_ht=scontent.fres6-1.fna&_nc_gid=zz5vLKliwmGalZHAEmu1hQ&oh=00_AfVtw1ytQlhNmHpBBJ5vKXaHYrQBFI9NTe2qdySSfCcU8w&oe=68A45E7F",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/485726784_1711933652757359_4036222132943807266_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFR6oKOi2d9X96bOuk25B0mtwGeRG0FW2C3AZ5EbQVbYF6QT2ENOI7ri3saEBzhS8S7UaRAv8ZnzcfPtC1X4fm2&_nc_ohc=mgk9whxR4ykQ7kNvwFJ7tKO&_nc_oc=Adke5MRD42xb9uVJgmwp9t-1POiKYCbdreUVPahTL755UTm90OF-szyS4FYc9_u7ofI&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=eVL5x84zLhxWRqmWHvRcsw&oh=00_AfUy3UatXq8QKw5snr2wpLEESrw9_zB7qpQL8JUI1-7EKw&oe=68A1B433",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t51.82787-15/517781780_18103011529562297_6264007202242013892_n.webp?stp=dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHKrnrqb6QIkB1VMNW_Kr9aZ5q5YasTIzZnmrlhqxMjNki1J-qKsDUaqdXMsG2W8HF4Xj02kikPhuZ7Oc5-t9Aa&_nc_ohc=lUfG5JFVbX0Q7kNvwGFtaJP&_nc_oc=AdmsgXlwBOgBjK7PnkNPXlLkMbB_UJVv7TvZvXqs7yvu5PaHitYOz-WFSyD8Yo7KDIM&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=HggBCu81OocKkGbCcLALRA&oh=00_AfWpwpHIMo4eD01HpvqAsiZxpHmtQ3rs4ilCo5khaVgWfg&oe=68A19EC0",
        ],
        social: {
          instagram: "https://instagram.com/manuelderqui",
          facebook: "https://www.facebook.com/profile.php?id=100086564806795 ",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "Manuel Derqui, Corrientes",
        address2: null,
      },
      {
        name: "Empedrado",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Empedrado, conocida como la 'Perla del Paraná', es una localidad costera de Corrientes que se destaca por sus barrancas, playas y actividades como pesca, senderismo y deportes náuticos. Ofrece atractivos culturales como la Iglesia de Nuestro Señor Hallado, fiestas patronales y eventos tradicionales como la Fiesta Provincial de los Estudiantes. Ideal para el turismo de naturaleza, descanso y cultura regional.",
        images: [
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t39.30808-6/481233323_1057858863037069_900238492797765904_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGIqCVc-bxlOTPHzAKuDcOT4fqjq7dIkPbh-qOrt0iQ9jFzI_pUlmH2MAv8CVWrYqJ9B0zF7TYVKYg2i_N1Bxvg&_nc_ohc=hsvPtMF5YVkQ7kNvwG_3z4H&_nc_oc=AdkIdNVfkSZHhqc89Abr5Mf_4M-nou1VX3Y-qfLaI9l7q3HAz3Cr3Q2l57WzEJitxqE&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=Cma_7Wm4MNRiyl4y5tMJfA&oh=00_AfWRMIFHxE_uo6Ps5Qw9mAHo1NQtoKGGSUsUFKS7K9ZvUg&oe=68A1A714",
          "https://www.nordesteya.com/notix/multimedia/fotonotas/2024-02-14/2024-02-14-C5-231367.jpg",
          "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nplzZlU4xV59KUpY7tHy76dNjYfbYFcyKaAL70ZAE7I8jgGClz1lzpSst6HfV1uZWmscXth2aBhzY9BQMjZuSowzsL8oADNP5V9gZUU11JnqYnHfaJgKHwRVaaUJd2eCg1HP3zHAQ=w540-h312-n-k-no",
        ],
        social: {
          instagram: "https://instagram.com/turismoempedrado",
          facebook: "https://www.facebook.com/municipalidadempedrado",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "Empedrado, Corrientes",
        address2: null,
      },
      {
        name: "Bella Vista",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Ubicada a orillas del río Paraná en Corrientes, se destaca por sus playas, la pesca deportiva y su rica historia cultural. Ofrece atractivos como el yacimiento paleontológico Toropí, paseos naturales y eventos tradicionales como la Fiesta Nacional de la Naranja. Su entorno natural y sus festividades la convierten en un destino ideal para disfrutar del litoral.",
        images: [
          "https://www.diarioellibertador.com.ar/wp-content/uploads/2024/06/10-F-100-GENTILEZA-Aerial-Drone-Bella-Vista.jpg",
          "https://www.bellavista.gob.ar/wp-content/uploads/2015/01/tirolesa-02.jpg",
          "https://scontent.fpra1-1.fna.fbcdn.net/v/t1.6435-9/82117138_2942143769164350_3377931640171921408_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=zOF_UYNhJBUQ7kNvwHZbPE2&_nc_oc=Adm43qSb5EPyy3MJ0t86y2HI85rDoJIa7BNJv9o7Qh13VDrPHfxz1vdagFQegDQyTQw&_nc_zt=23&_nc_ht=scontent.fpra1-1.fna&_nc_gid=NphOAM036rmpn7AsShEg3g&oh=00_AfWwQcXtE07PTqDH3dgU_QmOR-9gv9eSbm0X_p0D-_Iojw&oe=68C3710F",
        ],
        social: {
          instagram: "https://instagram.com/turismobellavistactes",
          facebook: "https://www.facebook.com/bellavistamuni",
        },
        website: "https://bellavista.gob.ar/turismo/",
        address: "Bella Vista, Corrientes",
      },
      {
        name: "Goya",
        logo: "/placeholder.svg?height=60&width=60",
        description:
          "Destino que combina el encanto natural del Paraná con una historia rica y viva, arquitectura patrimonial, festivales coloridos y una propuesta ideal para el descanso activo, la pesca, los deportes y el turismo cultural. Un lugar donde el río, el tabaco, la historia y la fiesta se entrelazan para ofrecer una experiencia auténtica.",
        images: [
          "https://www.diarioellibertador.com.ar/wp-content/uploads/2024/10/438089673_851478737007014_3079531650263806024_n.jpg",
          "https://corrientesaldia.info/wp-content/uploads/sites/47/2023/01/Goya-TURISMO-1.jpg",
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAPYOKXVBi582dqZaeybuSksQdV_cZfjUOCI0o2Laa8N2raXPWMPuWX7ZQzoApQSREDtegCa4Xfc31VzegONkLLAaAoZhX707Rl0QibqJlChC71fv5dvSv3qo5il-IZntEtpNhJC1qarg/s1600/goya_corrientes.jpg",
        ],
        social: {
          instagram: "https://instagram.com/turismogoya",
          facebook: "https://www.facebook.com/goyaciudadok",
          whatsapp: null,
          whatsapp2: null,
        },
        menu: null,
        website: null,
        inscriptions: null,
        address: "Goya, Corrientes",
        address2: null,
      }
    ],
  },
]

const externalLinks = [
  {
    title: "Turismo Corrientes Oficial",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCZ1VVbBWzzqpwrGuZLr0Ocnh6OC8hnYMW7ZpkFa96b8n3At-EV83tjTdGgcz3EOQp-OM&usqp=CAU",
    url: "https://turismo.corrientes.gob.ar",
  },
  {
    title: "Descubrí Corrientes página oficial",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT-SSeSNi8MFohK4b0rL7dSlHFgXsKkhSNUw&s",
    url: "https://visitcorrientes.tur.ar",
  },
  {
    title: "Eventos y Festivales",
    logo: "https://media.istockphoto.com/id/1212381977/es/vector/icono-de-calendario-de-dise%C3%B1o-plano-simple.jpg?s=612x612&w=0&k=20&c=rH2qnbNgiZIKp2fghqjhLUr7r97KTgCheIoVuFUmKEY=",
    url: "https://visitcorrientes.tur.ar/eventos/",
  },
]

export default function CorrentesTourism() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [selectedPlace, setSelectedPlace] = useState<number>(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Auto-scroll para las imágenes
  //useEffect(() => {
  //  if (selectedTopic) {
  //    const topic = topics.find((t) => t.id === selectedTopic)
  //    if (topic && topic.places[selectedPlace]) {
  //      const interval = setInterval(() => {
  //        setCurrentImageIndex((prev) => (prev + 1) % topic.places[selectedPlace].images.length)
  //      }, 7000)
  //      return () => clearInterval(interval)
  //    }
  //  }
  //}, [selectedTopic, selectedPlace])

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
            backgroundImage: `url('https://www.serargentino.com/public/images/2020/08/15985904340-Puente-General-Belgrano-773x458.jpg')`,
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
            Descubre algunos de los puntos más icónicos y algunas joyitas ocultas de la provincia de Corrientes
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
                      {/*<img
                        src={currentPlace.logo || "/placeholder.svg"}
                        alt={`${currentPlace.name} logo`}
                        className="w-16 h-16 rounded-full object-cover"
                      />*/}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{currentPlace.name}</h3>
                        <p className="text-gray-600">{currentPlace.description}</p>
                      </div>
                    </div>

                    {/* Image Carousel */}
                    <div className="relative">
                      <div className="relative h-86 md:h-100 rounded-lg overflow-hidden">
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
                        <h4 className="font-semibold mb-3 text-gray-800">Enlaces importantes</h4>
                        <div className="flex gap-4 flex-wrap">
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
                          {currentPlace.menu && (
                            <a
                              href={currentPlace.menu}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
                            >
                              <Utensils className="h-5 w-5" />
                              <span className="text-sm">Menú</span>
                            </a>
                          )}
                          {currentPlace.website && (
                            <a
                              href={currentPlace.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                            >
                              <Globe className="h-5 w-5" />
                              <span className="text-sm">Página Oficial</span>
                            </a>
                          )}
                          {currentPlace.inscriptions && (
                            <a
                              href={currentPlace.inscriptions}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
                            >
                              <CalendarCheck className="h-5 w-5" />
                              <span className="text-sm">Inscripciones</span>
                            </a>
                          )}
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h4 className="font-semibold mb-3 text-gray-800">Ubicación</h4>
                        <div className="space-y-3">
                          <button
                            onClick={() => openMaps(currentPlace.address)}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <MapPin className="h-5 w-5" />
                            <span className="text-sm">{currentPlace.address}</span>
                          </button>
                          {currentPlace.address2 && (
                            <button
                              onClick={() => openMaps(currentPlace.address2)}
                              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                            >
                              <MapPin className="h-5 w-5" />
                              <span className="text-sm">{currentPlace.address2}</span>
                            </button>
                          )}
                        </div>
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
