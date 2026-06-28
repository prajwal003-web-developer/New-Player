import { NextResponse } from "next/server";


export async function GET(request) {

    const res = await fetch("https://dami-tv.pro/papi/api/streams")
    const myData = await res.json()

    const res2 = await fetch("https://dami-tv.pro/papi/matches/cricket")
    const myData2 = await res2.json()


    const data = myData?.streams?.map((itm)=>{
        return {
            name:itm?.category,
            title:itm?.streams[0].name,
            image:itm?.streams[0]?.poster,
            teams:itm?.streams[0].teams,
            status:itm?.streams[0]?.status,
            league:itm?.streams[0]?.league,
            sources:itm?.streams[0].sources,
            embed:itm?.streams[0].uri_name

        }
    })

    const data2 = myData2?.streams?.map((itm)=>{
        return {
            name:itm?.category,
            title:itm?.title,
            image:itm?.poster,
            teams:itm?.teams,
            status:itm?.status,
            league:itm?.league,
            sources:[{
                 "name": "Server 1",
                "embed": `https://dami-tv.pro/embed/?id=${itm?.sources[0].id}`
            }],
            embed:itm?.sources[0].id

        }
    })
    return NextResponse.json({
       data:[...data,...data2]
    })
}