FROM gradle:8.7.0-jdk22-alpine as builder
WORKDIR /app
COPY . /app/.

RUN chmod +x gradlew

RUN ./gradlew clean build -x test

FROM amazoncorretto:22
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]