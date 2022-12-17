import React, {useEffect, useState} from 'react'
import {useHttpClient} from '../../hooks/HttpHook'
import Products from "../../components/products/Products"
import LoadingSpinner from '../../components/uiElements/LoadingSpinner'
import ErrorModal from '../../components/uiElements/ErrorModal'
import PageContainer from '../../components/pageContainer/PageContainer'

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
        <PageContainer>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner />}
            {!isLoading && allCollectables &&
                <div>
                    <Products items={allCollectables} />
                </div>            
            }
        </PageContainer>
    )
}

export default Collectables