import cv2
import numpy as np
import tensorflow as tf

# Cargar el modelo TFLite
interpreter = tf.lite.Interpreter(model_path=r'C:/Users/carolina/Documents/Proyectos_programacion/SIRA/backend/models/sira_modelo4.tflite')
interpreter.allocate_tensors()

# Obtener los detalles de entrada y salida
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Cargar la imagen
cap = cv2.imread(r'C:/Users/carolina/Documents/Proyectos_programacion/SIRA/backend/prueba_modelo/imagenes_prueba/prueba11.jpeg')

# Verificar si la imagen se cargó correctamente
if cap is None:
    print("Error al cargar la imagen.")
    exit()

# Preprocesar la imagen
input_shape = input_details[0]['shape']
input_data = cv2.resize(cap, (input_shape[1], input_shape[2]))
input_data = np.expand_dims(input_data, axis=0)
input_data = input_data.astype(np.float32) / 255.0

# Hacer una predicción con el modelo
interpreter.set_tensor(input_details[0]['index'], input_data)
interpreter.invoke()
output_data = interpreter.get_tensor(output_details[0]['index'])
print("Valor: ", output_data)

# Obtener la etiqueta de la predicción
labels = ['Metal', 'Papel o carton', 'Plastico', 'Vidrio']  # Ajusta esto según tus clases
predicted_label = labels[np.argmax(output_data)]

# Dibujar el recuadro y la etiqueta sobre la imagen
output_image = cap.copy()
cv2.rectangle(output_image, (10, 10), (200, 60), (0, 255, 0), 2)
cv2.putText(output_image, predicted_label, (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

# Redimensionar la imagen para que se ajuste a una ventana de 600x600 píxeles
window_size = 600
height, width = output_image.shape[:2]
aspect_ratio = width / height

if aspect_ratio > 1:
    new_width = window_size
    new_height = int(window_size / aspect_ratio)
else:
    new_height = window_size
    new_width = int(window_size * aspect_ratio)

resized_image = cv2.resize(output_image, (new_width, new_height))

# Crear una imagen de fondo de 600x600 píxeles
background = np.zeros((window_size, window_size, 3), dtype=np.uint8)

# Calcular las coordenadas para centrar la imagen redimensionada en el fondo
x_offset = (window_size - new_width) // 2
y_offset = (window_size - new_height) // 2

# Colocar la imagen redimensionada en el fondo
background[y_offset:y_offset+new_height, x_offset:x_offset+new_width] = resized_image

# Mostrar la imagen con el recuadro y la etiqueta en una ventana de 600x600 píxeles
cv2.imshow('Imagen con Prediccion', background)
cv2.waitKey(0)
cv2.destroyAllWindows()