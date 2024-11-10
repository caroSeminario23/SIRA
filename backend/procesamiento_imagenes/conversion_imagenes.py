from PIL import Image
import os
from pathlib import Path


# Crear una funcion para convertir el formato de cualquier imagen en jpg
def convert_to_jpg(image_path, output_path):
    """Convierte una imagen a formato JPG."""
    try:
        with Image.open(image_path) as img:
            # Convertir a RGB (necesario para imágenes con transparencia)
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            img.save(output_path, 'JPEG', quality=95)
        return True
    except Exception as e:
        print(f"Error al convertir a JPG {image_path}: {e}")
        return False


# Crear una funcion para convertir la imagen en formato jpg al tamaño 128x128 pixeles
def resize_image(image_path, output_path, size=(128, 128)):
    """Redimensiona una imagen al tamaño especificado."""
    try:
        with Image.open(image_path) as img:
            # Convertir a RGB si es necesario
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            # Resize la imagen manteniendo la proporción
            img.thumbnail(size, Image.Resampling.LANCZOS)
            # Crear una nueva imagen con el tamaño exacto
            new_img = Image.new('RGB', size, (255, 255, 255))
            # Calcular la posición para centrar la imagen
            position = ((size[0] - img.size[0]) // 2,
                       (size[1] - img.size[1]) // 2)
            # Pegar la imagen redimensionada
            new_img.paste(img, position)
            new_img.save(output_path, 'JPEG', quality=95)
        return True
    except Exception as e:
        print(f"Error al redimensionar {image_path}: {e}")
        return False


# Crear una funcion que solicite la dirección de la carpeta donde se encuentren las imagenes a procesar (carpeta_entrada)
# y que devuelva las imagenes en formato jpg y con un tamaño de 128x128 pixeles en la carpeta de destino (carpeta_salida)
# usando las funciones anteriores
def process_images(input_folder, output_folder):
    # Asegurarse de que la carpeta de salida existe
    Path(output_folder).mkdir(parents=True, exist_ok=True)
    
    # Extensiones de imagen soportadas
    supported_formats = {'.jpg', '.jpeg', '.png', '.bmp', '.gif', '.webp'}
    
    # Procesar cada archivo en la carpeta de entrada
    for filename in os.listdir(input_folder):
        input_path = os.path.join(input_folder, filename)
        
        # Verificar si es un archivo y tiene una extensión de imagen soportada
        if os.path.isfile(input_path) and any(filename.lower().endswith(fmt) for fmt in supported_formats):
            # Crear nombre de archivo de salida (siempre jpg)
            output_filename = os.path.splitext(filename)[0] + '.jpg'
            output_path = os.path.join(output_folder, output_filename)
            
            try:
                # Procesar la imagen
                if resize_image(input_path, output_path):
                    print(f"Imagen procesada con éxito: {filename}")
                else:
                    print(f"No se pudo procesar: {filename}")
            except Exception as e:
                print(f"Error al procesar {filename}: {e}")


# Crear la función main que ejecute la función conversion_imagenes
def main():
    # Obtener las rutas absolutas de las carpetas
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_folder = os.path.join(script_dir, 'carpeta_entrada')
    output_folder = os.path.join(script_dir, 'carpeta_salida')
    
    try:
        process_images(input_folder, output_folder)
        print("Proceso completado con éxito")
    except Exception as e:
        print(f"Error en el proceso: {e}")


if __name__ == '__main__':
    main()