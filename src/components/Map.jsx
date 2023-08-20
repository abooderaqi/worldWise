/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation'

import styles from './Map.module.css'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition'

function Map() {
	const { cities } = useCities()
	const [mapPosition, setMapPosition] = useState([40, 0])

	const {
		isLoading: isLoadingPosition,
		getPosition,
		position: geolocationPosition,
	} = useGeolocation()
	const [mapLat, mapLng] = useUrlPosition()

	useEffect(() => {
		if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
	}, [mapLat, mapLng])

	useEffect(() => {
		if (geolocationPosition)
			setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
	}, [geolocationPosition])

	return (
		<div className={styles.mapContainer}>
			{!geolocationPosition && (
				<Button type='position' onClick={getPosition}>
					{isLoadingPosition ? 'Loading...' : 'Use your position'}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				{cities.map((city) => (
					<Marker position={city.position} key={city.id}>
						<Popup>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	)
}

// Move map around when we click on diffrent city
function ChangeCenter({ position }) {
	const map = useMap()
	map.setView(position)

	return null
}

// interact with the map by clicking on it
function DetectClick() {
	const navigate = useNavigate()

	useMapEvents({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	})
}

export default Map
