import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout  
from keras.callbacks import TensorBoard
import json
import numpy as np
import tensorflowjs as tfjs
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split

# load json file
with open('./data/trainingData_10k.json') as f:
    data = json.load(f)
    data_xs = np.array(data['x'])
    data_ys = np.array(data['y'])

# shuffle the data using sklearn.utils
data_xs, data_ys = shuffle(data_xs, data_ys)

x_train, x_test, y_train, y_test = train_test_split(data_xs, data_ys, test_size = 0.2)

# keras model
model = Sequential()
model.add(Dense(128, activation='relu', input_dim=2))
model.add(Dropout(0.5))
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(2, activation='softmax'))

adam = keras.optimizers.Adam(lr=0.001)

model.compile(loss='binary_crossentropy',
              optimizer=adam,
              metrics=['accuracy'])

# enable tensorboard
tensorboard = TensorBoard(log_dir='./logs', histogram_freq=0,
                          write_graph=True, write_images=False)

model.fit(x_train, y_train,
          epochs=10,
          batch_size=256, validation_data=(x_test, y_test),
          callbacks=[tensorboard])

# test the model on another random testing data 
# show acurracy on test 
#x_test = np.random.rand(11388,2) * 1024

pred = model.predict(x_test, batch_size=256)

print(len(x_test))
count = 0
for i in range(len(pred)):
    pred_v = 0 if (pred[i][0] >= pred[i][1]) else 1
    test_v = 0  if (y_test[i][0] == 1) else 1
    
    if pred_v == test_v:
        count = count + 1

# print matched and score
print("Matched ", count, " on test from ", len(pred))    
print("Acuraccy of the model on test: %.2f %%" %(count/len(pred) * 100))

# save the model and convert it to tensorflow.js
model.save("Keras-128-10")
tfjs.converters.save_keras_model(model, "tfjsConvers")

