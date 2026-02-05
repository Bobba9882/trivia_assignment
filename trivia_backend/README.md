# Trivia Backend

Spring Boot applicatie die trivia vragen ophaalt van de OpenTDB API.

## Wat doet deze applicatie

- Haalt trivia vragen op van externe API
- Beheert quiz sessies
- Controleert antwoorden en berekent scores

## Vereisten

- Java 17 of hoger
- Maven 3.6 of hoger

## Hoe te starten

```bash
./mvnw spring-boot:run
```

De backend draait op http://localhost:8080

## API endpoints

- GET /api/trivia/questions - Haal trivia vragen op
- POST /api/trivia/checkanswers - Controleer antwoorden

## Tests uitvoeren

Voer alle unit tests uit:

```bash
./mvnw test
```

Voer tests uit voor een specifieke klasse:

```bash
./mvnw test -Dtest=TriviaServiceImplTest
```

Test coverage rapport genereren:

```bash
./mvnw verify
```

## Test structuur

De applicatie bevat de volgende unit tests:

- **TriviaServiceImplTest** - Test de kernlogica van de trivia service
- **TriviaControllerTest** - Test de REST API endpoints
- **OpenTdbServiceImplTest** - Test de integratie met de externe Open Trivia Database API

