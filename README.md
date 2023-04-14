# Overview

The project are show concepts of development of frontend inside simple design to get data of API of Weather.

 - Api [Geocode](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.pdf)
 - Api [National Weather](https://www.weather.gov/documentation/services-web-api)
 
## Getting Started

Install dependencies
```bash
npm i
# or
yarn
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Explain Architecture

The project use conceps of Clean Architecture with TDD

![image](https://user-images.githubusercontent.com/25385783/231917377-8955cdfc-410d-4f1a-995a-058728fb83d8.png)

 - The Domain Layer is for define 'DTO' for FE
   - Models -> DTO of specific data
   - Use Cases -> Interface define load data from BE
   - Errors -> Main erros of application
 - The Data Layer is responsible for business rules and implements interfaces defined from Domain
   - RemoteLoadWeather implements Model of Domain and get data from Api
 - The Infra Layers is to define interface for get data use Axios with Adapter Pattern
 - Presentation Layer
   - Union Infra layers and Data Layer with Injection Dependencies, looks like Main Layers in this case
  
  
``` This case, in the concept (the god case or course) presentation layer need to be receive by factory all objects with another layers for fields (Validation Layers) ```
