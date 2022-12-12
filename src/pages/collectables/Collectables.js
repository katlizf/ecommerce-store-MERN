import React, {useEffect, useState} from 'react'
import {useHttpClient} from '../../hooks/HttpHook'
import Products from "../../components/products/Products"
import LoadingSpinner from '../../components/uiElements/LoadingSpinner'
import ErrorModal from '../../components/uiElements/ErrorModal'

function Collectables() {

    const [allCollectables, setAllCollectables] = useState()
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    useEffect(() => {
        const fetchCollectables = async () => {
            try {
                const response = await sendRequest('http://localhost:5000/api/products/collectables')

                setAllCollectables(response.collectables)
            } catch (err) {}
        }
        fetchCollectables()
    }, [sendRequest])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner />}
            {!isLoading && allCollectables &&
                <div>
                    <Products items={allCollectables} />
                </div>            
            }
        </React.Fragment>
    )
}

export default Collectables