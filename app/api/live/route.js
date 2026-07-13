import { NextResponse } from "next/server";


export async function GET(request) {

    const res = await fetch("https://api.esportex.site/api/streams")
    const data = await res.json()

    const now = new Date();

    const retData1 = getData(data["football"],now)

   

    return NextResponse.json({
        data: [...retData1]
    })

}


const getData = (data, now) => {
    const myData = data?.map(itm => {


        const kickoff = new Date(itm.kickoff.replace(" ", "T"));
        kickoff.setHours(kickoff.getHours() - 1);

        const endTime = new Date(itm.endTime.replace(" ", "T"));
        endTime.setHours(endTime.getHours() - 1);

        const status = now >= kickoff && now <= endTime ? "live" : "";

        const sources = itm?.iframes.map(itm => {
            return {
                name: itm?.server,
                embed: itm?.url
            }
        })
        return {
            name: itm?.slug,
            title: itm?.tag,
            league: itm?.league,
            embed: itm?.iframes[0]?.url,
            sources: sources,
            status: status,
            image: itm?.poster || `https://dummyimage.com/600x400/000/fff&text=${itm?.tag}`
        }
    })

    return myData;
}

















 // // const myData = data[0].categories["Popular Live Events"]

    // // const retData = myData?.map((itm)=>{
    // //     const sources = itm?.channels?.map((itm)=>{
    // //         return {
    // //             name:itm?.channel_name ,
    // //             embed:itm?.url
    // //         }
    // //     })
    //     return {
    //         name:itm?.event,
    //         title:itm?.title,
    //         league:"Unknown Sorry !!",
    //         teams:'',
    //         status:"live",
    //         embed:itm?.channels[0]?.url,
    //         sources:sources,
    //         image:`https://dummyimage.com/600x400/000/fff&text=${itm?.event}`
    //     }
    // })


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