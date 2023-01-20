import React, { useState, useEffect, useRef, useMemo } from 'react'
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
    const thumbnailCID = await uploadThumbnail()

    // Creating a object to store the metadata
    let data = {
      video: asset?.id,
      //video: "",
      title,
      description,
      location,
      category,
      thumbnail: thumbnailCID,
      UploadedDate: Date.now(),
    }
    // Calling the saveVideo function and passing the metadata object
    console.log(data)

    await saveVideo(data)

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
    await contract.uploadVideo(
      
      data.video,
      data.title,
      data.description,
      data.location,
      data.category,
      data.thumbnail,
      false,
      data.UploadedDate
      
    )
  }


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
  );
  */