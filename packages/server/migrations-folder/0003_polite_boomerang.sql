CREATE TABLE IF NOT EXISTS "weather_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"weather_measured_at" timestamp NOT NULL,
	"temperature_c" numeric(4, 1) NOT NULL,
	"precipitation_mm" numeric(6, 1) NOT NULL,
	"uv_index" numeric(4, 1) NOT NULL,
	"pressure_mbar" numeric(6, 2) NOT NULL,
	"humidity" integer NOT NULL,
	"cloud" integer NOT NULL
);

CREATE INDEX IF NOT EXISTS "weather_data_created_at_index" ON "weather_data" ("created_at");