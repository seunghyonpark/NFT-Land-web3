import { useRouter } from 'next/router'
import Head from "next/head";
import { useState, useEffect, useRef } from "react";

export default function Busan ({

})
{

    const router = useRouter();
    const { tokenid } = router.query;

    useEffect(() => {
        if(!router.isReady) return;
        console.log(router.query,'🙆‍♀️ 콘솔에 쿼리 찍힘!');

    }, [router.isReady, router.query])

    const image = "https://gdx.nuklabs.xyz/api/og?tokenid=" + tokenid;

    console.log("image", image);


    return (

    <>
    
        <Head>

            <title>Busan</title>

            <meta name="Busan"
                content="Busan"
            />


            {/*
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            */}

            <meta property="og:type" content="website"/>

            <meta property="og:site_name" content="Busan"/>
            <meta property="og:title" content="Busan"/>
            <meta property="og:description"
                content="
                Sunmiya Club is a Klaytn based PFP NFT project with ‘MIYA’ as a main IP, the character motivated by global K-POP artist Sunmi.

        Based on concrete technology and moves, broad networks with industries, and solid communities, we serve as a bridge to connect metaverse and offline,
        Sunmiya Club is one representative IP of Web 3.0 era, expanding with our own universe and collaborating with various established industries and metaverse IPs.
                ">
            </meta>


            

            <meta property="og:image" content={image}/>

            <meta property="og:image:width" content="1400"></meta>
            <meta property="og:image:height" content="1400"></meta>
            
            <meta proterty="og:url"
                content="https://gdx.nuklabs.xyz/busan">
            </meta>

            <meta name="description" content="
                Sunmiya Club is a Klaytn based PFP NFT project with ‘MIYA’ as a main IP, the character motivated by global K-POP artist Sunmi.

        Based on concrete technology and moves, broad networks with industries, and solid communities, we serve as a bridge to connect metaverse and offline,
        Sunmiya Club is one representative IP of Web 3.0 era, expanding with our own universe and collaborating with various established industries and metaverse IPs.
                "
            />


            <meta name="twitter:card" content="summary_large_image"/> {/*telegram large image */}
            <meta name="twitter:image" content={image} />


            <link rel="icon" href="/favicon.ico" />
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"></link>
        </Head>

  
        <p>NFT: #{tokenid}</p>


    </>

    )

}
