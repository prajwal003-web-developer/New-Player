import { NextResponse } from "next/server";


export async function GET(request) {

    const res = await fetch("https://api.cdnlivetv.is/api/v1/events/sports/soccer/?user=cdnlivetv&plan=free")
    const data = await res.json()

    const res1 = await fetch("https://api.cdnlivetv.is/api/v1/channels/?user=cdnlivetv&plan=free")
    const data1 = await res1.json()

    const retData = getData(data["cdn-live-tv"]?.Soccer)
    let x = "Xmmals"
    let y = x.toLowerCase()
    const retDataToProcess = data1.channels?.filter(itm=>{
        if(itm.name.toLowerCase().includes("willow") || itm.name.toLowerCase().includes("sony") || itm.name.includes("star") || itm.name.toLowerCase().includes("cricket")|| itm.name.toLowerCase().includes("sport")){
            return itm
        }
    })

    const retData1 = retDataToProcess?.map((itm)=>{
        return {
                name:itm?.name,
                league:itm?.code,
                title:itm?.name,
                image:itm?.image ,
                status:itm?.status,
                isLive:true,
                embed:itm?.url,
                sources:[{
                    name:"Source-1",
                    embed:itm?.url
                }]
            }
    })


    return NextResponse.json({
        data:[...retData1,...retData]
        // check:data
    })

}


const getData = (data) => {

    const data1 = data?.filter(itm=>itm.channels.length!=0)
    const myData = data1?.map(itm => {


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