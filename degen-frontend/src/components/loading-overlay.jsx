import { LoaderCircle } from 'lucide-react';

const Loader = ({ message }) => {
    return (
        <div className="fixed w-full h-full flex flex-col items-center justify-center bg-black opacity-90 z-50">
            <LoaderCircle className='animate-spin text-white' />
            <p className="text-xs text-white opacity-100">{message}</p>
        </div>
    )
}

export { Loader }