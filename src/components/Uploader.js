import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import File from './File';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import VideoPlayer from './VideoPlayer';
import UploadArea from './UploadArea';
import SnackBar from './SnackBar';

function Uploader() {
  const [file, setFile] = useState();
  const [progress, setProgress] = useState(0);
  const [play, setPlay] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();
  }

  const handleUpload = async (files) => {
    const uploadedFile = files[0];
    const fileType = uploadedFile.name.split('.')[1];
    const size = (uploadedFile.size/1024)/1024;
    if(size < 50 || size > 1024) {
      setError('Size should be in 50MB to 1GB');
      setFile(undefined);
      setSuccess('');
    } else if(fileType !== 'mp4') {
        fileRef.current.value = null;
        setFile(undefined);
        setError('Only mp4 files are allowed');
        setSuccess('');
    } else {
        setProgress(0);
        setFile(uploadedFile);
        setPlay(false);
        const creds = {
          accessKeyId: process.env.REACT_APP_AWS_API_KEY,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
        }
        try {
          const upload = new Upload({
            client: new S3Client({
              region: process.env.REACT_APP_AWS_REGION,
              credentials: creds
            }),
            params: { Bucket: process.env.REACT_APP_AWS_BUCKET, Key: uploadedFile.name, Body: uploadedFile },
            leavePartsOnError: false,
          });
        
          upload.on("httpUploadProgress", (progress) => {
            setProgress((progress.loaded/progress.total)*100);
          });
        
          const response = await upload.done();
          uploadedFile.location = response.Location;
          setFile(uploadedFile);
          setSuccess('File Uploaded Successfully');
          setPlay(true);
        } catch (e) {
          setError('An error Occured Please try again later');
          setSuccess('');
          setFile(undefined);
          setPlay(false);
        }
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <div className='w-full max-w-[400px] lg:max-w-[600px] mb-4'>
          {play && <VideoPlayer src={file.location} />}
        </div>
        <UploadArea handleUpload={handleUpload}>
            <div className='text-center flex flex-col items-center'>
                <h2 className='text-xl font-bold'>You can upload video</h2>
                <span className='uppercase text-gray-400 text-sm mt-2'>Click on the button or gragdrop files here</span>
                <input type='file' multiple onChange={({ target: { files } }) => {handleUpload(files)}} ref={fileRef} className='hidden' />

                <button onClick={handleClick} className='flex items-center cursor-pointer mt-10 bg-blue-600 rounded-lg text-white'>
                    <ArrowUpIcon className='h-5 ml-2' /><span className='p-2 mr-2'>Upload video</span>
                </button>
            </div>
            {file && <File name={file.name} progress={progress} />}
        </UploadArea>
        { success !== '' && <SnackBar open={true} message={success} setOpen={setSuccess} type='success' /> }
        { error !== '' && <SnackBar open={true} message={error} setOpen={setError} type='error' /> }
    </div>
  )
}

export default Uploader;