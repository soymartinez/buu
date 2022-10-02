import Card, { CardProps } from './card'

export default function List() {

    const list: CardProps[] = [
        {
            image: '',
            title: 'Universidad Veracruzana',
            description: 'UV',
            state: 'Veracruz'
        },
        {
            image: '',
            title: 'Universidad Nacional Autónoma de México',
            description: 'UNAM',
            state: 'Ciudad de México'
        },
        {
            image: '',
            title: 'Universidad Autónoma de Nuevo León',
            description: 'UANL',
            state: 'Nuevo León'
        },
    ]

    return (
        <div className='flex flex-col gap-2'>
            {list.map((item, index) => (
                <Card key={index} {...item} />
            ))}
        </div>
    )
}
