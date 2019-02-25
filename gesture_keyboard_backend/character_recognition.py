from keras.models import load_model
from collections import deque
import numpy as np
import cv2
import os, sys
from PIL import Image
import pyrebase
import base64

#Configure Firebase
config = {
  "apiKey": "AIzaSyDuiOnplJjjoh9poil-h67uFPUBw7ojJ0c",
  "authDomain": "gesturekeyboard.firebaseapp.com",
  "databaseURL": "https://gesturekeyboard.firebaseio.com",
  "storageBucket": "gesturekeyboard.appspot.com"
}

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()
db = firebase.database()

# get the images and their names from the database
images = db.child("Data")

# keep the key of the image to store classification later
imageKey = ""
filename = ""

# store the images locally for classification
for imageData in images.get().each():
  imageVal = imageData.val()
  if imageVal is not None:
    if "classification" not in imageVal.keys():
      imageKey = imageData.key() # saved for future classification

      # decoding the base64 data to a png image and downloading it
      imageString = imageVal["imgsrc"].split("base64,",1)[1]
      imageBase64Data = base64.b64decode(imageString)

      # downloading the image from the firebase storage
      filename = "images/" + imageVal['imgname']

      with open(filename, 'wb') as f:
        f.write(imageBase64Data)

      break

# Load the models built in the previous steps
cnn_model = load_model('emnist_cnn_model.h5')

# Letters lookup
letters = { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h', 9: 'i', 10: 'j',
11: 'k', 12: 'l', 13: 'm', 14: 'n', 15: 'o', 16: 'p', 17: 'q', 18: 'r', 19: 's', 20: 't',
21: 'u', 22: 'v', 23: 'w', 24: 'x', 25: 'y', 26: 'z', 27: '-'}

# Define a 5x5 kernel for erosion and dilation
kernel = np.ones((5, 5), np.uint8)

# # Define prediction variable
prediction = 26

# if there is a letter to be classified
if (len(filename) > 0):
  img = cv2.imread(filename, cv2.IMREAD_GRAYSCALE)

  newImage = cv2.resize(img, (28, 28))
  print(newImage)
  newImage = np.array(newImage)
  newImage = newImage.astype('float32')/255

  prediction = cnn_model.predict(newImage.reshape(1,28,28,1))[0]
  prediction = np.argmax(prediction)

  # print("Convolution Neural Network:  " + str(letters[int(prediction)+1]), (10, 440), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

  # adding the classified letter to the database
  classification = str(letters[int(prediction)+1])
  db.child("Data").child(imageKey).update({"classification" : classification})