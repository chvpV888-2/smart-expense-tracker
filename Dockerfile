# Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
# This copies everything from your repo into the /app folder
COPY . .
# This command now runs inside /app where your pom.xml should be
RUN mvn clean package -DskipTests

# Run Stage
FROM eclipse-temurin:21-jre
WORKDIR /app
# We look for the jar file in the target folder
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]