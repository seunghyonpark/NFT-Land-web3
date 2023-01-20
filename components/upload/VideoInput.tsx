import React, { useRef, useState } from "react";

export default function UploadInput(props) {
  
  
  const [video, setVideo] = useState("");


  ////const videoRef = useRef(null);

  const videoRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: any) => {

    setVideo( URL.createObjectURL(e.target.files[0]) );

    props.setVideo(e.target.files[0]);

    console.log(e.target.files[0]);

  };

 

  return (
    <div
      onClick={() => {
        //if (videoRef.current) {
          videoRef.current?.click();
        //}
      }}
      className={
        video
          ? " w-96   rounded-md  h-64 items-center justify-center flex"
          : "border-2 dark:border-gray-600  w-96 border-dashed border-borderWhiteGray rounded-md mt-8   h-64 items-center justify-center flex"
      }
    >
      {video ? (
        <>
          {props.isAudio ? (
            <audio src={video} controls className="w-full h-full" />
          ) : (
            <video controls src={video} className="h-full rounded-md" />
          )}
        </>
      ) : (
        <p className="dark:text-[#9CA3AF]">
          Upload {props.isAudio ? "Audio" : "Video"}
        </p>
      )}
      <input
        type="file"
        className="hidden"
        ref={videoRef}
        accept={props.isAudio ? "audio/*" : "video/*"}
        onChange={handleInput}
      />
    </div>
  );
}
