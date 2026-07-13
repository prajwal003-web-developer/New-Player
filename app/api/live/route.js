import { NextResponse } from "next/server";


export async function GET(request) {

    // const res = await fetch("https://streamed.pk/api/matches/cricket")
    // const data = await res.json()

    // const now = new Date();

    // const retData1 = getData(data)
   



    return NextResponse.json({
        data: [{
            name:"Test",
            title:"Test",
            image:`https://dummyimage.com/600x400/000/fff&text=Test Match`,
            status:"live",
            sources:[],
            embed:"https://embed.st/embed/admin/admin-willow-cricket/1",
            league:"Not Your League"

        }]
        // check:data
    })

}


const getData = (data) => {
    const myData = data?.map(itm => {


       

        let sources = itm?.iframes?.map((iframe) => ({
                name: iframe.server,
                embed: iframe.url,
            }));
        
        return {
            name: itm?.title,
            title: itm?.category,
            league: "unknown",
            embed: itm?.iframes[1]?.url,
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