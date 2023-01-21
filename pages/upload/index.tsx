import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Sidebar, Header } from '../../layout'
import { BiCloud, BiPlus } from 'react-icons/bi'

//////import { useAsset, useCreateAsset } from '@livepeer/react';

import { Player, useAssetMetrics, useCreateAsset } from '@livepeer/react';

import { UploadInput, Background } from '../../components'
import { saveToIPFS, getContract } from '../../utils'
import toast from 'react-hot-toast'
import { any } from 'hardhat/internal/core/params/argumentTypes'

import Image from "next/image";

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';


export default function Upload() {

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  
  //const [thumbnail, setThumbnail] = useState<File>()
  const [thumbnail, setThumbnail] = useState<File | undefined>();

  const [uploadData, setUploadData] = useState({})

  ////const [video, setVideo] = useState<File>()
  const [video, setVideo] = useState<File | undefined>();

  const thumbnailRef = useRef<HTMLInputElement>(null);
 

  //const { mutate: createAsset, data: asset, uploadProgress } = useCreateAsset()
  
  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    // we use a `const` assertion here to provide better Typescript types
    // for the returned data
    video
      ? {
          sources: [{ name: video.name, file: video }] as const,
        }
      : null,
  );

  const { data: metrics } = useAssetMetrics({
    assetId: asset?.[0].id,
    refetchInterval: 30000,
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);

    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0]);
    }
  }, []);
 
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: {
      'video/mp4': ['.mp4', '.MP4'],
    },
    maxFiles: 1,
    onDrop,
  });


  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));


  const isLoading = useMemo(
    () =>
      status === 'loading' ||
      (asset?.[0] && asset[0].status?.phase !== 'ready'),
    [status, asset],
  );
 
  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting'
        : progress?.[0].phase === 'uploading'
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === 'processing'
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress],
  ); 



