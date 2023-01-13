//import { useRouter } from 'next/router'
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { createHmac } from 'node:crypto';

interface IParams extends ParsedUrlQuery {
    id: string;
}

type PageProps = {
    id: string;
    token: string;
};


export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params as IParams;
    const hmac = createHmac('sha256', 'my_secret');
    hmac.update(JSON.stringify({ id: id }));
    const token = hmac.digest('hex');
  
    return {
      props: {
        id: id,
        token,
      },
    };
};



export function getStaticPaths() {
    return {
      paths: [
        { params: { id: '0' } },
        { params: { id: '1' } },
        { params: { id: '2' } },
      ],
      fallback: false,
    };
}


export default function Page({ id, token }: PageProps) {

    console.log("id", id);
    console.log("token", token);

    const image = "https://gdx.nuklabs.xyz/api/og?tokenid=" + id;

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
                
                <meta property="og:url"
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
    
      
            <p>NFT: #{id}</p>
    
    
        </>
    
    )

}


