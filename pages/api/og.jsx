import { ImageResponse } from '@vercel/og';
////import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};


export default async function handler(req, res) {

  //const { tokenid } = req.query;

  const $username = "vercel";

  const tokenid = "1";

  if (!tokenid) {
    return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
      width: 1200,
      height: 630,
    });
  }

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
          paddingTop: 0,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          width="1400"
          height="1400"
          src={`https://i.seadn.io/gcs/files/27a630e340424ee0e6eec39afd533415.png?auto=format&w=1400`}
          style={{
            borderRadius: 50,
          }}
        />
        <p>Sunmiya Club</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );


}
