# Bit Counter
*Counting people in conferences, since 2019.*  

### BIT - Best Interactive Team  
- Bruno Micaelo 
- Manuel Monteiro
- Nuno Cardoso
- Simão Oliveira

---

## Vision  
Web app capable of giving information to both the organization and participants on wether the room is full or not. If it isn't full it's also possible to say how many people are in the session.
The goal is to increase the number of participants in talks and decrease the number of empty seats.  

## Elevator Pitch
We want to know how full a room is during a talk. To accomplish this we use image recognition to count people's head and so we get the number of attendees. With this data we can know our target audience better and be more efective in the marketing campaign of the upcoming edition.  

---

## Requirements  

### Use Cases
![Use Case Diagram](https://raw.githubusercontent.com/softeng-feup/open-cx-bit-counter/report/docs/Images/Use%20Case%20Diagram.png "Use Case Diagram")

#### See the room occupation
**Actor**: Atendee  
**Description:** By selecting a day the atendee can see the current ocupation of the rooms, where talks are occuring. This way, they know if there is any seat in the talks they are interested in.  
**Normal flow:** The atendee selects the day and then the conference he is interested in knowing the room occupation.

#### See the conference schedule
**Actor:** Atendee  
**Description:** By selecting the day the atendee wants to know the scedule they can see which talks will be happening. Then by selecting one of those talks they can see more inforamtion.  
**Normal flow:** The atendee selects the day and then the conference to know the schedule information.  

#### Schedule a talk
**Actor:** Organization  
**Description:** The organization wants to schedule a talk for a specific day and time, it also wants to store where said talk is happening, the room, and its' start and end time.  

#### Cancel a talk
**Actor:** Organization  
**Description:** In case something happens the organization wants to cancel a talk, so it doesn't appear in the conference schedule and gives false information to the atendees.  

#### See the details on how the conference is doing
**Actor:** Organization  
**Description:** The conference organizers want to know which talks had the most atendees, which talk was most popular that day.  
  
### User Stories  
[Trello](https://trello.com/b/AaikinSY/bit-counter)  

- **Schedule**
  - As an organizer, I want to know the talks schedule, so that I can identify which rooms are being used and indicate the talks rooms to participants.  
  - As an organizer, I want to know the talks schedule, so that I know which rooms will be used on that day and don’t induce participants in error. 
  - As an organizer, I want to be able to add new talks to the database, so that users can see them.
  - As an organizer, I want to be able to remove a talk from the system, so that it stops being available to users.
- **Room Occupation**
  - As an organizer, I want to know the most affluent talk, so that I can repeat it or deepen more the theme on the next edition.
  - As an organizer, I want to see a chart with the room’s occupation over time, so that I know the biggest moments of occupation.  
  - As an organizer, I want to have access to all talks’ data, in order to conclude more precisely the affluence and the popularity of the conference.
  - As an organizer, I want to know which talk has more affluence on each day, so that I can repeat it or deepen more the theme on the next edition..    
  - As an organizer, I want to know the room’s occupation throughout the talk, so that I can predict more precisely the required seats to the future edition.
  - As a conference participant, I want to know the number of available seats on a talk, so that I know if I can attend.
- **Extra features**
  - As an organizer, I want to have the possibility of logging in with an administrator key, so that I can manage talks’ data.
  - As a user, I want to access the site with a browser, so that I can see the rooms’ occupation, to know if I have an empty seat on that talk.

### Mockups
![Homepage mockup](https://raw.githubusercontent.com/softeng-feup/open-cx-bit-counter/report/docs/Images/Homepage%20Mockup.png "Homepage Mockup")  
![Talk graph mockup](https://raw.githubusercontent.com/softeng-feup/open-cx-bit-counter/report/docs/Images/Talk%20Graph%20Mockup.png "Talk graph Mockup")  
![Most popular talk mockup](https://raw.githubusercontent.com/softeng-feup/open-cx-bit-counter/report/docs/Images/Most%20Popular%20Talk%20Mockup.png "Most popular talk Mockup")

### Acceptance tests
Before deploying the website the project was tested and made using Docker. This way it was possible to easily test and develop new features without the need to deploy them into the real website. On the other hand, this approach also made work easier for everyone as it allowed everyone to work independently; it also prevent bugs from occuring when certain features weren't completely implemented.

### Domain model
![Domain analysis](https://raw.githubusercontent.com/softeng-feup/open-cx-bit-counter/report/docs/Images/domain_diagram.png "Domain Model Diagram")

---

## Architecture and Design

### Logical architecture
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

### Physical architecture 
To develop the presentation layer, front-end, we used React and various utilities from MaterialUI.  
The application layer consists of a simple Python program which uses the library OpenCV to achieve its facial recognition cabalities. This program is intendent to be run on a Raspberry Pi.  

The communication between the application and the database is made using HTTP Requests.

![Physical Architecute](https://raw.githubusercontent.com/softeng-feup/open-cx-bit-counter/report/docs/Images/physical.png "Physical architecture UML")

### Prototype
We approach our project from a bottom up approach, we started by developing a simple React website, and at the same time exploring with OpenCV.  
Then as the project moved along the website started to grow in features to accomodate the new user-stories. The ability to add talks was implemented.  
When data from the application started to come in, a graph was added to each talk to show the change in occupation over time.  
Lastly an admin key was implemented to make sure only the conference organizers could add/remove talks. At this time the website also went live.