/*
  const [video, setVideo] = useState<File | undefined>(undefined);
  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
  } = useCreateAsset(
    // we use a `const` assertion here to provide better Typescript types
    // for the returned data
    video
      ? {
          sources: [{ name: video.name, file: video }] as const,
        }
      : null,
  );
*/






  const goBack = () => {
    window.history.back()
  }


  {/*
  <button
  onClick={() => {
    createAsset?.();
  }}
  disabled={!createAsset || createStatus === 'loading'}
>
  Upload
</button>
*/}


  // When a user clicks on the upload button
  const handleSubmit = async () => {

    // Calling the upload video function
    /////await uploadVideo()
    createAsset?.();


    // Calling the upload thumbnail function and getting the CID
    const thumbnailCID = await uploadThumbnail();

    console.log("thumbnailCID", thumbnailCID);
  
    // Creating a object to store the metadata
    let metaData = {

      //video: asset?.[0].id,

      //video: asset?.[0]?.playbackId,
      video: thumbnailCID,

      title: "aaa",
      description: "bbb",
      location: "ccc",
      category: "ddd",
      thumbnail: thumbnailCID,
      UploadedDate: Date.now(),
    }

    // Calling the saveVideo function and passing the metadata object
    console.log(metaData);


    /*
    await saveVideo(data);
    */

    let contract = getContract();

    
    await contract.uploadVideo(
      metaData.video,
      metaData.title,
      metaData.description,
      metaData.location,
      metaData.category,
      metaData.thumbnail,
      false,
      metaData.UploadedDate,
    );
      

  }




  // Function to upload the video to IPFS
  const uploadThumbnail = async () => {
    // Passing the file to the saveToIPFS function and getting the CID
    const cid = await saveToIPFS(thumbnail)
    // Returning the CID
    return cid
  }

  // Function to upload the video to Livepeer
  const uploadVideo = async () => {
    
    // Calling the createAsset function from the useCreateAsset hook to upload the video

    /*
    createAsset({
      name: title,
      file: video,
    })
    */

  }





  // Function to save the video to the Contract
  const saveVideo = async (data = uploadData) => {

    // Get the contract from the getContract function
    //let contract = await getContract()
    let contract = getContract()



    // Upload the video to the contract

    /*
        function uploadVideo(
        string memory _videoHash,
        string memory _title,
        string memory _description,
        string memory _location,
        string memory _category,
        string memory _thumbnailHash,
        bool _isAudio,
        string memory _date
    ) public {
    */
    /*
    await contract.uploadVideo(
      data.video,
      data.title,
      data.description,
      data.location,
      data.category,
      data.thumbnail,
      false,
      data.UploadedDate,
    )
    */



  }

  

  /*
  return (

      <div>
        {!asset && (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop or browse files</p>
   
            {error?.message && <p>{error.message}</p>}
          </div>
        )}
   
        {asset?.[0]?.playbackId && (
          <Player title={asset[0].name} playbackId={asset[0].playbackId} />
        )}
   
        <div>
          {metrics?.metrics?.[0] && (
            <p>Views: {metrics?.metrics?.[0]?.startViews}</p>
          )}
   
          {video ? <p>{video.name}</p> : <p>Select a video file to upload.</p>}
   
          {progressFormatted && <p>{progressFormatted}</p>}
   
          {!asset?.[0].id && (
            <button
              onClick={() => {
                createAsset?.();
              }}
              disabled={isLoading || !createAsset}
            >
              Upload
            </button>
          )}
        </div>
      </div>
  
  )
  */



  return (
    <Background>
      <p className="text-2xl font-bold text-white">

        {/*
        {uploadProgress && uploadProgress * 100}
  */}

        {metrics?.metrics?.[0] && (
            <p>Views: {metrics?.metrics?.[0]?.startViews}</p>
        )}

      </p>
      <div className="flex h-screen w-full flex-row">
        <Sidebar updateCategory={(category: any) => setCategory(category)} />
        <div className="flex flex-1 flex-col">
          <Header />
          <div className="mt-5 mr-10 flex  justify-end">
            <div className="flex items-center">
              <button
                className="mr-6  rounded-lg border border-gray-600 bg-transparent py-2  px-6  dark:text-[#9CA3AF]"
                onClick={() => {
                  goBack()
                }}
              >
                Discard
              </button>
              <button
                onClick={handleSubmit}
                className="flex flex-row items-center  justify-between  rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
              >
                <BiCloud />
                <p className="ml-2">Upload</p>
              </button>
            </div>
          </div>
          <div className="m-10 mt-5 flex 	flex-col  lg:flex-row">
            <div className="flex flex-col lg:w-3/4 ">
              <label className="text-sm text-gray-600  dark:text-[#9CA3AF]">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Rick Astley - Never Gonna Give You Up (Official Music Video)"
                className="border-borderWhiteGray mt-2  h-12  w-[90%] rounded-md border bg-transparent p-2 focus:outline-none dark:border-[#444752]  dark:text-white dark:placeholder:text-gray-600"
              />
              <label className="mt-10 text-sm text-gray-600 dark:text-[#9CA3AF]">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Never Gonna Give You Up was a global smash on its release in July 1987, topping the charts in 25 countries including Rick’s native UK and the US Billboard Hot 100.  It also won the Brit Award for Best single in 1988. Stock Aitken and Waterman wrote and produced the track which was the lead-off single and lead track from Rick’s debut LP “Whenever You Need Somebody."
                className="border-borderWhiteGray mt-2  h-32 w-[90%] rounded-md  border bg-transparent p-2 focus:outline-none dark:border-[#444752]  dark:text-white dark:placeholder:text-gray-600"
              />

              <div className="mt-10 flex w-[90%] flex-row  justify-between">
                <div className="flex w-2/5 flex-col	">
                  <label className="text-sm text-gray-600  dark:text-[#9CA3AF]">
                    Location
                  </label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    placeholder="Bali - Indonesia"
                    className="border-borderWhiteGray mt-2 h-12 rounded-md  border bg-transparent p-2 focus:outline-none dark:border-[#444752]  dark:text-white dark:placeholder:text-gray-600"
                  />
                </div>
                <div className="flex w-2/5 flex-col	">
                  <label className="text-sm text-gray-600  dark:text-[#9CA3AF]">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className=" border-borderWhiteGray mt-2 h-12  rounded-md border bg-transparent p-2 focus:outline-none dark:border-gray-600  dark:text-white dark:text-[#9CA3AF]"
                  >
                    <option>Music</option>
                    <option>Sports</option>
                    <option>Gaming</option>
                    <option>News</option>
                    <option>Entertainment</option>
                    <option>Education</option>
                    <option>Science & Technology</option>
                    <option>Travel</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <label className="mt-10 text-sm  text-gray-600 dark:text-[#9CA3AF]">
                Thumbnail
              </label>

              <div
                onClick={() => {
                  thumbnailRef.current?.click()
                }}
                className="border-borderWhiteGray mt-2 flex  h-36 w-64 items-center justify-center rounded-md  border-2 border-dashed p-2 dark:border-gray-600"
              >
                {thumbnail ? (
                  <Image
                    onClick={() => {
                      thumbnailRef.current?.click()
                    }}
                    src={URL.createObjectURL(thumbnail)}
                    alt="thumbnail"
                    className="h-full rounded-md"
                    width={500}
                    height={500}
                  />
                ) : (
                  <BiPlus size={40} color="gray" />
                )}
              </div>

              <input
                type="file"
                className="hidden"
                ref={thumbnailRef}
                onChange={(e) => {
                  setThumbnail(e.target.files?.[0])
                }}
              />
            </div>

            <UploadInput isAudio={false} setVideo={setVideo} />

          </div>
        </div>
      </div>
    </Background>
  )




}



/*

  return (
    <div>
      {!asset && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag and drop or browse files</p>
 
          {error?.message && <p>{error.message}</p>}
        </div>
      )}
 
      {asset?.[0]?.playbackId && (
        <Player title={asset[0].name} playbackId={asset[0].playbackId} />
      )}
 
      <div>
        {metrics?.metrics?.[0] && (
          <p>Views: {metrics?.metrics?.[0]?.startViews}</p>
        )}
 
        {video ? <p>{video.name}</p> : <p>Select a video file to upload.</p>}
 
        {progressFormatted && <p>{progressFormatted}</p>}
 
        {!asset?.[0].id && (
          <button
            onClick={() => {
              createAsset?.();
            }}
            disabled={isLoading || !createAsset}
          >
            Upload
          </button>
        )}
      </div>
    </div>
  )
  */