import React, { useEffect } from 'react'
import Loadable from 'react-loadable'
import WebProgress from '@/components/WebProgress/'

const useLoadingComponent = () => {
    useEffect(() => {
        WebProgress.start();
        return () => {
            WebProgress.done();
        }
    }, [])

    return <div />
}

export default (loader, loading = useLoadingComponent) => {
    return Loadable({
        loader,
        loading
    })
}
