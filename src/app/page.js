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
    threshold: 0.7, 
    triggerOnce: false,
  }); 
  const div = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const elem = div.current;
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        elem.style.top = "0";
        elem.nextElementSibling.style.paddingTop = '70px'
        elem.nextElementSibling.style.transition = '.5s';
      } else {
        elem.style.top = "-70px";
        elem.nextElementSibling.style.paddingTop = '10px'
        elem.nextElementSibling.style.transition = '.5s';
      }
      prevScrollpos = currentScrollPos;
    } 
  }, []);

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
      <div className="mx-auto backdrop-blur text-white/90" id="navbar" ref={div}>
        <Headers />
      </div>
    <div style={{paddingTop: '70px'}}>
      <div className="grid xl:grid-cols-2 xs:grid-cols-1 xl:gap-5 xs:gap-2 px-4 pb-2 w-full">
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
      <div className={`w-full h-[70px] flex items-center justify-center`} ref={ref}>
        <Spin size="large" />
      </div>
    </div>
    </>
  );
}
