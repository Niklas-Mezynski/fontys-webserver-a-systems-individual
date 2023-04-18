ALTER TABLE "sensor_data" ADD COLUMN "weather_id" integer;
DO $$ BEGIN
 ALTER TABLE "sensor_data" ADD CONSTRAINT "sensor_data_weather_id_weather_data_id_fk" FOREIGN KEY ("weather_id") REFERENCES "weather_data"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
