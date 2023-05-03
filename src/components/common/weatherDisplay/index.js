import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import { useState, useEffect } from 'react';

/**
 * Returns component for showing weather conditions
 */
const WeatherDisplay = () => {
    const [weather, setWeather] = useState({});

	useEffect(() => {
		const getWeather = async () => {
			const res = await fetch(
				"http://api.weatherapi.com/v1/current.json?key=44dd80c5f1dd47f8ba104537230205&q=77840&aqi=no"
			).then(result => result.json());
			setWeather(res.current);
		}

		getWeather();
	}, []);

    return (
        <Box p="1em" rounded="md" border="solid 1px" borderColor="grey.100" boxShadow='md'
            w="20em" h="fit=content"
        >
            <Text textAlign="center">
                <b>Weather</b>
            </Text>
            <Grid templateColumns='repeat(2, 1fr)' gap={1}>
                <GridItem>
                    {
                        weather?.condition?.text ?
                        <Text mt={1}><b>Condition:</b> {weather.condition.text}</Text> : ""
                    }
                </GridItem>
                <GridItem>
                    {
                        weather?.temp_f ?
                        <Text mt={1}><b>Temp:</b> {weather.temp_f} F</Text> : ""
                    }
                </GridItem>
                <GridItem>
                    {
                        weather?.wind_mph ?
                        <Text mt={1}><b>Wind:</b> {weather.wind_mph} mph</Text> : ""
                    }
                </GridItem>
                <GridItem>
                    {
                        weather?.humidity ?
                        <Text mt={1}><b>Humidity:</b> {weather.humidity}%</Text> : ""
                    }
                </GridItem>
            </Grid>
        </Box>
    );
};

export default WeatherDisplay;