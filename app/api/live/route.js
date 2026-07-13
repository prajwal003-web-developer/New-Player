import { NextResponse } from "next/server";


export async function GET(request) {

    const res = await fetch("https://api.cdnlivetv.is/api/v1/events/sports/soccer/?user=cdnlivetv&plan=free")
    const data = await res.json()

    const res1 = await fetch("https://api.cdnlivetv.is/api/v1/events/sports/cricket/?user=cdnlivetv&plan=free")
    const data1 = await res1.json()

    const retData = getData(data["cdn-live-tv"]?.Soccer)
    const retData1 = getData(data1["cdn-live-tv"]?.Cricket)



    return NextResponse.json({
        data:[...retData,...retData1]
        // check:data
    })

}


const getData = (data) => {
    const myData = data?.map(itm => {


        let sources = itm?.channels?.map((iframe) => ({
                name: iframe.channel_name,
                embed: iframe.url,
            }));
        
        return {
            name: itm?.event,
            title: itm?.category,
            league: itm?.tournament,
            embed: itm?.channels[0]?.url,
            sources: sources,
            status: itm.status!="NS"?"live":"Not Started",
            image: itm?.homeTeamIMG || itm?.awayTeamIMG || `https://dummyimage.com/600x400/000/fff&text=${itm?.homeTeam} vs ${itm?.awayTeam}`
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