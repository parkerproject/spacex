import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client'
import {debounce} from 'lodash'
import { ArrowSmUpIcon, ArrowSmDownIcon } from '@heroicons/react/solid'

import { ALL_LAUNCHES_QUERY } from '../queries'

const columns: Array<{label: string, sort?: boolean, key: string}> = [
    {label: "Mission Name", key: "mission_name"}, 
    {label: "Date", key: "launch_date_utc"}, 
    {label: "Outcome", key: "launch_success"}, 
    {label: "Rocket", key: "rocket_name"}, 
    {label: "Payload mass", key: "payload_mass"}, 
    {label: "Site", key: "site_name"}, 
    {label: "Mission ID", key: "mission_id"}]

type Props = {
    launches: Array<{
        launch_site: {
            site_name: string
        }
        launch_success: string,
        mission_name: string,
        mission_id: string,
        rocket: {
            rocket_name: string
        },
        launch_date_utc: string,
        id: string
    }>
}

type Rocket = {
    data: {
        rockets: Array<{
            name: string
        }>
    }
}

type Col = { label: string, sort?: boolean | undefined, key: string}

export default function Table({ rockets, renderDropDown }: {
    rockets: Rocket, 
    renderDropDown: (val: Array<string>) => void
}) {
    const [limit, setLimit] = useState(10);
    const [processing, setProcessing] = useState(false)
    const [results, setResults] = useState(null)
    const [sortCol, setSortCol] = useState('')
    const { loading, error, data, fetchMore, refetch } = useQuery(ALL_LAUNCHES_QUERY, {
        variables: { offset: 0, limit, term:'', sort: '' },
      });


    let sites = data?.launches?.map(val => val?.launch_site?.site_name)
    sites = [...new Set(sites)]
   

    useEffect(()=>{
        renderDropDown(sites)
    }, [sites?.length])


    const searchMission = (e: { target: HTMLInputElement }) =>{

      refetch({ offset: 0, limit: 10, term: e.target.value, sort: '' })
      setSortCol('')
    }

    const onLoadMore = () =>{
        setProcessing(true)
        const currentLength = data.launches?.length

        fetchMore({
            variables: {
              offset: currentLength,
              limit: 10,
            },
          }).then(fetchMoreResult => {
              setProcessing(false)
            // Update variables.limit for the original query to include
            // the newly added feed items.
            setLimit(currentLength + fetchMoreResult?.launches?.length);
          });
    }

    const sortBy = (val: Col) => {
      refetch({ offset: 0, limit: 10, term: '', sort: val.key })
      setSortCol(val.key)

    }

    const onSearch = debounce((e) => {
        searchMission(e)
      }, 500)

    return (
            <div className="w-full mt-5">
                <div className="flex bg-white p-5 shadow-sm rounded-md justify-between">
                    <h3 className="text-gray-900 text-sm font-medium">SpaceX Launch Data</h3>
                    <img src="/arrows_expand.png" className="float-right ml-2" />
                </div>
                <div className="relative text-gray-600 mt-3">
                    <input 
                    type="search" 
                    name="serch"
                    onChange={onSearch} 
                    placeholder="Search by Mission Name" 
                    className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full" 
                    />
                </div>
            <table className="w-full divide-y divide-gray-200 mt-5">
                <thead>
                    <tr>{columns.map(val => {
                        return (
                            <th 
                            onClick={()=> sortBy(val)}
                            key={val.key} scope="col" 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                {val.label}
                                {(val.key === sortCol) &&
                                    <ArrowSmUpIcon
                                    className="inline w-4 relative text-violet-200 hover:text-violet-100 -top-1"
                                    aria-hidden="true"
                                />
                                }
        
                            </th>
                        )
                    }
 
                    )}</tr>
                </thead>
                <tbody>
                    {data?.launches.map(val => {
                        const outcome = val.launch_success ? <span className="text-green-700">Success</span> : <span className="text-red-800">Failure</span>
                        const roketMass = rockets?.data?.rockets?.find(k => k.name === val.rocket?.rocket_name)
  
                        return (
                            <tr className="bg-white" key={val.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{val.mission_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{val.launch_date_utc}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{outcome}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{val.rocket?.rocket_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{roketMass?.mass?.kg} kg</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{val.launch_site?.site_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{val.mission_id}</td>
                        </tr>
                        )
                    })}

                </tbody>
            </table>
            {processing && <span className="text-red-700 text-center inline-block w-full">processing...</span>}
            
            <button
            type="button"
            onClick={onLoadMore}
            className="py-4 px-10 lg:px-8 xl:px-10 block mx-auto mt-5 text-center text-white text-base bg-black hover:bg-opacity-90 font-normal rounded-md">
                Load More
            </button>
        <div>
        </div>
        </div>
    )
}