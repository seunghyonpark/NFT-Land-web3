import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const contract = searchParams.get('contract');

  if (!contract) {
    return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
      width: 1200,
      height: 630,
    });
  }

  const tokenid = Math.floor(Math.random() * 9999);

  let imageSource = "";

  if (contract === "0x8f5aa6b6dcd2d952a22920e8fe3f798471d05901") { // sunmiya
    imageSource = `https://miya.sunmiya.club/${tokenid}.png`;
  } else if (contract === "0x8f5aa6b6dcd2d952a22920e8fe3f798471d05901") { // gogodino
    imageSource = `https://gogodino.saltmarble.io/metaexplorers/images/${tokenid}.png`;
  } else if (contract === "0xce70eef5adac126c37c8bc0c1228d48b70066d03") { // bellygom
    imageSource = `https://belly.bellygom.world/${tokenid}.png`;
  }

 

  console.log("imageSource", imageSource);


  // https://gogodino.saltmarble.io/metaexplorers/json/0.json
  // https://miya.sunmiya.club/0.json
  // https://belly.bellygom.world/0.json

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'black',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <img
          width="900"
          height="900"
          src={`${imageSource}`}
          style={{
            borderRadius: 30,
          }}
        />
        <p>#{tokenid}</p>

      </div>
    ),
    {
      width: 1400,
      height: 1400,
    },
  );
}
