import {useCallback, useEffect, useState, useRef} from "react"

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const activeHttpRequests = useRef([])
    // store data across re-render cycles

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true)

        const httpAbortCtrll = new AbortController()
        // activeHttpRequests.current.push(httpAbortCtrll)

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrll.signal
            })
            const responseData = await response.json()

            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrll)
            // clear an abort controller if a request completes

            if (!response.ok) {
                throw new Error(responseData.message)
            }

            setIsLoading(false)
            return responseData
        } catch (err) {
            setError(err.message)
            setIsLoading(false)
            throw err
        }
    }, [])

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        }
    }, [])
    // before the next use effect runs again or when the component that uses use effect unmounts

    return {isLoading, error, sendRequest, clearError}
}
