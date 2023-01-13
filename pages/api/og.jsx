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
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          width="256"
          height="256"
          src={`https://github.com/vercel.png`}
          style={{
            borderRadius: 128,
          }}
        />
        <p>github.com/vercel</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );


}
