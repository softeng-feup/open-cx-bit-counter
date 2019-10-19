# Bit Counter ™
Counting people in conferences, since 2019.
**BIT - Best Interactive Team**  
* Bruno Micaelo
* Manuel Monteiro
* Nuno Cardoso
* Simão Oliveira  
 
## Vision  
Web app capable of giving information to both the organization and participants on wether the room is full or not. If it isn't full it's also possible to say how many people are in the session.
The goal is to increase the number of participants in talks and decrease the number of empty seats.  

## Elevator Pitch
We want to know how full a room is during a talk. To accomplish this we use image recognition to count people's head and so we get the number of attendees. With this data we can know our target audience better and be more efective in the marketing campaign of the upcoming edition.  
Queremos saber quantas pessoas frequentaram uma dada palestra. Utilizamos reconhecimento de imagem para contar pessoas e assim obter números concretos relativos à conferência. Com base nestes números podemos conhecer melhor o nosso público alvo e sermos mais efetivos no nosso marketing e publicidade.  

## Use Cases
![Use Case Diagram][useCase_diagram]

### Check rooms occupation
Actor: Participant
Description: By selecting a day of the conference, a participant can see the current ocupation of the rooms in which talks may be ocurring, so as to know if they can attend any talk they might be interested in.
Normal flow: A participant selects a day 

### Check the talks timetable
Actor: Participant

## User Stories  
[Trello](https://trello.com/b/AaikinSY/bit-counter)  

As a conference atendee, I want to know the number of seats available at a talk toif I can show up.

As an organizer, I want to know the room ocupation during the conference, this way I'll be able to get the data needed to better prepare a future edition.

As an organizer, I want to have access to data of all talks so that I can understand in a more precise way the affluence and popularity of a conference.

As an organizer, I want to know which talk has more affluence so that I can repeat or deepen the theme on the next edition.

Como organizador pretendo saber qual a palestra com menor afluencia e perceber o motivo para tal afluencia e resolver este problema na próxima edição.  

Como organizador pretendo utilizar os dados recolhidos para poder estudar uma possivel edição futura com melhor fiabilidade e um melhor modelo estatistico.  

### Mockups
![Mockup 1][mockup1]  
![Mockup 2][mockup2]  

#### *User Stories relacionadas com horario/calendario*

Como organizador pretendo saber o horario das palestras para identificar as salas que estao a ser usadas e indicar ao participante as salas com palestras.  

Como organizador predendo saber o calendario das palestras para saber as salas que vão ser usadas naquele dia e assim não induzir o participante em erro.  


## Domain analysis
![Domain analysis][domain_diagram]

## Architecture and Design

The architecture must adapt to a simple web app, meaning it will need a simple scheme where it uses these layers: frontend, backend and database.
To achieve that we will be using an Architecture with a Layered Pattern.
On top we will, however, add a diferent layer for the counting software/hardware.
“This Layered Pattern can be used to structure programs that can be decomposed into groups of subtasks, each of which is at a particular level of abstraction. Each layer provides services to the next higher layer.”
Our layers will be:

- Presentation layer (UI layer)(front-end)
- Counting layer (domain layer)(back-end)
- Application layer (service layer)(back-end)
- Business logic layer (domain layer)
- Data access layer (database layer)(database)

![](https://i.imgur.com/KE9heEx.png)




[mockup1]: https://raw.githubusercontent.com/softeng-feup/open-cx-bit-counter/master/docs/Imagens/Mockup%201.png?token=AFUQTMLB7YKPGGEOL7ZA7D25WKZ3Y

[mockup2]: https://raw.githubusercontent.com/softeng-feup/open-cx-bit-counter/master/docs/Imagens/Mockup%202.png?token=AFUQTMOYNWE4QAJX6Z6724C5WKZ5E

[useCase_diagram]: https://raw.githubusercontent.com/softeng-feup/open-cx-bit-counter/master/docs/UML/Use%20Cases.png?token=AFUQTMMXEF6LYS7ZOA3MPAC5WKWCS

[domain_diagram]: https://raw.githubusercontent.com/softeng-feup/open-cx-bit-counter/master/docs/domain/domain_diagram.png?token=AFUQTMNYCEGOQWC72L7GT525VF5RI