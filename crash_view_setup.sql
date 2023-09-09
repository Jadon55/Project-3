-- This schema creates views used in the crash_queries schema for common queries relating to the investigation questions

-- drop views if already exist
DROP VIEW IF EXISTS 
totalCrashCount, 
crashesByYear,
fatalCrashesYear,
totalDeaths,
deathsByYear,
holidayFatalCrashes,
holidayDeaths,
deathsByRegion,
deathsByTerritory,
commonFactors,
commonVehicles
;



-- Overall crash count for the 5 year period
CREATE VIEW totalCrashCount
AS
SELECT COUNT(*)
FROM "Crashes";



-- number of crashes by year
CREATE VIEW crashesByYear
AS
SELECT DISTINCT "crashYear" AS crashYear, COUNT("crashYear") AS crashNumber
FROM "Crashes"
GROUP BY crashYear;



-- number of fatal crashes by year
CREATE VIEW fatalCrashesYear
AS
SELECT DISTINCT "crashYear" AS crashYear, COUNT("crashSeverity") AS fatalCrashCount
FROM "Crashes"
WHERE "crashSeverity" = 'Fatal Crash'
GROUP BY crashYear;



-- Deaths by year
CREATE VIEW deathsByYear
AS
SELECT DISTINCT "crashYear" AS crashYear, SUM("fatalInjuries") AS deaths
FROM "Crashes"
GROUP BY crashYear;



-- total deaths over 5 year period
CREATE VIEW totalDeaths
AS
SELECT SUM("fatalInjuries") AS totalDeaths
FROM "Crashes";



-- Most dangerous holiday period
CREATE VIEW holidayFatalCrashes
AS
SELECT holiday, COUNT(holiday) AS fatalCrashes
FROM "Crashes"
WHERE "crashSeverity" = 'Fatal Crash'
GROUP BY holiday;



-- deaths by holiday period
CREATE VIEW holidayDeaths
AS
SELECT holiday, SUM("fatalInjuries") AS deaths
FROM "Crashes"
WHERE "crashSeverity" = 'Fatal Crash'
GROUP BY holiday;



-- deaths by region
CREATE VIEW deathsByRegion
AS
SELECT region, SUM("fatalInjuries") AS deaths
FROM "Crashes"
WHERE "crashSeverity" = 'Fatal Crash'
GROUP BY region
ORDER BY deaths DESC;;



-- deaths by territorial Authority
CREATE VIEW deathsByTerritory
AS
SELECT region, "territorialAuthority", SUM("fatalInjuries") AS deaths
FROM "Crashes"
WHERE "crashSeverity" = 'Fatal Crash'
GROUP BY region, "territorialAuthority"
ORDER BY deaths DESC;



-- count of most common factors in fatal crashes
CREATE VIEW commonFactors
AS
SELECT  
SUM("roadworks") AS roadworks,
SUM("parkedVehicle") AS parkedVehicle,
SUM("bridge") AS bridge,
SUM("cliffBank") AS cliffBank,
SUM("debris") AS debris,
SUM("ditch") AS ditch,
SUM("fence") AS fence,
SUM("guardRail") AS guardRail,
SUM("building") AS building,
SUM("kerb") AS kerb,
SUM("pedestrian") AS pedestrian,
SUM("objectThrown") AS obj_thrown,
SUM("otherObject") AS otherObject,
SUM("slipOrFlood") AS slipOrFlood,
SUM("strayAnimal") AS animal,
SUM("tree") AS tree,
SUM("river") AS river
FROM "Crashes"
WHERE "crashSeverity" = 'Fatal Crash';



--count common vehicles in fatal accidents
CREATE VIEW commonVehicles
AS
SELECT  
SUM("bicycle") AS bicycle,
SUM("bus") AS bus,
SUM("stationWagon") AS stationWagon,
SUM("moped") AS moped,
SUM("motorcycle") AS motorcycle,
SUM("suv") AS SUV,
SUM("taxi") AS taxi,
SUM("train") AS train,
SUM("truck") AS truck,
SUM("van") AS van,
SUM("pedestrian") AS pedestrian,
SUM("utilityVehicle") AS ute,
SUM("otherVehicleType") AS other,
SUM("schoolBus") AS schoolBus,
SUM("unknownVehicleType") AS unknown
FROM "Crashes"
WHERE "crashSeverity" = 'Fatal Crash';






