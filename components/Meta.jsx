import Head from 'next/head';
//import { MY_SEO } from '../config';


const tokenid = "2342";

const content = "https://gdx.nuklabs.xyz/api/og?tokenid=" + tokenid;

const MY_SEO = {
    title: 'Busan',
    description: 'Sunmiya Club is a Klaytn based PFP NFT project with ‘MIYA’ as a main IP, the character motivated by global K-POP artist Sunmi.',
    openGraph: {
        type: 'website',
        url: 'https://gdx.nuklabs.xyz/busan',
        title: 'Busan',
        description: 'Sunmiya Club is a Klaytn based PFP NFT project with ‘MIYA’ as a main IP, the character motivated by global K-POP artist Sunmi.',
        image: {content},
    }
};

const Meta = () => (
    <Head>
      <title key="title">{MY_SEO.title}</title>

      <meta
        key="description"
        name="description"
        content={MY_SEO.description}
      />
      <meta
        key="og:type"
        name="og:type"
        content={MY_SEO.openGraph.type}
      />
      <meta
        key="og:title"
        name="og:title"
        content={MY_SEO.openGraph.title}
      />
      <meta
        key="og:description"
        name="og:description"
        content={MY_SEO.openGraph.description}
      />
      <meta
        key="og:url"
        name="og:url"
        content={MY_SEO.openGraph.url}
      />
      <meta
        key="og:image"
        name="og:image"
        content={MY_SEO.openGraph.image}
      />
      <meta
        name="twitter:card"
        content="summary_large_image"
        /> {/*telegram large image */}
        
    </Head>
);

export default Meta;