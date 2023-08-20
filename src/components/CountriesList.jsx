/* eslint-disable react/prop-types */
import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'
import { useCities } from '../contexts/CitiesContext'

import styles from './CountryList.module.css'

function CountriesList() {
	const { isLoading, cities } = useCities()

	if (isLoading) return <Spinner />

	if (!cities.length)
		return (
			<Message message='Add your first city by clicking on a city on the map' />
		)

	// to get the unique countries from cities array
	const contries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country))
			return [...arr, { country: city.country, emoji: city.emoji }]
		else return arr
	}, [])

	return (
		<ul className={styles.countryList}>
			{contries.map((country) => (
				<CountryItem country={country} key={country.id} />
			))}
		</ul>
	)
}

export default CountriesList
