"use client";


import { Headers } from "./components/headers";
import { useEffect, useRef, useState } from "react";
import { CardArticle } from "./components/card";
import { Spin } from "antd";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({
    threshold: 0.5, 
    triggerOnce: false,
  }); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try{
        const data = await fetch("/api", { method: "GET", headers: {
          "Page": page,
        }});
        const res = await data.json();
        if (res.status === "ok"){
          setData(prevdata => [...prevdata, ...res.articles]);
          setPage(prevpage => prevpage + 1);  
        }
      }catch(err){
        console.error("Erreur lors de la recuperation des articles:", error);
      }
      setLoading(false);
    }
    if (!loading && inView){
      get();
    }
  }, [inView]);

  return (
    <>
      <div className="mx-auto backdrop-blur text-white/90">
        <Headers />
      </div>
      <div className="grid xl:grid-cols-2 xs:grid-cols-1 xl:gap-5 xs:gap-2 px-4 py-2 w-fit">
        {
          data.length ?  
          data.map((item, index) => {
            if (item.urlToImage){
              return <CardArticle information={item} key={index}/>
            }
            return <></>
          })
          : 
          <></>
        }
      </div>
      <div className={`w-full h-[100px] flex items-center justify-center`} ref={ref}>
        <Spin size="large" />
      </div>
    </>
  );
}
