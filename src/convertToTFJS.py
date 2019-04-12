import sys
import tensorflowjs as tfjs
import keras
from keras.models import load_model

# convert the keras models into json
# to load in tensorflow.js
def convertTotfjs(model, file):
    tfjs.converters.save_keras_model(model, "tfjsConverts/" + file)


# take the file that would like to convert 
# from console argument
file = sys.argv[1]
model = load_model(file)
convertTotfjs(model, file)
