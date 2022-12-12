import React, {useEffect, useState} from 'react'
import {useHttpClient} from '../../hooks/HttpHook'
import Products from "../../components/products/Products"
import LoadingSpinner from '../../components/uiElements/LoadingSpinner'
import ErrorModal from '../../components/uiElements/ErrorModal'

function Apparel() {

    const [allApparel, setAllApparel] = useState()
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    useEffect(() => {
        const fetchApparel = async () => {
            try {
                const response = await sendRequest('http://localhost:5000/api/products/apparel')

                setAllApparel(response.apparel)
            } catch (err) {}
        }
        fetchApparel()
    }, [sendRequest])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner />}
            {!isLoading && allApparel &&
                <div>
                    <Products items={allApparel} />
                </div>
            }
        </React.Fragment>
    )
}

export default Apparel