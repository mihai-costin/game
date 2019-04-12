import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout  
from keras.callbacks import TensorBoard
import json
import numpy as np
from sklearn.utils import shuffle
from sklearn.model_selection import train_test_split

# load json file
with open('./data/trainingData_10k.json') as f:
    data = json.load(f)
    data_xs = np.array(data['x'])
    data_ys = np.array(data['y'])

# shuffle and split the data using sklearn
data_xs, data_ys = shuffle(data_xs, data_ys)

x_train, x_test, y_train, y_test = train_test_split(data_xs, 
                                                    data_ys, 
                                                    test_size = 0.2)

# keras model
model = Sequential()
model.add(Dense(512, activation='relu', input_dim=2))
model.add(Dropout(0.5))
model.add(Dense(512, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(512, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(512, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(1, activation='sigmoid'))

adam = keras.optimizers.Adam(lr=0.001)

model.compile(loss='binary_crossentropy',
              optimizer=adam,
              metrics=['accuracy'],
              callbacks=[tensorboard])

# enable tensorboard
tensorboard = TensorBoard(log_dir='./logs', histogram_freq=0,                
                          write_graph=True, write_images=False)

model.fit(x_train, y_train,
          epochs=5,
          batch_size=256,
          validation_data=(x_test, y_test))

# save the model 
model.save("Keras-10k")
