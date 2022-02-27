
import { useQuery, NetworkStatus } from '@apollo/client'
import React, { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Link from 'next/link'

import Stats from '../components/Stats'
import Payloads from '../components/Payloads'
import Table from '../components/Table'

import { ALL_ROCKETS_QUERY, ALL_PAYLOADS_QUERY } from '../queries'





export default function Home() {

  const rockets = useQuery(ALL_ROCKETS_QUERY, {});
  const { data } = useQuery(ALL_PAYLOADS_QUERY, {});
  const [sites, setSites] = useState([])

  const handleLaunchSite = (val) => {
      console.log(val)
  }

  const renderDropDown = (val: Array<string>) => {
    setSites(val)
}


  return (
  <div className="p-20 bg-gray-50 min-h-screen">
  <div className="pb-5 sm:flex sm:items-center sm:justify-between">
      <h1 className="text-lg leading-6 font-medium text-gray-900">SpaceX Mission Dashboard</h1>
      <div className="mt-3 sm:mt-0 sm:ml-4 sm:flex sm:items-center sm:justify-between">
      <img src="/cog.png" alt="" className="line-block mr-4"/>
      <Menu as="div" className="relative inline-block text-left bg-white rounded-md">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-400">
          <img src="/office_building.png" alt="" className="line-block mr-4"/> Launch Site
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        {/* <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        > */}
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {sites.map(val =>

                  <Menu.Item key={val}>
                  {({ active }) => (

                    <button className="group flex rounded-md items-center w-full px-2 py-2 text-sm">{val}</button>
                  )}
                  
                  </Menu.Item>
                
                )}

            </div>
          </Menu.Items>
        {/* </Transition> */}
        </Menu>
      </div>
    </div>
    <Stats data={data} />
    <Payloads data={data} />
    <Table rockets={rockets} renderDropDown={renderDropDown}/>
  </div>
  )
}

