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
  
### User Stories & Acceptance Tests  
[Trello](https://trello.com/b/AaikinSY/bit-counter)  

#### Related to: Schedule
- As an organizer I want to know the schedule of the talks to identify the rooms being used and display them, to the participants.  
- As an organizer I want to know the schedule of the talks and which rooms they are happening so as to not give wrong information to the atendees.  
  **Pre-condition:** Organizer access home page.  
  **Test steps:** Clicks on a day in the calendar; clicks on a talk occuring that day, if there is any  
  **Expected results:** On the talk tab it is displayed the room where it is happening, and when it is starting and ending  

- As an oragnizer I want to add new talks to the database which should be made availabe to the users.  
  **Pre-condition:** Organizer access home page.  
  **Test steps:** Clicks on the hamburguer menu, then Add Talks; and fills the form.  
  **Expected results:** The new talk will be displayed on the designated day, when it is selecting on the calendar.  

- As an organizer I want to remove talks from the database so they are no longer available to the users.  
  **Pre-condition:** Organizer access home page.  
  **Test steps:** Clicks the day of the talk to be removed; selects that talk from the ones happening that day; clicks on the delete button.  
  **Expected results:** The removed talk will not appear on that day talk list.
  
#### Related to: Room Occupation
- As an organzier I want to know the most popular talk of all, so I can know which theme I can invest for the next edition of the conference.  
  **Pre-condition:** Organizer access home page.  
  **Test steps:** On the home page click on tha banner "Most Popular Talk"  
  **Expected results:** If there is any talk on the database the one with the highest occupation at a given time will be displayed.  

- As an organizer I want to have a graphic displaying the room occupation over time so I can know the various points with high occupation.
- As an orgaznizer I want to have access to all the data from the talks to know precisely the popularity of the conference.

  **Pre-condition:** Organizer access home page.  
  **Test steps:** Select a day in the calendar with talks happening or talks that have finished; then select one of those talks.  
  **Expected results:** Displays a graphic of the occupation over time, if there is data for it.  

- As an organizer I want to know the most popular talk of the day, so I can know which theme I can invest for the next edition of the conference.  
  **Pre-condition:** Organizer access home page.  
  **Test steps:** Select the day we wish to know the most popular talk; then click on the banner "Most popular talk of the day".  
  **Expected results:** The data from the most popular talk from that day will be displayed.  

- As an orgaznizer I want to knwo the occupation of a room over time to better prepare the next conference.
- As an atendee I want to knwo the number of available seats at a talk to know with there is any seat for me.  
  **Pre-condition:** Normal user access home page.  
  **Test steps:** Selects the day of the talk; clicks on the talk from the list and sees the occupation graphic.  
  **Expected results:** A normal user, without any priveleges, should be able to see the occupation graphic.

#### Other User Stories
- As an organizer I want to enter with a passcode and be able to manage the talks.    
  **Pre-condition:** Organizer access home page.  
  **Test steps:** Click on Login; then insert the admin key  
  **Expected results:** Before inserting the admin key it should not be possible to add new talks, after the authentication that should not be the case.  

- As a user I want to access the website form a browser and know the room occupation on a given talk.

### Mockups
![Homepage mockup](https://raw.githubusercontent.com/softeng-feup/open-cx-bit-counter/report/docs/Images/Homepage%20Mockup.png "Homepage Mockup")  
![Talk graph mockup](https://raw.githubusercontent.com/softeng-feup/open-cx-bit-counter/report/docs/Images/Talk%20Graph%20Mockup.png "Talk graph Mockup")  
![Most popular talk mockup](https://raw.githubusercontent.com/softeng-feup/open-cx-bit-counter/report/docs/Images/Most%20Popular%20Talk%20Mockup.png "Most popular talk Mockup")
 
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
