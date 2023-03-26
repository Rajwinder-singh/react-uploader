import { PlayIcon } from '@heroicons/react/24/solid';

function File({ name, progress }) {
  
  const updatedName = name.split('.')[0].slice(0, 10) + '...' + name.split('.')[0].slice(name.split('.')[0].length - 3) + '.' + name.split('.')[1]
  return (
    <div className='flex items-center w-full text-sm text-gray-400 pl-2 pr-2 mb-2'>
        <div className='rounded-lg flex items-center justify-center shadow-lg h-[80px] w-[50px]'>
            <PlayIcon className='h-8 text-blue-600'/>
        </div>
        <div className='flex flex-col h-[80px] rounded-lg shadow-lg flex-grow p-3 space-y-2'>
            <p>File <span className='font-bold text-sm text-black'>{updatedName}</span> is uploading...</p>
            <div className="w-full bg-gray-300 rounded-full">
                <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 rounded-full" style={{
                    width: `${progress}%`
                }}> {progress.toFixed(2)}%</div>
            </div>
        </div>
    </div>
  )
}

export default File;