import React, { useEffect } from 'react'
import loadable from "@loadable/component";
import WebProgress from '@/components/WebProgress/'

const useLoadingComponent = () => {
    useEffect(() => {
        WebProgress.start();
        return () => {
            WebProgress.done();
        }
    }, []);
    return <div />
}

export default (Loader, Loading = useLoadingComponent) => {
    return loadable(Loader, {
        fallback: <Loading/>
    })
}
