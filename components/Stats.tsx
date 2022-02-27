

const projects = [
    { name: '300', initials: 'GA', href: '#', members: 16, bgColor: 'bg-pink-600' },
    { name: 'Component Design', initials: 'CD', href: '#', members: 12, bgColor: 'bg-purple-600' },
    { name: 'Templates', initials: 'T', href: '#', members: 16, bgColor: 'bg-yellow-500' },
  ]

type Props = {
    data: {
        payloads: Array<{
            id: string;
            payload_mass_kg: number;
            customers: Array<string>;
            nationality: string;
           }>
    }
}


export default function Stats ({ data }: Props) {
    let payloadMassKg = data?.payloads?.map(val => val.payload_mass_kg)
    payloadMassKg = payloadMassKg?.filter(v => v !== null)
    const averagePayload = payloadMassKg?.reduce((a, b) => a + b, 0) / payloadMassKg?.length
    
    const customers = data?.payloads?.map(k => k.customers?.join(','))

    return (
        <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
     
          <li className="col-span-1 flex shadow-sm rounded-md bg-gray-200 py-3">
            <div className='flex-shrink-0 flex items-center justify-center w-16 text-sm font-medium rounded-l-md'>
                <img src="/archive.png" alt="" />
            </div>
           
            <div className="flex-1 flex items-center justify-between rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <a className="text-gray-900 font-medium hover:text-gray-600">
                  {data?.payloads?.length}
                </a>
                <p className="text-gray-500 text-xs">Total Payloads</p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none"
                >
                  <img src="/chevron_right.png" alt="" />
                </button>
              </div>
            </div>
          </li>

          <li className="col-span-1 flex shadow-sm rounded-md bg-gray-200">
            <div className='flex-shrink-0 flex items-center justify-center w-16 text-sm font-medium rounded-l-md'>
                <img src="/scale.png" alt="" />
            </div>
           
            <div className="flex-1 flex items-center justify-between rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <a className="text-gray-900 font-medium hover:text-gray-600">
                {Math.ceil(averagePayload)} Kg
                </a>
                <p className="text-gray-500 text-xs">Avg. Payload Mass</p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none"
                >
                 <img src="/chevron_right.png" alt="" />
                </button>
              </div>
            </div>
          </li>

          <li className="col-span-1 flex shadow-sm rounded-md bg-gray-200">
            <div className='flex-shrink-0 flex items-center justify-center w-16 text-sm font-medium rounded-l-md'>
                <img src="/user_circle.png" alt="" />
            </div>
           
            <div className="flex-1 flex items-center justify-between rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <a className="text-gray-900 font-medium hover:text-gray-600">
                  {customers?.length}
                </a>
                <p className="text-gray-500">Total Payloads Customers</p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none"
                >
                  <img src="/chevron_right.png" alt="" />
                </button>
              </div>
            </div>
          </li>
      
      </ul>
    )
}