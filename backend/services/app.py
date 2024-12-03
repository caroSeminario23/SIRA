from flask import Flask, request, send_file, make_response
from flask_cors import CORS
import numpy as np
import tensorflow as tf
import cv2
import io

app = Flask(__name__)
CORS(app, expose_headers=["X-Predicted-Label"])

# Cargar el modelo TFLite
interpreter = tf.lite.Interpreter(model_path=r'C:\Users\carolina\Documents\Proyectos_programacion\SIRA\backend\models\sira_modelo4.tflite')
interpreter.allocate_tensors()

# Obtener los detalles de entrada y salida
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

'''@app.route('/procesar_imagen', methods=['POST'])
def procesar_imagen():
    file = request.files['file']
    if not file:
        return 'No file uploaded', 400

    # Leer la imagen
    img = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)

    # Preprocesar la imagen
    input_shape = input_details[0]['shape']
    input_data = cv2.resize(img, (input_shape[1], input_shape[2]))
    input_data = np.expand_dims(input_data, axis=0)
    input_data = input_data.astype(np.float32) / 255.0

    # Hacer una predicción con el modelo
    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])

    # Obtener la etiqueta de la predicción
    labels = ['Metal', 'Papel o carton', 'Plastico', 'Vidrio']  # Ajusta esto según tus clases
    predicted_label = labels[np.argmax(output_data)]

    # Dibujar el recuadro y la etiqueta sobre la imagen
    output_image = img.copy()
    cv2.rectangle(output_image, (10, 10), (200, 60), (0, 255, 0), 2)
    cv2.putText(output_image, predicted_label, (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

    # Convertir la imagen a un formato que se pueda enviar
    _, buffer = cv2.imencode('.jpg', output_image)
    print("Enviando imagen procesada al frontend")
    return send_file(io.BytesIO(buffer), mimetype='image/jpeg')'''


@app.route('/procesamiento', methods=['POST'])
def procesar_imagen():
    file = request.files['file']
    if not file:
        return 'No file uploaded', 400

    # Leer la imagen
    img = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)

    # Preprocesar la imagen
    input_shape = input_details[0]['shape']
    input_data = cv2.resize(img, (input_shape[1], input_shape[2]))
    input_data = np.expand_dims(input_data, axis=0)
    input_data = input_data.astype(np.float32) / 255.0

    # Hacer una predicción con el modelo
    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])

    # Obtener la etiqueta de la predicción
    labels = ['Metal', 'Papel o carton', 'Plastico', 'Vidrio']  # Ajusta esto según tus clases
    predicted_label = labels[np.argmax(output_data)]

    # Dibujar el recuadro y la etiqueta sobre la imagen
    output_image = img.copy()
    cv2.rectangle(output_image, (10, 10), (200, 60), (0, 255, 0), 2)
    cv2.putText(output_image, predicted_label, (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

    # Convertir la imagen a un formato que se pueda enviar
    _, buffer = cv2.imencode('.jpg', output_image)
    image_bytes = io.BytesIO(buffer).getvalue()

    print("Enviando imagen procesada al frontend")
    print("Prediccion: ", predicted_label)

    # Crear una respuesta multipart
    response = make_response(image_bytes)
    response.headers.set('Content-Type', 'image/jpeg')
    response.headers.set('X-Predicted-Label', predicted_label)

    return response

if __name__ == '__main__':
    app.run(debug=True)