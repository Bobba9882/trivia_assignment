# Trivia Backend

Spring Boot applicatie die trivia vragen ophaalt van de OpenTDB API.

## Wat doet deze applicatie

- Haalt trivia vragen op van externe API
- Beheert quiz sessies
- Controleert antwoorden en berekent scores

## Hoe te starten

```bash
./mvnw spring-boot:run
```

De backend draait op http://localhost:8080

## API endpoints

- GET /api/trivia/questions - Haal trivia vragen op
- POST /api/trivia/checkanswers - Controleer antwoorden
