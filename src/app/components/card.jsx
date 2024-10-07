import { Button, Image, Tag } from "antd";
import Card from "antd/es/card/Card";


const infos = {
    articles: [
        {
            author: "naiain",
            title: "Fivarotane mofo a madagascar fianrantsoa",
            description: "mofo gasy",
            url: "",
            urlToImage: 'https://',
            publishedAt: "",
            content: "lorem impasuf;kand;fland;kfna ;akdnfaf",
        }
    ]
}
export function CardArticle({information}){
    return <Card className="bg-white/25 my-2 shadow-lg cursor-default" styles={{body: {padding: '8px 8px 24px 8px'}}}>
        <Image src={information.urlToImage} alt={information.description} className="object-contain rounded-2xl"/>
        <div className="flex flex-col px-3 mb-2 md:max-h-max xs:max-h-[150px] overflow-y-auto">
            <h2 className="font-extrabold md:text-xl xs:text-sm xs:text-ellipsis sm:text-base py-2 opacity-[0.8]">{information.title}</h2>
            <p className="md:text-lg xs:text-xs sm:text-sm font-semibold opacity-[0.9]">{information.content}</p>
        </div>
        { information.author ? <a href={information.url}  className="active:text-white rounded-sm rounded-t-lg hover:text-white text-blue-500 bg-black/15 mt-1 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap px-1 absolute bottom-0 right-10"><i>{information.author}</i></a> : <></> }
    </Card>
}