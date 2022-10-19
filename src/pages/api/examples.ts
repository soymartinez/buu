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
              direction: 'Av. Universidad 1515, Col. Lomas de Angelópolis, C.P. 91090, Xalapa, Veracruz, México',
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
          ]
        }
      ],
    },
    {
      id: 2,
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
