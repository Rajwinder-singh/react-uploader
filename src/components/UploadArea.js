function UploadArea({ children, handleUpload }) {

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files)
        }
    }

  return (
    <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className='border-2 border-dashed border-sky-400 flex flex-col items-center justify-center 
            w-full max-w-[400px] lg:max-w-[600px] text-lg rounded-lg pb-4 pt-4'
    >
        {children}
    </div>
  )
}

export default UploadArea;