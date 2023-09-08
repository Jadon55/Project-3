-- This schema contains queries that help provide answers to our 6 investigation questions

-- 1. How many crashes were logged over the 5 year period?
-- 2. Are the number of crashes per year increasing or decreasing?
-- 3. Which public holiday is the most dangerous for drivers?
-- 4. Do any common geographical accident zones stand out?
-- 5. Which region has the most fatalities on the road?
-- 6. What are the most common factors leading to crashes?



-- NUMBER OF CRASHES OVER THE 5 YEAR PERIOD
SELECT *
FROM totalCrashCount;
-- 170259 crashes from 2018 - 2022



-- NUMBER OF CRASHES BY YEAR
SELECT *
FROM crashesByYear;
-- 2018: 38469 crashes - 1st
-- 2019: 36919 crashes - 2nd
-- 2020: 32808 crashes - 4th
-- 2021: 34080 crashes - 3rd
-- 2022: 27982 crashes - 5th



-- FATAL CRASHES BY YEAR
SELECT *
FROM fatalCrashesYear;
-- 2018: 332 fatal crashes - 2nd
-- 2019: 298 fatal crashes - 3rd
-- 2020: 292 fatal crashes - 4th
-- 2021: 285 fatal crashes - 5th
-- 2022: 338 fatal crashes - 1st



-- NUMBER OF DEATHS BY YEAR
SELECT *
FROM deathsByYear;
-- 2018: 378 deaths - 1st
-- 2019: 350 deaths - 3rd
-- 2020: 318 deaths - 4th=
-- 2021: 318 deaths - 4th=
-- 2022: 375 deaths - 2nd



-- TOTAL DEATHS OVER 5 YEAR PERIOD
SELECT *
FROM totalDeaths;
-- 1739 Deaths from 2018 - 2022



-- NUMBER OF FATAL CRASHES BY HOLIDAY OVER 5 YEAR PERIOD
SELECT *
FROM holidayFatalCrashes
WHERE holiday IS NOT NULL
ORDER BY fatalCrashes DESC;
-- Christmas New Years 	50 (Ten Day Period) - crashes divided by days: 5
-- Easter 				23 (Four Day Period) - crashes divided by days: 5.75
-- Labour Weekend		23 (Three Day Period) - crashes divided by days: 7.67
-- Queens Birthday		16 (Three Day Period) - crashes divided by days: 5.33



-- NUMBER OF DEATHS BY HOLIDAY OVER 5 YEAR PERIOD
SELECT *
FROM holidayDeaths
WHERE holiday IS NOT NULL
ORDER BY deaths DESC;
-- Christmas New Year	57 	(Ten Day Period) - deaths divided by days: 5.7
-- Labour Weekend		26	(Four Day Period) - deaths divided by days: 6.5
-- Easter				25	(Three Day Period) - deaths divided by days: 8.33 
-- Queens Birthday		17	(Three Day Period) - deaths divided by days: 5.67 



-- NUMBER OF DEATHS BY REGION
SELECT *
FROM deathsByRegion;
-- Waikato 				329
-- Auckland 			238
-- Canterbury			221
-- BOP					172
-- Matawata-Whanganui	162



-- NUMBER OF DEATHS BY TERRITORIAL REGION
SELECT *
FROM deathsByTerritory;
-- Auckland 	238
-- Christchurch	74
-- Far North	66
-- Whangarei	64
-- Waikato		60



-- COUNT OF EACH CRASH FACTORS IN FATAL ACCIDENTS
SELECT *
FROM commonFactors;
--	Top 5 Factors
-- fence 		264
-- tree			234
-- ditch		182
-- pedestrian	175
-- cliff Bank	146



