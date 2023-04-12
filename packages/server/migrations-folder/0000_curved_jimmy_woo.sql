CREATE TABLE IF NOT EXISTS "sensor_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"raw_value" integer NOT NULL,
	"humidity" numeric(6, 3) NOT NULL
);
