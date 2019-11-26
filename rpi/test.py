# import libraries
import cv2
import matplotlib.pyplot as plt
import cvlib as cv
import threading
import time
from PIL import Image
import requests
import os


os.environ['NO_PROXY'] = '127.0.0.1'

frames = []

ROOM_NAME = 'B350'
faces = []

class ImageGrabber(threading.Thread):
    def __init__(self, ID):
        threading.Thread.__init__(self)
        
        time.sleep(1)

    def run(self):
        count =0 
        global frames
        video_capture = cv2.VideoCapture(0)
        # capture frames from the camera
        while True:
            ret, im = video_capture.read()
# grab the raw NumPy array representing the image, then initialize the timestamp
# and occupied/unoccupied text
            if(count==0):
                frames.append(im)
                count=1
# show the frame
            lastImg = im
            frames[0]=im
            #cv2.imshow("Frame", image)
            
 
# clear the stream in preparation for the next frame



#send to the database
def printit():
  r = requests.post('http://127.0.0.1:6200/api/room/update?name=' + ROOM_NAME + '&occupation=' + str(len(faces)))
  print(r.status_code, r.reason, len(faces))
  threading.Timer(5.0, printit).start()

printit()

grabber = ImageGrabber(0)
grabber.start()





image_path = cv2.imread('image.jpeg')
font = cv2.FONT_HERSHEY_SIMPLEX


time.sleep(2)


while True:
    #print("new frame")
    # Capture frame-by-frame
    im = frames[0]
    faces, confidences = cv.detect_face(im)
    #print(faces)
	# loop through detected faces and add bounding box
    for face in faces:
        (startX,startY) = face[0],face[1]
        (endX,endY) = face[2],face[3]
        # draw rectangle over face
        cv2.rectangle(im, (startX,startY), (endX,endY), (0,255,0), 2)
	# display output        
	#plt.imshow(im)
	#plt.show()

    cv2.putText(im,'Number of Faces : ' + str(len(faces)),(40, 40), font, 1,(255,0,0),2)      
    # Display the resulting frame
    cv2.imshow('Video', im)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break



# When everything is done, release the capture
video_capture.release()
cv2.destroyAllWindows()


