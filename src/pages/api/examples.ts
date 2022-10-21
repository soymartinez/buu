// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next'
// import { prisma } from '../../server/db/client'

interface Carrer {
  id: number;
  name: string;
  semesters: number;
  modality: ['Presencial' | 'Semipresencial' | 'Virtual'];
}

interface Campus {
  id: number;
  name: string;
  subname?: string;
  url?: string;
  direction: string;
  location: string;
  carrers: Carrer[];
}

interface Region {
  id: number;
  name: string;
  campus: Campus[];
}

export interface University {
  id: number;
  name: string;
  subname: string;
  logo: string;
  url: string;
  description?: string;
  location?: string;
  country: string;
  region: Region[];
}

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  // const examples = await prisma.example.findMany()
  const examples: University[] = [
    {
      id: 1,
      name: 'Universidad Veracruzana',
      subname: 'UV',
      url: 'https://www.uv.mx',
      logo: 'http://colaboracion.uv.mx/afbg-combas/imagenespublicas/Flor1024x768SinFondo.png',
      location: 'Veracruz',
      country: 'Mexico',
      region: [
        {
          id: 1,
          name: 'Orizaba - Córdoba',
          campus: [
            {
              id: 1,
              name: 'Facultad de Negocios y Tecnologías',
              subname: 'FNT',
              url: 'https://www.uv.mx/orizaba/negocios',
              direction: 'KM 1.0 Carretera Sumidero Dos Ríos. Ixtaczoquitlán, Veracruz. C.P. 94452',
              location: 'Ixtaczoquitlán',
              carrers: [
                {
                  id: 1,
                  name: 'Ingeniería de Software',
                  semesters: 8,
                  modality: ['Presencial'],
                },
              ]
            },
            {
              id: 2,
              name: 'Facultad de Ciencias Químicas',
              subname: 'FCQ',
              url: 'https://www.uv.mx/orizaba/cq',
              direction: 'Carretera Federal 180, Km. 1.5, C.P. 94452, Ixtaczoquitlán, Veracruz',
              location: 'Orizaba',
              carrers: [
                {
                  id: 1,
                  name: 'Ingeniería Química',
                  semesters: 8,
                  modality: ['Presencial'],
                },
              ]
            },
            {
              id: 3,
              name: 'Facultad de Enfermeria',
              subname: 'FE',
              url: 'https://www.uv.mx/orizaba/enfermeria',
              direction: 'Colón Ote. 1300, Centro, 94300 Orizaba, Ver.',
              location: 'Orizaba',
              carrers: [
                {
                  id: 1,
                  name: 'Enfermería',
                  semesters: 8,
                  modality: ['Presencial'],
                },
              ]
            },
          ]
        }
      ],
    },
    {
      id: 2,
      name: 'Instituto Tecnológico de Orizaba',
      subname: 'ITO',
      url: 'http://www.orizaba.tecnm.mx',
      logo: 'https://seeklogo.com/images/I/Instituto_Tecnologico_de_Orizaba-logo-B40898E1F3-seeklogo.com.png',
      location: 'Orizaba',
      country: 'Mexico',
      region: [
        {
          id: 1,
          name: 'Orizaba',
          campus: [
            {
              id: 1,
              name: 'Campus Orizaba',
              subname: 'CO',
              url: 'http://www.orizaba.tecnm.mx',
              direction: 'Avenida Oriente 9 No. 852. Col. Emiliano Zapata. C.P. 94320, Orizaba, Veracruz',
              location: 'Orizaba',
              carrers: [
                {
                  id: 1,
                  name: 'Ingeniería en Sistemas Computacionales',
                  semesters: 8,
                  modality: ['Presencial'],
                },
                {
                  id: 2,
                  name: 'Ingeniería en Gestión Empresarial',
                  semesters: 8,
                  modality: ['Presencial'],
                },
              ]
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Universidad de Sotavento',
      subname: 'US',
      url: 'https://www.sotavento.mx',
      location: 'Veracruz',
      country: 'Mexico',
      logo: 'https://www.sotavento.mx/images/logito.png',
      region: [
        {
          id: 1,
          name: 'Orizaba',
          campus: [
            {
              id: 1,
              name: 'Orizaba',
              subname: 'US',
              url: 'https://www.sotavento.mx',
              direction: "Emiliano Zapata 175 Col. El Espinal Orizaba, Veracruz. C.P. 94330",
              location: 'Orizaba',
              carrers: [
                {
                  id: 1,
                  name: 'Administración y Administración Pública',
                  semesters: 8,
                  modality: ['Presencial'],
                },
              ],
            }
          ]
        }
      ],
    },
  ]
  res.status(200).json(examples);
}

export default examples;
