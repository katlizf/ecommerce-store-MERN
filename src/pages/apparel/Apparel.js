import {useEffect, useState} from "react"
import {useHttpClient} from "../../hooks/HttpHook"
import Products from "../../components/products/Products"
import LoadingSpinner from "../../components/uiElements/LoadingSpinner"
import ErrorModal from "../../components/uiElements/ErrorModal"
import PageContainer from "../../components/pageContainer/PageContainer"

function Apparel() {

	const [allApparel, setAllApparel] = useState()
	const {isLoading, error, sendRequest, clearError} = useHttpClient()

	useEffect(() => {
		const fetchApparel = async () => {
			try {
				const response = await sendRequest(
					"http://localhost:5000/api/products/apparel"
				)

				setAllApparel(response.apparel)
			} catch (err) {}
		}
		fetchApparel()
	}, [sendRequest])

	return (
		<PageContainer>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay />}
			{!isLoading && allApparel && (
				<div>
					<Products items={allApparel} />
				</div>
			)}
		</PageContainer>
	)
}

export default Apparel