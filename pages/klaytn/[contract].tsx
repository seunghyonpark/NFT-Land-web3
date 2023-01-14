//import { useRouter } from 'next/router'
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { createHmac } from 'node:crypto';

import { v4 as uuidv4 } from "uuid";

interface IParams extends ParsedUrlQuery {
    contract: string;
}

type PageProps = {
    contract: string;
    token: string;
};


export const getStaticProps: GetStaticProps = async (context) => {
    const { contract } = context.params as IParams;
    const hmac = createHmac('sha256', 'my_secret');
    hmac.update(JSON.stringify({ contract: contract }));
    const token = hmac.digest('hex');
  
    return {
      props: {
        contract: contract,
        token,
      },
    };
};



export function getStaticPaths() {
    return {
      paths: [
        { params: { contract: '0x8f5aa6b6dcd2d952a22920e8fe3f798471d05901' } }, // sunmiya
        { params: { contract: '0xf57255329ad3f60b19cb452b68546e11f1fe20df' } }, // gogodino
        { params: { contract: '0xce70eef5adac126c37c8bc0c1228d48b70066d03' } }, // bellygom
      ],
      fallback: false,
    };
}


export default function Page({ contract, token }: PageProps) {

    console.log("contract", contract);
    console.log("token", token);

    const image = "https://a.nuklabs.xyz/api/og?contract=" + contract + "&uuid=" + uuidv4();

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
                    content="https://a.nuklabs.xyz/">
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
    
      
            <div className="flex flex-col">
                <p>NFT: {contract}</p>

            
                
            <Image
                className=" mt-10 " 
                src={image}
                alt={contract}
                width={500}
                height={500} 
            />
            

            </div>
    
        </>
    
    )

}
