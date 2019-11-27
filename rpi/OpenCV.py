import cv2
import sys
import cvlib as cv
import threading
import time
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
        count = 0
        global frames
        video_capture = cv2.VideoCapture(0)
        # capture frames from the camera
        while True:
            ret, im = video_capture.read()
# grab the raw NumPy array representing the image, then initialize the timestamp
# and occupied/unoccupied text
            if(count == 0):
                frames.append(im)
                count = 1
# show the frame
            frames[0] = im
            #cv2.imshow("Frame", image)

grabber = ImageGrabber(0)
grabber.start()


time.sleep(5)

# send to the database


def printit():

  im = frames[0]
    # Get user supplied values
  cascPath = "haar-cascade-files-master/haarcascade_frontalface_alt.xml"

  # Create the haar cascade
  faceCascade = cv2.CascadeClassifier(cascPath)

  # Read the image
  image = frames[0]
  gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

  # Detect faces in the image
  faces = faceCascade.detectMultiScale(
      image,
      scaleFactor=1.01,
      minNeighbors=3,
      minSize=(40, 40),
      maxSize=(100, 100))

  print("Found {0} faces!".format(len(faces)))

  # Draw a rectangle around the faces
  for (x, y, w, h) in faces:
      cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)

  # cv2.imshow("Faces found", image)
  status = cv2.imwrite('saved.jpg', image)
  print ("Image written to file-system : ", status)
  # cv2.waitKey(0)
  r = requests.post('http://127.0.0.1:6200/api/room/update?name=' + ROOM_NAME + '&occupation=' + str(len(faces)))
  print(r.status_code, r.reason, len(faces))
  threading.Timer(60.0, printit).start()

printit()

# When everything is done, release the capture

