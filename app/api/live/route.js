import { NextResponse } from "next/server";


export async function GET(request) {

    const res = await fetch("https://daddylive.eu/api/events")
    const data = await res.json()

    const myData = data[0].categories["Popular Live Events"]

    const retData = myData?.map((itm)=>{
        const sources = itm?.channels?.map((itm)=>{
            return {
                name:itm?.channel_name ,
                embed:itm?.url
            }
        })
        return {
            name:itm?.event,
            title:itm?.title,
            league:"Unknown Sorry !!",
            teams:'',
            status:"live",
            embed:itm?.channels[0]?.url,
            sources:sources,
            image:`https://dummyimage.com/600x400/000/fff&text=${itm?.event}`
        }
    })


    // const data = myData?.streams?.map((itm)=>{
    //     return {
    //         name:itm?.category,
    //         title:itm?.streams[0].name,
    //         image:itm?.streams[0]?.poster,
    //         teams:itm?.streams[0].teams,
    //         status:itm?.streams[0]?.status,
    //         league:itm?.streams[0]?.league,
    //         sources:itm?.streams[0].sources,
    //         embed:itm?.streams[0].uri_name

    //     }
    // })

   return NextResponse.json({
    data:retData
   })
   
}