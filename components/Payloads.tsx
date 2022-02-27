import React, {useState} from 'react'
import {groupBy, orderBy} from 'lodash'
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

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

const coins = [
    { symbol: "ADA", amount: 200, color: "#0033ad", inUSD: 1.48 },
    { symbol: "SOL", amount: 5, color: "#00ffbd", inUSD: 37.6 },
    { symbol: "BTC", amount: 0.005, color: "#F7931A", inUSD: 37363 },
  ];


export default function PayloadsByNationality({ data }: Props) {
     const groups = groupBy(data?.payloads, 'nationality')
     let missions = data?.payloads.filter(val=> val.payload_mass_kg !== null ) 
     missions = orderBy(missions, 'payload_mass_kg', 'desc')
     missions = missions.slice(0, 5)



    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-5">
            <li className="col-span-1 flex">
                <div className="w-full">
                    <div className="flex-1">
                        <div className="flex bg-white p-5 shadow-sm rounded-md">
                            <h3 className="text-gray-900 text-sm font-medium">
                                Payload Count By Nationality
                                <img src="/question_mark_circle-1.png" className="inline-block ml-2" />
                            </h3>
                        </div>
                        <div className="flex justify-between bg-white p-5 shadow-sm rounded-md mt-1">
                            <div>
                              Graph placeholder
                            </div>
                            <table>
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">nationality</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">payload count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(groups)?.map(val => {
                                        return (
                                            <tr className="bg-white" key={val}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{val !== 'null' ? val :  'Others'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{groups[val]?.length}</td>
                                        </tr>

                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </li>
            <li className="col-span-1">
                <div className="w-full">
                    <div className="flex-1">
                        <div className="flex bg-white p-5 shadow-sm rounded-md">
                            <h3 className="text-gray-900 text-sm font-medium">
                                Top 5 Missions
                                <img src="/question_mark_circle-1.png" className="inline-block ml-2" />
                            </h3>
                        </div>
                        <div className="flex bg-white p-5 shadow-sm rounded-md mt-1">
                        <table className="w-full">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">mission</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">payload mass</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {missions.map((val)=>{
                                        return (
                                            <tr className="bg-white" key={val.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{val.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{val.payload_mass_kg} kg</td>
                                        </tr>

                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </li>
        </ul>

    )
}