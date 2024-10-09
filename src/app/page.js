"use client";

import { Headers } from "./components/headers";
import { useEffect, useRef, useState } from "react";
import { CardArticle } from "./components/card";
import { Button, Input, Spin } from "antd";
import { useInView } from "react-intersection-observer";


//comments for another commit
export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.7, 
    triggerOnce: false,
  }); 
  const [nodata, setNodata] = useState(false);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

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
      else{
        setNodata(true);
      }
    }catch(err){
      console.error("Erreur lors de la recuperation des articles:", err);
    }
    setLoading(false);
  }
  const post = async () => {
    setLoading(true);
    try{
      const data = await (fetch("/api", { method: "POST", body: JSON.stringify({ q, page })}));
      const res = await data.json();
      if (res.status === "ok"){
        setData(prevdata => [...prevdata, ...res.articles]);
        setPage(prevpage => prevpage + 1);  
      }
      else{
        setNodata(true);
      }
    }catch(err){
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!q){
      if (!loading && inView){
        get();
      }
    } else{
      if (search){
        if (!loading && inView){
          post();
        }
      }
      else{
        if (!loading && inView){
          get();
        }
      }
    }
  }, [inView, search]);

  return (
    <>
      <div className="mx-auto backdrop-blur text-white/90 relative">
        <Headers />
        <div className="sticky flex gap-2 m-5 mt-2 h-[40px]">
          <Input value={q} type="text" onChange={(e) => {
            setQ(e.target.value);
            if (!e.target.value){
              setSearch(false);
              setPage(0);
              setData([]);
            }
          }} placeholder="search form everything ..."/>
          <Button type="primary" color="primary" className="text-sm min-h-full font-bold text-white"
            onClick={async () => {
              if (q){
                setSearch(true);
                setData([]);
                setPage(0);
                post();
              }
            }}
          >search</Button>
        </div>
      </div>
      <div className="grid xl:grid-cols-2 xs:grid-cols-1 xl:gap-5 xs:gap-2 px-4 pb-2 w-full">
        {
          data.length ?  
          data.map((item, index) => {
            if (item.urlToImage){
              return <CardArticle information={item} key={item.urlToImage + "" + index}/>
            }
          })
          : 
          <></>
        }
      </div>
      <div className={`w-full h-[70px] flex items-center justify-center`} ref={ref}>
        {
          nodata ? 
          <p className="text-red-600 font-sans font-light text-lg">No much more data</p> : 
          <Spin size="large" />
        }
      </div>
    </>
  );
}
