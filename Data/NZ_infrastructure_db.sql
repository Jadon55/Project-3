-- Created databases to 

CREATE TABLE "public_transport" (
    "Region" string   NOT NULL,
    "2017_18" int   NOT NULL,
    "2018_19" int   NOT NULL,
    "2019_20" int   NOT NULL,
    "2020_21" int   NOT NULL,
    "2021_22" int   NOT NULL,
    CONSTRAINT "pk_public_transport" PRIMARY KEY (
        "Region"
     )
);

CREATE TABLE "road_maintenance" (
    "Region" varchar   NOT NULL,
    "2017_18" decimal   NOT NULL,
    "2018_19" decimal   NOT NULL,
    "2019_20" decimal   NOT NULL,
    "2020_21" decimal   NOT NULL,
    "2021_22" decimal   NOT NULL,
    CONSTRAINT "pk_road_maintenance" PRIMARY KEY (
        "Region"
     )
);
